"use client";
import { Card, CardContent, CardHeader, CardTitle, Table, TBody, TD, TH, THead, TR, Badge } from "@/components/ui";
import { Activity, Users, AlertTriangle, ArrowUpRight } from "lucide-react";
import { seedIncidents, seedTravelers } from "@/lib/mock-data";
import { formatNumber, formatTime } from "@/lib/utils";
import { useEffect, useState } from "react";
import { startRealtimeSimulator, stopRealtimeSimulator } from "@/lib/realtime";

export default function DashboardPage() {
	const [incidents, setIncidents] = useState(seedIncidents.slice(0, 8));
	const [activeTravelers, setActiveTravelers] = useState(
		seedTravelers.filter((t) => t.status === "ACTIVE").length
	);

	useEffect(() => {
		startRealtimeSimulator({
			onIncident: (i) => setIncidents((prev) => [i, ...prev].slice(0, 8)),
			onTravelerUpdate: () => {
				setActiveTravelers(seedTravelers.filter((t) => t.status === "ACTIVE").length);
			},
		});
		return () => stopRealtimeSimulator();
	}, []);

	const stats = [
		{ label: "Active Travelers", value: activeTravelers, icon: Users },
		{ label: "Active Groups", value: 3, icon: Activity },
		{ label: "Incidents Today", value: seedIncidents.length, icon: AlertTriangle },
		{ label: "Escalations", value: seedIncidents.filter((i) => i.status === "ESCALATED").length, icon: ArrowUpRight },
	];

	return (
		<div className="space-y-6">
			<div className="grid gap-4 grid-cols-1 md:grid-cols-4">
				{stats.map((s) => (
					<Card key={s.label}>
						<CardHeader className="flex flex-row items-center justify-between">
							<CardTitle className="text-gray-900 font-bold">{s.label}</CardTitle>
							{s.icon && <s.icon className="h-5 w-5 text-muted-foreground" />}
						</CardHeader>
						<CardContent className="text-4xl font-extrabold text-gray-900">{formatNumber(s.value)}</CardContent>
					</Card>
				))}
			</div>

			<Card>
				<CardHeader>
					<CardTitle>Live Incident Feed</CardTitle>
				</CardHeader>
				<CardContent>
					<Table>
						<THead>
							<TR>
								<TH>ID</TH>
								<TH>Time</TH>
								<TH>Severity</TH>
								<TH>Status</TH>
								<TH>AI Confidence</TH>
								<TH>Description</TH>
							</TR>
						</THead>
						<TBody>
							{incidents.map((i) => (
								<TR key={i.id}>
									<TD className="font-mono text-xs">{i.id}</TD>
									<TD className="text-xs">{formatTime(i.timestamp)}</TD>
									<TD>
										<Badge variant={i.severity === "HIGH" ? "danger" : i.severity === "MEDIUM" ? "warn" : "safe"}>{i.severity}</Badge>
									</TD>
									<TD>{i.status}</TD>
									<TD>{i.aiConfidence}%</TD>
									<TD className="max-w-[420px] truncate">{i.description}</TD>
								</TR>
							))}
						</TBody>
					</Table>
				</CardContent>
			</Card>
		</div>
	);
}


