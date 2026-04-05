import { IndianRupee, TrendingUp, TrendingDown } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface SummaryCardsProps {
  balance: number;
  totalIncome: number;
  totalExpenses: number;
}

export function SummaryCards({ balance, totalIncome, totalExpenses }: SummaryCardsProps) {
  const cards = [
    {
      label: "Total Balance",
      value: balance,
      icon: IndianRupee,
      className: "bg-primary text-primary-foreground",
      iconBg: "bg-primary-foreground/20",
    },
    {
      label: "Total Income",
      value: totalIncome,
      icon: TrendingUp,
      className: "bg-card text-card-foreground",
      iconBg: "bg-income/15",
      iconColor: "text-income-foreground",
    },
    {
      label: "Total Expenses",
      value: totalExpenses,
      icon: TrendingDown,
      className: "bg-card text-card-foreground",
      iconBg: "bg-expense/15",
      iconColor: "text-expense-foreground",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
      {cards.map((c) => (
        <Card key={c.label} className={`${c.className} border-0 shadow-sm`}>
          <CardContent className="flex items-center gap-4 p-6">
            <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${c.iconBg}`}>
              <c.icon className={`h-6 w-6 ${c.iconColor || ""}`} />
            </div>
            <div>
              <p className="text-sm font-medium opacity-70">{c.label}</p>
              <p className="text-2xl font-bold tracking-tight font-mono">
                ₹{c.value.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
