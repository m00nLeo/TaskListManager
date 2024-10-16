import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { handleCheckboxChange } from "../services/my_api";

export const useCheckbox = () => {
  const queryClient = useQueryClient();
  
  const mutation = useMutation({
    mutationFn: (checkedData) => {
      const { id, checked } = checkedData;

      // Return for a Promise, understand to wait for promise (async, await) before get to onSuccess step
      return handleCheckboxChange(id, checked);
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
