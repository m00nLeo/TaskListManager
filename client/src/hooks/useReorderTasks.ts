import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { handleReorderTasks } from "../services/my_api";
import { ListItem } from "../types/ListItem";

export const useReorderTasks = () => {
  const queryClient = useQueryClient();

  // Generics <>: set Type
  const mutation = useMutation<void, Error, ListItem[]>({
    mutationFn: async (reorderedTasks: ListItem[]) => {
      // Call API to reorder tasks
      await handleReorderTasks(reorderedTasks);
    },
    onSuccess: () => {
      // Refetch the list to reflect the new order
      queryClient.invalidateQueries({ queryKey: ["list"] }); // Replace "list" with your query key if it's different

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
