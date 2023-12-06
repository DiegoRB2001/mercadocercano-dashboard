"use client";

import CustomAdressInput from "@/components/CustomAdressInput";
import CustomFileInput from "@/components/CustomFileInput";
import CustomModal from "@/components/CustomModal";
import CustomSelect from "@/components/CustomSelect";
import ScheduleInput from "@/components/ScheduleInput";
import { unFormatHour } from "@/functions/hourFormatter";
import { addMarket } from "@/lib/firebase/firestore";
import { Input, Textarea } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

const AddMarketPage = () => {
  const [data, setData] = useState({
    products: [],
    images: [],
    cover: [],
    name: "",
    description: "",
    address: "",
    schedule: "",
    phone: "",
  });

  const [error, setError] = useState({
    products: false,
    images: false,
    cover: false,
    name: false,
    description: false,
    address: false,
    schedule: false,
    phone: false,
  });

  const [disabled, setDisabled] = useState(false);
  const router = useRouter();

  const handleSubmit = async () => {
    setDisabled(true);
    setError(() => ({
      products: data.products.length == 0,
      images: data.images.length == 0,
      cover: data.cover.length == 0,
      name: data.name.length == 0,
      description: data.description.length == 0,
      schedule: data.schedule.length == 0,
      phone: data.phone.length == 0,
      address: data.address.length == 0,
    }));
    var valid = true;
    Object.values(error).map((e) => {
      if (e) valid = false;
    });
    if (!valid) {
      setDisabled(false);
      return;
    }
    await addMarket(data);
    setDisabled(false);
    router.push("/");
  };
  return (
    <form className="flex flex-col gap-5 h-full items-center justify-center lg:w-1/2 lg:p-0 w-3/4  mx-auto">
      <h1 className="text-2xl text-center font-bold mt-5">Agregar mercado</h1>
      <Input
        required
        type="text"
        label="Nombre"
        placeholder="Escribe un nombre"
        isInvalid={error.name}
        errorMessage={error.name && "Inserta un nombre correcto."}
        onChange={(e) =>
          setData((prevData) => ({ ...prevData, name: e.target.value }))
        }
      />
      <Textarea
        required
        label="Descripción"
        placeholder="Escribe una descripción"
        isInvalid={error.description}
        errorMessage={error.description && "Inserta una descripción correcta."}
        onChange={(e) =>
          setData((prevData) => ({ ...prevData, description: e.target.value }))
        }
      />
      <Input
        required
        type="tel"
        label="Teléfono"
        placeholder="Escribe un teléfono"
        isInvalid={error.phone}
        errorMessage={error.phone && "Inserta un teléfono correcto."}
        onChange={(e) =>
          setData((prevData) => ({ ...prevData, phone: e.target.value }))
        }
      />
      <ScheduleInput
        disabled={disabled}
        isInvalid={error.schedule}
        errorMessage={error.schedule && "Inserta un horario correcto."}
        setData={setData}
        startValue={
          data.schedule ? unFormatHour(data.schedule.split(" - ")[0]) : ""
        }
        endValue={
          data.schedule ? unFormatHour(data.schedule.split(" - ")[1]) : ""
        }
      />
      <CustomSelect
        disabled={disabled}
        products={data.products}
        setData={setData}
        isInvalid={error.products}
        errorMessage={error.products && "Inserta algún producto."}
      />
      <div className="flex flex-col gap-5 w-full">
        <h1 className="text-center">Imagen de portada</h1>
        <CustomFileInput
          files={data.cover}
          setData={setData}
          value={"cover"}
          isInvalid={error.cover}
          errorMessage={error.cover && "Inserta alguna imagen de portada."}
        />
        <h1 className="text-center">Imagenes adicionales</h1>
        <CustomFileInput
          isInvalid={error.images}
          errorMessage={error.images && "Inserta alguna imagen adicional."}
          value={"images"}
          files={data.images}
          setData={setData}
          multiple={true}
        />
      </div>
      <CustomAdressInput
        geolocation={data.geolocation}
        setData={setData}
        isInvalid={error.address}
        errorMessage={error.address && "Inserta alguna dirección correcta."}
      />
      <CustomModal
        onConfirm={handleSubmit}
        disabled={disabled}
        buttonColor="success"
        buttonContent="Agregar"
        modalMessage="¿Estas seguro que deseas agregar el mercado?"
      />
    </form>
  );
};

export default AddMarketPage;
