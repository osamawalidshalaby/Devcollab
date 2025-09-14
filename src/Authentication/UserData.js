// src/auth/getUser.js
import { supabase } from "./Supabase";

export async function getUserProfile(userId) {
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", userId)
    .single();

  if (error) {
    console.log(error)
    throw error;
  };
  return data;
}


// export async function searchUser(randomId , userId) {
//   if(randomId === userId) return null;
//   const { data, error } = await supabase
//     .from("profiles")
//     .select("id, username, random_id, avatar")
//     .eq("random_id", randomId)
//     .single();

//   if (error) throw new Error("User not found");

//   return {
//     id: data.id,
//     username: data.username,
//     random_id: data.random_id,
//     avatar: data.avatar,
//   };
// }


export async function searchUser(query, userId) {
  if (!query) return null;

  // 🟢 نشيل أي مسافات قبل/بعد
  const cleanQuery = query.trim();

  if (!cleanQuery) return null; // لو طلع كله مسافات

  const { data, error } = await supabase
    .from("profiles")
    .select("id, username, random_id, avatar")
    .or(`random_id.eq.${cleanQuery},username.eq.${cleanQuery}`)
    .neq("id", userId) // 👈 علشان ما يرجعش نفس اليوزر اللي بيبحث
    .single();

  if (error) {
    console.log(error);
    throw new Error("User not found");
  }

  return {
    id: data.id,
    username: data.username,
    random_id: data.random_id,
    avatar: data.avatar,
  };
}


export async function addFriend(userId, friendId) {
  const { data, error } = await supabase
    .from("friends")
    .insert([
      {
        user_id: userId,
        friend_id: friendId,
        status: "pending",
      },
    ])
    .select();

  if (error) throw error;
  return data[0];
}

export async function getFriendRequests(userId) {
  const { data, error } = await supabase
    .from("friends")
    .select(
      `
      id,
      status,
      created_at,
      user:profiles!friends_user_id_fkey (id, username, random_id, avatar),
      friend:profiles!friends_friend_id_fkey (id, username, random_id, avatar)
    `
    )
    .eq("friend_id", userId) // جايالي request
    .eq("status", "pending");

  if (error) {
    console.log(error)
  };

  return data.map((f) => ({
    id: f.id,
    status: f.status,
    created_at: f.created_at,
    from: {
      id: f.user.id,
      username: f.user.username,
      random_id: f.user.random_id,
      avatar: f.user.avatar,
    },
  }));
}


export async function acceptFriend(id) {
  const { data, error } = await supabase
    .from("friends")
    .update({ status: "accepted" })
    .eq("id", id)
    .select();

  if (error) throw error;
  return data[0];
}

export async function getFriends(userId) {
  const { data, error } = await supabase
    .from("friends")
    .select(
      `
      id,
      status,
      created_at,
      user:profiles!friends_user_id_fkey (id, username, random_id, avatar),
      friend:profiles!friends_friend_id_fkey (id, username, random_id, avatar)
    `
    )
    .or(`user_id.eq.${userId},friend_id.eq.${userId}`)
    .eq("status", "accepted"); // ✅ هات الأصدقاء بس

  if (error) throw error;

  return data.map((f) => {
    // مين الطرف التاني غيري؟
    const other = f.user.id === userId ? f.friend : f.user;

    return {
      id: f.id, // id بتاع جدول friends
      created_at: f.created_at,
      friend: {
        id: other.id,
        username: other.username,
        random_id: other.random_id,
        avatar: other.avatar,
      },
    };
  });
}
