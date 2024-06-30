import {createContext, useEffect, useState} from "react";
import { IAuthProvider, IContext, IUser } from "./types";
import { loginRequest } from "./util";
import { getUserLocalStorage, setUserLocalStorage } from "./useAuth";

export const AuthContext = createContext<IContext>({} as IContext)

export const AuthProvider = ({ children }: IAuthProvider) => {
    const [user, setUser] = useState<IUser | null>();

    useEffect(() => {
        const user = getUserLocalStorage();

        if(user) {
            setUser(user);
        }
    }, []);

    async function authenticate (email: string, password: string) {
        const response = await loginRequest(email, password);

        const payload = {
            token: response.token,
            email,
            id: response.id
        };

        setUser(payload);
        setUserLocalStorage(payload);
    }

    function logout () {
        setUser(null);
        setUserLocalStorage(null);
    }

    return (
        <AuthContext.Provider value={{...user, authenticate, logout}}>
            {children}
        </AuthContext.Provider>
    )
}