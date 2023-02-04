import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyBswqAwJ__4-3fy1tgq2VMkI2dtEiMKR48",
  authDomain: "publive-gallery.firebaseapp.com",
  databaseURL: "https://publive-gallery-default-rtdb.firebaseio.com",
  projectId: "publive-gallery",
  storageBucket: "publive-gallery.appspot.com",
  messagingSenderId: "806666853748",
  appId: "1:806666853748:web:a7a232a67a4abdd7c0e021",
};

const app = getApps.length > 0 ? getApp() : initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

export { app, db, storage };
