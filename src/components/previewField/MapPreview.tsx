import React, { useState } from "react";
import MapPicker from "react-google-map-picker";

const defaultLocation = {
  lat: -6.2115,
  lng: 106.845,
};

export const MapPreview = () => {
  const [location, setLocation] = useState(defaultLocation);
  console.log(location);
  return (
    <MapPicker
      className="input"
      apiKey=""
      defaultLocation={defaultLocation}
      onChangeLocation={(lat, lng) => {
        setLocation({ lat, lng });
      }}
    />
  );
};
