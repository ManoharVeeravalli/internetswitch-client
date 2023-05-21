import { useState } from "react";
import { DeviceDoc, STATUS_ON } from "../lib/types";



function DeviceItem({ device }: { device: DeviceDoc, deviceId: string }) {
    const [status, setStatus] = useState(device.status == STATUS_ON);
    return (
        <li className="card device-item">
            <div>
                <h4>Motor Switch</h4>
                <span>status: <b>{device.state}</b></span>

            </div>

            <div>
                <label>
                    <input name="status" type='checkbox' checked={status} onChange={() => {

                        setStatus(!status);
                    }} />
                </label>
            </div>
        </li>);
}

export default DeviceItem;