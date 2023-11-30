import {
  deleteObject,
  getDownloadURL,
  getStorage,
  ref,
  uploadBytes,
} from "firebase/storage";
import { app } from "./firebase";

const storage = getStorage(app);

export const uploadFile = async (filepath, file) => {
  const fileRef = ref(storage, filepath);
  await uploadBytes(fileRef, file);
  const url = await getDownloadURL(fileRef);
  return url;
};

export const deleteFile = async (filepath) => {
  const fileRef = ref(storage, filepath);
  await deleteObject(fileRef);
};
