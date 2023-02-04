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
          className="rounded-md overflow-hidden hover:scale-2 drop-shadow-xl relative bg-primary hover:drop-shadow-lg h-[220px]"
          onMouseEnter={toggleHover}
          onMouseLeave={toggleHover}
        >
          <img
            src={src?.URL}
            alt=""
            className={` w-full h-full object-contain`}
          />
          {hover ? (
            <span className="text-white absolute top-0 left-0 w-full h-full bg-purple-400 opacity-70 p-8">
              <div onClick={handleDelete} className="border-2 border-white w-full h-full flex justify-center items-center text-xl">
                <AiTwotoneDelete />
              </div>
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
