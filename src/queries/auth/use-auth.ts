import { useMutation } from "@tanstack/react-query";
import { userLogin, LoginData, RegisterData, UserRegister } from "@/services/auth";
import { authUtils } from "@/utils/auth";

export const useAuthentication = () => {
    const useLogin = () => {
        return useMutation({
            mutationFn: (userData: LoginData) => userLogin(userData),
            onSuccess: (data) => {
                if (data.data) {
                    authUtils.setTokens(data.data);
                }
            },
            onError: () => {},
        });
    };

    const useRegister = () => {
        return useMutation({
            mutationFn: (userData: RegisterData) => UserRegister(userData),
            onSuccess: (data) =>{
                if (data.data) {
                    authUtils.setTokens(data.data);
                }
            },
            onError: () => {},
        });
    };

    return { useLogin, useRegister };
};
