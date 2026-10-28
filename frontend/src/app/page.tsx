
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import SignOutButton from "@/components/SignOutButton";

const transactions = [
  {
    name: "Salary",
    category: "Income",
    date: "Oct 26, 2026",
    amount: 45000,
    type: "income",
  },
  {
    name: "Groceries",
    category: "Food",
    date: "Oct 25, 2026",
    amount: 1250,
    type: "expense",
  },
  {
    name: "Electricity Bill",
    category: "Utilities",
    date: "Oct 24, 2026",
    amount: 1800,
    type: "expense",
  },
  {
    name: "Freelance Work",
    category: "Income",
    date: "Oct 23, 2026",
    amount: 6500,
    type: "income",
  },
  {
    name: "Restaurant",
    category: "Food",
    date: "Oct 22, 2026",
    amount: 850,
    type: "expense",
  },
];

const budgets = [
  {
    name: "Food & Dining",
    spent: 6500,
    limit: 10000,
    color: "#6366f1",
  },
  {
    name: "Transport",
    spent: 2400,
    limit: 5000,
    color: "#0d9488",
  },
  {
    name: "Shopping",
    spent: 4200,
    limit: 6000,
    color: "#f59e0b",
  },
];

const money = (amount: number) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);

export default function Home() {
  const [active, setActive] = useState("Dashboard");
  const router = useRouter();

  const links = [
    ["▦", "Dashboard"],
    ["⇄", "Transactions"],
    ["◷", "Budgets"],
    ["▥", "Reports"],
    ["⚙", "Settings"],
  ];

  const totalIncome = transactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpenses = transactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);

  function handleNavigation(label: string) {
    if (label === "Settings") {
      router.push("/profile");
      return;
    }

    if (label === "Transactions") {
      router.push("/transactions");
      return;
    }

    setActive(label);
  }

  return (
    <main className="min-h-screen bg-[#f6f7fb] text-slate-800 md:flex">
      <aside className="flex w-full shrink-0 flex-col bg-white p-5 md:min-h-screen md:w-64 md:border-r md:border-slate-200">
        <div className="mb-8 flex items-center gap-3">
          <div className="grid h-10 w-10 place-items-center rounded-xl bg-indigo-600 text-xl font-bold text-white">
            ₹
          </div>
        
          <div>
            <h1 className="text-lg font-bold tracking-tight">PennyWise</h1>
            <p className="text-xs text-slate-500">Smart money management</p>
          </div>
        </div>
        
        <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-slate-400">
          Workspace
        </p>
        
        <nav aria-label="Main navigation" className="flex gap-2 overflow-x-auto md:flex-col">
          {links.map(([icon, label]) => (
            <button
              key={label}
              type="button"
              onClick={() => handleNavigation(label)}
              aria-current={active === label ? "page" : undefined}
              className={`flex min-w-fit items-center gap-3 rounded-xl px-4 py-3 text-left text-sm font-medium transition ${
                active === label
                  ? "bg-indigo-50 text-indigo-700"
                  : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
              }`}
            >
              <span className="text-lg" aria-hidden="true">
                {icon}
              </span>
              {label}
            </button>
          ))}
        </nav>
        
        <div className="mt-8 rounded-2xl bg-indigo-600 p-4 text-white">
          <p className="text-sm font-semibold">Your money, your goals.</p>
          <p className="mt-2 text-xs leading-5 text-indigo-100">
            Track spending and build better financial habits, one day at a time.
          </p>
        </div>
        
        <div className="mt-auto pt-6">
          <div className="flex justify-center">
            <SignOutButton />
          </div>
        </div>
      </aside>

      <section className="min-w-0 flex-1 p-5 md:p-9">
        <header className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="mb-1 text-sm text-slate-500">
              Monday, October 26, 2026
            </p>

            <h2 className="text-2xl font-bold tracking-tight md:text-3xl">
              {active === "Dashboard"
                ? "Your financial overview"
                : active}
            </h2>

            <p className="mt-2 text-sm text-slate-500">
              Here&apos;s how your money is looking.
            </p>
          </div>

          <button
            type="button"
            onClick={() => router.push("/transactions")}
            className="rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700"
          >
            + Add transaction
          </button>
        </header>

        <div className="mb-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          <article className="rounded-2xl bg-indigo-600 p-6 text-white shadow-sm">
            <p className="text-sm text-indigo-100">
              Total balance
            </p>
            <p className="mt-3 text-3xl font-bold">
              {money(82450)}
            </p>
            <p className="mt-3 text-xs text-indigo-100">
              Your available balance
            </p>
          </article>

          <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-sm text-slate-500">Total income</p>
            <p className="mt-3 text-3xl font-bold text-emerald-600">
              {money(totalIncome)}
            </p>
            <p className="mt-3 text-xs text-slate-400">
              From sample transactions
            </p>
          </article>

          <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-sm text-slate-500">
              Total expenses
            </p>
            <p className="mt-3 text-3xl font-bold text-rose-500">
              {money(totalExpenses)}
            </p>
            <p className="mt-3 text-xs text-slate-400">
              From sample transactions
            </p>
          </article>
        </div>

        <div className="grid gap-6 xl:grid-cols-[1.4fr_1fr]">
          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-5 flex items-center justify-between">
              <div>
                <h3 className="font-bold">
                  Recent transactions
                </h3>
                <p className="mt-1 text-xs text-slate-500">
                  Your latest money movements
                </p>
              </div>

              <button
                type="button"
                onClick={() => router.push("/transactions")}
                className="text-sm font-semibold text-indigo-600 hover:text-indigo-800"
              >
                View all
              </button>
            </div>

            <div className="space-y-5">
              {transactions.map((t, i) => (
                <div
                  key={`${t.name}-${i}`}
                  className="flex items-center justify-between gap-3"
                >
                  <div className="flex min-w-0 items-center gap-3">
                    <div
                      className={`grid h-10 w-10 shrink-0 place-items-center rounded-xl text-lg ${
                        t.type === "income"
                          ? "bg-emerald-50 text-emerald-600"
                          : "bg-slate-100 text-slate-600"
                      }`}
                    >
                      {t.type === "income" ? "↙" : "↗"}
                    </div>

                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold">
                        {t.name}
                      </p>
                      <p className="mt-1 text-xs text-slate-400">
                        {t.category} · {t.date}
                      </p>
                    </div>
                  </div>

                  <p
                    className={`shrink-0 text-sm font-bold ${
                      t.type === "income"
                        ? "text-emerald-600"
                        : "text-slate-800"
                    }`}
                  >
                    {t.type === "income" ? "+" : "−"}
                    {money(t.amount)}
                  </p>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-6">
              <h3 className="font-bold">Monthly budgets</h3>
              <p className="mt-1 text-xs text-slate-500">
                Your spending against each limit
              </p>
            </div>

            <div className="space-y-7">
              {budgets.map((b) => {
                const percentage = Math.round(
                  (b.spent / b.limit) * 100
                );

                return (
                  <div key={b.name}>
                    <div className="mb-2 flex justify-between gap-3 text-sm">
                      <span className="font-medium">
                        {b.name}
                      </span>
                      <span className="text-slate-500">
                        {percentage}%
                      </span>
                    </div>

                    <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                      <div
                        className="h-full rounded-full"
                        style={{
                          width: `${percentage}%`,
                          backgroundColor: b.color,
                        }}
                      />
                    </div>

                    <div className="mt-2 flex justify-between text-xs text-slate-500">
                      <span>{money(b.spent)} spent</span>
                      <span>Limit {money(b.limit)}</span>
                    </div>
                  </div>
                );
              })}
            </div>

            <button
              type="button"
              onClick={() => router.push("/budgets")}
              className="mt-7 w-full rounded-xl border border-slate-200 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50"
            >
              Manage budgets
            </button>
          </section>
        </div>

        <p className="mt-7 text-center text-xs text-slate-400">
          PennyWise · Smart Expense &amp; Budget Management
        </p>
      </section>
    </main>
  );
}
