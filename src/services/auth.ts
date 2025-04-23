import api from "@/lib/axios";
import { API_ENDPOINTS } from "@/utils/api-endpoints";

export interface LoginData {
    email: string;
    password: string;
}
export interface RegisterData{
    email: String;
    username: String;
    password: any;
    confirm_password: any
}

export const userLogin = async (userData: LoginData) => {
    const { SIGN_IN } = API_ENDPOINTS;
    const response = await api.post(SIGN_IN, userData);
    const { status_code, message, data } = response?.data;
    if (status_code === 6001) {
        throw { message, errors: data };
    }
    return response?.data;
};


export const UserRegister = async (userData: RegisterData) => {
    const { SIGN_UP } = API_ENDPOINTS;
    const response = await api.post(SIGN_UP, userData);
    const { status_code, message, data } = response?.data;
    if (status_code === 6001) {
        throw { message, errors: data };
    }
    return response?.data;
}