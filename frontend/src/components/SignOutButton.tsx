
"use client";

import { useRouter } from "next/navigation";

export default function SignOutButton() {
  const router = useRouter();

  function handleSignOut() {
    localStorage.removeItem("pennywise-logged-in");
    localStorage.removeItem("pennywise-user-email");
    localStorage.removeItem("pennywise-user-name");
    localStorage.removeItem("pennywise-user-id");
    localStorage.removeItem("pennywise-access-token");

    router.replace("/login");
  }

  return (
    <button
      type="button"
      onClick={handleSignOut}
      className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-100"
    >
      Sign out
    </button>
  );
}
