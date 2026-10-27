
"use client";

import { useState } from "react";
import Link from "next/link";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [message, setMessage] = useState("");

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setMessage(
      "Login form validated! Backend authentication will be connected later."
    );
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-100 px-4 py-10">
      <div className="grid w-full max-w-5xl overflow-hidden rounded-2xl bg-white shadow-xl md:grid-cols-2">
        <section className="hidden flex-col justify-center bg-emerald-700 p-12 text-white md:flex">
          <p className="text-sm font-semibold uppercase tracking-[0.25em]">
            PennyWise
          </p>

          <h1 className="mt-6 text-4xl font-bold leading-tight">
            Welcome back.
          </h1>

          <p className="mt-5 leading-7 text-emerald-50">
            Take control of your spending, keep your budgets on track, and
            make smarter financial decisions.
          </p>

          <div className="mt-10 rounded-xl border border-emerald-500 bg-emerald-800/50 p-5">
            <p className="text-lg font-semibold">Your finances, simplified.</p>
            <p className="mt-2 text-sm text-emerald-100">
              Every expense tells a story. Make yours count.
            </p>
          </div>
        </section>

        <section className="p-6 sm:p-10">
          <div className="mb-8 md:hidden">
            <p className="text-sm font-bold uppercase tracking-widest text-emerald-700">
              PennyWise
            </p>
          </div>

          <h2 className="text-3xl font-bold text-slate-900">
            Sign in to your account
          </h2>

          <p className="mt-2 text-sm text-slate-500">
            Enter your credentials to continue.
          </p>

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

            <div>
              <div className="mb-2 flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-slate-700"
                >
                  Password
                </label>

                <Link
                  href="/reset-password"
                  className="text-sm font-medium text-emerald-700 hover:underline"
                >
                  Forgot password?
                </Link>
              </div>

              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full rounded-lg border border-slate-300 px-4 py-3 pr-20 text-slate-900 outline-none transition focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-sm font-medium text-emerald-700"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            <label className="flex cursor-pointer items-center gap-2 text-sm text-slate-600">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="h-4 w-4 rounded border-slate-300 accent-emerald-700"
              />
              Remember me
            </label>

            {message && (
              <p
                role="status"
                className="rounded-lg bg-emerald-50 p-3 text-sm text-emerald-800"
              >
                {message}
              </p>
            )}

            <button
              type="submit"
              className="w-full rounded-lg bg-emerald-700 px-4 py-3 font-semibold text-white transition hover:bg-emerald-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
            >
              Sign in
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-slate-600">
            Don&apos;t have an account?{" "}
            <Link
              href="/register"
              className="font-semibold text-emerald-700 hover:underline"
            >
              Create an account
            </Link>
          </p>

          <p className="mt-6 text-center text-xs text-slate-400">
            Secure access to your PennyWise dashboard.
          </p>
        </section>
      </div>
    </main>
  );
}
