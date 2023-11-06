import { auth } from "@/lib/firebase/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
  pages: {
    signIn: "/signin",
  },
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        return await signInWithEmailAndPassword(
          auth,
          credentials.email || "",
          credentials.password || ""
        )
          .then((userCredential) => {
            if (userCredential.user) {
              return userCredential.user;
            } else {
              throw new Error("Usuario o contraseña incorrectos");
            }
          })
          .catch((error) => {
            if (error.code == "auth/invalid-login-credentials") {
              throw new Error("Correo o contraseña incorrectos");
            }
            throw new Error("Ha ocurrido un error");
          });
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
