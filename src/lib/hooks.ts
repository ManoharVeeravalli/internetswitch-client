import { useContext } from 'react';
import { AuthContext, UserDetailContext } from './context';
import { User } from 'firebase/auth';
import { UserDetailDoc } from './types';

export function useUser(): User {
    const { user } = useContext(AuthContext);
    return user as User;
}

export function useUserDetail(): UserDetailDoc {
    const { userDetail } = useContext(UserDetailContext);
    return userDetail as UserDetailDoc;
}