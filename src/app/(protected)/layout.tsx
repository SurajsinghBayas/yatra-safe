// D:\CODING\SIH_prototype\tourist-safety-admin\src\app\(protected)\layout.tsx
"use client";
import { useRouter, usePathname } from "next/navigation";
import * as React from "react";
import { useAuthStore } from "@/store/auth-store";
import Link from "next/link";
import { Sidebar, nav as sidebarNav } from "@/components/layout/sidebar";
import { Topbar } from "@/components/layout/topbar";
import { hasPermission } from "@/lib/auth";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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
      {/* Desktop sidebar */}
      <Sidebar />
      <div className="grid grid-rows-[56px_1fr]">
        <Topbar onMenu={() => setMobileOpen((v) => !v)} />
        {mobileOpen && (
          <div className="md:hidden fixed inset-0 z-50">
            <div
              className="absolute inset-0 bg-black/40"
              onClick={() => setMobileOpen(false)}
            />
            <div className="absolute left-0 top-0 h-full w-72 bg-gray-900 text-white p-3 shadow-xl animate-in slide-in-from-left">
              <div className="flex items-center justify-between mb-4">
                <span className="font-semibold">YatraSafe Admin</span>
                <button
                  aria-label="Close menu"
                  className="rounded-md bg-gray-800 px-2 py-1"
                  onClick={() => setMobileOpen(false)}
                >
                  Close
                </button>
              </div>
              <nav className="grid gap-1">
                {sidebarNav.map((item) => {
                  if (!isAuthenticated) return null;
                  const user = useAuthStore.getState().user;
                  if (!user || !hasPermission(user.role, item.perm))
                    return null;
                  const active = pathname.startsWith(item.href);
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setMobileOpen(false)}
                      className={`flex items-center gap-2 rounded-md px-3 py-2 text-sm transition-colors ${
                        active
                          ? "bg-blue-600 text-white"
                          : "hover:bg-gray-800 text-white"
                      }`}
                    >
                      {item.icon("h-4 w-4")}
                      <span>{item.label}</span>
                    </Link>
                  );
                })}
              </nav>
            </div>
          </div>
        )}
        <main className="p-4 md:p-6 bg-slate-50">{children}</main>
      </div>
    </div>
  );
}
