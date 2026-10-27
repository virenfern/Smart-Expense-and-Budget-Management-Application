
"use client";

import { useState } from "react";
import Link from "next/link";

export default function ResetPasswordPage() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setMessage(
      "If an account exists for this email, password reset instructions will be sent."
    );
    setSubmitted(true);
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-100 px-4 py-10">
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl sm:p-10">
        <Link
          href="/login"
          className="text-sm font-medium text-emerald-700 hover:underline"
        >
          ← Back to login
        </Link>

        <div className="mt-8 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 text-2xl">
          ✉
        </div>

        <h1 className="mt-6 text-3xl font-bold text-slate-900">
          Forgot password?
        </h1>

        <p className="mt-3 text-sm leading-6 text-slate-500">
          No worries! Enter the email address associated with your account.
          We&apos;ll help you reset your password.
        </p>

        {!submitted ? (
          <form onSubmit={handleSubmit} className="mt-8 space-y-5">
            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-medium text-slate-700"
              >
                Email address
              </label>

              <input
                id="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full rounded-lg border border-slate-300 px-4 py-3 text-slate-900 outline-none transition focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
              />
            </div>

            <button
              type="submit"
              className="w-full rounded-lg bg-emerald-700 px-4 py-3 font-semibold text-white transition hover:bg-emerald-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
            >
              Send reset instructions
            </button>
          </form>
        ) : (
          <div
            role="status"
            className="mt-8 rounded-lg border border-emerald-200 bg-emerald-50 p-4"
          >
            <p className="font-medium text-emerald-800">
              Check your email
            </p>
            <p className="mt-2 text-sm leading-6 text-emerald-700">
              {message}
            </p>
            <button
              type="button"
              onClick={() => {
                setSubmitted(false);
                setMessage("");
              }}
              className="mt-4 text-sm font-semibold text-emerald-800 hover:underline"
            >
              Try another email
            </button>
          </div>
        )}

        <p className="mt-8 text-center text-sm text-slate-600">
          Remember your password?{" "}
          <Link
            href="/login"
            className="font-semibold text-emerald-700 hover:underline"
          >
            Sign in
          </Link>
        </p>

        <p className="mt-6 text-center text-xs text-slate-400">
          PennyWise · Smart Expense &amp; Budget Management
        </p>
      </div>
    </main>
  );
}
