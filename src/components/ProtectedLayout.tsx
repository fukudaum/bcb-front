import { useAuth } from "../context/AuthProvider/useAuth"

export const ProtectedLayout = ({ children }: { children: JSX.Element}) => {
    const auth = useAuth()

    if(!auth.email) {
        return <h1>You dont have accesss</h1>;        
    }

    return children;
}