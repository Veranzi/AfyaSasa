"use client";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import { useEffect, useState } from "react";
import L from "leaflet";

// Example clinics (replace with your real data)
const clinics = [
  { id: 1, name: "Nairobi Women's Hospital", lat: -1.302, lng: 36.806 },
  { id: 2, name: "Aga Khan University Hospital", lat: -1.266, lng: 36.817 },
  // ...add more clinics
];

function SetViewToUser({ position }: { position: [number, number] }) {
  const map = useMap();
  useEffect(() => {
    if (position) map.setView(position, 13);
  }, [position, map]);
  return null;
}

export default function ClinicMapSelector({ onSelect }: { onSelect: (clinic: any) => void }) {
  const [userPos, setUserPos] = useState<[number, number] | null>(null);

  const handleUseMyLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => setUserPos([pos.coords.latitude, pos.coords.longitude]),
        () => alert("Could not get your location")
      );
    }
  };

  return (
    <div>
      <button onClick={handleUseMyLocation} className="mb-2 bg-blue-600 text-white px-4 py-2 rounded">
        Use My Current Location
      </button>
      <MapContainer
        center={userPos || [-1.2921, 36.8219]} // Default: Nairobi
        zoom={13}
        style={{ width: "100%", height: "500px", minHeight: "400px", borderRadius: "1rem" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {clinics.map((clinic) => (
          <Marker
            key={clinic.id}
            position={[clinic.lat, clinic.lng]}
            eventHandlers={{
              click: () => onSelect(clinic),
            }}
            icon={L.icon({ iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png", iconSize: [25, 41], iconAnchor: [12, 41] })}
          >
            <Popup>
              <b>{clinic.name}</b>
              <br />
              <button onClick={() => onSelect(clinic)} className="text-blue-600 underline">Select</button>
            </Popup>
          </Marker>
        ))}
        {userPos && (
          <Marker
            position={userPos}
            icon={L.icon({ iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png", iconSize: [25, 41], iconAnchor: [12, 41], className: "user-location-marker" })}
          >
            <Popup>Your Location</Popup>
          </Marker>
        )}
        {userPos && <SetViewToUser position={userPos} />}
      </MapContainer>
    </div>
  );
} 