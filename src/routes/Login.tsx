import { signInWithEmailAndPassword } from "firebase/auth";
import { FormEvent, useContext, useState } from "react"
import { auth } from '../lib/firebase';
import { AuthContext } from "../lib/context";
import Button from "../components/Button";


function Login() {
    const [email, setEmail] = useState('');
    const [passowrd, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const { setUser } = useContext(AuthContext);

    async function onSubmit(e: FormEvent) {
        e.preventDefault();
        try {
            setLoading(true);
            const response = await signInWithEmailAndPassword(auth, email, passowrd);
            setUser(response.user);
        } catch (e) {
            let error = e as any;
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(error);
            alert(errorCode);
            alert(errorMessage);
            console.error(e);
        } finally {
            setLoading(false);
        }
    }
    return <>
        <div className="card">
            <form onSubmit={onSubmit}>
                <div className="box form-box">
                    <h2 className="form-heading">Internet <span className='highlight'>Switch</span></h2>
                    <div className="form-body">
                        <div>
                            <input type="email" required placeholder='Email ID' value={email} onChange={e => setEmail(e.target.value)} />
                            <input type="password" required placeholder='Password' value={passowrd} onChange={e => setPassword(e.target.value)} />
                        </div>

                        <Button name="Submit" loading={loading} />
                    </div>

                </div>
            </form>
        </div>

    </>
}

export default Login