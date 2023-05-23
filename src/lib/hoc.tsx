import { useState, useEffect, ReactNode, FC } from "react";
import { useUser } from "./hooks";
import { UserDetailDoc } from "./types";
import { ref, get, child } from 'firebase/database';
import { database } from '../lib/firebase';
import { UserDetailContext } from "./context";
import { AuthGuard } from "./guards";
import { auth } from '../lib/firebase'
import { AuthContext } from '../lib/context'



export const UserDetailWrapper: FC<{ children: ReactNode }> = AuthGuard((props: any) => {
    const user = useUser();

    const [userDetail, setUserDetail] = useState<UserDetailDoc | null>(null);
    const [loading, setLoading] = useState(true);

    async function getUserDoc() {

        try {
            setLoading(true);
            const snapshot = await get(child(ref(database), `users/${user?.uid}/details`));

            if (snapshot.exists()) {
                setUserDetail(snapshot.val());
            } else {
                setUserDetail(null);
            }
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }

    }

    useEffect(() => {
        getUserDoc();
    }, []);

    return <>
        <UserDetailContext.Provider value={{ userDetail, setUserDetail, loading }}>
            {props.children}
        </UserDetailContext.Provider>
    </>
});



export function AuthWrapper(props: { children: ReactNode }) {

    const [user, setUser] = useState(auth.currentUser);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            setUser(user);
            setLoading(false);
        }, (error) => {
            console.error(error);
        });
        return () => unsubscribe();
    }, []);

    return <>
        <AuthContext.Provider value={{ user, setUser, loading }}>
            {props.children}
        </AuthContext.Provider>
    </>
}