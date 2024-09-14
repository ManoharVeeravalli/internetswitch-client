import { useParams } from "react-router-dom";
import Layout from "../components/Layout";
import { useUser } from "../lib/hooks";
import { get, child, ref } from 'firebase/database';
import { database, getErrorMessage } from '../lib/firebase';
import { useCallback, useEffect, useState } from "react";
import { DeviceDetailDoc } from "../lib/types";
import { FirebaseError } from "firebase/app";
import DeviceItem from "../components/DeviceItem/DeviceItem";
import Loading from "../components/Loading";
import { DeviceHistorySection } from "../components/DeviceHistory/DeviceHistorySection";
import { DeviceMemorySection } from "../components/DeviceMemory/DeviceMemorySection";
import { UserDetailGuard } from "../lib/guards";

function DeviceWrapper() {
    const { deviceId } = useParams();
    if (!deviceId) return null;
    return <>
        <Layout>
            <DeviceDetail deviceId={deviceId} />
            <h1 className='sub-heading'>History</h1>
            <DeviceHistorySection deviceId={deviceId} />
            <h1 className='sub-heading'>Memory</h1>
            <DeviceMemorySection deviceId={deviceId} />
        </Layout>
    </>
}


function DeviceDetail({ deviceId }: { deviceId: string }) {
    const user = useUser();
    const [loading, setLoading] = useState(true);
    const [device, setDevice] = useState<DeviceDetailDoc | null>(null);

    const getDevice = useCallback(async () => {
        try {
            setLoading(true);
            const snapshot = await get(child(ref(database), `users/${user?.uid}/devices/${deviceId}/details`));
            if (snapshot.exists()) {
                setDevice(snapshot.val())
            } else {
                setDevice(null)
            }
        } catch (e) {
            const error = e as FirebaseError;
            alert(getErrorMessage(error.code));
            console.error(e);
        } finally {
            setLoading(false);
        }
    }, [deviceId, user?.uid]);

    useEffect(() => {
        getDevice();
    }, [getDevice])

    if (loading) return <Loading />;

    if (!device) {
        return <>Device {deviceId} does not exist!</>;
    }

    return <DeviceItem device={device} deviceId={deviceId} />
}


export default UserDetailGuard(DeviceWrapper);