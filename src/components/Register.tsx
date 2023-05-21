
import { FormEvent, useState } from 'react';
import { useUser } from '../lib/hooks';
import { database } from '../lib/firebase';
import { ref, set } from 'firebase/database';


function Register({ setUserDoc }: { setUserDoc: (doc: any) => void }) {
    const user = useUser();
    const [name, setName] = useState('');
    const [loading, setLoading] = useState(false);

    async function onSubmit(event: FormEvent) {
        event.preventDefault();
        try {
            setLoading(true);
            await set(ref(database, 'users/' + user.uid), {
                name,
            });
            setUserDoc({ name });
        } catch (e) {
            console.error(e);

        } finally {
            setLoading(false);
        }
    }

    if (loading) {
        return <p>Loading.....</p>
    }
    return (
        <>
            <form onSubmit={onSubmit}>
                <label>
                    Name:
                    <input type='text' required value={name} onChange={e => setName(e.target.value)} />
                </label>
                <input type='submit' />
            </form>
        </>
    );

}

export default Register;