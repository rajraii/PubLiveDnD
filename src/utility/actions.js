import { collection, doc, getDocs, updateDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { db, storage } from "../firebase.config";
import {
  ERROR,
  FETCH,
  GET_GALLERY_LIST,
  SUCCESS,
  UPLOAD_IMAGE,
} from "./actionTypes";

const galleryCollectionRef = collection(db, "gallery");

export const getGallery = async (dispatch) => {
  try {
    dispatch({ type: FETCH });
    const snapShot = await getDocs(galleryCollectionRef);
    const list = [];
    snapShot.forEach((item) => {
      const data = item.data();
      const doc = {
        id: item.id,
        URL: data?.URL ? data?.URL : null,
      };
      list.push(doc);
    });
    dispatch({ type: SUCCESS });
    dispatch({ type: GET_GALLERY_LIST, payload: list });
  } catch (err) {
    dispatch({ type: ERROR, payload: err });
    console.log(err);
  }
};

export const onUpdateImageCard = async (dispatch, data, URL) => {
  dispatch({ type: FETCH });
  const imageDoc = doc(db, "gallery", data?.id);
  const newURL = { URL: URL };
  await updateDoc(imageDoc, newURL)
    .then(() => {
      dispatch({ type: SUCCESS });
      dispatch({ type: UPLOAD_IMAGE, payload: { data: data, URL: URL } });
    })
    .catch((err) => {
      dispatch({ type: ERROR });
      console.log(err);
    });
};

export const onImageUpload = async (dispatch, file, data) => {
  if (!file) {
    alert("Please upload an image first!");
  }
  dispatch({ type: FETCH });
  const storageRef = ref(
    storage,
    `/Images/${file.name + new Date().toDateString()}`
  );
  await uploadBytes(storageRef, file)
    .then((snapshot) => {
      dispatch({ type: SUCCESS });
      getDownloadURL(snapshot.ref).then((downloadURL) => {
        dispatch({ type: SUCCESS });
        onUpdateImageCard(dispatch, data, downloadURL);
      });
    })
    .catch((err) => {
      dispatch({ type: ERROR });
      console.log(err);
    });
};
