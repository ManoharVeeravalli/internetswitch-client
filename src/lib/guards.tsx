import React, { useContext } from 'react';
import Login from '../routes/Login';
import { AuthContext } from './context';



export function AuthGuard(Node: React.FC): React.FC {

    return (props: any) => {
        const { user, loading } = useContext(AuthContext);

        if (loading) {
            return <p>Loading.....</p>
        }

        if (!user) {
            return <Login />;
        }

        return <>
            <Node {...props} user={user} />
        </>
    }

}

