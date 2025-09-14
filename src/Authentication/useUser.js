import { useQuery } from "@tanstack/react-query";
import { getaUser } from "./LoginServices";


function useUser() {
  const { data: user, isLoading } = useQuery({
    queryKey: ["user"],
    queryFn: getaUser,
    staleTime: 1000 * 60 * 5,
    cacheTime: 1000 * 60 * 10,
  });
  return { user, isLoading, isAuthenticated: user?.role === "authenticated" };
}

export default useUser;


