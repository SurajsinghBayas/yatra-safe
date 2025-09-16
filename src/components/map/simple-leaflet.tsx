"use client";
import { MapContainer, TileLayer, Polygon, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import type { Geofence, Traveler } from "@/lib/mock-data";
import L from "leaflet";

const red = { color: "#ef4444", weight: 2, opacity: 0.9, fill: true, fillColor: "#ef4444", fillOpacity: 0.35 } as L.PathOptions;
const yellow = { color: "#eab308", weight: 2, opacity: 0.9, fill: true, fillColor: "#eab308", fillOpacity: 0.35 } as L.PathOptions;
const green = { color: "#16a34a", weight: 2, opacity: 0.9, fill: true, fillColor: "#16a34a", fillOpacity: 0.35 } as L.PathOptions;

function makePinIcon(color: string) {
    const svg = `
    <svg xmlns='http://www.w3.org/2000/svg' width='28' height='42' viewBox='0 0 24 24'>
      <path d='M12 22s7-5.373 7-12A7 7 0 1 0 5 10c0 6.627 7 12 7 12z' fill='${color}' />
      <circle cx='12' cy='10' r='3' fill='white' />
    </svg>`;
    const url = `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
    return L.icon({
        iconUrl: url,
        iconSize: [28, 42],
        iconAnchor: [14, 42],
        popupAnchor: [0, -40],
    });
}

export default function SimpleLeaflet({ geofences, travelers }: { geofences: Geofence[]; travelers: Traveler[] }) {
	const center: [number, number] = [26.1445, 91.7362];
	return (
		<div className="h-[70vh] rounded-lg overflow-hidden border bg-white">
			<MapContainer key={`${center[0]}-${center[1]}-11`} center={center} zoom={11} style={{ height: "100%", width: "100%" }}>
				<TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution="&copy; OpenStreetMap" />
				{geofences.map((z) => (
					<Polygon
						key={z.id}
						pathOptions={z.severity === "DANGER" ? red : z.severity === "WARNING" ? yellow : green}
						positions={z.polygon.map((p) => [p.lat, p.lng]) as [number, number][]}
					>
						<Popup>
							<div className="text-sm">
								<div className="font-semibold">{z.name}</div>
								<div>Severity: {z.severity}</div>
							</div>
						</Popup>
					</Polygon>
				))}
				{travelers.map((t) => {
					const color = t.status === "MISSING" ? "#ef4444" : t.status === "INACTIVE" ? "#eab308" : "#16a34a";
					return (
						<Marker key={t.id} position={[t.lastKnownLocation.lat, t.lastKnownLocation.lng]} icon={makePinIcon(color)}>
							<Popup>
								<div className="text-sm">
									<div className="font-semibold">{t.name}</div>
									<div className="font-mono text-xs">{t.id}</div>
									<div>Status: {t.status}</div>
									<div>Score: {t.safetyScore}</div>
								</div>
							</Popup>
						</Marker>
					);
				})}
			</MapContainer>
		</div>
	);
}


