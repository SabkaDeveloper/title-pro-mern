import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "bootstrap/dist/css/bootstrap.min.css";

const Map = () => {
  const [geoData, setGeoData] = useState(null);

  useEffect(() => {
    fetch("https://raw.githubusercontent.com/PublicaMundi/MappingAPI/master/data/geojson/us-states.json")
      .then((res) => res.json())
      .then((data) => setGeoData(data));
  }, []);

  return (
    <div className="container mt-4">
      <div className="card" style={{ width: "46vw", height: "60vh" }}>
        <div className="card-header text-white">
        <h5 className="text-info mt-2">Orders By Product Type</h5>
        </div>
        <div className="card-body" >
        <MapContainer center={[37.8, -96]} zoom={4} className="map-container" style={{ height: "40vh" }}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            {geoData && <GeoJSON data={geoData} />}
          </MapContainer>
        </div>
      </div>
    </div>
  );
};

export default Map;
