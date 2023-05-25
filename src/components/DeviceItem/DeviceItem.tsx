import { useState } from "react";
import { DeviceDoc, STATE_ACTIVE, STATE_RESET, STATUS_OFF, STATUS_ON } from "../../lib/types";
import { database } from "../../lib/firebase";
import { update, ref } from "firebase/database";
import Switch from "../Switch/Switch";
import './DeviceItem.css';
import { useUser } from "../../lib/hooks";
import Tag from "../Tag/Tag";
import Button from "../Button/Button";
import { useNavigate } from "react-router-dom";


function DeviceItem({ device: initalState, deviceId }: { device: DeviceDoc, deviceId: string }) {
    const user = useUser();
    const [status, setStatus] = useState(initalState.status == STATUS_ON);
    const [device, setDevice] = useState({...initalState});
    const [resetLoading, setResetLoading] = useState(false);
    const navigate = useNavigate();
    async function onSwitchChange() {
        const prevStatus = status;
        setStatus(!prevStatus);
        try {
            await update(ref(database, `/users/${user.uid}/devices/${deviceId}`), {
                status: prevStatus ? STATUS_OFF : STATUS_ON
            })
        } catch (e) {
            setStatus(prevStatus);
        }
    }

    function getDeviceName() {
        return device.name || `#${deviceId.substring(deviceId.length - 4, deviceId.length)}`;
    }

    async function onResetClick() {
        if (!confirm(`Are you sure you want to reset ${getDeviceName()}`)) {
            return;
        }
        const prevState = { ...device };
        try {
            setResetLoading(true);
            await update(ref(database, `/users/${user.uid}/devices/${deviceId}`), {
                state: STATE_RESET
            })
            setDevice({ ...prevState, state: STATE_RESET });
        } catch (e) {
            setDevice({ ...prevState });
        } finally {
            setResetLoading(false);
        }
    }

    async function onEditClick() {
        navigate(`/devices/${deviceId}`)
    }

    return (
        <div className="card device-item">
            <div className="device-heading">
                <div className="flex flex-row flex-center">
                    <h4 className="device-name">{getDeviceName()}</h4>
                    <Tag varient={device.state === STATE_ACTIVE ? 'dark' : 'black'}>{device.state}</Tag>
                </div>
                <div>
                    <Switch isOn={status} handleToggle={onSwitchChange} disabled={device.state === STATE_RESET} id={deviceId}/>
                </div>
            </div>
            <div className="device-body">
                {device.state === STATE_RESET && <div>This device will be deleted soon.....</div>}
            </div>
            <div className="device-footer flex flex-end">
                {
                    device.state === STATE_ACTIVE &&
                    <>
                        <Button onClick={onEditClick} name="EDIT" varient="light" />
                        &nbsp;
                        <Button onClick={onResetClick} name="RESET" varient="black" loading={resetLoading} />
                    </>
                }
            </div>
        </div>);
}

export default DeviceItem;