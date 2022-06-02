import React from "react";
import { Draggable as ReactDraggable, DraggingStyle, NotDraggingStyle } from "react-beautiful-dnd";

interface Props {
  children: React.ReactNode;
  draggableId: string;
  index: number;
}

const getStyle = (
  isDragging: boolean,
  draggableStyle: DraggingStyle | NotDraggingStyle | undefined,
): React.CSSProperties => ({
  userSelect: "none",
  margin: `0 10px 10px 0`,

  ...draggableStyle,
});

const Draggable = ({ children, draggableId, index }: Props) => {
  return (
    <ReactDraggable draggableId={draggableId} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          style={getStyle(snapshot.isDragging, provided.draggableProps.style)}
        >
          {children}
        </div>
      )}
    </ReactDraggable>
  );
};

export default Draggable;
