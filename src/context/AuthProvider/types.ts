export interface IUser {
    email?: string;
    token?: string;
    cpf?: string;
    cnpj?: string;
    phone?: string;
    planType?: string;
    balance?: number;
    messageSent?: number;
    maxLimit?: number;
    id?: number;
}

export interface IContext extends IUser {
    authenticate: (email: string, password: string) => Promise<void>;
    logout: () => void;
}

export interface IAuthProvider {
    children: JSX.Element;
}