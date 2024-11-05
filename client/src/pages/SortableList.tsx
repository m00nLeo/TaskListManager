import { SortableContainer } from "react-sortable-hoc"; //`react-sortable-hoc` relies on findDOMNode so its will cause several warning
import SortableItem from "./SortableItem";
import { ListItem } from "../types/ListItem";

interface SortableListProps {
  items: ListItem[];
  currentPage: number;
}

const SortableList = SortableContainer<SortableListProps>(
  ({ items, currentPage }: SortableListProps) => {
    // Order task by 'order' field for proper drag and drop
    const sortedTasks = [...items].sort((a, b) => a.order - b.order);
    return (
      <div>
        {sortedTasks?.map((value, index) => (
          <SortableItem
            key={`item-${value.id}`}
            index={index}
            value={value}
            currentPage={currentPage}
          />
        ))}
      </div>
    );
  }
);

export default SortableList;
