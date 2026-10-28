
"use client";

import Link from "next/link";
import { useState } from "react";

export default function ResetPasswordPage() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setMessage("");

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Enter a valid email address.");
      return;
    }

    setMessage(
      "Demo only: the email is valid. No reset email has been sent because password recovery is not connected."
    );
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#f6f7fb] p-5">
      <section className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-8 shadow-sm sm:p-10">
        <Link href="/" className="text-xl font-bold text-indigo-600">
          PennyWise
        </Link>

        <h1 className="mt-8 text-3xl font-bold tracking-tight text-slate-900">
          Reset password
        </h1>
        <p className="mt-2 text-sm leading-6 text-slate-500">
          Enter your registered email address to begin the password recovery process.
        </p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
          <div>
            <label htmlFor="email" className="mb-2 block text-sm font-medium">
              Email address
            </label>
            <input
              id="email"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
              className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-indigo-500"
            />
          </div>

          {error && (
            <p role="alert" className="rounded-lg bg-rose-50 p-3 text-sm text-rose-700">
              {error}
            </p>
          )}

          {message && (
            <p role="status" className="rounded-lg bg-amber-50 p-3 text-sm leading-6 text-amber-800">
              {message}
            </p>
          )}

          <button
            type="submit"
            className="w-full rounded-xl bg-indigo-600 py-3 font-semibold text-white transition hover:bg-indigo-700"
          >
            Continue
          </button>
        </form>

        <p className="mt-7 text-center text-sm text-slate-500">
          Remember your password?{" "}
          <Link href="/login" className="font-semibold text-indigo-600 hover:underline">
            Back to login
          </Link>
        </p>
      </section>
    </main>
  );
}
