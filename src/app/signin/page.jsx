"use client";

import { Button, Chip, Image, Input } from "@nextui-org/react";
import { signIn } from "next-auth/react";
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
      <div className="md:w-2/3 md:grid md:grid-cols-2 lg:w-1/2 lg:grid lg:grid-cols-2 w-5/6 flex flex-col justify-center items-center">
        <Image
          src={"/assets/logo.png"}
          alt="Mercado Cercano Logo"
          className="justify-self-center self-center"
        />
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-5 flex-1 w-full"
        >
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
