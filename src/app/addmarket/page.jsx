"use client";

import MainLayout from "@/components/MainLayout";
import Map from "@/components/Map";
import { Button, Input, Select, SelectItem, Textarea } from "@nextui-org/react";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

const AddMarketPage = () => {
  useSession({
    required: true,
    onUnauthenticated() {
      redirect("/signin");
    },
  });
  return (
    <div className="h-screen flex flex-col">
      <MainLayout>
        <div className=" flex flex-col items-center justify-center flex-1">
          <h1 className="text-2xl text-center font-bold ">Agregar mercado</h1>
          <form className="h-3/4 grid grid-cols-2 gap-5 items-center justify-center w-2/3">
            <div className="flex flex-col gap-5">
              <Input type="text" label="Nombre" />
              <Input type="text" label="Dirección" />
              <Textarea label="Descripción" />
              <h1 className="self-start">Imagen de portada</h1>
              <label htmlFor="cover" className="cursor-pointer">
                Agregar imagen
                <input
                  type="file"
                  accept="image/"
                  id="cover"
                  className="hidden"
                />
              </label>
              <h1 className="self-start">Imagenes adicionales</h1>
              <label htmlFor="images" className="cursor-pointer">
                Agregar imagen
                <input
                  type="file"
                  accept="image/"
                  id="images"
                  className="hidden"
                  multiple
                />
              </label>
              <Select
                aria-label="Productos"
                label="Productos"
                selectionMode="multiple"
                placeholder="Selecciona los productos"
              >
                <SelectItem key={"name"} value={"name"}>
                  Nombre
                </SelectItem>
                <SelectItem key={"state"} value={"state"}>
                  Estado
                </SelectItem>
                <SelectItem key={"city"} value={"city"}>
                  Ciudad
                </SelectItem>
              </Select>
            </div>
            <Map />
            <Button
              type="submit"
              color="success"
              className=" col-span-2 w-1/2 justify-self-center"
            >
              Enviar
            </Button>
          </form>
        </div>
      </MainLayout>
    </div>
  );
};

export default AddMarketPage;
