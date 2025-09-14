import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { createSession, getSession, getSessions } from "./sessions"
import toast from "react-hot-toast"
import useUser from "./useUser"
import { use, useEffect } from "react"
import { supabase } from "./Supabase"



export function AddSession() {
    const queryClient = useQueryClient();
    const {mutate: addSession , isPending : isAdding} = useMutation({
        mutationFn: createSession,
        onSuccess: (data) => {
            queryClient.setQueryData(['sessions'], (oldData) => {
                return [...(oldData || []), data];
            });
            queryClient.invalidateQueries(['sessions'])
            toast.success("Session created successfully")
        },
        onError: (error) => {
            toast.error(error.message)
        }
    })
    return {addSession, isAdding}
}

// export function useSessions() {
//     const {user} = useUser()
//     const{data : sessions , isLoading} = useQuery({
//         queryKey: ['sessions'],
//         queryFn: () => getSessions(user.id),
//         staleTime : 0,
//     })
//     return {sessions, isLoading}
// }


export function useSessions() {
  const { user } = useUser();
  const queryClient = useQueryClient();

  // 1. Fetch sessions once
  const {
    data: sessions,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["sessions", user?.id],
    queryFn: () => getSessions(user.id),
    enabled: !!user?.id,
  });

  // 2. Subscribe to invites realtime
  useEffect(() => {
    if (!user?.id) return;

    console.log("👂 Subscribing to invites for user:", user.id);

    const channel = supabase
      .channel("session-members-listener")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "session_members",
        },
        (payload) => {
          console.log("📩 Invite received:", payload.new);

          // invalidate → يعيد جلب الـ sessions
          queryClient.invalidateQueries({ queryKey: ["sessions", user.id] });
        }
      )
      .subscribe((status) => {
        console.log("🔌 Channel status:", status);
      });

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user?.id, queryClient]);

  return { sessions, isLoading, error };
}




export function GetSession(sessionId){
    const {data : session , isLoading : sessionLoad , error: sessionErrror} = useQuery({
        queryKey : ['session' , sessionId] , 
        queryFn : () => getSession(sessionId) , 
        staleTime : 0 ,
    })
    return { session, sessionLoad, sessionErrror };

}