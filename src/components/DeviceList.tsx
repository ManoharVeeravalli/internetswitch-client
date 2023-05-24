import { database, getErrorMessage } from '../lib/firebase';
import { useUser } from '../lib/hooks';
import { get, child, ref } from 'firebase/database';
import { useCallback, useEffect, useState } from 'react';
import DeviceItem from './DeviceItem/DeviceItem';
import { DeviceDoc } from '../lib/types';
import { FirebaseError } from 'firebase/app';

function DeviceList() {

    const [loading, setLoading] = useState(true);
    const [devices, setDevices] = useState<{ [key: string]: DeviceDoc }>({});

    const user = useUser();

    const getDevices = useCallback(async () => {
        try {
            setLoading(true);
            const snapshot = await get(child(ref(database), `users/${user?.uid}/devices`));

            if (snapshot.exists()) {
                setDevices(snapshot.val())
                console.log();
            } else {
                setDevices({})
            }
        } catch (e) {
            const error = e as FirebaseError;
            alert(getErrorMessage(error.code));
            console.error(e);
        } finally {
            setLoading(false);
        }
    }, [user.uid]);

    useEffect(() => {
        getDevices();
    }, [getDevices]);


    if (loading) return <>....</>;

    const deviceKeys = Object.keys(devices);

    if (!deviceKeys.length) {
        return <>No Devices found</>
    }

    return <>
        <>{deviceKeys.length} Device(s) found</>
        <br /><br />
        {deviceKeys.map(deviceId => {
            return <DeviceItem key={deviceId} deviceId={deviceId} device={devices[deviceId]} />
        })}
    </>

}

export default DeviceList;