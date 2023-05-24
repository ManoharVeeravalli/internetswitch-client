import { User } from "firebase/auth";
import React from "react";
import { UserDetailDoc } from "./types";

export const AuthContext =
    React.createContext<{ user: User | null, loading: boolean, setUser: (user: User) => void }>({ user: null, setUser: () => console.log, loading: false });

export const UserDetailContext =
    React.createContext<{
        userDetail: UserDetailDoc | null,
        loading: boolean,
        setUserDetail: (user: UserDetailDoc) => void
    }>({ userDetail: null, setUserDetail: () => console.log, loading: false });