import { useMutation, useQueryClient } from "@tanstack/react-query"
import { SignIn } from "./LoginServices"
import {  useNavigate } from "react-router-dom"
import toast from "react-hot-toast"



function useLogin() {
    const queryClient = useQueryClient();
    const navigate = useNavigate()
    const { mutate: login, isPending: isLogin } = useMutation({
      mutationFn: SignIn,
      onSuccess: (user) => {
        queryClient.setQueryData(["user"], user.user);
        navigate("/app", {replace : true});
        toast.success("Successfully Login");
      },
      onError: (err) => toast.error(err.message),
    });
    return {login , isLogin}
}

export default useLogin
