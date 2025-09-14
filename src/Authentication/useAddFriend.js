import { useMutation } from "@tanstack/react-query"
import { addFriend } from "./UserData"
import toast from "react-hot-toast"


function useAddFriend() {
    const { mutate: addFriendMutate, isPending: isAdding } = useMutation({
      mutationFn: ({ userId, friendId }) => addFriend( userId, friendId ),
      onSuccess: () => {
        toast.success("Friend request sent");
      },
      onError: (error) => {
        console.log(error);
      },
    });
    return {addFriendMutate , isAdding}
}

export default useAddFriend
