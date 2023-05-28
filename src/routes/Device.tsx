import { useParams } from "react-router-dom";
import Layout from "../components/Layout";
import { useUser } from "../lib/hooks";
import { get, child, ref, query, orderByChild } from 'firebase/database';
import { database, getErrorMessage } from '../lib/firebase';
import { useCallback, useEffect, useState } from "react";
import { DeviceDetailDoc } from "../lib/types";
import { FirebaseError } from "firebase/app";
import DeviceItem from "../components/DeviceItem/DeviceItem";
import Loading from "../components/Loading";
import { DeviceHistoryDoc } from "../lib/types";

function DeviceWrapper() {
    const { deviceId } = useParams();
    if (!deviceId) return null;
    return <>
        <Layout>
            <DeviceDetail deviceId={deviceId} />
            <h1 className='sub-heading'>History</h1>
            <DeviceHistory deviceId={deviceId} />
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

function DeviceHistory({ deviceId }: { deviceId: string }) {
    const user = useUser();
    const [loading, setLoading] = useState(true);
    const [history, setHistory] = useState<{ [key: string]: DeviceHistoryDoc }>({});

    const getHistory = useCallback(async () => {
        try {
            setLoading(true);
            const historyRef = ref(database, `users/${user?.uid}/devices/${deviceId}/history`);
            const snapshot = await get(query(historyRef, orderByChild('createdAt')));
            if (snapshot.exists()) {
                setHistory(snapshot.val())
            } else {
                setHistory({})
            }
        } catch (e) {
            const error = e as FirebaseError;
            alert(getErrorMessage(error.code));
            console.error(e);
        } finally {
            setLoading(false);
        }
    }, [user?.uid, deviceId]);

    useEffect(() => {
        getHistory();
    }, [getHistory])

    if (loading) return <Loading />;
    return (
        <>
            <DeviceHistoryList histories={history} />
        </>
    );
}

function DeviceHistoryList({ histories }: { histories: { [key: string]: DeviceHistoryDoc } }) {

    const keys = Object.keys(histories).reverse();

    return <>
        <>{keys.length} Record(s) found</>
        <br /><br />
        <div className="card">
            <table>
                <thead>
                    <tr>
                        <th>Created At</th>
                        <th>Message</th>
                    </tr>
                </thead>
                <tbody>
                    {keys.map(historyId => {
                        return <HistoryListItem key={historyId} historyId={historyId} history={histories[historyId]} />
                    })}
                </tbody>
            </table>

        </div>

    </>
}

function HistoryListItem({ history }: { history: DeviceHistoryDoc, historyId: string }) {
    return <tr>
        <td>{new Date(history.createdAt).toLocaleString()}</td>
        <td>{history.message}</td>
    </tr>
}

export default DeviceWrapper;