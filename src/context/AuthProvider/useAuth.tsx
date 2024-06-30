import { useContext } from "react"
import { AuthContext } from "."
import { IUser } from "./types";

export function setUserLocalStorage(user: IUser | null) {
    localStorage.setItem('u', JSON.stringify(user));
}

export function getUserLocalStorage() {
    const json = localStorage.getItem('u');

    if(!json) {
        return null;
    }

    const user = JSON.parse(json);

    return user ?? null;
}

export const useAuth = () => {
    const context = useContext(AuthContext);

    return context;
}