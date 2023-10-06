import { useEffect, useState } from "react";
import "./App.css";
import { MapContainer, TileLayer, useMap } from "react-leaflet";
function ChangeView({ coords }: { coords: any }) {
  const map = useMap();
  map.setView(coords, 10);
  return null;
}

function App() {
  const [inputIp, setInputIp] = useState<any>();
  const [data, setData] = useState<any>(null);

  //fetch
  useEffect(() => {
    fetch("https://get.geojs.io/v1/ip.json").then((res) => res.json()).then(
      (r) => {
        fetchData(r.ip);
      },
    );
  }, []);
  const fetchData = (ip: any) => {
    fetch(`https://get.geojs.io/v1/ip/geo/${ip}.json`).then((res) => res.json())
      .then(
        (data) => {
          if (data) {
            setData(data);
          }
        },
      );
  };
  return (
    <>
      {data && (
        <div>
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
              fetchData(inputIp);
            }}
          >
            locate
          </button>
          <hr />
          <div>
            <p>IP: {data.ip ?? 'Not available'}</p>
            <p>Country: {data.country ?? 'Not available'}</p>
            <p>Latitude: {data.latitude ?? 'Not available'}</p>
            <p>Longitude: {data.longitude ?? 'Not available'}</p>
            <p>City: {data.city ?? 'Not available'}</p>
            <p>Region: {data.region ?? 'Not available'}</p>
            <p>Organization: {data.organization ?? 'Not available'}</p>
          </div>
          <MapContainer
            className="map"
            center={[data.latitude, data.longitude]}
            zoom={10}
            scrollWheelZoom={false}
          >
            <ChangeView coords={[data.latitude, data.longitude]} />
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
          </MapContainer>
        </div>
      )}
    </>
  );
}

export default App;
