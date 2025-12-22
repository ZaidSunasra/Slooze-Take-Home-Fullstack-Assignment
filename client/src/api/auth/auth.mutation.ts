import { useMutation } from "@tanstack/react-query";
import { login, logout } from "./auth.api";
import { useUser } from "@/context/UserContext";
import { toast } from "sonner";
import { useNavigate } from "react-router";
import { type AxiosError } from "axios";
import type { LoginSuccessResponse } from "./auth.type";
import type { ErrorResponse, SuccessResponse } from "@/lib/globalType";

export const useLogin = () => {
    const { setUser } = useUser();
    const navigate = useNavigate();
    return useMutation({
        mutationFn: login,
        onSuccess: (data: LoginSuccessResponse) => {
            setUser({ name: data.userData.name, email: data.userData.email, role: data.userData.role, country_id: String(data.userData.country_id), id: data.userData.id });
            toast.success(data.message);
            navigate("/restaurants");
        },
        onError: (error: AxiosError<ErrorResponse>) => {
            toast.error(error.response?.data.message);
        }
    });
};

export const useLogout = () => {
    const { clearUser } = useUser();
    const navigate = useNavigate();
    return useMutation({
        mutationFn: logout,
        onSuccess: (data: SuccessResponse) => {
            clearUser();
            toast.success(data.message);
            navigate("/");
        },
        onError: (error: AxiosError<ErrorResponse>) => {
            toast.error(error.response?.data.message);
        }
    });
};
