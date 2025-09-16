"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useAuthStore } from "@/store/auth-store";
import type { Role } from "@/lib/auth";
import { Button } from "@/components/ui";

export default function LoginPage() {
	const router = useRouter();
	const login = useAuthStore((s) => s.login);
	const [name, setName] = useState("");
	const [role, setRole] = useState<Role>("ADMIN");

	function handleLogin() {
		login(name || "Operator", role);
		router.push("/dashboard");
	}

	return (
		<div className="min-h-screen grid place-items-center p-6 bg-gray-100">
			<div className="w-full max-w-md space-y-6 rounded-2xl border border-gray-300 bg-white p-8 shadow-xl">
				<div>
					<h1 className="text-2xl font-bold text-gray-900">Sign in</h1>
					<p className="text-sm text-gray-600">Tourist Safety & Monitoring System</p>
				</div>
				<div className="space-y-3">
					<label className="block text-sm text-gray-800">Display Name</label>
					<input className="h-10 w-full rounded-md border border-gray-300 px-3 placeholder:text-gray-400 text-black" value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" />
				</div>
				<div className="space-y-3">
					<label className="block text-sm text-gray-800">Role</label>
					<select className="h-10 w-full rounded-md border border-gray-300 px-3 text-black" value={role} onChange={(e) => setRole(e.target.value as Role)}>
						<option value="ADMIN">Admin</option>
						<option value="SUPER_ADMIN">Super Admin</option>
						<option value="POLICE">Police</option>
					</select>
				</div>
				<Button className="w-full bg-blue-600 hover:bg-blue-700 text-white" onClick={handleLogin}>Sign in</Button>
				<p className="text-xs text-gray-500">Mock RBAC for prototype only.</p>
			</div>
		</div>
	);
}


