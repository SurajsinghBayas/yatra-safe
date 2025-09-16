"use client";
import { useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, Table, TBody, TD, TH, THead, TR, Button, Input, Select, SelectItem } from "@/components/ui";
import { seedAdmins } from "@/lib/mock-data";
import { ROLE_LABELS, type Role } from "@/lib/auth";
import { useAuthStore } from "@/store/auth-store";

export default function AdminControlsPage() {
	const me = useAuthStore((s) => s.user);
	const [admins, setAdmins] = useState(seedAdmins);
	const [name, setName] = useState("");
	const [role, setRole] = useState<Role>("ADMIN");

	function addAdmin() {
		if (!name.trim()) return;
		setAdmins((prev) => [{ id: `U-${Math.random().toString(36).slice(2, 7)}`, name, role }, ...prev]);
		setName("");
	}
	function remove(id: string) {
		setAdmins((prev) => prev.filter((u) => u.id !== id));
	}

	const settings = useMemo(
		() => [
			{ key: "warningThreshold", label: "Warning threshold (score)", value: 70 },
			{ key: "inactivityTimer", label: "Inactivity timer (min)", value: 15 },
		],
		[]
	);

	return (
		<div className="space-y-6">
			<Card>
				<CardHeader>
					<CardTitle>Manage Admins</CardTitle>
				</CardHeader>
				<CardContent className="space-y-4">
					<div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
						<Input placeholder="Full name" value={name} onChange={(e) => setName(e.target.value)} />
						<Select value={role} onChange={(e) => setRole(e.target.value as Role)}>
							<SelectItem value="ADMIN">Admin</SelectItem>
							<SelectItem value="SUPER_ADMIN">Super Admin</SelectItem>
							<SelectItem value="POLICE">Police</SelectItem>
						</Select>
						<Button onClick={addAdmin}>Add</Button>
					</div>
					<Table>
						<THead>
							<TR>
								<TH>ID</TH>
								<TH>Name</TH>
								<TH>Role</TH>
								<TH></TH>
							</TR>
						</THead>
						<TBody>
							{admins.map((u) => (
								<TR key={u.id}>
									<TD className="font-mono text-xs">{u.id}</TD>
									<TD>{u.name}</TD>
									<TD>{ROLE_LABELS[u.role]}</TD>
									<TD className="text-right">
										{me?.id !== u.id && <Button size="sm" variant="outline" onClick={() => remove(u.id)}>Remove</Button>}
									</TD>
								</TR>
							))}
						</TBody>
					</Table>
				</CardContent>
			</Card>

			<Card>
				<CardHeader>
					<CardTitle>System Settings</CardTitle>
				</CardHeader>
				<CardContent className="grid gap-3 sm:grid-cols-2">
					{settings.map((s) => (
						<div key={s.key} className="space-y-1">
							<label className="text-sm">{s.label}</label>
							<Input defaultValue={String(s.value)} />
						</div>
					))}
				</CardContent>
			</Card>
		</div>
	);
}


