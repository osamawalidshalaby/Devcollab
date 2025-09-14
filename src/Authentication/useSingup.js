import { useMutation, useQueryClient } from "@tanstack/react-query"
import { authWithGoogle, SignUp } from "./LoginServices"
import toast from "react-hot-toast"

export function useSingup() {
    const queryClient = useQueryClient()
    const {mutate : signup , isPending : isSignup} = useMutation({
        mutationFn : SignUp ,
        onSuccess : (user) => { 
            queryClient.setQueryData(['user'] , user.user)
            toast.success('Activate The Account From Your Email' , {
                duration : 30000
            })
        } , 
        onError : (err) => toast.error(err)
    })
    return {signup , isSignup}
}




export function GoogleAuthButton() {
  const queryClient = useQueryClient();
  const { mutate, isPending: isSign } = useMutation({
    mutationFn: authWithGoogle,
    onSuccess: (user) => {
      queryClient.setQueryData(["user"], user.user);
      toast.success("Successfully", {
        duration: 1000,
      });
    },
    onError: (err) => toast.error(err),
  });
  return { mutate, isSign };
}