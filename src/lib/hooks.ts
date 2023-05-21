import { useContext } from 'react';
import { AuthContext } from './context';
import { User } from 'firebase/auth';

export function useUser(): User {
    const { user } = useContext(AuthContext);
    return user as User;
}