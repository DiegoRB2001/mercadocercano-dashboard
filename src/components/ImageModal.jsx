import { updateMarket } from "@/lib/firebase/firestore";
import { uploadFile } from "@/lib/firebase/storage";
import {
  Button,
  Card,
  CardBody,
  Image,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";

const ImageModal = ({
  buttonContent = "Si",
  buttonColor = "default",
  buttonRadius = "md",
  isButtonIconOnly = false,
  buttonSize = "md",
  buttonClassName = "mb-5",
  multiple = true,
  marketId,
  setData,
  data,
}) => {
  const [images, setImages] = useState([]);
  const [disabled, setDisabled] = useState(false);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const onDrop = useCallback((acceptedFiles) => {
    setImages((prevData) =>
      multiple ? [...prevData, ...acceptedFiles] : [...acceptedFiles]
    );
  }, []);
  const maxFiles = multiple ? 0 : 1;

  function duplicateValidator(file) {
    if (images.filter((newFile) => newFile.name == file.name).length > 0) {
      return {
        code: "duplicate-file",
        message: `Este archivo ya fue agregado`,
      };
    }

    return null;
  }
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    validator: duplicateValidator,
    onDrop,
    multiple,
    maxFiles,
    accept: {
      "image/png": [".png"],
      "image/jpeg": [".jpeg"],
      "image/jpg": [".jpg"],
    },
  });

  const removeFile = (name) => {
    setImages((prevData) => ({
      ...prevData,
      [value]: prevData[value].filter((file) => file.name !== name),
    }));
  };

  const handleConfirm = async () => {
    setDisabled(true);
    if (multiple) {
      const imagesURL = await Promise.all(
        images.map(async (image) => {
          const imageUrl = await uploadFile(
            `images/markets/${marketId}/image_${image.name}`,
            image
          );
          return imageUrl;
        })
      );
      await updateMarket(marketId, { images: [...data.images, ...imagesURL] });
      setData((prevData) => ({
        ...prevData,
        images: [...prevData.images, ...imagesURL],
      }));
    } else {
      const coverURL = await uploadFile(
        `images/markets/${marketId}/cover.jpg`,
        images[0]
      );
      setData((prevData) => ({
        ...prevData,
        cover: coverURL,
      }));
    }
    setImages([]);
    setDisabled(false);
  };

  return (
    <>
      <Button
        onClick={onOpen}
        color={buttonColor}
        size={buttonSize}
        radius={buttonRadius}
        isIconOnly={isButtonIconOnly}
        className={buttonClassName}
      >
        {buttonContent}
      </Button>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        hideCloseButton
        isDismissable
        backdrop="opaque"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1"></ModalHeader>
              <ModalBody>
                <div {...getRootProps()}>
                  <input {...getInputProps()} />
                  <Card className="cursor-pointer">
                    <CardBody>
                      {isDragActive ? (
                        <p className="text-center">
                          Arrastra aqui las imagenes...
                        </p>
                      ) : (
                        <p className="text-center">
                          Arrastra aqui las imagenes o da un click para
                          seleccionar un archivo
                        </p>
                      )}
                      <div
                        className={`mt-5 ${
                          multiple
                            ? "grid grid-cols-3 gap-5 w-full"
                            : "w-1/2 self-center"
                        } justify-center `}
                      >
                        {images.map((file) => (
                          <div className="relative" key={file.name}>
                            <Image
                              src={URL.createObjectURL(file)}
                              alt={file.name}
                              className="z-0"
                            />
                            <Button
                              color="danger"
                              radius="full"
                              isIconOnly
                              size="sm"
                              className=" absolute top-[-10px] right-[-10px] font-bold z-10"
                              onClick={() => removeFile(file.name)}
                            >
                              X
                            </Button>
                          </div>
                        ))}
                      </div>
                    </CardBody>
                  </Card>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button
                  color="danger"
                  variant="light"
                  onPress={onClose}
                  isDisabled={disabled}
                >
                  Cancelar
                </Button>
                <Button
                  color="success"
                  type="submit"
                  onPress={async () => {
                    await handleConfirm();
                    onClose();
                  }}
                  isLoading={disabled}
                >
                  Agregar
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default ImageModal;
