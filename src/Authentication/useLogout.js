import { useMutation, useQueryClient } from "@tanstack/react-query"
import { authWithGoogle, SignOut } from "./LoginServices"
import toast from "react-hot-toast"
import { useNavigate } from "react-router-dom"


function useLogout() {
    const navigate = useNavigate()
    const queryClient = useQueryClient()
    const {mutate : Logout , isPending : isLogout} = useMutation({
        mutationFn : SignOut ,
        onSuccess : () => {
            toast.success('Successfully Loged Out')
            queryClient.removeQueries()
            navigate('/landing' , {replace : true})
        },
        onError : (err) => toast.error(err.message)
    })
    return {Logout , isLogout}
}

export default useLogout



