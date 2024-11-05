import axios from "axios";
import { ListItem, TaskResponse } from "../types/ListItem";

// Get baseUrl form env
const baseUrl = import.meta.env.VITE_API_KEY;

// Create / Add list
export const addList = async (newList: ListItem): Promise<ListItem> => {
  const response = await axios.post(`${baseUrl}/add`, newList);
  return response.data;
};

// Read / Fetch all List
export const fetchList = async (
  currentPage?: number,
  pagePerSheet?: number
): Promise<TaskResponse> => {
  const response = await axios.get(
    `${baseUrl}?page=${currentPage}&page_per_sheet=${pagePerSheet}`
  );
  return response.data;
};

// Update (patch <-> only notice and update the one changed) task and checkbox
export const handleUpdate = async (
  id: string,
  updateItem: Partial<ListItem>
): Promise<ListItem> => {
  const response = await axios.patch(`${baseUrl}/update/${id}`, updateItem);
  return response.data;
};

// Update drag-and-drop
export const handleReorderTasks = async (
  reorderedList: ListItem[]
): Promise<ListItem[]> => {
  const response = await axios.put(`${baseUrl}/`, reorderedList);
  return response.data;
};

// Delete list
export const handleDelete = async (id: string): Promise<VoidFunction> => {
  const response = await axios.delete(`${baseUrl}/delete/${id}`);
  return response.data;
};
