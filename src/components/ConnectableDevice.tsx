import { useState } from "react";

const ConnectableDevice: React.FC<any> = () => {
    
    const [device, setDevice ] = useState<USBDevice | null>(null);

    const connect = async () => {
        navigator.usb.requestDevice({ filters: [{vendorId: 0x2341}] })
        .then(selectedDevice => {
            setDevice(selectedDevice);
            return selectedDevice.open(); // Begin a session
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
        </>
    );

}

export default ConnectableDevice;