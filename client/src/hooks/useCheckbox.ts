import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { handleCheckboxChange } from "../services/my_api";

interface CheckedData {
  id: string;
  checked: boolean;
}

export const useCheckbox = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<void, Error, CheckedData>({
    mutationFn: async (checkedData: CheckedData) => {
      const { id, checked } = checkedData;

      // Return for a Promise, understand to wait for promise (async, await) before get to onSuccess step
      await handleCheckboxChange(id, checked);
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
