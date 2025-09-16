"use client";
import { useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, Input, Table, TBody, TD, TH, THead, TR, Badge } from "@/components/ui";
import { seedTravelers } from "@/lib/mock-data";

export default function TravelersPage() {
	const [query, setQuery] = useState("");
	const rows = useMemo(() => {
		const q = query.toLowerCase();
		return seedTravelers.filter((t) =>
			t.id.toLowerCase().includes(q) || t.groupId.toLowerCase().includes(q) || t.name.toLowerCase().includes(q)
		);
	}, [query]);

	return (
		<Card>
			<CardHeader>
				<CardTitle>Traveler Management</CardTitle>
			</CardHeader>
			<CardContent className="space-y-4">
				<Input className="bg-white" placeholder="Search by TravelerID, GroupID, or Name" value={query} onChange={(e) => setQuery(e.target.value)} />
				<Table>
					<THead>
						<TR>
							<TH>ID</TH>
							<TH>Name</TH>
							<TH>Group</TH>
							<TH>Status</TH>
							<TH>Safety Score</TH>
							<TH>Last Location</TH>
						</TR>
					</THead>
					<TBody>
						{rows.map((t) => (
							<TR key={t.id}>
								<TD className="font-mono text-xs">{t.id}</TD>
								<TD>{t.name}</TD>
								<TD>{t.groupId}</TD>
								<TD>
									<Badge variant={t.status === "MISSING" ? "danger" : t.status === "INACTIVE" ? "warn" : "safe"}>{t.status}</Badge>
								</TD>
								<TD>{t.safetyScore}</TD>
								<TD className="text-xs">{t.lastKnownLocation.lat.toFixed(4)}, {t.lastKnownLocation.lng.toFixed(4)}</TD>
							</TR>
						))}
					</TBody>
				</Table>
			</CardContent>
		</Card>
	);
}


