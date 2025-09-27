"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuthStore } from "@/store/auth-store";
import { hasPermission, type Permission } from "@/lib/auth";
import type { ReactElement } from "react";

type NavItem = {
  href: string;
  label: string;
  perm: Permission;
  icon: (cls: string) => ReactElement;
};

export const nav: NavItem[] = [
  {
    href: "/dashboard",
    label: "Dashboard",
    perm: "view_dashboard",
    icon: (cls: string) => (
      <svg
        className={cls}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path d="M3 13h8V3H3zM13 21h8V11h-8zM13 3v6h8V3zM3 21h8v-6H3z" />
      </svg>
    ),
  },
  {
    href: "/map",
    label: "Map",
    perm: "view_map",
    icon: (cls: string) => (
      <svg
        className={cls}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="2"
        stroke="currentColor"
      >
        <path d="M9 18l-6 3V6l6-3 6 3 6-3v15l-6 3-6-3z" />
      </svg>
    ),
  },
  {
    href: "/incidents",
    label: "Incidents",
    perm: "view_incidents",
    icon: (cls: string) => (
      <svg
        className={cls}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path d="M12 9v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    href: "/travelers",
    label: "Travelers",
    perm: "view_travelers",
    icon: (cls: string) => (
      <svg
        className={cls}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path d="M16 14a4 4 0 10-8 0v7h8v-7z" />
        <circle cx="12" cy="7" r="4" />
      </svg>
    ),
  },
  {
    href: "/admin",
    label: "Admin Controls",
    perm: "manage_admins",
    icon: (cls: string) => (
      <svg
        className={cls}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path d="M12 15l-3 3 3 3 3-3-3-3z" />
        <path d="M19.4 15a1.65 1.65 0 00.33-1.82l-1.62-2.8a1.65 1.65 0 010-1.66l1.62-2.8a1.65 1.65 0 00-.33-1.82l-2-2a1.65 1.65 0 00-1.82-.33l-2.8 1.62a1.65 1.65 0 01-1.66 0L8.34 0.5a1.65 1.65 0 00-1.82.33l-2 2a1.65 1.65 0 00-.33 1.82l1.62 2.8a1.65 1.65 0 010 1.66L4.19 13.2A1.65 1.65 0 004.52 15l2 2a1.65 1.65 0 001.82.33l2.8-1.62a1.65 1.65 0 011.66 0l2.8 1.62a1.65 1.65 0 001.82-.33z" />
      </svg>
    ),
  },
];

export function Sidebar() {
  const pathname = usePathname();
  const user = useAuthStore((s) => s.user);
  return (
    <aside className="w-60 bg-gray-900 text-white hidden md:block">
      <div className="p-4 font-semibold tracking-tight">YatraSafe Admin</div>
      <nav className="grid gap-1 p-2">
        {nav.map((item) => {
          if (!user || !hasPermission(user.role, item.perm)) return null;
          const active = pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-2 rounded-md px-3 py-2 text-sm transition-colors ${
                active
                  ? "bg-blue-600 text-white"
                  : "hover:bg-gray-700 text-white"
              }`}
            >
              {item.icon("h-4 w-4")}
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
