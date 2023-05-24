import { AuthError, createUserWithEmailAndPassword } from "firebase/auth";
import { FormEvent, useContext, useState } from "react"
import { auth, getErrorMessage } from '../lib/firebase';
import { AuthContext } from "../lib/context";
import Button from "../components/Button/Button";
import { useNavigate } from "react-router-dom";


function Signup() {
    const [email, setEmail] = useState('');
    const [passowrd, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();
    const { setUser } = useContext(AuthContext);

    async function onSubmit(e: FormEvent) {
        e.preventDefault();
        try {
            setLoading(true);
            const response = await createUserWithEmailAndPassword(auth, email, passowrd);
            setUser(response.user);
            setErrorMessage('');
            navigate('/');
        } catch (e) {
            const error = e as AuthError;
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
                        <h4 className="sub-heading">Create your Account</h4>
                        <div className="form-body">
                            <div className="form-message">
                                <span className="form-error flex justify-center w-100">{errorMessage && <p>{errorMessage}</p>}</span>
                            </div>
                            <div>
                                <input type="email" autoComplete="off" required placeholder='Email ID' value={email} onChange={e => {
                                    clearErrorMessages();
                                    setEmail(e.target.value);
                                }} />
                                <input type="password" autoComplete="off" required placeholder='Password' value={passowrd} onChange={e => {
                                    clearErrorMessages();
                                    setPassword(e.target.value);
                                }} />
                            </div>
                            <div className="flex flex-row justify-space-between">
                                <Button name="Sign in instead" varient="light" onClick={() => { navigate('/signin'); }} />
                                <Button name="Submit" loading={loading} />
                            </div>

                        </div>

                    </div>
                </form>
            </div>
        </section>
    </main>
}

export default Signup