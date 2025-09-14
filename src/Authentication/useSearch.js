import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { searchUser } from "./UserData";
import { getSessionMembers, inviteMember } from "./sessions";
import toast from "react-hot-toast";

function useSearch(query, userId) {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["searchUser"],
    queryFn: () => searchUser(query, userId),
    enabled: false,
    staleTime: 0,
  });
  return { data, isLoading, error, refetch };
}

export default useSearch;

export function InviteNewMemeber() {
  const queryClient = useQueryClient();
  const { mutate: invite, isPending: isInvite } = useMutation({
    mutationFn: ({ sessionId, userId }) => inviteMember(sessionId, userId),
    onSuccess: () => {
      // Invalidate all relevant queries to refresh data
      queryClient.invalidateQueries(["session_members"]);
      queryClient.invalidateQueries(["sessions"]);
      queryClient.invalidateQueries(["session"]);
      toast.success("Member invited successfully");
    },
    onError: (err) => toast.error(err.message || "Invitation Failed"),
  });
  return { invite, isInvite };
}

export function SessionMembers(sessionId) {
  const queryClient = useQueryClient();
  const { data : members, isLoading , error } = useQuery({
    queryKey: ["session_members", sessionId],
    queryFn: () => getSessionMembers(sessionId),
    onSuccess: () => {
      queryClient.invalidateQueries(["session_members"]);
    },
    onError: () => {
      toast.error("Cant Load The Team");
    },
  });
  return { members, isLoading, error };
}
