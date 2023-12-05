import { Select, SelectItem } from "@nextui-org/react";

const items = [
  "Cereales",
  "Granolas",
  "Pasas",
  "Dátiles",
  "Arándanos",
  "Almendras",
  "Nueces",
  "Pistachos",
  "Lentejas",
  "Garbanzos",
  "Frijoles",
  "Chía",
  "Lino",
  "Sésamo",
  "Orégano",
  "Romero",
  "Pimienta",
  "Harina de trigo",
  "Harina de avena",
  "Harina de centeno",
  "Azúcar blanca",
  "Azúcar morena",
  "Té",
  "Café",
  "Arroz",
  "Pasta seca",
  "Avena",
  "Muesli",
  "Cereales de maíz",
  "Quinoa",
  "Amaranto",
  "Trigo sarraceno",
  "Gomitas",
  "Chocolates",
  "Caramelo",
  "Aceite de oliva",
  "Aceite de girasol",
  "Aceite de coco",
  "Sal",
  "Levadura nutricional",
  "Proteínas en polvo",
  "Miel de abeja",
  "Queso fresco",
  "Queso oaxaca",
  "Vinagre",
  "Hongos",
];

const CustomSelect = ({
  products = [],
  setData,
  disabled = false,
  isInvalid,
  errorMessage,
}) => {
  return (
    <Select
      isDisabled={disabled}
      isInvalid={isInvalid}
      errorMessage={errorMessage}
      required
      selectedKeys={products.length > 0 ? products : []}
      aria-label="Productos"
      label="Productos"
      selectionMode="multiple"
      onChange={(e) =>
        setData((prevData) => ({
          ...prevData,
          products: e.target.value.split(","),
        }))
      }
      placeholder="Selecciona los productos"
    >
      {items.map((item) => (
        <SelectItem key={item} value={item}>
          {item}
        </SelectItem>
      ))}
    </Select>
  );
};

export default CustomSelect;
