import * as React from "react";
import { cn } from "@/lib/utils";

export function Table({ className, ...props }: React.HTMLAttributes<HTMLTableElement>) {
	return <table className={cn("w-full caption-bottom text-sm text-gray-800", className)} {...props} />;
}
export function THead({ className, ...props }: React.HTMLAttributes<HTMLTableSectionElement>) {
	return <thead className={cn("[&_tr]:border-b", className)} {...props} />;
}
export function TBody({ className, ...props }: React.HTMLAttributes<HTMLTableSectionElement>) {
	return <tbody className={cn("[&_tr:last-child]:border-0 [&_tr:nth-child(odd)]:bg-gray-50 [&_tr:nth-child(even)]:bg-white", className)} {...props} />;
}
export function TR({ className, ...props }: React.HTMLAttributes<HTMLTableRowElement>) {
	return <tr className={cn("border-b border-gray-300 transition-colors", className)} {...props} />;
}
export function TH({ className, ...props }: React.ThHTMLAttributes<HTMLTableCellElement>) {
	return <th className={cn("h-10 px-4 text-left align-middle font-semibold text-gray-700", className)} {...props} />;
}
export function TD({ className, ...props }: React.TdHTMLAttributes<HTMLTableCellElement>) {
	return <td className={cn("p-4 align-middle", className)} {...props} />;
}


