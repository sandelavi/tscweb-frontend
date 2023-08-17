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
            <button type="button" onClick={disconnect}>
                DISCONNECT DEVICE
            </button>
        ): (
            <button type="button" onClick={connect}>
                CONNECT DEVICE
            </button>
        )}
        </>
    );

}

export default ConnectableDevice;