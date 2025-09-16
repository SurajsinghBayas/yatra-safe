"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import * as React from "react";
import { startRealtimeSimulator, stopRealtimeSimulator } from "@/lib/realtime";

export function Providers({ children }: { children: React.ReactNode }) {
	const [client] = React.useState(() => new QueryClient());

	React.useEffect(() => {
		startRealtimeSimulator({});
		return () => stopRealtimeSimulator();
	}, []);

	return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
}


