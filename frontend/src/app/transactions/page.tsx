
"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

type Transaction = {
  id: number;
  title: string;
  category: string;
  date: string;
  amount: number;
  type: "Income" | "Expense";
};

const initialTransactions: Transaction[] = [
  { id: 1, title: "Monthly Salary", category: "Salary", date: "2026-10-25", amount: 45000, type: "Income" },
  { id: 2, title: "Grocery Shopping", category: "Food", date: "2026-10-24", amount: 1850, type: "Expense" },
  { id: 3, title: "Electricity Bill", category: "Utilities", date: "2026-10-22", amount: 1200, type: "Expense" },
  { id: 4, title: "Freelance Payment", category: "Freelance", date: "2026-10-20", amount: 8000, type: "Income" },
  { id: 5, title: "Bus Pass", category: "Transport", date: "2026-10-18", amount: 650, type: "Expense" },
];

const money = (amount: number) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 2,
  }).format(amount);

export default function TransactionsPage() {
  const [transactions, setTransactions] =
    useState<Transaction[]>(initialTransactions);
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("All");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Food");
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [amount, setAmount] = useState("");
  const [type, setType] = useState<"Income" | "Expense">("Expense");
  const [error, setError] = useState("");

  const categories = [
    "Food",
    "Transport",
    "Shopping",
    "Utilities",
    "Salary",
    "Freelance",
    "Entertainment",
    "Healthcare",
    "Other",
  ];

  const filteredTransactions = useMemo(() => {
    return transactions.filter((transaction) => {
      const matchesSearch =
        transaction.title.toLowerCase().includes(search.toLowerCase()) ||
        transaction.category.toLowerCase().includes(search.toLowerCase());

      const matchesType =
        typeFilter === "All" || transaction.type === typeFilter;

      const matchesCategory =
        categoryFilter === "All" ||
        transaction.category === categoryFilter;

      return matchesSearch && matchesType && matchesCategory;
    });
  }, [transactions, search, typeFilter, categoryFilter]);

  const totalIncome = transactions
    .filter((transaction) => transaction.type === "Income")
    .reduce((sum, transaction) => sum + transaction.amount, 0);

  const totalExpenses = transactions
    .filter((transaction) => transaction.type === "Expense")
    .reduce((sum, transaction) => sum + transaction.amount, 0);

  function addTransaction(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const numericAmount = Number(amount);

    if (!title.trim() || !amount || numericAmount <= 0) {
      setError("Enter a description and a valid amount greater than zero.");
      return;
    }

    const newTransaction: Transaction = {
      id: Date.now(),
      title: title.trim(),
      category,
      date,
      amount: numericAmount,
      type,
    };

    setTransactions((current) => [newTransaction, ...current]);
    setTitle("");
    setAmount("");
    setCategory("Food");
    setDate(new Date().toISOString().slice(0, 10));
    setType("Expense");
    setError("");
    setShowForm(false);
  }

  function deleteTransaction(id: number) {
    if (window.confirm("Delete this transaction?")) {
      setTransactions((current) =>
        current.filter((transaction) => transaction.id !== id)
      );
    }
  }

  return (
    <main className="min-h-screen bg-slate-50 p-5 text-slate-800 sm:p-8">
      <div className="mx-auto max-w-7xl">
        <header className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <p className="mb-1 text-sm font-medium text-indigo-600">
              PENNYWISE / FINANCES
            </p>
            <Link
                href="/"
                className="mb-4 inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-50"
            >
              <span aria-hidden="true">←</span>
                Back to Dashboard
            </Link>
            <h1 className="text-3xl font-bold tracking-tight">
              Transactions
            </h1>
            <p className="mt-2 text-slate-500">
              Track and manage your income and expenses.
            </p>
          </div>

          <button
            onClick={() => {
              setShowForm(!showForm);
              setError("");
            }}
            className="rounded-xl bg-indigo-600 px-5 py-3 font-semibold text-white shadow-sm transition hover:bg-indigo-700"
          >
            {showForm ? "Cancel" : "+ Add Transaction"}
          </button>
        </header>

        <section className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-sm text-slate-500">Total Income</p>
            <p className="mt-3 text-2xl font-bold text-emerald-600">
              {money(totalIncome)}
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-sm text-slate-500">Total Expenses</p>
            <p className="mt-3 text-2xl font-bold text-rose-600">
              {money(totalExpenses)}
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:col-span-2 lg:col-span-1">
            <p className="text-sm text-slate-500">Net Balance</p>
            <p
              className={`mt-3 text-2xl font-bold ${
                totalIncome - totalExpenses >= 0
                  ? "text-indigo-600"
                  : "text-rose-600"
              }`}
            >
              {money(totalIncome - totalExpenses)}
            </p>
          </div>
        </section>

        {showForm && (
          <section className="mb-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="mb-5 text-xl font-bold">Add a transaction</h2>

            <form onSubmit={addTransaction} className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              <div>
                <label className="mb-2 block text-sm font-medium">
                  Description
                </label>
                <input
                  value={title}
                  onChange={(event) => setTitle(event.target.value)}
                  placeholder="e.g. Grocery shopping"
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-indigo-500"
                  required
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium">
                  Amount (₹)
                </label>
                <input
                  type="number"
                  min="0.01"
                  step="0.01"
                  value={amount}
                  onChange={(event) => setAmount(event.target.value)}
                  placeholder="Enter amount"
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-indigo-500"
                  required
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium">Type</label>
                <select
                  value={type}
                  onChange={(event) =>
                    setType(event.target.value as "Income" | "Expense")
                  }
                  className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3"
                >
                  <option value="Expense">Expense</option>
                  <option value="Income">Income</option>
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium">
                  Category
                </label>
                <select
                  value={category}
                  onChange={(event) => setCategory(event.target.value)}
                  className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3"
                >
                  {categories.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium">Date</label>
                <input
                  type="date"
                  value={date}
                  onChange={(event) => setDate(event.target.value)}
                  className="w-full rounded-xl border border-slate-300 px-4 py-3"
                  required
                />
              </div>

              <div className="flex items-end">
                <button
                  type="submit"
                  className="w-full rounded-xl bg-indigo-600 px-5 py-3 font-semibold text-white hover:bg-indigo-700"
                >
                  Save Transaction
                </button>
              </div>

              {error && (
                <p className="text-sm text-rose-600 sm:col-span-2 lg:col-span-3">
                  {error}
                </p>
              )}
            </form>
          </section>
        )}

        <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-200 p-5">
            <h2 className="text-xl font-bold">All Transactions</h2>
            <p className="mt-1 text-sm text-slate-500">
              {filteredTransactions.length} transaction(s) found
            </p>

            <div className="mt-5 grid gap-3 md:grid-cols-3">
              <input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search description or category..."
                className="rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-indigo-500"
              />

              <select
                value={typeFilter}
                onChange={(event) => setTypeFilter(event.target.value)}
                className="rounded-xl border border-slate-300 bg-white px-4 py-3"
              >
                <option value="All">All transaction types</option>
                <option value="Income">Income only</option>
                <option value="Expense">Expenses only</option>
              </select>

              <select
                value={categoryFilter}
                onChange={(event) => setCategoryFilter(event.target.value)}
                className="rounded-xl border border-slate-300 bg-white px-4 py-3"
              >
                <option value="All">All categories</option>
                {categories.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[720px] text-left text-sm">
              <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
                <tr>
                  <th className="px-6 py-4">Description</th>
                  <th className="px-6 py-4">Category</th>
                  <th className="px-6 py-4">Date</th>
                  <th className="px-6 py-4">Type</th>
                  <th className="px-6 py-4 text-right">Amount</th>
                  <th className="px-6 py-4 text-right">Action</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">
                {filteredTransactions.map((transaction) => (
                  <tr key={transaction.id} className="hover:bg-slate-50">
                    <td className="px-6 py-4 font-semibold">
                      {transaction.title}
                    </td>
                    <td className="px-6 py-4 text-slate-600">
                      {transaction.category}
                    </td>
                    <td className="px-6 py-4 text-slate-600">
                      {transaction.date}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold ${
                          transaction.type === "Income"
                            ? "bg-emerald-100 text-emerald-700"
                            : "bg-rose-100 text-rose-700"
                        }`}
                      >
                        {transaction.type}
                      </span>
                    </td>
                    <td
                      className={`px-6 py-4 text-right font-semibold ${
                        transaction.type === "Income"
                          ? "text-emerald-600"
                          : "text-rose-600"
                      }`}
                    >
                      {transaction.type === "Income" ? "+" : "-"}
                      {money(transaction.amount)}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button
                        onClick={() => deleteTransaction(transaction.id)}
                        className="font-medium text-rose-600 hover:text-rose-800"
                        aria-label={`Delete ${transaction.title}`}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}

                {filteredTransactions.length === 0 && (
                  <tr>
                    <td
                      colSpan={6}
                      className="px-6 py-12 text-center text-slate-500"
                    >
                      No transactions found. Try changing your search or filters.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>

        <p className="mt-5 text-sm text-slate-500">
          Demo data only: transactions are stored in browser memory and reset
          when this page is refreshed. Backend integration is still required.
        </p>
      </div>
    </main>
  );
}
