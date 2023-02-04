import { createContext } from "react";
import {
  ERROR,
  FETCH,
  GET_GALLERY_LIST,
  REORDER,
  SUCCESS,
  UPLOAD_IMAGE,
} from "./actionTypes";

export const Context = createContext();
export const initialState = {
  loading: false,
  error: null,
  data: null,
};
export const reducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case FETCH: {
      return {
        ...state,
        loading: true,
      };
    }
    case SUCCESS: {
      return {
        ...state,
        loading: false,
      };
    }
    case ERROR: {
      return {
        ...state,
        loading: false,
        error: payload,
      };
    }
    case GET_GALLERY_LIST: {
      return {
        ...state,
        data: payload,
      };
    }
    case UPLOAD_IMAGE: {
      const newList = state?.data?.map((item) => {
        if (item?.id === payload?.data?.id) {
          item.URL = payload?.URL;
        }
        return item;
      });
      return {
        ...state,
        data: newList,
      };
    }
    case REORDER: {
      return {
        ...state,
        data: payload,
      };
    }
    default:
      return state;
  }
};
