import axios from "axios";
import { ListItem, TaskResponse } from "../types/ListItem";

// Create / Add list
export const addList = async (newList: ListItem): Promise<ListItem> => {
  const response = await axios.post("http://localhost:3001/add", newList);
  return response.data;
};

// Read / Fetch all List
export const fetchList = async (
  currentPage?: number,
  pagePerSheet?: number
): Promise<TaskResponse> => {
  const response = await axios.get(
    `http://localhost:3001?page=${currentPage}&page_per_sheet=${pagePerSheet}`
  );
  return response.data;
};

// Update task
export const handleUpdate = async (
  id: string,
  updateItem: Partial<ListItem>
): Promise<ListItem> => {
  const response = await axios.put(
    `http://localhost:3001/update/${id}`,
    updateItem
  );
  return response.data;
};

// Update checkbox
export const handleCheckboxChange = async (
  id: string,
  checked: boolean
): Promise<ListItem> => {
  const response = await axios.put(`http://localhost:3001/${id}`, { checked });
  return response.data;
};

// Update drag-and-drop
export const handleReorderTasks = async (
  reorderedList: ListItem[]
): Promise<ListItem[]> => {
  const response = await axios.put("http://localhost:3001/", reorderedList);
  return response.data;
};

// Delete list
export const handleDelete = async (id: string): Promise<VoidFunction> => {
  const response = await axios.delete(`http://localhost:3001/${id}`);
  return response.data;
};
