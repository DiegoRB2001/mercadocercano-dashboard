import { app } from "@/lib/firebase/firebase";
import {
  getFirestore,
  collection,
  addDoc,
  updateDoc,
  doc,
} from "firebase/firestore";
import { uploadFile } from "./storage";

const db = getFirestore(app);

export const uploadMarket = async (data) => {
  try {
    const docRef = await addDoc(collection(db, "markets"), {
      products: data.products,
      name: data.name,
      description: data.description,
      address: data.address,
      geolocation: data.geolocation,
      schedule: data.schedule,
      phone: data.phone,
      location: data.location,
    });
    const coverURL = await uploadFile(
      `images/${docRef.id}/cover.jpg`,
      data.cover[0]
    );
    const imagesURL = await Promise.all(
      data.images.map(async (image, index) => {
        const imageUrl = await uploadFile(
          `images/${docRef.id}/${index + 1}.jpg`,
          image
        );
        return imageUrl;
      })
    );
    await updateDoc(doc(db, "markets", docRef.id), {
      cover: coverURL,
      images: imagesURL,
    }).then((snapshot) => {});
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
    }
  }
};
