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
    const [userDetail, setDetail] = useState<UserDetailDoc | null>(getUserDetailFromCache());
    const [loading, setLoading] = useState(!userDetail);

    async function fetchUserDoc(showLoading: boolean) {

        try {
            setLoading(showLoading);
            const snapshot = await get(child(ref(database), `users/${user?.uid}/details`));

            if (snapshot.exists()) {
                let doc = snapshot.val();
                setUserDetail(doc);
            } else {
                setUserDetail(null);
            }
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }

    }

    function setUserDetail(doc: any) {
        if (!doc) {
            localStorage.removeItem(user.uid);
            setDetail(null);
            return;
        }
        localStorage.setItem(user?.uid, JSON.stringify(doc));
        setDetail(doc);
    }

    function getUserDetailFromCache(): any {
        const str = localStorage.getItem(user?.uid);
        return str ? JSON.parse(str) : null
    }

    useEffect(() => {
        fetchUserDoc(!userDetail);
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