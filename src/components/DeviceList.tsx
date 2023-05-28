import { database, getErrorMessage } from '../lib/firebase';
import { useUser } from '../lib/hooks';
import { get, child, ref } from 'firebase/database';
import { useCallback, useEffect, useState } from 'react';
import DeviceItem from './DeviceItem/DeviceItem';
import { DeviceDetailDoc } from '../lib/types';
import { FirebaseError } from 'firebase/app';

function DeviceList() {

    const [loading, setLoading] = useState(true);
    const [devices, setDevices] = useState<{ [key: string]: DeviceDetailDoc }>({});

    const user = useUser();

    const getDevices = useCallback(async () => {
        try {
            setLoading(true);
            const snapshot = await get(child(ref(database), `users/${user?.uid}/devices`));
            if (snapshot.exists()) {
                const devicesDoc: { [key: string]: DeviceDetailDoc } = {};
                snapshot.forEach(snap => {
                    devicesDoc[`${snap.key}`] = snap.child('details').val()
                });
                setDevices(devicesDoc)
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

    return <>
        <>{deviceKeys.length} Device(s) found</>
        <br /><br />
        {deviceKeys.map(deviceId => {
            return <DeviceItem showLink key={deviceId} deviceId={deviceId} device={devices[deviceId]} />
        })}
    </>

}

export default DeviceList;