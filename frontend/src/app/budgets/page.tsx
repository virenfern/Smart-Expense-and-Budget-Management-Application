
"use client";

import { useEffect, useMemo, useState } from "react";

type Budget = {
  id: string;
  name: string;
  category: string;
  limit: number;
  spent: number;
};

const STORAGE_KEY = "pennywise-budgets";

const categories = [
  "Food",
  "Transport",
  "Shopping",
  "Utilities",
  "Entertainment",
  "Health",
  "Education",
  "Other",
];

const initialBudgets: Budget[] = [
  { id: "1", name: "Food & Dining", category: "Food", limit: 10000, spent: 6500 },
  { id: "2", name: "Transport", category: "Transport", limit: 5000, spent: 2400 },
  { id: "3", name: "Shopping", category: "Shopping", limit: 6000, spent: 4200 },
];

const money = (amount: number) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);

export default function BudgetsPage() {
  const [budgets, setBudgets] = useState<Budget[]>(initialBudgets);
  const [loaded, setLoaded] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    name: "",
    category: "Food",
    limit: "",
  });

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved !== null) {
        const parsed: unknown = JSON.parse(saved);
        if (Array.isArray(parsed)) setBudgets(parsed as Budget[]);
      }
    } catch {
      // Keep the initial sample data if stored data cannot be read.
    }
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (loaded) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(budgets));
    }
  }, [budgets, loaded]);

  const totalLimit = useMemo(
    () => budgets.reduce((sum, budget) => sum + budget.limit, 0),
    [budgets]
  );

  const totalSpent = useMemo(
    () => budgets.reduce((sum, budget) => sum + budget.spent, 0),
    [budgets]
  );

  function openCreateForm() {
    setEditingId(null);
    setForm({ name: "", category: "Food", limit: "" });
    setError("");
    setShowForm(true);
  }

  function openEditForm(budget: Budget) {
    setEditingId(budget.id);
    setForm({
      name: budget.name,
      category: budget.category,
      limit: String(budget.limit),
    });
    setError("");
    setShowForm(true);
  }

  function saveBudget(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const name = form.name.trim();
    const limit = Number(form.limit);

    if (!name) {
      setError("Enter a name for this budget.");
      return;
    }

    if (!Number.isFinite(limit) || limit <= 0) {
      setError("The spending limit must be greater than zero.");
      return;
    }

    const duplicate = budgets.some(
      (budget) =>
        budget.category === form.category &&
        budget.id !== editingId
    );

    if (duplicate) {
      setError("A budget for this category already exists.");
      return;
    }

    if (editingId) {
      setBudgets((current) =>
        current.map((budget) =>
          budget.id === editingId
            ? { ...budget, name, category: form.category, limit }
            : budget
        )
      );
    } else {
      setBudgets((current) => [
        ...current,
        {
          id: crypto.randomUUID(),
          name,
          category: form.category,
          limit,
          spent: 0,
        },
      ]);
    }

    setShowForm(false);
    setError("");
  }

  function deleteBudget(id: string) {
    if (!window.confirm("Delete this budget? This action cannot be undone.")) {
      return;
    }

    setBudgets((current) => current.filter((budget) => budget.id !== id));
  }

  return (
    <main className="min-h-screen bg-[#f6f7fb] p-5 text-slate-800 md:p-9">
      <div className="mx-auto max-w-6xl">
        <header className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="mb-1 text-sm text-slate-500">
              PennyWise / Budgets
            </p>
            <h1 className="text-3xl font-bold tracking-tight">
              Your budgets
            </h1>
            <p className="mt-2 text-sm text-slate-500">
              Set spending limits and keep your expenses in check.
            </p>
          </div>

          <button
            onClick={openCreateForm}
            className="rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white hover:bg-indigo-700"
          >
            + Create budget
          </button>
        </header>

        <section className="mb-7 grid gap-4 sm:grid-cols-3">
          <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm text-slate-500">Total budget</p>
            <p className="mt-3 text-2xl font-bold">{money(totalLimit)}</p>
            <p className="mt-2 text-xs text-slate-400">
              Across {budgets.length} budget{budgets.length === 1 ? "" : "s"}
            </p>
          </article>

          <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm text-slate-500">Total spent</p>
            <p className="mt-3 text-2xl font-bold text-indigo-600">
              {money(totalSpent)}
            </p>
            <p className="mt-2 text-xs text-slate-400">
              Based on current budget figures
            </p>
          </article>

          <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm text-slate-500">Remaining budget</p>
            <p
              className={`mt-3 text-2xl font-bold ${
                totalLimit - totalSpent < 0
                  ? "text-rose-600"
                  : "text-emerald-600"
              }`}
            >
              {money(totalLimit - totalSpent)}
            </p>
            <p className="mt-2 text-xs text-slate-400">
              Total limits minus total spending
            </p>
          </article>
        </section>

        {showForm && (
          <section className="mb-7 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="mb-5 text-lg font-bold">
              {editingId ? "Edit budget" : "Create a budget"}
            </h2>

            <form onSubmit={saveBudget} className="grid gap-4 sm:grid-cols-3">
              <div>
                <label htmlFor="budget-name" className="mb-2 block text-sm font-medium">
                  Budget name
                </label>
                <input
                  id="budget-name"
                  value={form.name}
                  onChange={(event) =>
                    setForm({ ...form, name: event.target.value })
                  }
                  placeholder="e.g. Monthly groceries"
                  maxLength={60}
                  required
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                />
              </div>

              <div>
                <label htmlFor="budget-category" className="mb-2 block text-sm font-medium">
                  Category
                </label>
                <select
                  id="budget-category"
                  value={form.category}
                  onChange={(event) =>
                    setForm({ ...form, category: event.target.value })
                  }
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-indigo-500"
                >
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="budget-limit" className="mb-2 block text-sm font-medium">
                  Spending limit (₹)
                </label>
                <input
                  id="budget-limit"
                  type="number"
                  min="1"
                  step="1"
                  value={form.limit}
                  onChange={(event) =>
                    setForm({ ...form, limit: event.target.value })
                  }
                  placeholder="10000"
                  required
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-indigo-500"
                />
              </div>

              {error && (
                <p role="alert" className="text-sm text-rose-600 sm:col-span-3">
                  {error}
                </p>
              )}

              <div className="flex gap-3 sm:col-span-3">
                <button
                  type="submit"
                  className="rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white hover:bg-indigo-700"
                >
                  {editingId ? "Save changes" : "Create budget"}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowForm(false);
                    setError("");
                  }}
                  className="rounded-xl border border-slate-200 px-5 py-3 text-sm font-semibold hover:bg-slate-50"
                >
                  Cancel
                </button>
              </div>
            </form>
          </section>
        )}

        <section>
          <div className="mb-4">
            <h2 className="text-lg font-bold">Your spending limits</h2>
            <p className="mt-1 text-sm text-slate-500">
              Review each category and its remaining allowance.
            </p>
          </div>

          {budgets.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-14 text-center">
              <h3 className="font-semibold">No budgets yet</h3>
              <p className="mt-2 text-sm text-slate-500">
                Create your first budget to start tracking spending.
              </p>
              <button
                onClick={openCreateForm}
                className="mt-5 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white hover:bg-indigo-700"
              >
                Create your first budget
              </button>
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2">
              {budgets.map((budget) => {
                const percentage =
                  budget.limit > 0
                    ? Math.round((budget.spent / budget.limit) * 100)
                    : 0;
                const remaining = budget.limit - budget.spent;
                const overBudget = remaining < 0;
                const warning = percentage >= 80;

                return (
                  <article
                    key={budget.id}
                    className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-wide text-indigo-600">
                          {budget.category}
                        </p>
                        <h3 className="mt-2 text-lg font-bold">{budget.name}</h3>
                      </div>

                      <div className="flex gap-3 text-sm">
                        <button
                          onClick={() => openEditForm(budget)}
                          className="font-medium text-indigo-600 hover:text-indigo-800"
                          aria-label={`Edit ${budget.name}`}
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => deleteBudget(budget.id)}
                          className="font-medium text-rose-600 hover:text-rose-800"
                          aria-label={`Delete ${budget.name}`}
                        >
                          Delete
                        </button>
                      </div>
                    </div>

                    <div className="mt-6 flex items-end justify-between gap-3">
                      <div>
                        <p className="text-sm text-slate-500">Spent</p>
                        <p className="mt-1 text-xl font-bold">
                          {money(budget.spent)}
                        </p>
                      </div>
                      <p className="text-right text-sm text-slate-500">
                        Limit{" "}
                        <span className="font-semibold text-slate-800">
                          {money(budget.limit)}
                        </span>
                      </p>
                    </div>

                    <div
                      className="mt-4 h-2.5 overflow-hidden rounded-full bg-slate-100"
                      role="progressbar"
                      aria-label={`${budget.name} spending`}
                      aria-valuemin={0}
                      aria-valuemax={budget.limit}
                      aria-valuenow={budget.spent}
                    >
                      <div
                        className={`h-full rounded-full ${
                          overBudget
                            ? "bg-rose-500"
                            : warning
                              ? "bg-amber-500"
                              : "bg-indigo-600"
                        }`}
                        style={{
                          width: `${Math.min(percentage, 100)}%`,
                        }}
                      />
                    </div>

                    <div className="mt-3 flex flex-wrap justify-between gap-2 text-sm">
                      <span className={warning ? "font-medium text-amber-600" : "text-slate-500"}>
                        {percentage}% used
                      </span>
                      <span className={`font-semibold ${overBudget ? "text-rose-600" : "text-emerald-600"}`}>
                        {overBudget
                          ? `${money(Math.abs(remaining))} over budget`
                          : `${money(remaining)} remaining`}
                      </span>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </section>

        <p className="mt-8 text-center text-xs text-slate-400">
          PennyWise · Budget figures are stored locally in this browser.
          Spending amounts are sample data until transaction integration.
        </p>
      </div>
    </main>
  );
}
