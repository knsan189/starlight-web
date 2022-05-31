import React from "react";
import { Direction, Droppable as ReactDroppable } from "react-beautiful-dnd";
import { DropType } from "../@types/types";

interface Props {
  children: React.ReactNode;
  droppableId: string;
  direction?: Direction;
  type?: DropType;
}

const Droppable = ({
  children,
  droppableId,
  direction = "horizontal",
  type,
}: Props) => {
  return (
    <ReactDroppable droppableId={droppableId} direction={direction} type={type}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.droppableProps}
          style={{
            display: "flex",
            flexDirection: direction === "vertical" ? "column" : "row",
            alignItems: direction === "vertical" ? "start" : undefined,
          }}
        >
          {children}
          {provided.placeholder}
        </div>
      )}
    </ReactDroppable>
  );
};

Droppable.defaultProps = {
  direction: "horizontal",
  type: undefined,
};

export default Droppable;
