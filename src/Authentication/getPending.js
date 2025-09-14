import { useQuery } from "@tanstack/react-query"
import { getFriendRequests } from "./UserData"
import useUser from "./useUser"

function GetPending() {
    const {user} = useUser()
    const {data : pendingFriends , isLoading : isLoadingPending} = useQuery({
        queryKey: ['pendingFriends'],
        queryFn: () => getFriendRequests(user.id) ,
        staleTime : 0,
    })
    return {pendingFriends , isLoadingPending}
}

export default GetPending;
