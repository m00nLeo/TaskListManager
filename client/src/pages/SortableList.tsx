import { SortableContainer } from "react-sortable-hoc"; //`react-sortable-hoc` relies on findDOMNode so its will cause several warning
import SortableItem from "./SortableItem";
import { ListItem } from "../types/ListItem";

interface SortableListProps {
  items: ListItem[];
  checkboxChangeMutation: (data: { id: string; checked: boolean }) => void;
  deleteMutation: (id: string) => void;
  currentPage: number
  deleteSuccess: boolean
}

const SortableList = SortableContainer<SortableListProps>(
  ({ items, checkboxChangeMutation, deleteMutation, deleteSuccess,currentPage }: SortableListProps) => {
    // Order task by 'order' field for proper drag and drop
    const sortedTasks = [...items].sort((a, b) => a.order - b.order);
    return (
      <div>
        {sortedTasks?.map((value, index) => (
          <SortableItem
            key={`item-${value.id}`}
            index={index}
            value={value}
            checkboxChangeMutation={checkboxChangeMutation}
            deleteMutation={deleteMutation}
            deleteSuccess={deleteSuccess}
            currentPage={currentPage}
          />
        ))}
      </div>
    );
  }
);

export default SortableList;
