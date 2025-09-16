export type Role = "ADMIN" | "SUPER_ADMIN" | "POLICE";

export type User = {
	id: string;
	name: string;
	role: Role;
};

export const ROLE_LABELS: Record<Role, string> = {
	ADMIN: "Admin",
	SUPER_ADMIN: "Super Admin",
	POLICE: "Police",
};

export type Permission =
	| "view_dashboard"
	| "view_map"
	| "manage_geofences"
	| "view_incidents"
	| "resolve_incidents"
	| "view_travelers"
	| "manage_admins"
	| "manage_settings";

export const ROLE_PERMISSIONS: Record<Role, Permission[]> = {
	ADMIN: [
		"view_dashboard",
		"view_map",
		"manage_geofences",
		"view_incidents",
		"resolve_incidents",
		"view_travelers",
	],
	POLICE: [
		"view_dashboard",
		"view_map",
		"view_incidents",
		"resolve_incidents",
		"view_travelers",
	],
	SUPER_ADMIN: [
		"view_dashboard",
		"view_map",
		"manage_geofences",
		"view_incidents",
		"resolve_incidents",
		"view_travelers",
		"manage_admins",
		"manage_settings",
	],
};

export function hasPermission(role: Role, permission: Permission): boolean {
	return ROLE_PERMISSIONS[role]?.includes(permission) ?? false;
}


