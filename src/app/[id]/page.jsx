"use client";

import CustomAdressInput from "@/components/CustomAdressInput";
import CustomModal from "@/components/CustomModal";
import CustomSelect from "@/components/CustomSelect";
import ScheduleInput from "@/components/ScheduleInput";
import { unFormatHour } from "@/functions/hourFormatter";
import { PencilIcon } from "@heroicons/react/24/outline";
import {
  deleteMarket,
  getMarket,
  updateMarket,
} from "@/lib/firebase/firestore";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  CircularProgress,
  Divider,
  Image,
  Input,
  Textarea,
} from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import ImageModal from "@/components/ImageModal";
import { deleteFile } from "@/lib/firebase/storage";
import { arrayRemove } from "firebase/firestore";

const MarketPage = ({ params: { id } }) => {
  const [editing, setEditing] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [data, setData] = useState({});
  const [prevData, setPrevData] = useState({});
  const router = useRouter();

  useEffect(() => {
    getMarket(id).then((market) => {
      setPrevData(market.data());
      setData(market.data());
    });
  }, []);

  useEffect(() => {
    setPrevData(data);
  }, [data.images, data.cover]);

  const handleAction = async () => {
    setDisabled(true);
    if (editing) {
      await updateMarket(id, data);
    } else {
      await deleteFile(data.cover);
      await Promise.all(
        data.images.map(async (image) => {
          await deleteFile(image);
        })
      );
      await deleteMarket(id);
    }
    setDisabled(false);
    router.push("/");
  };

  return (
    <div className="min-w-full min-h-full flex flex-col justify-center items-center">
      {Object.entries(data).length > 0 ? (
        <Card className="w-1/2 h-1/2 my-5">
          <CardHeader className="grid grid-cols-3 gap-3">
            <div className="row-span-2">
              <div className="relative">
                <Image
                  src={data.cover}
                  alt="cover image"
                  className="z-0 row-span-2"
                />
                <ImageModal
                  buttonColor="warning"
                  buttonRadius="full"
                  isButtonIconOnly
                  buttonSize="sm"
                  marketId={id}
                  multiple={false}
                  setData={setData}
                  data={data}
                  buttonClassName={`${
                    !editing ? "hidden" : ""
                  } absolute top-[-10px] right-[-10px] font-bold z-10`}
                  buttonContent={<PencilIcon className="h-2/3" />}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3 justify-self-end self-start col-start-3 w-full">
              {!editing ? (
                <>
                  <Button
                    color="warning"
                    onClick={() => setEditing(true)}
                    isDisabled={editing}
                  >
                    Editar
                  </Button>
                  <CustomModal
                    modalMessage="¿Estas seguro que deseas eliminar el mercado?"
                    buttonContent="Eliminar"
                    buttonColor="danger"
                    isDisabled={disabled}
                    onConfirm={handleAction}
                  />
                </>
              ) : (
                <>
                  <Button
                    color="danger"
                    onClick={() => {
                      setData(prevData);
                      setEditing(false);
                    }}
                  >
                    Cancelar
                  </Button>
                  <CustomModal
                    modalMessage="¿Estas seguro que deseas modificar el mercado?"
                    buttonContent="Modificar"
                    buttonColor="success"
                    isDisabled={disabled}
                    onConfirm={handleAction}
                  />
                </>
              )}
            </div>

            <Input
              className="row-start-1 col-start-2"
              isClearable={editing}
              isDisabled={!editing}
              label="Nombre"
              value={data.name}
              onChange={(e) =>
                setData((prevData) => ({ ...prevData, name: e.target.value }))
              }
              placeholder="Escribe un nombre"
            />
            <div className="flex flex-col gap-2 col-span-2 col-start-2">
              <Textarea
                isClearable={editing}
                isDisabled={!editing}
                label="Descripción"
                value={data.description}
                onChange={(e) =>
                  setData((prevData) => ({
                    ...prevData,
                    description: e.target.value,
                  }))
                }
                size="sm"
                className="col-span-2"
                placeholder="Escribe una descripción"
              />
              <Input
                required
                isDisabled={!editing}
                type="tel"
                label="Teléfono"
                pattern="[0-9]{3}[0-9]{3}[0-9]{4}"
                placeholder="Escribe un teléfono"
                className="w-fit "
                value={data.phone}
                onChange={(e) =>
                  setData((prevData) => ({
                    ...prevData,
                    phone: e.target.value,
                  }))
                }
              />
            </div>
          </CardHeader>
          <Divider />
          <CardBody className="grid grid-cols-2 gap-2">
            <ScheduleInput
              disabled={!editing}
              setData={setData}
              startValue={unFormatHour(data.schedule.split(" - ")[0])}
              endValue={unFormatHour(data.schedule.split(" - ")[1])}
            />
            <CustomSelect
              products={data.products}
              setData={setData}
              disabled={!editing}
            />
          </CardBody>
          <Divider />
          <CardFooter className="flex flex-col items-center gap-5">
            <ImageModal
              marketId={id}
              buttonColor="warning"
              buttonSize="sm"
              multiple
              buttonClassName={`${!editing ? "hidden" : ""} self-end`}
              buttonContent={"Agregar imagenes"}
              setData={setData}
              data={data}
            />
            <div
              className={`mt-5  ${
                data.images.length > 1
                  ? "grid grid-cols-3 gap-5 w-full"
                  : "self-center"
              } justify-center w-1/3`}
            >
              {data.images ? (
                data.images.map((image, index) => (
                  <div className="relative" key={index}>
                    <Image src={image} alt="image" className="z-0" />
                    <CustomModal
                      modalMessage="¿Estas seguro que deseas eliminar esta imagen?"
                      buttonSize="sm"
                      buttonRadius="full"
                      isButtonIconOnly
                      buttonContent="X"
                      buttonClassName={`${
                        !editing ? "hidden" : ""
                      } absolute top-[-10px] right-[-10px] font-bold z-10`}
                      buttonColor="danger"
                      isDisabled={disabled}
                      onConfirm={async () => {
                        setDisabled(true);
                        await deleteFile(image);
                        await updateMarket(id, {
                          images: arrayRemove(image),
                        });
                        setData((prevData) => ({
                          ...prevData,
                          images: prevData.images.filter(
                            (element) => element != image
                          ),
                        }));
                        setDisabled(false);
                      }}
                    />
                  </div>
                ))
              ) : (
                <></>
              )}
            </div>
            <CustomAdressInput
              disabled={!editing}
              setData={setData}
              defaultValue={data.address || ""}
              mapWidth={500}
              mapHeight={500}
              initialCenter={
                data.geolocation
                  ? {
                      lat: data.geolocation.latitude,
                      lng: data.geolocation.longitude,
                    }
                  : { lat: 23.1927611, lng: -113.2533392 }
              }
            />
          </CardFooter>
        </Card>
      ) : (
        <CircularProgress />
      )}
    </div>
  );
};

export default MarketPage;
