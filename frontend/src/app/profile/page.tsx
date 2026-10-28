
"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type Preferences = {
  name: string;
  email: string;
  currency: string;
  theme: string;
  notifications: boolean;
};

const defaults: Preferences = {
  name: "",
  email: "",
  currency: "INR",
  theme: "light",
  notifications: true,
};

const STORAGE_KEY = "pennywise-profile";

export default function ProfilePage() {
  const [profile, setProfile] = useState<Preferences>(defaults);
  const [savedProfile, setSavedProfile] = useState<Preferences>(defaults);
  const [loaded, setLoaded] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);

      if (stored) {
        const parsed = JSON.parse(stored);
        const restored = { ...defaults, ...parsed };
        setProfile(restored);
        setSavedProfile(restored);
      }
    } catch {
      // Keep default preferences if stored data is invalid.
    }

    setLoaded(true);
  }, []);

  useEffect(() => {
    if (!loaded) return;

    document.documentElement.dataset.theme = profile.theme;
  }, [profile.theme, loaded]);

  function handleSave(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setMessage("");

    if (profile.name.trim().length < 2) {
      setError("Enter a valid name.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(profile.email)) {
      setError("Enter a valid email address.");
      return;
    }

    try {
      const cleaned = { ...profile, name: profile.name.trim(), email: profile.email.trim() };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(cleaned));
      setProfile(cleaned);
      setSavedProfile(cleaned);
      setMessage("Preferences saved in this browser.");
    } catch {
      setError("Could not save preferences in this browser.");
    }
  }

  function handleCancel() {
    setProfile(savedProfile);
    setError("");
    setMessage("");
  }

  return (
    <main className="min-h-screen bg-[#f6f7fb] p-5 text-slate-800 md:p-9">
      <div className="mx-auto max-w-4xl">
        <header className="mb-8">
          <Link href="/" className="text-sm font-semibold text-indigo-600 hover:underline">
            ← Back to dashboard
          </Link>
          <p className="mt-5 text-sm text-slate-500">PennyWise / Settings</p>
          <h1 className="mt-1 text-3xl font-bold tracking-tight">Profile & settings</h1>
          <p className="mt-2 text-sm text-slate-500">
            Manage your profile and application preferences.
          </p>
        </header>

        <form onSubmit={handleSave} className="space-y-6">
          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <h2 className="text-lg font-bold">Personal information</h2>
            <p className="mt-1 text-sm text-slate-500">
              These details are stored locally for this frontend demo.
            </p>

            <div className="mt-6 grid gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="name" className="mb-2 block text-sm font-medium">
                  Full name
                </label>
                <input
                  id="name"
                  value={profile.name}
                  onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                  placeholder="Your full name"
                  maxLength={100}
                  required
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label htmlFor="email" className="mb-2 block text-sm font-medium">
                  Email address
                </label>
                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  value={profile.email}
                  onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                  placeholder="you@example.com"
                  required
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-indigo-500"
                />
              </div>
            </div>
          </section>

          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <h2 className="text-lg font-bold">Preferences</h2>
            <p className="mt-1 text-sm text-slate-500">
              Choose how financial information should be displayed.
            </p>

            <div className="mt-6 grid gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="currency" className="mb-2 block text-sm font-medium">
                  Currency
                </label>
                <select
                  id="currency"
                  value={profile.currency}
                  onChange={(e) => setProfile({ ...profile, currency: e.target.value })}
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-indigo-500"
                >
                  <option value="INR">Indian Rupee (₹)</option>
                  <option value="USD">US Dollar ($)</option>
                  <option value="EUR">Euro (€)</option>
                  <option value="GBP">British Pound (£)</option>
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium">
                  Appearance preference
                </label>
                
                <button
                  type="button"
                  onClick={() => {
                    const nextTheme = profile.theme === "dark" ? "light" : "dark";
                    const updated = { ...profile, theme: nextTheme };
                  
                    setProfile(updated);
                    setSavedProfile(updated);
                    document.documentElement.dataset.theme = nextTheme;
                  
                    try {
                      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
                    } catch {
                      // ignore storage errors
                    }
                  }}
                  className="inline-flex w-full items-center justify-between rounded-xl border border-slate-200 bg-white px-4 py-3 text-left text-sm font-medium text-slate-700 shadow-sm transition hover:bg-slate-50"
                >
                  <span>{profile.theme === "dark" ? "Dark mode enabled" : "Dark mode disabled"}</span>
                  <span className="rounded-full bg-slate-100 px-2 py-1 text-xs text-slate-600">
                    {profile.theme === "dark" ? "Switch to light" : "Switch to dark"}
                  </span>
                </button>
                
                <p className="mt-2 text-xs text-slate-400">
                  This saves your theme in the browser and updates the app immediately.
                </p>
              </div>
            </div>

            <label className="mt-6 flex cursor-pointer items-start gap-3 rounded-xl bg-slate-50 p-4">
              <input
                type="checkbox"
                checked={profile.notifications}
                onChange={(e) =>
                  setProfile({ ...profile, notifications: e.target.checked })
                }
                className="mt-1 accent-indigo-600"
              />
              <span>
                <span className="block text-sm font-medium">Enable notifications</span>
                <span className="mt-1 block text-xs text-slate-500">
                  Preference only. No notifications are sent by this demo.
                </span>
              </span>
            </label>
          </section>

          {error && (
            <p role="alert" className="rounded-xl bg-rose-50 p-4 text-sm text-rose-700">
              {error}
            </p>
          )}

          {message && (
            <p role="status" className="rounded-xl bg-emerald-50 p-4 text-sm text-emerald-700">
              {message}
            </p>
          )}

          <div className="flex flex-wrap gap-3">
            <button
              type="submit"
              className="rounded-xl bg-indigo-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700"
            >
              Save changes
            </button>

            <button
              type="button"
              onClick={handleCancel}
              className="rounded-xl border border-slate-200 bg-white px-6 py-3 text-sm font-semibold hover:bg-slate-50"
            >
              Cancel
            </button>
          </div>
        </form>

        <p className="mt-8 text-center text-xs text-slate-400">
          PennyWise · Demo profile settings. No authentication is connected.
        </p>
      </div>
    </main>
  );
}
