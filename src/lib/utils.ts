import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function formatNumber(n: number): string {
	return new Intl.NumberFormat().format(n);
}

export function formatTime(date: string | number | Date): string {
	const dt = new Date(date);
	return dt.toLocaleTimeString("en-US", { hour12: true, hour: "2-digit", minute: "2-digit", second: "2-digit" });
}


