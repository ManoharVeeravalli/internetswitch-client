import { useUser } from "../../lib/hooks";
import { get, ref, query, orderByChild, limitToLast } from 'firebase/database';
import { database, getErrorMessage } from '../../lib/firebase';
import { useCallback, useEffect, useState } from "react";
import { FirebaseError } from "firebase/app";
import Loading from "../../components/Loading";
import { DeviceHistoryDoc } from "../../lib/types";
import { formatDate } from "../../lib/utils";




export function DeviceHistory({ deviceId }: { deviceId: string }) {
    const user = useUser();
    const [loading, setLoading] = useState(true);
    const [history, setHistory] = useState<{ [key: string]: DeviceHistoryDoc }>({});

    const getHistory = useCallback(async () => {
        try {
            setLoading(true);
            const historyRef = ref(database, `users/${user?.uid}/devices/${deviceId}/history`);
            const snapshot = await get(query(historyRef, orderByChild('createdAt'), limitToLast(100)));
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
        <>Last {keys.length} Record(s) found</>
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
        <td>{formatDate(history.createdAt)}</td>
        <td>{history.message}</td>
    </tr>
}