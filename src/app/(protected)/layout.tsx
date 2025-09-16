// D:\CODING\SIH_prototype\tourist-safety-admin\src\app\(protected)\layout.tsx
"use client";
import { useRouter, usePathname } from "next/navigation";
import * as React from "react";
import { useAuthStore } from "@/store/auth-store";
import { Sidebar } from "@/components/layout/sidebar";
import { Topbar } from "@/components/layout/topbar";

export default function ProtectedLayout({ children }: { children: React.ReactNode }) {
	const router = useRouter();
	const pathname = usePathname();
	const { isAuthenticated } = useAuthStore();
  const [mobileOpen, setMobileOpen] = React.useState(false);

	React.useEffect(() => {
		if (!isAuthenticated && !pathname.startsWith("/login")) {
			router.replace("/login");
		}
	}, [isAuthenticated, pathname, router]);

	return (
		<div className="min-h-screen grid md:grid-cols-[240px_1fr] grid-cols-1">
			<Sidebar />
			<div className="grid grid-rows-[56px_1fr]">
				<Topbar onMenu={() => setMobileOpen((v) => !v)} />
				{mobileOpen && (
					<div className="md:hidden fixed inset-0 z-50">
						<div className="absolute inset-0 bg-black/40" onClick={() => setMobileOpen(false)} />
						<div className="absolute left-0 top-0 h-full w-64 bg-gray-900 text-white p-3">
							<button className="mb-3 rounded-md bg-gray-800 px-3 py-2" onClick={() => setMobileOpen(false)}>Close</button>
							<p className="text-sm text-gray-300">Use the left menu on desktop.</p>
						</div>
					</div>
				)}
				<main className="p-6 bg-slate-50">{children}</main>
			</div>
		</div>
	);
}