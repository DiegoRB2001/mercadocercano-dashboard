import { useRouter } from "next/navigation";
import React from "react";

const Logo = () => {
  const router = useRouter();
  return (
    <img
      src="/assets/logo.png"
      alt="Mercado Cercano Logo"
      className="cursor-pointer"
      height={100}
      width={100}
      onClick={() => router.push("/")}
    />
  );
};

export default Logo;
