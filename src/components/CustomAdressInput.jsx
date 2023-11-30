import { useLoadScript } from "@react-google-maps/api";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import AddressInput from "./AdressInput";

const libraries = ["places"];

const CustomAdressInput = ({
  setData,
  defaultValue = "",
  mapWidth = 700,
  mapHeight = 700,
  disabled = false,
  initialCenter = {
    lat: 23.1927611,
    lng: -113.2533392,
  },
}) => {
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

  return isLoaded ? (
    <AddressInput
      setData={setData}
      defaultValue={defaultValue}
      mapWidth={mapWidth}
      mapHeight={mapHeight}
      initialCenter={initialCenter}
      disabled={disabled}
    />
  ) : (
    <></>
  );
};

export default CustomAdressInput;
