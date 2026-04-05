export type TransactionType = "income" | "expense";
export type Role = "viewer" | "admin";

export interface Transaction {
  id: string;
  date: string;
  description: string;
  amount: number;
  category: string;
  type: TransactionType;
}

export const CATEGORIES = {
  income: ["Salary", "Freelance", "Investments", "Refund"],
  expense: ["Food", "Transport", "Shopping", "Bills", "Entertainment", "Health"],
};

export const INITIAL_TRANSACTIONS: Transaction[] = [
  { id: "1", date: "2025-01-05", description: "Monthly Salary", amount: 5200, category: "Salary", type: "income" },
  { id: "2", date: "2025-01-07", description: "Grocery Store", amount: 85.5, category: "Food", type: "expense" },
  { id: "3", date: "2025-01-10", description: "Netflix Subscription", amount: 15.99, category: "Entertainment", type: "expense" },
  { id: "4", date: "2025-01-12", description: "Freelance Project", amount: 1200, category: "Freelance", type: "income" },
  { id: "5", date: "2025-01-14", description: "Electric Bill", amount: 120, category: "Bills", type: "expense" },
  { id: "6", date: "2025-01-18", description: "Uber Ride", amount: 24.5, category: "Transport", type: "expense" },
  { id: "7", date: "2025-01-20", description: "Online Shopping", amount: 199.99, category: "Shopping", type: "expense" },
  { id: "8", date: "2025-01-22", description: "Gym Membership", amount: 45, category: "Health", type: "expense" },
  { id: "9", date: "2025-01-25", description: "Dividend Income", amount: 340, category: "Investments", type: "income" },
  { id: "10", date: "2025-01-28", description: "Restaurant Dinner", amount: 62, category: "Food", type: "expense" },
  { id: "11", date: "2025-02-03", description: "Monthly Salary", amount: 5200, category: "Salary", type: "income" },
  { id: "12", date: "2025-02-06", description: "Gas Station", amount: 55, category: "Transport", type: "expense" },
  { id: "13", date: "2025-02-09", description: "Phone Bill", amount: 79, category: "Bills", type: "expense" },
  { id: "14", date: "2025-02-15", description: "Freelance Design Work", amount: 800, category: "Freelance", type: "income" },
  { id: "15", date: "2025-02-18", description: "Clothing Store", amount: 150, category: "Shopping", type: "expense" },
  { id: "16", date: "2025-02-22", description: "Coffee Shops", amount: 38, category: "Food", type: "expense" },
  { id: "17", date: "2025-02-25", description: "Internet Bill", amount: 60, category: "Bills", type: "expense" },
  { id: "18", date: "2025-03-03", description: "Monthly Salary", amount: 5200, category: "Salary", type: "income" },
  { id: "19", date: "2025-03-08", description: "Concert Tickets", amount: 95, category: "Entertainment", type: "expense" },
  { id: "20", date: "2025-03-12", description: "Tax Refund", amount: 1500, category: "Refund", type: "income" },
];

export function computeSummary(transactions: Transaction[]) {
  const totalIncome = transactions.filter(t => t.type === "income").reduce((s, t) => s + t.amount, 0);
  const totalExpenses = transactions.filter(t => t.type === "expense").reduce((s, t) => s + t.amount, 0);
  return { totalIncome, totalExpenses, balance: totalIncome - totalExpenses };
}

export function getBalanceTrend(transactions: Transaction[]) {
  const sorted = [...transactions].sort((a, b) => a.date.localeCompare(b.date));
  let balance = 0;
  const points: { date: string; balance: number }[] = [];
  for (const t of sorted) {
    balance += t.type === "income" ? t.amount : -t.amount;
    points.push({ date: t.date, balance: Math.round(balance * 100) / 100 });
  }
  return points;
}

export function getSpendingByCategory(transactions: Transaction[]) {
  const map: Record<string, number> = {};
  for (const t of transactions.filter(t => t.type === "expense")) {
    map[t.category] = (map[t.category] || 0) + t.amount;
  }
  return Object.entries(map)
    .map(([category, amount]) => ({ category, amount: Math.round(amount * 100) / 100 }))
    .sort((a, b) => b.amount - a.amount);
}

export function getInsights(transactions: Transaction[]) {
  const spending = getSpendingByCategory(transactions);
  const highestCategory = spending[0] || null;
  const { totalIncome, totalExpenses } = computeSummary(transactions);
  
  const months: Record<string, number> = {};
  for (const t of transactions.filter(t => t.type === "expense")) {
    const month = t.date.substring(0, 7);
    months[month] = (months[month] || 0) + t.amount;
  }
  const monthlyExpenses = Object.entries(months).map(([month, total]) => ({
    month,
    total: Math.round(total * 100) / 100,
  }));

  return { highestCategory, totalIncome, totalExpenses, monthlyExpenses };
}
