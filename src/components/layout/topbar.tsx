"use client";
import { useAuthStore } from "@/store/auth-store";
import { ROLE_LABELS } from "@/lib/auth";
import { Button } from "@/components/ui";

export function Topbar({ onMenu }: { onMenu?: () => void }) {
  const user = useAuthStore((s) => s.user);
  const logout = useAuthStore((s) => s.logout);
  return (
    <header className="h-14 border-b border-gray-300 bg-white flex items-center justify-between px-4">
      <div className="flex items-center gap-3">
        <button aria-label="Open menu" onClick={onMenu} className="md:hidden inline-flex h-8 w-8 items-center justify-center rounded-lg hover:bg-gray-100">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5 text-gray-800"><path d="M4 6h16M4 12h16M4 18h16"/></svg>
        </button>
        <div className="text-sm font-semibold text-gray-800">Tourist Safety & Monitoring System</div>
      </div>
      <div className="flex items-center gap-3">
        {user && (
          <div className="text-sm text-gray-800">
            <span className="font-semibold">{user.name}</span>
            <span className="text-gray-500"> · {ROLE_LABELS[user.role]}</span>
          </div>
        )}
        <Button size="sm" className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded-lg" onClick={logout}>Logout</Button>
      </div>
    </header>
  );
}


