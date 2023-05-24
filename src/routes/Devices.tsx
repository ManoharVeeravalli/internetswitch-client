import { UserDetailGuard } from '../lib/guards';
import { database, getErrorMessage } from '../lib/firebase';
import { useUser, useUserDetail } from '../lib/hooks';
import { get, child, ref } from 'firebase/database';
import { useEffect, useState } from 'react';
import DeviceItem from '../components/DeviceItem/DeviceItem';
import { DeviceDoc } from '../lib/types';
import { FirebaseError } from 'firebase/app';
import Layout from '../components/Layout';

function DevicesWrapper() {
    const userDetail = useUserDetail();

    return (
        <>
            <Layout Heading={<h1 className='sub-heading'><span className='highlight'>Welcome</span> {userDetail.name}</h1>}>
                <Devices />
            </Layout>
        </>

    );
}

function Devices() {

    const [loading, setLoading] = useState(true);
    const [devices, setDevices] = useState<{ [key: string]: DeviceDoc }>({});

    const user = useUser();

    useEffect(() => {
        getDevices();
    }, []);

    async function getDevices() {
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
    }


    if (loading) return null;

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

export default UserDetailGuard(DevicesWrapper);


