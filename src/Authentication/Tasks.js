
import { supabase } from "./Supabase";

// ✅ Add Task
export async function addTask({
  sessionId,
  userId,
  title,
  description,
  status,
  priority = "low",
}) {
  const { data, error } = await supabase
    .from("tasks")
    .insert([
      {
        session_id: sessionId,
        created_by: userId,
        title,
        description,
        status,
        priority,
      },
    ])
    .select()
    .single();

  if (error) {
    console.log(error);
    throw new Error(error.message);
  }
  return data;
}



// ✅ Get Tasks (for a session)
export async function getTasks(sessionId) {
  const { data, error } = await supabase
    .from("tasks")
    .select(
      `
      id, title, description, status, priority, created_at,
      created_by,
      profiles (
        username, avatar
      )
    `
    )
    .eq("session_id", sessionId)
    .order("created_at", { ascending: true });

  if (error) {
    console.log(error)
  };
  return data;
}


export async function editTask({ id, title, description, status, priority }) {
  const { data, error } = await supabase
    .from("tasks")
    .update({
      title,
      description,
      status,
      priority,
    })
    .eq("id", id)
    .select()
    .single();

  if (error) throw new Error(error.message);
  return data;
}

// delete task by id
export async function deleteTask({ id }) {
  console.log("Deleting task with ID:", id);

  const { error } = await supabase.from("tasks").delete().eq("id", id);

  if (error) {
    console.error("Supabase delete error:", error);
    throw new Error(error.message);
  }

  console.log("Task deleted successfully from database");
  return true;
}
