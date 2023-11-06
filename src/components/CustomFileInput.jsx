import { Button, Card, CardBody } from "@nextui-org/react";
import Image from "next/image";
import { useCallback } from "react";
import { useDropzone } from "react-dropzone";

const CustomFileInput = ({ multiple, setData, files, value }) => {
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
                  width={200}
                  height={200}
                  alt={file.name}
                  style={{
                    width: "100%",
                    height: "100%",
                  }}
                />
                <Button
                  color="danger"
                  radius="full"
                  isIconOnly
                  size="sm"
                  className=" absolute top-[-10px] right-[-10px] font-bold"
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
