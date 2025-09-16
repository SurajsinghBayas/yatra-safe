import { seedIncidents, seedTravelers, type Incident, type Traveler } from "@/lib/mock-data";

type RealtimeCallbacks = {
	onTravelerUpdate?: (traveler: Traveler) => void;
	onIncident?: (incident: Incident) => void;
};

let intervalId: ReturnType<typeof setInterval> | null = null;

export function startRealtimeSimulator(callbacks: RealtimeCallbacks) {
	if (intervalId) return;
	intervalId = setInterval(() => {
		// Move travelers slightly
		for (const t of seedTravelers) {
			const jitterLat = (Math.random() - 0.5) * 0.002;
			const jitterLng = (Math.random() - 0.5) * 0.002;
			t.lastKnownLocation = {
				lat: t.lastKnownLocation.lat + jitterLat,
				lng: t.lastKnownLocation.lng + jitterLng,
			};
			callbacks.onTravelerUpdate?.({ ...t });
		}

		// Random incident
		if (Math.random() < 0.35) {
			const severities: Incident["severity"][] = ["LOW", "MEDIUM", "HIGH"];
			const severity = severities[Math.floor(Math.random() * severities.length)];
			const base = seedTravelers[Math.floor(Math.random() * seedTravelers.length)];
			const incident: Incident = {
				id: `I-${Math.random().toString(36).slice(2, 7)}`,
				timestamp: new Date().toISOString(),
				travelerId: base.id,
				location: { ...base.lastKnownLocation },
				severity,
				status: severity === "HIGH" ? "ESCALATED" : "PENDING",
				aiConfidence: Math.floor(50 + Math.random() * 50),
				description: "Automated alert from wearable sensor.",
			};
			seedIncidents.unshift(incident);
			callbacks.onIncident?.(incident);
		}
	}, 2500);
}

export function stopRealtimeSimulator() {
	if (intervalId) clearInterval(intervalId);
	intervalId = null;
}


