import React from "react";
import { Draggable as ReactDraggable, DraggingStyle, NotDraggingStyle } from "react-beautiful-dnd";
import { DropType } from "../@types/types";

interface Props {
  children: React.ReactNode;
  draggableId: string;
  index: number;
  type?: DropType;
}

const getStyle = (
  isDragging: boolean,
  draggableStyle: DraggingStyle | NotDraggingStyle | undefined,
  type?: DropType,
): React.CSSProperties => ({
  userSelect: "none",
  margin: `0 10px 10px 0`,
  ...draggableStyle,
});

const Draggable = ({ children, draggableId, index, type }: Props) => {
  return (
    <ReactDraggable draggableId={draggableId} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          style={getStyle(snapshot.isDragging, provided.draggableProps.style, type)}
        >
          {children}
        </div>
      )}
    </ReactDraggable>
  );
};

Draggable.defaultProps = {
  type: undefined,
};

export default Draggable;
