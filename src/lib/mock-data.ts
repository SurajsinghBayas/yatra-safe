import type { Role } from "@/lib/auth";

export type Traveler = {
	id: string;
	name: string;
	groupId: string;
	status: "ACTIVE" | "INACTIVE" | "MISSING";
	lastKnownLocation: { lat: number; lng: number };
	safetyScore: number; // 0-100
};

export type Incident = {
	id: string;
	timestamp: string;
	travelerId?: string;
	groupId?: string;
	location: { lat: number; lng: number };
	severity: "LOW" | "MEDIUM" | "HIGH";
	status: "PENDING" | "VERIFIED" | "ESCALATED";
	aiConfidence: number; // 0-100
	description: string;
};

export type Geofence = {
	id: string;
	name: string;
	severity: "SAFE" | "WARNING" | "DANGER";
	polygon: Array<{ lat: number; lng: number }>;
};

export const seedTravelers: Traveler[] = [
	{
		id: "T-1001",
		name: "Aarav Singh",
		groupId: "G-01",
		status: "ACTIVE",
		lastKnownLocation: { lat: 26.144, lng: 91.736 },
		safetyScore: 92,
	},
	{
		id: "T-1002",
		name: "Meera Iyer",
		groupId: "G-01",
		status: "ACTIVE",
		lastKnownLocation: { lat: 26.151, lng: 91.748 },
		safetyScore: 86,
	},
	{
		id: "T-1003",
		name: "Kabir Khan",
		groupId: "G-02",
		status: "INACTIVE",
		lastKnownLocation: { lat: 26.132, lng: 91.703 },
		safetyScore: 70,
	},
];

export const seedIncidents: Incident[] = [
	{
		id: "I-2001",
		timestamp: "2025-01-01T09:15:00.000Z",
		travelerId: "T-1003",
		location: { lat: 26.132, lng: 91.703 },
		severity: "MEDIUM",
		status: "PENDING",
		aiConfidence: 64,
		description: "Fall detected near market area.",
	},
	{
		id: "I-2002",
		timestamp: "2025-01-01T10:00:00.000Z",
		groupId: "G-01",
		location: { lat: 26.151, lng: 91.748 },
		severity: "LOW",
		status: "VERIFIED",
		aiConfidence: 82,
		description: "Brief network outage reported.",
	},
];

export const seedGeofences: Geofence[] = [
	{
		id: "Z-ASSAM-1",
		name: "Dispur Safe Zone",
		severity: "SAFE",
		polygon: [
			{ lat: 26.137, lng: 91.783 },
			{ lat: 26.152, lng: 91.802 },
			{ lat: 26.155, lng: 91.790 },
			{ lat: 26.146, lng: 91.772 },
		],
	},
	{
		id: "Z-ASSAM-2",
		name: "Fancy Bazaar Warning Zone",
		severity: "WARNING",
		polygon: [
			{ lat: 26.176, lng: 91.735 },
			{ lat: 26.191, lng: 91.753 },
			{ lat: 26.186, lng: 91.759 },
			{ lat: 26.172, lng: 91.742 },
		],
	},
	{
		id: "Z-ASSAM-3",
		name: "Jalukbari Danger Zone",
		severity: "DANGER",
		polygon: [
			{ lat: 26.157, lng: 91.655 },
			{ lat: 26.176, lng: 91.680 },
			{ lat: 26.170, lng: 91.692 },
			{ lat: 26.150, lng: 91.669 },
		],
	},
];

export type RoleRecord = { id: string; name: string; role: Role };
export const seedAdmins: RoleRecord[] = [
	{ id: "U-1", name: "System Owner", role: "SUPER_ADMIN" },
	{ id: "U-2", name: "Delhi Ops", role: "ADMIN" },
	{ id: "U-3", name: "Station Officer", role: "POLICE" },
];


