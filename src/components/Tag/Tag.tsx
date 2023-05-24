

import { Varient } from '../../lib/types';
import './Tag.css'

function Tag({ children, varient = 'dark'}: { children: React.ReactNode, varient?: Varient }) {
    return <span className={`tag tag-${varient}`}>{children}</span>
}

export default Tag;