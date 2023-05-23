import { FormEvent, useContext, useState } from 'react';
import { useUser } from '../lib/hooks';
import { database } from '../lib/firebase';
import { ref, set } from 'firebase/database';
import { AuthGuard } from '../lib/guards';
import Button from '../components/Button/Button';
import { useNavigate } from 'react-router-dom';
import { getErrorMessage } from '../lib/firebase';
import { AuthError } from 'firebase/auth';
import { UserDetailContext } from '../lib/context';

function Register() {
    const user = useUser();
    const [name, setName] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { setUserDetail } = useContext(UserDetailContext);

    async function onSubmit(event: FormEvent) {
        event.preventDefault();
        try {
            setLoading(true);
            await set(ref(database, `users/${user.uid}/details`), {
                name,
            });
            setUserDetail({ name });
            navigate('/');
        } catch (e) {
            let error = e as AuthError;
            setErrorMessage(getErrorMessage(error.code));
            console.error(e);
        } finally {
            setLoading(false);
        }
    }

    function clearErrorMessages() {
        setErrorMessage('');
    }
    return <main className="flex flex-center">
        <section>
            <div className="card">
                <form onSubmit={onSubmit} autoComplete="off">
                    <div className="box form-box">
                        <h2 className="heading">Internet <span className='highlight'>Switch</span></h2>
                        <h4 className="sub-heading">Register</h4>
                        <div className="form-body">
                            <div className="form-message">
                                <span className="form-error flex justify-center w-100">{errorMessage && <p>{errorMessage}</p>}</span>
                            </div>
                            <div>
                                <input type="text" autoComplete="off" required placeholder='Name' value={name} onChange={e => {
                                    clearErrorMessages();
                                    setName(e.target.value);
                                }} />
                            </div>
                            <Button name="Submit" loading={loading} />
                        </div>
                    </div>
                </form>
            </div>
        </section>
    </main>

}

export default AuthGuard(Register);