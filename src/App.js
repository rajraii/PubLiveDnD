import "./App.css";
import { AiOutlineUser } from "react-icons/ai";
import { useEffect, useReducer } from "react";
import DragDrop from "./component/DragDrop";
import { Context, initialState, reducer } from "./utility/context";
import { getGallery } from "./utility/actions";
import Loader from "./component/Loader";

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  useEffect(() => {
    getGallery(dispatch);
  }, []);
  return (
    <div className="w-full p-4 ">
      <header className="w-full mb-5 text-slate-800 text-lg flex justify-between">
        PubLive Gallery
        <span className="rounded-full border h-8 w-8 flex justify-center items-center bg-orange-400 text-white drop-shadow-md">
          <AiOutlineUser />
        </span>
      </header>
      <Context.Provider value={{ state: state, dispatch: dispatch }}>
        {state?.data ? (
          <DragDrop />
        ) : (
          <div className="fixed top-0 left-0 h-screen w-full">
            <Loader />
          </div>
        )}
      </Context.Provider>
    </div>
  );
}

export default App;
