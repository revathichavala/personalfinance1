import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { SummaryCards } from "@/components/SummaryCards";
import { BalanceChart } from "@/components/BalanceChart";
import { SpendingChart } from "@/components/SpendingChart";
import { TransactionList } from "@/components/TransactionList";
import { InsightsPanel } from "@/components/InsightsPanel";
import { RoleSwitch } from "@/components/RoleSwitch";
import {
  INITIAL_TRANSACTIONS,
  computeSummary,
  getBalanceTrend,
  getSpendingByCategory,
  getInsights,
} from "@/lib/finance-data";
import type { Transaction, Role } from "@/lib/finance-data";

export const Route = createFileRoute("/")({
  component: Dashboard,
});

function Dashboard() {
  const [transactions, setTransactions] = useState<Transaction[]>(INITIAL_TRANSACTIONS);
  const [role, setRole] = useState<Role>("admin");

  const summary = computeSummary(transactions);
  const balanceTrend = getBalanceTrend(transactions);
  const spending = getSpendingByCategory(transactions);
  const insights = getInsights(transactions);

  function handleAdd(t: Omit<Transaction, "id">) {
    setTransactions((prev) => [{ ...t, id: crypto.randomUUID() }, ...prev]);
  }

  function handleEdit(updated: Transaction) {
    setTransactions((prev) => prev.map((t) => (t.id === updated.id ? updated : t)));
  }

  function handleDelete(id: string) {
    setTransactions((prev) => prev.filter((t) => t.id !== id));
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6">
          <div>
            <h1 className="text-xl font-bold tracking-tight">PersonalFinanceDashboard</h1>
          </div>
          <RoleSwitch role={role} onChange={setRole} />
        </div>
      </header>

      <main className="mx-auto max-w-7xl space-y-6 px-4 py-6 sm:px-6">
        <SummaryCards
          balance={summary.balance}
          totalIncome={summary.totalIncome}
          totalExpenses={summary.totalExpenses}
        />

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <BalanceChart data={balanceTrend} />
          <SpendingChart data={spending} />
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_320px]">
          <TransactionList
            transactions={transactions}
            role={role}
            onAdd={handleAdd}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
          <InsightsPanel
            highestCategory={insights.highestCategory}
            totalIncome={insights.totalIncome}
            totalExpenses={insights.totalExpenses}
            monthlyExpenses={insights.monthlyExpenses}
          />
        </div>
      </main>
    </div>
  );
}
