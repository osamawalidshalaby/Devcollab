import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { addTask, deleteTask, editTask, getTasks } from "./Tasks";
import toast from "react-hot-toast";
import { useEffect } from "react";
import { supabase } from "./Supabase";


export function useAddNewTask() {
  const queryClient = useQueryClient();
  const { mutate: addtask, isPending: isAdding } = useMutation({
    mutationFn: addTask,
    onSuccess: (_, variables) => {
      // variables لازم يكون فيها sessionId
      queryClient.invalidateQueries(["tasks", variables.sessionId]);
      toast.success(" Task added successfully");
    },
    onError: () => {
      toast.error(" Error adding task");
    },
  });
  return { addtask, isAdding };
}

export function useTasks(sessionId) {
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ["tasks", sessionId],
    queryFn: () => getTasks(sessionId),
    enabled: !!sessionId,
    staleTime: 0,
  });

  useEffect(() => {
    if (!sessionId) return;

    console.log("👂 Subscribing to tasks for session:", sessionId);

    const channel = supabase
      .channel(`tasks-session-${sessionId}`)
      .on(
        "postgres_changes",
        {
          event: "*", // INSERT, UPDATE, DELETE
          schema: "public",
          table: "tasks",
        },
        (payload) => {
          console.log("📌 Task change received:", payload);
          queryClient.invalidateQueries({ queryKey: ["tasks", sessionId] });
        }
      )
      .subscribe((status) => {
        console.log("🔌 Task channel status:", status);
      });

    return () => {
      supabase.removeChannel(channel);
    };
  }, [sessionId, queryClient]);

  return { data, isLoading };
}


export function useUpdateTask() {
  const queryClient = useQueryClient()
  const { mutate: updateTask, isPending: isUpdating } = useMutation({
    mutationFn: editTask,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries(["tasks" , variables.sessionId]);
      toast.success(" Task updated successfully");
    },
    onError: () => {
      toast.error(" Error Updating task");
    },
  });
  return { updateTask, isUpdating };
}


export function useDeleteTask(sessionId) {
  const queryClient = useQueryClient();
  const { mutate: DeleteTask, isPending: isDeleting } = useMutation({
    mutationFn: deleteTask,
    onSuccess: (_, variables) => {
      // تحديث الكاش يدوياً بدلاً من إعادة جلب البيانات
      queryClient.setQueryData(["tasks", sessionId], (oldData) => {
        return oldData
          ? oldData.filter((task) => task.id !== variables.id)
          : oldData;
      });
      toast.success("Task deleted successfully");
    },
    onError: (error) => {
      toast.error(`Error deleting task: ${error.message}`);
    },
  });
  return { DeleteTask, isDeleting };
}
