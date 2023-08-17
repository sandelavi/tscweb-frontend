import { useState } from "react";

const ConnectableDevice: React.FC<any> = () => {
    
    const [device, setDevice ] = useState<USBDevice | null>(null);
    const [data, setData] = useState<string | null>(null);

    const connect = async () => {
        navigator.usb.requestDevice({ filters: [{vendorId: 0x2341}] })
        .then(selectedDevice => {
            setDevice(selectedDevice);
            return selectedDevice.open(); // Begin a session
        })
        .then(() => device?.selectConfiguration(1)) // Select configuration #1 for the device
        .then(() => device?.claimInterface(2))      // Select exclusive control over interface #2
        .then(() => device?.controlTransferOut({
            requestType: 'class',
            recipient: 'interface',
            request: 0x22,
            value: 0x01,
            index: 0x02
        })) // Ready to receive data
        .then(() => device?.transferIn(5, 64)) // Waitng for 64 bytes of data from endpoint #5
        .then(result => {
            const decoder = new TextDecoder();
            console.log("Receive: " + decoder.decode(result?.data));
            setData(decoder.decode(result?.data));
        })
        .catch(err => {
            console.error(err);
        });
    }

    const disconnect = async () => {
        await device!.close();
        setDevice(null);
    }

    return (
        <>
        { device ? (
            <div>
                <button type="button" onClick={disconnect}>
                    DISCONNECT DEVICE
                </button>
                <div>
                    <p>VendorId: { device.vendorId }</p>
                    <p>ProductName: { device.productName }</p>
                </div>
            </div>
        ): (
            <div>
                <button type="button" onClick={connect}>
                    CONNECT DEVICE
                </button>
                <div>
                    <p>VendorId: </p>
                    <p>ProductName: </p>
                </div>
            </div>
        )}
        { data && <p>Data: {data}</p> }
        </>
    );

}

export default ConnectableDevice;