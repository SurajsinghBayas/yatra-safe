"use client";
import { useEffect } from "react";
import dynamic from "next/dynamic";
import { seedGeofences, seedTravelers } from "@/lib/mock-data";
import { startRealtimeSimulator, stopRealtimeSimulator } from "@/lib/realtime";

const Map = dynamic(() => import("@/components/map/simple-leaflet"), { ssr: false });

export default function MapPage() {
	useEffect(() => {
		startRealtimeSimulator({});
		return () => stopRealtimeSimulator();
	}, []);
	return <Map geofences={seedGeofences} travelers={seedTravelers} />;
}


