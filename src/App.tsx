import { useState } from "react";
import "./App.css";
import { MapContainer, TileLayer, useMap } from "react-leaflet";
function ChangeView({ coords }: { coords: any }) {
  const map = useMap();
  map.setView(coords, 13);
  return null;
}

function App() {
  const [inputIp, setInputIp] = useState<any>();
  const [position, setPosition] = useState<any>([45.4998, -73.6087]);

  //fetch
  const fetchData = (ip: any) => {
    fetch(`https://ip-api.com/json/${ip}`).then((res) => res.json()).then(
      (data) => {
        console.log(data);
        if (data) {
          setPosition([data.lat, data.lon]);
        }
      },
    );
  };
  return (
    <>
      <input
        type="text"
        value={inputIp}
        onChange={(e) => {
          setInputIp(e.target.value);
        }}
      />
      <button
        type="submit"
        onClick={() => {
          console.log("inputIp", inputIp);
          fetchData(inputIp);
        }}
      >
        &gt;
      </button>
      {position && (
        <MapContainer
          className="map"
          center={position}
          zoom={13}
          scrollWheelZoom={false}
        >
          <ChangeView coords={position} />
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
        </MapContainer>
      )}
    </>
  );
}

export default App;
