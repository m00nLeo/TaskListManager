import axios from "axios";

// Create / Add list
export const addList = async (newList) => {
  const response = await axios.post("http://localhost:3000/add", newList);
  return response.data;
};

// Read / Fetch all List
export const fetchList = async (currentPage, pagePerSheet) => {
  const response = await axios.get(
    `http://localhost:3000?page=${currentPage}&page_per_sheet=${pagePerSheet}`
  );
  return response.data;
};

// Update task
export const handleUpdate = async (id, updateItem) => {
  const response = await axios.put(`http://localhost:3000/update/${id}`, updateItem);
  return response.data;
};

// Update checkbox
export const handleCheckboxChange = async (id, checked) => {
  const response = await axios.put(`http://localhost:3000/${id}`, { checked });
  return response.data;
};

// Update drag-and-drop
export const handleReorderTasks = async (reorderedList) => {
  const response = await axios.put("http://localhost:3000/", reorderedList);
  return response.data;
};

// Delete list
export const handleDelete = async (id) => {
  const response = await axios.delete(`http://localhost:3000/${id}`);
  return response.data;
};
