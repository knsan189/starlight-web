import React from "react";
import { Direction, Droppable as ReactDroppable } from "react-beautiful-dnd";

interface Props {
  children: React.ReactNode;
  droppableId: string;
  direction?: Direction;
  type?: "user" | "party";
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
            flexDirection: type === "party" ? "column" : "row",
            alignItems: type === "party" ? "start" : undefined,
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
