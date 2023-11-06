import { useLoadScript } from "@react-google-maps/api";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import AddressInput from "./AdressInput";

const libraries = ["places"];

const CustomAdressInput = ({ setData }) => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
    libraries,
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return isLoaded ? <AddressInput setData={setData} /> : <></>;
};

export default CustomAdressInput;
