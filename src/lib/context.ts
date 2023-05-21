import { User } from "firebase/auth";
import React from "react";

export const AuthContext =
    React.createContext<{ user: User | null, loading: boolean, setUser: (user: User) => void }>({ user: null, setUser: () => { }, loading: false });