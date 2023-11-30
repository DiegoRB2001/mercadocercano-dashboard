import { app } from "@/lib/firebase/firebase";
import {
  getFirestore,
  collection,
  addDoc,
  updateDoc,
  doc,
  GeoPoint,
  getDocs,
  getDoc,
  deleteDoc,
} from "firebase/firestore";
import { uploadFile } from "./storage";

const db = getFirestore(app);

export const addMarket = async (data) => {
  try {
    const {
      name,
      products,
      description,
      address,
      geolocation: { latitude, longitude },
      schedule,
      phone,
      location,
      cover,
      images,
    } = data;
    const docRef = await addDoc(collection(db, "markets"), {
      products,
      name,
      description,
      address,
      geolocation: new GeoPoint(latitude, longitude),
      schedule,
      phone,
      location,
    });
    const coverURL = await uploadFile(
      `images/markets/${docRef.id}/cover.jpg`,
      cover[0]
    );
    const imagesURL = await Promise.all(
      images.map(async (image) => {
        const imageUrl = await uploadFile(
          `images/markets/${docRef.id}/image_${image.name}`,
          image
        );
        return imageUrl;
      })
    );
    await updateMarket(docRef.id, {
      cover: coverURL,
      images: imagesURL,
    });
  } catch (error) {
    if (error instanceof Error) throw new Error(error.message);
  }
};

export const updateMarket = async (id, data) => {
  await updateDoc(doc(db, "markets", id), data);
};

export const getMarkets = async () => {
  try {
    const markets = [];
    const querySnapshot = await getDocs(collection(db, "markets"));
    querySnapshot.forEach((doc) => markets.push(doc));
    return markets;
  } catch (error) {
    if (error instanceof Error) throw new Error(error.message);
  }
};

export const getMarket = async (id) => {
  try {
    const market = await getDoc(doc(db, "markets", id));
    return market;
  } catch (error) {
    if (error instanceof Error) throw new Error(error.message);
  }
};

export const deleteMarket = async (id) => {
  try {
    await deleteDoc(doc(db, "markets", id));
  } catch (error) {
    if (error instanceof Error) throw new Error(error.message);
  }
};
