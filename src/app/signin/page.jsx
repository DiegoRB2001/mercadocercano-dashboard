"use client";

import { Button, Chip, Input } from "@nextui-org/react";
import { signIn } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

const SignInPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
    if (res.error) {
      setError(res.error);
    } else {
      router.push("/");
    }
  };

  return (
    <div className="flex min-h-screen flex-col justify-center items-center">
      <div className="w-1/3 flex flex-row justify-center">
        <Image
          priority
          width={200}
          height={200}
          style={{ width: "auto", height: "auto" }}
          src={"/assets/logo.png"}
          alt="Mercado Cercano Logo"
          className="justify-self-center self-center"
        />
        <form onSubmit={handleSubmit} className="flex flex-col gap-5 flex-1">
          <h1 className="text-center font-bold text-lg">Iniciar sesión</h1>
          {error && (
            <Chip color="danger" className="self-center">
              {error}
            </Chip>
          )}
          <Input
            type="email"
            variant="underlined"
            placeholder="Ingresa tu correo electrónico"
            onChange={(e) => {
              setEmail(e.target.value);
              setError(null);
            }}
          />
          <Input
            type="password"
            variant="underlined"
            placeholder="Ingresa contraseña"
            onChange={(e) => {
              setPassword(e.target.value);
              setError(null);
            }}
          />
          <Button
            type="submit"
            color="success"
            variant={!email || !password ? "flat" : "solid"}
            disabled={!email || !password}
          >
            Iniciar sesión
          </Button>
        </form>
      </div>
    </div>
  );
};

export default SignInPage;
