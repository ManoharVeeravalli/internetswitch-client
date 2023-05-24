import React, { useContext } from 'react';
import { AuthContext, UserDetailContext } from './context';
import { Navigate } from "react-router-dom";
import Loading from '../components/Loading';


export function AuthGuard<P extends object>(Node: React.ComponentType<P>): React.FunctionComponent<P> {

    const Component = (props: P) => {
        const { user, loading } = useContext(AuthContext);

        if (loading) {
            return <Loading text='Auth Loading.....' />
        }

        if (!user) {
            return <Navigate to="/signin" replace />;
        }

        return <>
            <Node {...props} />
        </>
    }

    return Component;
}

export function UserDetailGuard<P extends object>(Node: React.ComponentType<P>): React.FunctionComponent<P> {

    const Component = (props: P) => {
        const { userDetail, loading } = useContext(UserDetailContext);

        if (loading) {
            return <Loading text='User Loading....' />
        }

        if (!userDetail) {
            return <Navigate to="/register" replace />;
        }

        return <>
            <Node {...props} />
        </>
    }

    return Component;

}

