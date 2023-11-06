const { NextResponse } = require("next/server");
import { app } from "@/lib/firebase/firebase";
import { getFirestore, getDoc, doc } from "firebase/firestore";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";

const db = getFirestore(app);

export async function GET(req, { params: { id } }) {
  const session = await getServerSession(authOptions);
  if (session) {
    try {
      const querySnapshot = await getDoc(doc(db, "markets", id));
      const market = querySnapshot.data();
      return NextResponse.json(market);
    } catch (error) {
      if (error instanceof Error)
        return NextResponse.json(error.message, { status: 500 });
    }
  }
  return NextResponse.json("Debes estar logueado para acceder a estos datos.");
}
