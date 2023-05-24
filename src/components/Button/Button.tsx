import { Varient } from '../../lib/types';
import './Button.css'

function Button({ name, loading = false, varient = 'dark', onClick }: { name: string, loading?: boolean, varient?: Varient, onClick?: () => void }) {
    return <>
        <button className={`button-${varient}`} type={onClick ? 'button' : 'submit'} disabled={loading} onClick={onClick}>
            {loading && <div className='button-loader'></div>}{name}
        </button>
    </>
}

export default Button;