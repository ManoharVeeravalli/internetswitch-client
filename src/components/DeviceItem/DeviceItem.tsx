import { useState } from "react";
import { DeviceDoc, STATUS_OFF, STATUS_ON } from "../../lib/types";
import { database } from "../../lib/firebase";
import { update, ref } from "firebase/database";
import Switch from "../Switch/Switch";
import './DeviceItem.css';
import { useUser } from "../../lib/hooks";


function DeviceItem({ device, deviceId }: { device: DeviceDoc, deviceId: string }) {
    const user = useUser();
    const [status, setStatus] = useState(device.status == STATUS_ON);
    async function onSwitchChange() {
        const prevStatus = status;
        setStatus(!prevStatus);
        try {
            await update(ref(database, `/users/${user.uid}/devices/${deviceId}`), {
                status: prevStatus ? STATUS_OFF : STATUS_ON
            })
        } catch (e) {
            alert(e);
            console.error(e);
            setStatus(!prevStatus);
        }
    }
    return (
        <div className="card device-item">
            <div className="device-heading">
                <div>
                    <h4>Motor Switch </h4>
                </div>
                <div>
                    <Switch isOn={status} handleToggle={onSwitchChange} />
                </div>
            </div>
            <div className="device-body">
                {device.state}
            </div>

        </div>);
}

export default DeviceItem;