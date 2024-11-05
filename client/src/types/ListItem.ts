export interface ListItem {
  id: string;
  title: string;
  description: string;
  date_input: string;
  deadline: string;
  order: number;
  checked: boolean;
}

// Interface for the overall response structure
export interface TaskResponse {
  result: ListItem[]; // The limited list of tasks
  page: number; // Current page number
  totalPages: number; // Total number of pages
  dataLength: number; // Data Length
}

export interface Task extends ListItem {} // Task could simply extend ListItem in this case
