import { useQuery } from "@tanstack/react-query"
import { getUserProfile } from "./UserData"
import useUser from "./useUser";

function useProfile() {
    const {user} = useUser()
    const { data: profile, isLoading ,error } = useQuery({
      queryKey: ["profile" , user?.id],
      queryFn: () => getUserProfile(user.id),
      staleTime: 1000 * 60 * 5,
    });
    return { profile, isLoading  , error};
}

export default useProfile
