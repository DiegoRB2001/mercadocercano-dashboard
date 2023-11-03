const { NextResponse } = require("next/server");
import { app } from "@/lib/firebase";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

const db = getFirestore(app);

export async function GET() {
  const session = await getServerSession(authOptions);
  if (session) {
    try {
      const markets = [];
      const querySnapshot = await getDocs(collection(db, "markets"));
      querySnapshot.forEach((doc) => markets.push(doc.data()));
      return NextResponse.json(markets);
    } catch (error) {
      if (error instanceof Error)
        return NextResponse.json(error.message, { status: 500 });
    }
  }
  return NextResponse.json("Debes estar logueado para acceder a estos datos.");
}
