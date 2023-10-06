import { useEffect, useState } from "react";
import "./App.css";
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import findLocation from "./assets/findLocation.svg";
function ChangeView({ coords }: { coords: any }) {
  const map = useMap();
  map.setView(coords, 10);
  return null;
}

function App() {
  const [inputIp, setInputIp] = useState<string>("");
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
        <div className="container">
          <div className="logo-container">
            <span className="logo">GeoLoc</span>
          </div>

          <div className="input-container">
            <input
              type="text"
              value={inputIp}
              placeholder="Enter IP address"
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
              <img src={findLocation} />
            </button>
          </div>
          <div className="ip-details">
            <p>
              <span className="label">IP:</span> {data.ip ?? "Not available"}
            </p>
            <p>
              <span className="label">Country:</span>{" "}
              {data.country ?? "Not available"}
            </p>
            <p>
              <span className="label">Latitude:</span>{" "}
              {data.latitude ?? "Not available"}
            </p>
            <p>
              <span className="label">Longitude:</span>{" "}
              {data.longitude ?? "Not available"}
            </p>
            <p>
              <span className="label">City:</span>{" "}
              {data.city ?? "Not available"}
            </p>
            <p>
              <span className="label">Region:</span>{" "}
              {data.region ?? "Not available"}
            </p>
            <p>
              <span className="label">Organization:</span>{" "}
              {data.organization ?? "Not available"}
            </p>
          </div>
          <div className="map-container">
            {data.latitude !== "nil" && (
              <MapContainer
                className="map"
                center={[
                  data.latitude !== "nil" ? data.latitude : 0,
                  data.longitude !== "nil" ? data.longitude : 0,
                ]}
                zoom={10}
                scrollWheelZoom={false}
              >
                <ChangeView
                  coords={[
                    data.latitude !== "nil" ? data.latitude : 0,
                    data.longitude !== "nil" ? data.longitude : 0,
                  ]}
                />
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
              </MapContainer>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default App;
