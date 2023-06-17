import Button from "./Button/Button";
import { auth } from '../lib/firebase';
import { useUser } from "../lib/hooks";
import { useNavigate } from "react-router-dom";


function Header() {
    const user = useUser();
    const navigate = useNavigate();
    async function signOut() {
        try {
            await auth.signOut()
            localStorage.removeItem(user.uid);
        } catch (e) {
            // console.error(e);
        }
    }
    return <header className='card'>
        <div className='flex justify-space-between'>
            <h2 className="sub-heading pointer" onClick={() => navigate('/')}><b>Internet <span className='highlight'>Switch</span></b></h2>
            <Button name='Sign out' varient='light' onClick={signOut} />
        </div>
    </header>
}

export default Header;