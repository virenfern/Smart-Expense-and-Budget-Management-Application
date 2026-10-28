
"use client";

import { useRouter } from "next/navigation";

export default function SignOutButton() {
  const router = useRouter();

  function handleSignOut() {
    localStorage.removeItem("pennywise-logged-in");
    localStorage.removeItem("pennywise-user-email");
    router.push("/login");
  }

  return (
    <button
      onClick={handleSignOut}
      className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-100"
    >
      Sign out
    </button>
  );
}
