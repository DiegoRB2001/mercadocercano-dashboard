import { Button, Card, CardBody, Chip, Image } from "@nextui-org/react";
import { useCallback } from "react";
import { useDropzone } from "react-dropzone";

const CustomFileInput = ({
  multiple = false,
  setData,
  files = [],
  value,
  isInvalid,
  errorMessage,
}) => {
  const onDrop = useCallback((acceptedFiles) => {
    setData((prevData) => ({
      ...prevData,
      [value]: multiple
        ? [...prevData[value], ...acceptedFiles]
        : [...acceptedFiles],
    }));
  }, []);
  const maxFiles = multiple ? 0 : 1;

  function duplicateValidator(file) {
    if (files.filter((newFile) => newFile.name == file.name).length > 0) {
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
    setData((prevData) => ({
      ...prevData,
      [value]: prevData[value].filter((file) => file.name !== name),
    }));
  };

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      <Card className="cursor-pointer">
        <CardBody>
          {isInvalid && (
            <Chip color="danger" className="self-center m-2">
              {errorMessage}
            </Chip>
          )}
          {isDragActive ? (
            <p className="text-center">Arrastra aqui las imagenes...</p>
          ) : (
            <p className="text-center">
              Arrastra aqui las imagenes o da un click para seleccionar un
              archivo
            </p>
          )}
          <div
            className={`mt-5 ${
              multiple ? "grid grid-cols-3 gap-5 w-full" : "w-1/2 self-center"
            } justify-center `}
          >
            {files.map((file) => (
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
  );
};

export default CustomFileInput;
