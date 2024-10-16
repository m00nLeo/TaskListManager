import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { handleReorderTasks } from "../services/my_api";

export const useReorderTasks = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: handleReorderTasks,
    onSuccess: () => {
      // Refetch the list to reflect the new order
      queryClient.invalidateQueries("list"); // Replace "list" with your query key if it's different

      toast.success("List order updated successfully", {
        theme: "light",
      });
    },
    onError: () => {
      toast.error("Failed to update list order. Please try again.", {
        theme: "dark",
      });
    },
  });

  return mutation;
};
