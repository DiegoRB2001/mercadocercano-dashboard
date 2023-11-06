import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { app } from "./firebase";

const storage = getStorage(app);

export const uploadFile = async (filepath, file) => {
  const coverRef = ref(storage, filepath);
  await uploadBytes(coverRef, file);
  const url = await getDownloadURL(coverRef);
  return url;
};
