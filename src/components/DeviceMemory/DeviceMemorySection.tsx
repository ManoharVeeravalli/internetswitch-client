
import { useUser } from "../../lib/hooks";
import { get, ref, query, orderByChild, limitToLast } from 'firebase/database';
import { database, getErrorMessage } from '../../lib/firebase';
import { useCallback, useEffect, useState } from "react";
import { FirebaseError } from "firebase/app";
import Loading from "../Loading";
import { DeviceMemoryDoc } from "../../lib/types";
import { formatBytes, formatDate } from "../../lib/utils";

export function DeviceMemorySection({ deviceId, limit = 10 }: { deviceId: string, limit?: number }) {
    const user = useUser();
    const [loading, setLoading] = useState(true);
    const [memories, setMemories] = useState<{ [key: string]: DeviceMemoryDoc }>({});

    const getMemory = useCallback(async () => {
        try {
            setLoading(true);
            const historyRef = ref(database, `users/${user?.uid}/devices/${deviceId}/memory`);
            const snapshot = await get(query(historyRef, orderByChild('createdAt'), limitToLast(limit)));
            if (snapshot.exists()) {
                setMemories(snapshot.val())
            } else {
                setMemories({})
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
        getMemory();
    }, [getMemory])

    if (loading) return <Loading />;

    return (
        <>
            <DeviceMemoryList memories={memories} />
        </>
    );
}


function DeviceMemoryList({ memories }: { memories: { [key: string]: DeviceMemoryDoc } }) {

    const keys = Object.keys(memories).reverse();

    return <>
        <>Last {keys.length} Record(s) found</>
        <br /><br />
        <div className="card">
            <table>
                <thead>
                    <tr>
                        <th>Created At</th>
                        <th>Free Heap</th>
                        <th>Heap Fragmentation</th>
                        <th>Max Free Block Size</th>
                    </tr>
                </thead>
                <tbody>
                    {keys.map((memoryId) => {
                        return <MemoryListItem key={memoryId} memoryId={memoryId} memory={memories[memoryId]} />
                    })}
                </tbody>
            </table>
        </div>

    </>
}

export function MemoryListItem({ memory, memoryId }: { memory: DeviceMemoryDoc, memoryId: string, index?: number }) {
    return <tr key={memoryId}>
        <td>{formatDate(memory.createdAt)}</td>
        <td>{formatBytes(memory.freeHeap)}</td>
        <td>{memory.heapFragmentation}%</td>
        <td>{formatBytes(memory.maxFreeBlockSize)}</td>
    </tr>
}