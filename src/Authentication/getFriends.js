import { useQuery } from "@tanstack/react-query"
import { getFriends } from "./UserData";
import useUser from "./useUser";
function GetFriends() {
    const {user} = useUser()
    const { data, isLoading } = useQuery({
      queryKey: ["friends", user.id],
      queryFn: () => getFriends(user.id),
    });
    return {data, isLoading};
}

export default GetFriends
