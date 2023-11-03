"use client";

import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

const containerStyle = {
  width: "400px",
  height: "400px",
};

const center = {
  lat: -3.745,
  lng: -38.523,
};

const Map = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [place, setPlace] = useState(null);

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return isLoaded ? (
    <GoogleMap
      key={theme}
      onClick={(e) => setPlace({ lat: e.latLng.lat(), lng: e.latLng.lng() })}
      options={{
        disableDefaultUI: true,
        mapId:
          theme === "light"
            ? process.env.NEXT_PUBLIC_GOOGLE_MAPS_LIGHT_THEME_ID
            : process.env.NEXT_PUBLIC_GOOGLE_MAPS_DARK_THEME_ID,
      }}
      mapContainerStyle={containerStyle}
      center={center}
      zoom={10}
    >
      {place && (
        <Marker
          onClick={() => setPlace(null)}
          position={{ lat: place.lat, lng: place.lng }}
        />
      )}
    </GoogleMap>
  ) : (
    <></>
  );
};

export default Map;
