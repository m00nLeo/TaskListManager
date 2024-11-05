import { useMutation, useQueryClient } from "@tanstack/react-query";
import { handleDelete } from "../services/my_api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const useDelete = ({
  currentPage,
  resultLength,
}: {
  currentPage: number;
  resultLength: number;
}) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: handleDelete,
    onSuccess: async () => {
      // Consider avoiding reloading if unnecessary
      try {
        // Invalidate the query cache to refetch data
        await queryClient.invalidateQueries({ queryKey: ["list"] });

        // Navigate to the previous page if the last item on the page was deleted
        if (resultLength <= 1 && currentPage > 1) {
          navigate(`/page/${currentPage - 1}`, {
            state: { deleteSuccess: true },
          });
          
          queryClient.invalidateQueries({ queryKey: ["list"] });

          window.location.replace(`/page/${currentPage - 1}`);
        } else {
          // If still more items on the page, refetch data
          await queryClient.invalidateQueries({ queryKey: ["list"] });

          // Show success toast after invalidating the cache
          toast.success("Task deleted successfully", { theme: "light" });
        }
      } catch (error) {
        console.error("Error handling deletion:", error);
      }
    },
    onError: () => {
      toast.error("Failed to update task status", { theme: "dark" });
    },
  });
  
  return mutation;
};
