import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "./map.scss";
import "leaflet/dist/leaflet.css";

function Map({ items }) {
  return (
    <MapContainer
      center={[52.4797,-1.98265]}
      zoom={13}
      scrollWheelZoom={false}
      className="map"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[52.4797,-1.98265]}>
       <Popup>
        A pretty SCSS3 popup.<br/>Easily customizable.
       </Popup>
      </Marker>
      
     
    </MapContainer>
  );
}

export default Map;