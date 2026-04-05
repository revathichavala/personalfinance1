import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface BalanceChartProps {
  data: { date: string; balance: number }[];
}

export function BalanceChart({ data }: BalanceChartProps) {
  return (
    <Card className="border-0 shadow-sm">
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-semibold">Balance Trend</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[280px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ top: 5, right: 10, left: 10, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis
                dataKey="date"
                tick={{ fontSize: 11, fill: "var(--color-muted-foreground)" }}
                tickFormatter={(v) => new Date(v).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
              />
              <YAxis
                tick={{ fontSize: 11, fill: "var(--color-muted-foreground)" }}
                tickFormatter={(v) => `₹${(v / 1000).toFixed(1)}k`}
              />
              <Tooltip
                contentStyle={{
                  background: "var(--color-card)",
                  border: "1px solid var(--color-border)",
                  borderRadius: "0.5rem",
                  fontSize: 13,
                }}
                formatter={(value: number) => [`₹${value.toLocaleString("en-IN")}`, "Balance"]}
                labelFormatter={(label) => new Date(label).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
              />
              <Line
                type="monotone"
                dataKey="balance"
                stroke="var(--color-chart-1)"
                strokeWidth={2.5}
                dot={false}
                activeDot={{ r: 5, fill: "var(--color-chart-1)" }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
