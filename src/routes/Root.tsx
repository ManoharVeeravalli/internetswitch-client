import { useEffect, useState } from 'react';
import { AuthGuard } from '../lib/guards';
import { useUser } from '../lib/hooks';
import { database } from '../lib/firebase';
import { ref, get, child } from 'firebase/database';
import { UserDoc } from '../lib/types';
import Register from '../components/Register';
import DeviceItem from '../components/DeviceItem';

function Root() {
    const user = useUser();
    const [userDoc, setUserDoc] = useState<UserDoc | null>(null);
    const [loading, setLoading] = useState(true);

    async function getUserDoc() {

        try {
            setLoading(true);
            const snapshot = await get(child(ref(database), `users/${user?.uid}`));

            if (snapshot.exists()) {
                setUserDoc(snapshot.val());
            } else {
                setUserDoc(null);
            }
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }

    }

    useEffect(() => {
        getUserDoc();
    }, []);

    if (loading) {
        return <p>Loading.....</p>
    }

    if (!userDoc) {
        return <Register setUserDoc={setUserDoc} />
    }



    return (
        <>
            <h2><span className='highlight'>Welcome</span> {userDoc.name}</h2>
            <div>
                <ul>
                    {
                        userDoc.devices ? Object.keys(userDoc.devices).map(deviceId => {
                            let device = userDoc.devices[deviceId];
                            return <DeviceItem key={deviceId} device={device} deviceId={deviceId} />
                        }) : null
                    }
                </ul>
            </div>
        </>);
}

export default AuthGuard(Root);


