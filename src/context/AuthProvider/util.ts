import { Api } from "../../services/api";
import { IUser } from "./types";

export async function loginRequest(email: string, password: string) {
    try {
        const request = await Api.post('auth/login', {email, password});

        return request.data;
    } catch (error) {
        return null;
    }
}

export async function createRequest(user: IUser) {
    try {
        const request = await Api.post('users', user);
        return request.data;
    } catch (error) {
        console.error(error);
    }
}

export async function sendMessage(iswhatsapp: boolean, phone: string, text: string, userId: number) {
    try {
        const data = {
            isWhatsApp: iswhatsapp,
            phone,
            text
        }

        const message = await Api.post(`messages/${userId}`, data);
        return message;
    } catch (error) {
        console.error(error);
    }
}

export async function updateUser(userId: number, data: IUser) {
    try {

        const user = (await Api.put(`users/${userId}`, data)).data;
        return user;
    } catch (error) {
        console.error(error);
    }
}

export async function getUser(userId: number) {
    try {
        const user = (await Api.get(`/users/${userId}`)).data[0];
        return user;
    } catch (error) {
        console.error(error);
    }
}

export async function addBalance(userId: number, balance: number) {
    try {
        const data = {
            userId,
            balance
        }
        const balanceResponse = (await Api.patch('/users/backoffice/balance', data)).data;
        return balanceResponse;
    } catch (error) {
        console.error(error);
    }
}

export async function setMaxLimit(userId: number, limit: number) {
    try {
        const data = {
            userId,
            limit
        }

        const limitResponse = (await Api.patch('/users/backoffice/limit', data)).data;
        return limitResponse;
    } catch (error) {
        console.error(error);
    }
}