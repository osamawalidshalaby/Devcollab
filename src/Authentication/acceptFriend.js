import { useMutation } from "@tanstack/react-query"
import { acceptFriend } from "./UserData"
import toast from "react-hot-toast"

function AcceptFriend() {
    const {mutate : acceptFriendMutate , isPending : isAccepting} = useMutation({
        mutationFn : ({id}) => acceptFriend(id) , 
        onSuccess: () => {
            toast.success('Friend request accepted!')
        } ,
        onError: () => {
            toast.error('Error accepting friend request.')
        }
    })
    return {acceptFriendMutate , isAccepting}
}

export default AcceptFriend
