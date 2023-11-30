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
    geolocation: {
      lat: 0,
      lng: 0,
    },
    schedule: "",
    phone: "",
    location: {
      city: "",
      state: "",
    },
  });

  const router = useRouter();
  const [disabled, setDisabled] = useState(false);

  const handleSubmit = async () => {
    setDisabled(true);
    await addMarket(data);
    setDisabled(false);
    router.push("/");
  };

  return (
    <form className="flex flex-col gap-5 h-full items-center justify-center w-1/2 mx-auto">
      <h1 className="text-2xl text-center font-bold mt-5">Agregar mercado</h1>
      <Input
        required
        type="text"
        label="Nombre"
        onChange={(e) =>
          setData((prevData) => ({ ...prevData, name: e.target.value }))
        }
      />
      <Textarea
        required
        label="Descripción"
        onChange={(e) =>
          setData((prevData) => ({ ...prevData, description: e.target.value }))
        }
      />
      <Input
        required
        type="tel"
        label="Teléfono"
        pattern="[0-9]{3}[0-9]{3}[0-9]{4}"
        onChange={(e) =>
          setData((prevData) => ({ ...prevData, phone: e.target.value }))
        }
      />
      <ScheduleInput
        setData={setData}
        startValue={
          data.schedule ? unFormatHour(data.schedule.split(" - ")[0]) : ""
        }
        endValue={
          data.schedule ? unFormatHour(data.schedule.split(" - ")[1]) : ""
        }
      />
      <CustomSelect products={data.products} setData={setData} />
      <div className="flex flex-col gap-5 w-full">
        <h1 className="text-center">Imagen de portada</h1>
        <CustomFileInput files={data.cover} setData={setData} value={"cover"} />
        <h1 className="text-center">Imagenes adicionales</h1>
        <CustomFileInput
          value={"images"}
          files={data.images}
          setData={setData}
          multiple={true}
        />
      </div>
      <CustomAdressInput geolocation={data.geolocation} setData={setData} />
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
