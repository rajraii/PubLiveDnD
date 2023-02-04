import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { onImageUpload } from "../utility/actions";

const DropZone = ({ dispatch, data }) => {
  const onDrop = useCallback(
    (acceptedFiles) => {
      onImageUpload(dispatch, acceptedFiles?.[0], data);
    },
    [data, dispatch]
  );
  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragReject,
    isDragAccept,
  } = useDropzone({
    onDrop,
    multiple: false,
    accept: {
      "image/png": [".png"],
      "image/jpg": [".jpg"],
      "image/jpeg": [".jpeg"],
    },
  });

  return (
    <div
      {...getRootProps({ className: "dropzone" })}
      className="h-[220px] p-2 text-sm text-slate-500 cursor-pointer"
    >
      <input {...getInputProps()} />
      <div
        className={
          "border-2 border-dashed text-center text-xs w-full h-full flex justify-center items-center p-2 rounded-md " +
          (isDragReject === true ? "border-red-500 " : "") +
          (isDragAccept === true ? "border-green-500 " : "")
        }
      >
        {isDragReject ? (
          <div>
            <p>Sorry we only accept Image as of now!</p>
            <p>
              Stay tuned for upcoming updates we might just listen to your wish
              😉
            </p>
          </div>
        ) : (
          <>
            {isDragActive ? (
              <p>Drop the files here!</p>
            ) : (
              <div>
                <p>Drag 'n' drop some files here, or click to select files</p>
                <button className="drop-shadow-md rounded-md bg-purple-500 p-1 text-white mt-1 px-2">
                  Upload
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default DropZone;
