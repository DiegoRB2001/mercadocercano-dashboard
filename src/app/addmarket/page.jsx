"use client";

import CustomAdressInput from "@/components/CustomAdressInput";
import CustomFileInput from "@/components/CustomFileInput";
import CustomSelect from "@/components/CustomSelect";
import { uploadMarket } from "@/lib/firebase/firestore";
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Textarea,
  useDisclosure,
} from "@nextui-org/react";
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
    schedule: "00:00 a 00:00",
    phone: "",
    location: {
      city: "",
      state: "",
    },
  });

  const router = useRouter();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  console.log(data);

  const formatHour = (hour, index) => {
    var [hours, minutes] = hour.split(":");
    const meridian = hours >= 12 ? "p.m." : "a.m.";
    hours = hours % 12 ? hours % 12 : 12;
    const schedule = data.schedule.split(" a ");
    schedule[index] = `${hours}:${minutes} ${meridian}`;
    return `${schedule[0]} a ${schedule[1]}`;
  };

  const handleSubmit = async () => {
    await uploadMarket(data);
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
      <div className="w-full flex flex-row justify-between gap-5">
        <Input
          required
          type="time"
          label="Hora de apertura"
          onChange={(e) =>
            setData((prevData) => ({
              ...prevData,
              schedule: formatHour(e.target.value, 0),
            }))
          }
        />
        <Input
          type="time"
          label="Hora de cierre"
          onChange={(e) =>
            setData((prevData) => ({
              ...prevData,
              schedule: formatHour(e.target.value, 1),
            }))
          }
        />
      </div>
      <CustomSelect products={data.products} setData={setData} />
      <div className="flex flex-col gap-5 w-full">
        <h1 className="text-center">Imagen de portada</h1>
        <CustomFileInput
          files={data.cover}
          setData={setData}
          multiple={false}
          value={"cover"}
        />
        <h1 className="text-center">Imagenes adicionales</h1>
        <CustomFileInput
          value={"images"}
          files={data.images}
          setData={setData}
          multiple={true}
        />
      </div>
      <CustomAdressInput geolocation={data.geolocation} setData={setData} />
      <Button onClick={onOpen} color="success" className="mb-5">
        Agregar
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} hideCloseButton>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Confirmación
              </ModalHeader>
              <ModalBody>
                <p>¿Estas seguro que deseas agregar el mercado?</p>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  No
                </Button>
                <Button color="success" type="submit" onPress={handleSubmit}>
                  Si
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </form>
  );
};

export default AddMarketPage;
