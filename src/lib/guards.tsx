import React, { useContext } from 'react';
import { AuthContext, UserDetailContext } from './context';
import { Navigate } from "react-router-dom";
import Loading from '../components/Loading';


export function AuthGuard(Node: React.FC<any>): React.FC {

    return (props: any) => {
        const { user, loading } = useContext(AuthContext);

        if (loading) {
            return <Loading />
        }

        if (!user) {
            return <Navigate to="/signin" replace />;
        }

        return <>
            <Node {...props} />
        </>
    }

}

export function UserDetailGuard(Node: React.FC): React.FC {

    return (props: any) => {
        const { userDetail, loading } = useContext(UserDetailContext);

        if (loading) {
            return <Loading />
        }

        if (!userDetail) {
            return <Navigate to="/register" replace />;
        }

        return <>
            <Node {...props} />
        </>
    }

}

