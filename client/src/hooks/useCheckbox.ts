import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { handleUpdate } from "../services/my_api";
import { ListItem } from "../types/ListItem";

interface CheckedData {
  id: string;
  updateTask: Partial<ListItem>;
}

export const useCheckbox = () => {
  const queryClient = useQueryClient();

  // Generics <>: set Type
  const mutation = useMutation<void, Error, CheckedData>({
    mutationFn: async (checkedData: CheckedData) => {
      const { id, updateTask } = checkedData;

      // Return for a Promise, understand to wait for promise (async, await) before get to onSuccess step
      await handleUpdate(id, updateTask);
      return;
    },
    onSuccess: () => {
      // Refetch the list
      queryClient.invalidateQueries({ queryKey: ["list"] });
    },
    onError: () => {
      toast.error("Failed to checked task status", { theme: "dark" });
    },
  });

  return mutation;
};
