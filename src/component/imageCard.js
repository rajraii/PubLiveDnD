import React, { useState } from "react";
import { AiTwotoneDelete } from "react-icons/ai";
import { onUpdateImageCard } from "../utility/actions";
import DropZone from "./DropZone";

const ImageCard = ({ src, dispatch }) => {
  const [hover, setHover] = useState(false);
  const toggleHover = () => {
    setHover(!hover);
  };
  const handleDelete =() => {
    onUpdateImageCard(dispatch, src, null)
  }
  return (
    <>
      {src?.URL ? (
        <div
          className="rounded-md overflow-hdden hover:scale-2 drop-shadow-xl relative bg-primary hover:drop-shadow-lg h-[220px]"
          onMouseEnter={toggleHover}
          onMouseLeave={toggleHover}
        >
          <img
            onDragStart={(e) => {e.preventDefault()}} 
            src={src?.URL}
            alt=""
            className={` w-full h-full object-contain`}
          />
          {hover ? (
            <span onClick={handleDelete} className="text-black absolute top-0 right-0 p-2 cursor-pointer">
                <AiTwotoneDelete/>
            </span>
          ) : null}
        </div>
      ) : (
        <DropZone data={src} dispatch={dispatch} />
      )}
    </>
  );
};

export default ImageCard;
