"use client";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, Table, TBody, TD, TH, THead, TR, Button, Progress, Badge } from "@/components/ui";
import { seedIncidents } from "@/lib/mock-data";
import { formatTime } from "@/lib/utils";

export default function IncidentsPage() {
	const [incidents, setIncidents] = useState(seedIncidents);

	function updateStatus(id: string, status: "PENDING" | "VERIFIED" | "ESCALATED") {
		setIncidents((prev) => prev.map((i) => (i.id === id ? { ...i, status } : i)));
	}

	return (
		<Card>
			<CardHeader>
				<CardTitle>Incident Management</CardTitle>
			</CardHeader>
			<CardContent>
				<Table>
					<THead>
						<TR>
							<TH>ID</TH>
							<TH>When</TH>
							<TH>Severity</TH>
							<TH>Status</TH>
							<TH>AI Confidence</TH>
							<TH>Actions</TH>
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
								<TD className="min-w-40"><Progress value={i.aiConfidence} /></TD>
								<TD className="space-x-2">
									<Button size="sm" className="bg-green-600 hover:bg-green-700 text-white" onClick={() => updateStatus(i.id, "VERIFIED")}>Approve</Button>
									<Button size="sm" variant="destructive" onClick={() => updateStatus(i.id, "ESCALATED")}>Escalate</Button>
								</TD>
							</TR>
						))}
					</TBody>
				</Table>
			</CardContent>
		</Card>
	);
}


