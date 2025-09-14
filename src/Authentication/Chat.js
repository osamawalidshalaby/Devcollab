import { supabase } from "./Supabase";


export async function sendMessage(sessionId, userId, content) {
  const { data, error } = await supabase
    .from("messages")
    .insert([{ session_id: sessionId, user_id: userId, content }])
    .select(
      `
      id, content, created_at,
      user:profiles(id, username, avatar)
    `
    )
    .single();

  if (error) throw error;
  return data;
}

export async function getMessages(sessionId) {
  const { data, error } = await supabase
    .from("messages")
    .select(
      `
      id, content, created_at,
      user:profiles(id, username, avatar)
    `
    )
    .eq("session_id", sessionId)
    .order("created_at", { ascending: true });

  if (error){
    console.log(error)
  };
  return data;
}

export function subscribeMessages(sessionId, callback) {
  const channel = supabase
    .channel(`messages:${sessionId}`)
    .on(
      "postgres_changes",
      {
        event: "INSERT",
        schema: "public",
        table: "messages",
        filter: `session_id=eq.${sessionId}`,
      },
      async (payload) => {
        const newRow = payload.new;

        // هات البروفايل بتاع اليوزر
        const { data: profile } = await supabase
          .from("profiles")
          .select("id, username, avatar")
          .eq("id", newRow.user_id) // 👈 خليها user_id بدل sender_id
          .single();

        callback({
          id: newRow.id,
          content: newRow.content,
          created_at: newRow.created_at,
          user: {
            id: profile?.id || newRow.user_id,
            username: profile?.username || "Unknown",
            avatar: profile?.avatar || null,
          },
        });
      }
    )
    .subscribe();

  return channel;
}
