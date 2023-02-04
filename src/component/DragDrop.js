import React from "react";
import ImageCard from "./imageCard";
import { useContext } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { Context } from "../utility/context";

const DragDrop = () => {
  const { state, dispatch } = useContext(Context);
  const onMoveItems = (result) => {
    if(!result.destination) return;
    const newList = [...state.data];
    const [reorderedItem] = newList.splice(result.source.index, 1);
    newList.splice(result.destination.index, 0, reorderedItem);
    dispatch({ type: "reorder", payload: newList });
  };
  return (
    <DragDropContext onDragEnd={onMoveItems}>
      <Droppable droppableId="gallery">
        {(provided) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className="grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-5"
          >
            {state?.data?.map((item, idx) => (
              <Draggable key={item?.id} draggableId={item?.id + ""} index={idx}>
                {(provided) => (
                  <div
                    key={item?.id}
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    <ImageCard key={item?.id} src={item}  dispatch={dispatch}/>
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default DragDrop;
