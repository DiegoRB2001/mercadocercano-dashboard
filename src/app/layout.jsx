import { Montserrat } from "next/font/google";
import "./globals.css";
import Providers from "@/app/providers";
import MainLayout from "@/components/MainLayout";

const montserrat = Montserrat({ subsets: ["latin"] });

export const metadata = {
  title: "Dashboard - Mercado Cercano",
  description: "Dashboard para administrar la aplicación móvil Mercado Cercano",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body className={montserrat.className}>
        <Providers>{<MainLayout>{children}</MainLayout>}</Providers>
      </body>
    </html>
  );
}
