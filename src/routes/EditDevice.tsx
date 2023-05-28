import { UserDetailGuard } from '../lib/guards';
import { database, getErrorMessage } from '../lib/firebase';
import { useUser } from '../lib/hooks';
import { get, child, ref, update } from 'firebase/database';
import { FormEvent, useCallback, useEffect, useState } from 'react';
import { DeviceDetailDoc } from '../lib/types';
import { FirebaseError } from 'firebase/app';
import Layout from '../components/Layout';
import { useNavigate, useParams } from 'react-router-dom';
import Button from '../components/Button/Button';
import Loading from '../components/Loading';

function EditDeviceWrapper() {
    return <>
        <Layout>
            <EditDevice />
        </Layout>
    </>
}
function EditDevice() {
    const { deviceId } = useParams();
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

    if (!deviceId) return null;

    if (loading) return <Loading/>;

    if (!device) {
        return <>Device {deviceId} does not exist!</>;
    }

    return <EditDeviceForm device={device} deviceId={deviceId} />;
}

function EditDeviceForm({ device, deviceId }: { device: DeviceDetailDoc, deviceId: string }) {
    const user = useUser();
    const [name, setName] = useState(device?.name || '');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    async function onSubmit(e: FormEvent) {
        e.preventDefault();
        setLoading(true);
        try {
            await update(ref(database, `/users/${user.uid}/devices/${deviceId}/details`), {
                name
            })
            navigate('/devices');
        } catch (e) {
            const error = e as FirebaseError;
            setError(getErrorMessage(error.code));
            console.error(e);
        } finally {
            setLoading(false);
        }
    }
    return (
        <div className='card' onSubmit={onSubmit}>
            <form>
                <div className="form-message">
                    <span className="form-error flex justify-center w-100">{error && <span>{error}</span>}</span>
                </div>
                <label>Device Name</label>
                <input type='text' value={name} onChange={e => {
                    setError('');
                    setName(e.target.value);
                }} placeholder='Device name' required maxLength={19} />

                <Button name='Save' loading={loading} />
            </form>
        </div>
    );
}

const EditDevicePage = UserDetailGuard(EditDeviceWrapper);

export default EditDevicePage;


