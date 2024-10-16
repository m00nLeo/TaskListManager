import React from "react";
import { SortableContainer } from "react-sortable-hoc"; //`react-sortable-hoc` relies on findDOMNode so its will cause several warning
import SortableItem from "./SortableItem";

const SortableList = SortableContainer(
  ({ items, checkboxChangeMutation, deleteMutation }) => {
    // Order task by Order when drag and drop
    const sortedTasks = [...items].sort((a, b) => a.order - b.order);
    return (
      <div>
        {sortedTasks?.map((item, index) => (
          <SortableItem
            key={`item-${item.id}`}
            index={index}
            item={item}
            checkboxChangeMutation={checkboxChangeMutation}
            deleteMutation={deleteMutation}
          />
        ))}
      </div>
    );
  }
);

export default SortableList;
