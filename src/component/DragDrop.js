import React, { useEffect, useState } from "react";
import ImageCard from "./imageCard";
import { useContext } from "react";
import { Context } from "../utility/context";
import {
  GridContextProvider,
  GridDropZone,
  GridItem,
  swap,
} from "react-grid-dnd";

const DragDrop = () => {
  const { state, dispatch } = useContext(Context);

  const onChange = (sourceId, sourceIndex, targetIndex) => {
    console.log(sourceIndex, targetIndex)
    const newState = swap(state?.data, sourceIndex, targetIndex);
    dispatch({ type: "reorder", payload: newState });
  };

  const getColumns = () => {
    const width = window.innerWidth;
    if (width >= 980) return 5;
    else if (width >= 768) return 4;
    else if (width >= 500) return 3;
    return 2;
  };
  const [columns, setColumns] = useState(getColumns);

  useEffect(() => {
    const getColPerWidth = () => {
      setColumns(getColumns());
    };
    const mqlTabColumns = () => {
      setColumns(2);
    };
    const mqlDesktopColumns = () => {
      setColumns(5);
    };

    const mqlTab = window.matchMedia("(max-width: 500px)");
    const mqlDesktop = window.matchMedia("(min-width: 98px)");

    mqlTab.addEventListener("change", mqlTabColumns);
    mqlDesktop.addEventListener("change", mqlDesktopColumns);
    window.addEventListener("resize", getColPerWidth);

    return () => {
      window.removeEventListener("resize", getColPerWidth);
      mqlTab.removeEventListener("change", mqlTabColumns);
      mqlDesktop.removeEventListener("change", mqlDesktopColumns);
    };
  }, []);
  return (
    <GridContextProvider onChange={onChange}>
      <GridDropZone
        boxesPerRow={columns}
        rowHeight={240}
        style={{ height: 240 * Math.ceil(state?.data.length / columns) }}
      >
        {state?.data?.map((item, idx) => (
          <GridItem key={item?.id}>
            <div className="m-2">
              <ImageCard src={item} dispatch={dispatch} />
            </div>
          </GridItem>
        ))}
      </GridDropZone>
    </GridContextProvider>
  );
};

export default DragDrop;
