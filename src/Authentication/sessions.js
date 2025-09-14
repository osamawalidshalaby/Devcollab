import { supabase } from "./Supabase";

export async function createSession({ name, description, color, ownerId }) {
  // 1️⃣ Insert into sessions
  const { data: session, error: sessionError } = await supabase
    .from("sessions")
    .insert([
      {
        name,
        description,
        color,
        owner_id: ownerId,
      },
    ])
    .select()
    .single();

  if (sessionError) throw sessionError;

  // 2️⃣ Add owner to session_members
  const { error: memberError } = await supabase.from("session_members").insert([
    {
      session_id: session.id,
      user_id: ownerId,
      role: "owner",
    },
  ]);

  if (memberError) throw memberError;

  return session;
}



// userId = الـ id بتاع اليوزر الحالي
export async function getSessions(userId) {
  const { data, error } = await supabase
    .from("session_members")
    .select(
      `
    session_id,
    sessions (
      id,
      name,
      description,
      color,
      created_at,
      owner_id,
      owner:profiles ( id, username, avatar ),
      session_members ( id )
    )
  `
    )
    .eq("user_id", userId);

  if (error) console.error(error);

  const sessions = data.map((item) => ({
    ...item.sessions,
    session_id: item.session_id,
    members_count: item.sessions.session_members.length,
  }));

  return sessions;
}



export async function getSessionMembers(sessionId) {
  const { data, error } = await supabase
    .from("session_members")
    .select(
      `
      id,
      role,
      user_id,
      profiles (
        id,
        username,
        avatar
      )
    `
    )
    .eq("session_id", sessionId);

  if (error) throw error;
  return data;
}


export async function inviteMember(sessionId, userId) {
  // ✅ تحقق الأول هل العضو موجود بالفعل
  const { data: existing, error: checkError } = await supabase
    .from("session_members")
    .select("id")
    .eq("session_id", sessionId)
    .eq("user_id", userId)
    .maybeSingle();

  if (checkError) {
    console.error(checkError);
    throw new Error("Error checking existing member");
  }

  if (existing) {
    throw new Error("User is already a member of this session");
  }

  // ✅ لو مش موجود ضيفه
  const { data, error } = await supabase
    .from("session_members")
    .insert([
      {
        session_id: sessionId,
        user_id: userId,
        role: "member",
      },
    ])
    .select(
      `
      id,
      role,
      joined_at,
      profiles (
        id,
        username,
        avatar
      )
    `
    )
    .single();

  if (error) {
    console.error(error);
    throw new Error(error.message);
  }

  return data;
}



export async function getSession(sessionId) {
  const { data, error } = await supabase
    .from("sessions")
    .select(
      `
      id,
      name,
      description,
      color,
      created_at,
      owner_id,
      profiles (id, username, avatar),
      session_members (id),
      tasks (
        id, title, description, status, priority, created_at,
        created_by,
        profiles (id, username, avatar)
      )
    `
    )
    .eq("id", sessionId)
    .single();

  if (error) {
    console.log(error);
    throw new Error(error.message);
  }

  return {
    ...data,
    members_count: data.session_members.length,
    tasks: data.tasks || [],
  };
}


