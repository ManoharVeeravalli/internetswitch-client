import { useNavigate } from 'react-router-dom';
import Button from '../components/Button/Button';
import { UserDetailGuard } from '../lib/guards';
import { auth, database, getErrorMessage } from '../lib/firebase';
import { useUser, useUserDetail } from '../lib/hooks';
import { get, child, ref } from 'firebase/database';
import { useEffect, useState } from 'react';
import DeviceItem from '../components/DeviceItem/DeviceItem';
import { DeviceDoc } from '../lib/types';
import { FirebaseError } from 'firebase/app';

function Root() {
    const navigate = useNavigate();
    const userDetail = useUserDetail();

    async function signOut() {
        try {
            await auth.signOut()
        } catch (e) {
            console.error(e);
        }
    }

    return (
        <>
            <header className='card'>
                <div className='flex justify-space-between'>
                    <Button name='Devices' onClick={() => navigate('/')} />
                    <Button name='Sign out' varient='light' onClick={signOut} />
                </div>
            </header>
            <main>
                <section>
                    <div>
                        <h1 className='sub-heading'><span className='highlight'>Welcome</span> {userDetail.name}</h1>
                    </div>
                    <div>
                        <Devices />
                    </div>
                </section>
            </main>
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
        <br/><br/>
        {deviceKeys.map(deviceId => {
            return <DeviceItem deviceId={deviceId} device={devices[deviceId]} />
        })}
    </>

}

export default UserDetailGuard(Root);


