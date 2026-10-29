"use client";

import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#f6f7fb] p-5">
      <section className="w-full max-w-lg rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm sm:p-10">
        <p className="text-sm font-semibold uppercase tracking-[0.22em] text-indigo-600">
          PennyWise
        </p>

        <h1 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
          Welcome to smart money management
        </h1>

        <p className="mt-3 text-sm text-slate-500 sm:text-base">
          Please sign in to continue, or create a new account to get started.
        </p>

        <div className="mt-8 grid gap-3 sm:grid-cols-2">
          <Link
            href="/login"
            className="rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-700"
          >
            Log in
          </Link>

          <Link
            href="/register"
            className="rounded-xl border border-indigo-200 bg-indigo-50 px-5 py-3 text-sm font-semibold text-indigo-700 transition hover:bg-indigo-100"
          >
            Sign up
          </Link>
        </div>

        <p className="mt-6 text-xs text-slate-400">
          Your account and password are handled by the backend API.
        </p>
      </section>
    </main>
  );
}