import { Varient } from '../../lib/types';
import './Button.css'


interface ButtonProps {
    name: string;
    loading?: boolean;
    varient?: Varient;
    onClick?: () => void;
    disabled?: boolean;
}

function Button({
    name,
    loading = false,
    varient = 'dark',
    onClick,
    disabled = false
}: ButtonProps
) {
    return <>
        <button
            className={`button-${varient}`}
            type={onClick ? 'button' : 'submit'}
            disabled={loading || disabled}
            onClick={onClick}>
            {loading && <div className='button-loader'></div>}{name}
        </button>
    </>
}

export default Button;