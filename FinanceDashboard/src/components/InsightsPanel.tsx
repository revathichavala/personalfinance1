import { TrendingUp, ArrowDownRight, BarChart3 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface InsightsPanelProps {
  highestCategory: { category: string; amount: number } | null;
  totalIncome: number;
  totalExpenses: number;
  monthlyExpenses: { month: string; total: number }[];
}

export function InsightsPanel({ highestCategory, totalIncome, totalExpenses, monthlyExpenses }: InsightsPanelProps) {
  const savingsRate = totalIncome > 0 ? ((totalIncome - totalExpenses) / totalIncome * 100).toFixed(1) : "0";

  return (
    <Card className="border-0 shadow-sm">
      <CardHeader className="pb-3">
        <CardTitle className="text-base font-semibold">Insights</CardTitle>
      </CardHeader>
      <CardContent className="space-y-5">
        {highestCategory && (
          <div className="flex items-start gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-expense/15">
              <ArrowDownRight className="h-4 w-4 text-expense-foreground" />
            </div>
            <div>
              <p className="text-sm font-medium">Top Spending</p>
              <p className="text-xs text-muted-foreground">
                {highestCategory.category} — <span className="font-mono font-medium text-expense-foreground">₹{highestCategory.amount.toLocaleString("en-IN")}</span>
              </p>
            </div>
          </div>
        )}

        <div className="flex items-start gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-income/15">
            <TrendingUp className="h-4 w-4 text-income-foreground" />
          </div>
          <div>
            <p className="text-sm font-medium">Savings Rate</p>
            <p className="text-xs text-muted-foreground">
              You saved <span className="font-mono font-medium text-income-foreground">{savingsRate}%</span> of your income
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-chart-1/15">
            <BarChart3 className="h-4 w-4 text-chart-1" />
          </div>
          <div>
            <p className="text-sm font-medium">Income vs Expenses</p>
            <div className="mt-1.5 space-y-1.5">
              <div className="flex items-center gap-2 text-xs">
                <div className="h-2 rounded-full bg-income" style={{ width: "100%" }} />
                <span className="shrink-0 font-mono text-muted-foreground">₹{totalIncome.toLocaleString("en-IN")}</span>
              </div>
              <div className="flex items-center gap-2 text-xs">
                <div className="h-2 rounded-full bg-expense" style={{ width: `${totalIncome > 0 ? (totalExpenses / totalIncome * 100) : 0}%` }} />
                <span className="shrink-0 font-mono text-muted-foreground">₹{totalExpenses.toLocaleString("en-IN")}</span>
              </div>
            </div>
          </div>
        </div>

        {monthlyExpenses.length > 0 && (
          <div>
            <p className="mb-2 text-sm font-medium">Monthly Expenses</p>
            <div className="space-y-1.5">
              {monthlyExpenses.map((m) => (
                <div key={m.month} className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">
                    {new Date(m.month + "-01").toLocaleDateString("en-US", { month: "long", year: "numeric" })}
                  </span>
                  <span className="font-mono font-medium">₹{m.total.toLocaleString("en-IN")}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
