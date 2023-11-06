import { Input } from "@nextui-org/react";
import { GoogleMap, Marker } from "@react-google-maps/api";
import { useState } from "react";
import { fromLatLng, setDefaults } from "react-geocode";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";

const AddressInput = ({ setData }) => {
  const [place, setPlace] = useState(null);
  const [center, setCenter] = useState({
    lat: 23.1927611,
    lng: -113.2533392,
  });
  const [zoom, setZoom] = useState(4);

  const containerStyle = {
    width: "700px",
    height: "700px",
  };

  setDefaults({
    key: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
    region: "mx",
    language: "es-419",
  });

  const {
    ready,
    value,
    suggestions: { status, data },
    clearSuggestions,
    setValue,
  } = usePlacesAutocomplete({
    requestOptions: { region: "mx", language: "es-419" },
  });

  const handleInput = (e) => {
    setValue(e.target.value);
  };

  const handleSelect =
    ({ description }) =>
    () => {
      setValue(description, false);
      clearSuggestions();
      getGeocode({ address: description }).then((results) => {
        const { lat, lng } = getLatLng(results[0]);
        const [city, state] = [
          results[0].address_components.filter((component) =>
            component.types.includes("locality")
          )[0]["long_name"],
          results[0].address_components.filter((component) =>
            component.types.includes("administrative_area_level_1")
          )[0]["long_name"],
        ];
        setCenter({ lat, lng });
        setPlace({ lat, lng });
        setZoom(18);
        setData((prevData) => ({
          ...prevData,
          geolocation: {
            latitude: lat,
            longitude: lng,
          },
          location: {
            city,
            state,
          },
        }));
      });
    };

  const renderSuggestions = () =>
    data.map((suggestion) => {
      const {
        place_id,
        structured_formatting: { main_text, secondary_text },
      } = suggestion;

      return (
        <li
          key={place_id}
          onClick={handleSelect(suggestion)}
          className="cursor-pointer"
        >
          <strong>{main_text}</strong> <small>{secondary_text}</small>
        </li>
      );
    });
  return (
    <div className="w-full flex flex-col justify-center items-center gap-5">
      <Input
        isClearable
        onClear={() => {
          clearSuggestions();
          setData((prevData) => ({
            ...prevData,
            address: "",
          }));
          setPlace(null);
          setValue("", false);
        }}
        label="Ubicación"
        value={value}
        onChange={handleInput}
        disabled={!ready}
        placeholder="Escribe una ubicación"
      />
      {status === "OK" && <ul>{renderSuggestions()}</ul>}
      <GoogleMap
        onClick={(e) => {
          setData((prevData) => ({
            ...prevData,
            geolocation: {
              latitude: e.latLng.lat(),
              longitude: e.latLng.lng(),
            },
          }));
          fromLatLng(e.latLng.lat(), e.latLng.lng())
            .then(({ results }) => {
              const [city, state] = [
                results[0].address_components.filter((component) =>
                  component.types.includes("locality")
                )[0]["long_name"],
                results[0].address_components.filter((component) =>
                  component.types.includes("administrative_area_level_1")
                )[0]["long_name"],
              ];
              setValue(results[0].formatted_address, false);
              setData((prevData) => ({
                ...prevData,
                address: results[0].formatted_address,
                location: {
                  city,
                  state,
                },
              }));
            })
            .catch(console.error);

          setPlace({ lat: e.latLng.lat(), lng: e.latLng.lng() });
        }}
        options={{
          disableDefaultUI: true,
          mapId: process.env.NEXT_PUBLIC_GOOGLE_MAPS_LIGHT_THEME_ID,
        }}
        mapContainerStyle={containerStyle}
        center={center}
        zoom={zoom}
      >
        {place && (
          <Marker
            onClick={() => setPlace(null)}
            position={{ lat: place.lat, lng: place.lng }}
          />
        )}
      </GoogleMap>
    </div>
  );
};

export default AddressInput;
