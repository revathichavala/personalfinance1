import { jsx, jsxs } from "react/jsx-runtime";
import * as React from "react";
import { useState } from "react";
import { IndianRupee, TrendingUp, TrendingDown, ChevronDown, Check, ChevronUp, X, Plus, Search, ArrowUpDown, Pencil, Trash2, ArrowDownRight, BarChart3, Shield, Eye } from "lucide-react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { ResponsiveContainer, LineChart, CartesianGrid, XAxis, YAxis, Tooltip, Line, BarChart, Bar, Cell } from "recharts";
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";
import * as SelectPrimitive from "@radix-ui/react-select";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import * as LabelPrimitive from "@radix-ui/react-label";
function cn(...inputs) {
  return twMerge(clsx(inputs));
}
const Card = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  "div",
  {
    ref,
    className: cn(
      "rounded-xl border bg-card text-card-foreground shadow",
      className
    ),
    ...props
  }
));
Card.displayName = "Card";
const CardHeader = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  "div",
  {
    ref,
    className: cn("flex flex-col space-y-1.5 p-6", className),
    ...props
  }
));
CardHeader.displayName = "CardHeader";
const CardTitle = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  "div",
  {
    ref,
    className: cn("font-semibold leading-none tracking-tight", className),
    ...props
  }
));
CardTitle.displayName = "CardTitle";
const CardDescription = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  "div",
  {
    ref,
    className: cn("text-sm text-muted-foreground", className),
    ...props
  }
));
CardDescription.displayName = "CardDescription";
const CardContent = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx("div", { ref, className: cn("p-6 pt-0", className), ...props }));
CardContent.displayName = "CardContent";
const CardFooter = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  "div",
  {
    ref,
    className: cn("flex items-center p-6 pt-0", className),
    ...props
  }
));
CardFooter.displayName = "CardFooter";
function SummaryCards({ balance, totalIncome, totalExpenses }) {
  const cards = [
    {
      label: "Total Balance",
      value: balance,
      icon: IndianRupee,
      className: "bg-primary text-primary-foreground",
      iconBg: "bg-primary-foreground/20"
    },
    {
      label: "Total Income",
      value: totalIncome,
      icon: TrendingUp,
      className: "bg-card text-card-foreground",
      iconBg: "bg-income/15",
      iconColor: "text-income-foreground"
    },
    {
      label: "Total Expenses",
      value: totalExpenses,
      icon: TrendingDown,
      className: "bg-card text-card-foreground",
      iconBg: "bg-expense/15",
      iconColor: "text-expense-foreground"
    }
  ];
  return /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 gap-4 sm:grid-cols-3", children: cards.map((c) => /* @__PURE__ */ jsx(Card, { className: `${c.className} border-0 shadow-sm`, children: /* @__PURE__ */ jsxs(CardContent, { className: "flex items-center gap-4 p-6", children: [
    /* @__PURE__ */ jsx("div", { className: `flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${c.iconBg}`, children: /* @__PURE__ */ jsx(c.icon, { className: `h-6 w-6 ${c.iconColor || ""}` }) }),
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("p", { className: "text-sm font-medium opacity-70", children: c.label }),
      /* @__PURE__ */ jsxs("p", { className: "text-2xl font-bold tracking-tight font-mono", children: [
        "₹",
        c.value.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })
      ] })
    ] })
  ] }) }, c.label)) });
}
function BalanceChart({ data }) {
  return /* @__PURE__ */ jsxs(Card, { className: "border-0 shadow-sm", children: [
    /* @__PURE__ */ jsx(CardHeader, { className: "pb-2", children: /* @__PURE__ */ jsx(CardTitle, { className: "text-base font-semibold", children: "Balance Trend" }) }),
    /* @__PURE__ */ jsx(CardContent, { children: /* @__PURE__ */ jsx("div", { className: "h-[280px]", children: /* @__PURE__ */ jsx(ResponsiveContainer, { width: "100%", height: "100%", children: /* @__PURE__ */ jsxs(LineChart, { data, margin: { top: 5, right: 10, left: 10, bottom: 5 }, children: [
      /* @__PURE__ */ jsx(CartesianGrid, { strokeDasharray: "3 3", stroke: "var(--color-border)" }),
      /* @__PURE__ */ jsx(
        XAxis,
        {
          dataKey: "date",
          tick: { fontSize: 11, fill: "var(--color-muted-foreground)" },
          tickFormatter: (v) => new Date(v).toLocaleDateString("en-US", { month: "short", day: "numeric" })
        }
      ),
      /* @__PURE__ */ jsx(
        YAxis,
        {
          tick: { fontSize: 11, fill: "var(--color-muted-foreground)" },
          tickFormatter: (v) => `₹${(v / 1e3).toFixed(1)}k`
        }
      ),
      /* @__PURE__ */ jsx(
        Tooltip,
        {
          contentStyle: {
            background: "var(--color-card)",
            border: "1px solid var(--color-border)",
            borderRadius: "0.5rem",
            fontSize: 13
          },
          formatter: (value) => [`₹${value.toLocaleString("en-IN")}`, "Balance"],
          labelFormatter: (label) => new Date(label).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })
        }
      ),
      /* @__PURE__ */ jsx(
        Line,
        {
          type: "monotone",
          dataKey: "balance",
          stroke: "var(--color-chart-1)",
          strokeWidth: 2.5,
          dot: false,
          activeDot: { r: 5, fill: "var(--color-chart-1)" }
        }
      )
    ] }) }) }) })
  ] });
}
const COLORS = [
  "var(--color-chart-1)",
  "var(--color-chart-2)",
  "var(--color-chart-3)",
  "var(--color-chart-4)",
  "var(--color-chart-5)",
  "var(--color-muted-foreground)"
];
function SpendingChart({ data }) {
  return /* @__PURE__ */ jsxs(Card, { className: "border-0 shadow-sm", children: [
    /* @__PURE__ */ jsx(CardHeader, { className: "pb-2", children: /* @__PURE__ */ jsx(CardTitle, { className: "text-base font-semibold", children: "Spending Breakdown" }) }),
    /* @__PURE__ */ jsx(CardContent, { children: /* @__PURE__ */ jsx("div", { className: "h-[280px]", children: /* @__PURE__ */ jsx(ResponsiveContainer, { width: "100%", height: "100%", children: /* @__PURE__ */ jsxs(BarChart, { data, layout: "vertical", margin: { top: 5, right: 10, left: 5, bottom: 5 }, children: [
      /* @__PURE__ */ jsx(
        XAxis,
        {
          type: "number",
          tick: { fontSize: 11, fill: "var(--color-muted-foreground)" },
          tickFormatter: (v) => `₹${v}`
        }
      ),
      /* @__PURE__ */ jsx(
        YAxis,
        {
          type: "category",
          dataKey: "category",
          tick: { fontSize: 12, fill: "var(--color-foreground)" },
          width: 100
        }
      ),
      /* @__PURE__ */ jsx(
        Tooltip,
        {
          contentStyle: {
            background: "var(--color-card)",
            border: "1px solid var(--color-border)",
            borderRadius: "0.5rem",
            fontSize: 13
          },
          formatter: (value) => [`₹${value.toLocaleString("en-IN")}`, "Spent"]
        }
      ),
      /* @__PURE__ */ jsx(Bar, { dataKey: "amount", radius: [0, 6, 6, 0], barSize: 24, children: data.map((_, i) => /* @__PURE__ */ jsx(Cell, { fill: COLORS[i % COLORS.length] }, i)) })
    ] }) }) }) })
  ] });
}
const Input = React.forwardRef(
  ({ className, type, ...props }, ref) => {
    return /* @__PURE__ */ jsx(
      "input",
      {
        type,
        className: cn(
          "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          className
        ),
        ref,
        ...props
      }
    );
  }
);
Input.displayName = "Input";
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground shadow hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        outline: "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline"
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);
const Button = React.forwardRef(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return /* @__PURE__ */ jsx(
      Comp,
      {
        className: cn(buttonVariants({ variant, size, className })),
        ref,
        ...props
      }
    );
  }
);
Button.displayName = "Button";
const badgeVariants = cva(
  "inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "border-transparent bg-primary text-primary-foreground shadow hover:bg-primary/80",
        secondary: "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive: "border-transparent bg-destructive text-destructive-foreground shadow hover:bg-destructive/80",
        outline: "text-foreground"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
);
function Badge({ className, variant, ...props }) {
  return /* @__PURE__ */ jsx("div", { className: cn(badgeVariants({ variant }), className), ...props });
}
const Select = SelectPrimitive.Root;
const SelectValue = SelectPrimitive.Value;
const SelectTrigger = React.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsxs(
  SelectPrimitive.Trigger,
  {
    ref,
    className: cn(
      "flex h-9 w-full items-center justify-between whitespace-nowrap rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background data-[placeholder]:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1",
      className
    ),
    ...props,
    children: [
      children,
      /* @__PURE__ */ jsx(SelectPrimitive.Icon, { asChild: true, children: /* @__PURE__ */ jsx(ChevronDown, { className: "h-4 w-4 opacity-50" }) })
    ]
  }
));
SelectTrigger.displayName = SelectPrimitive.Trigger.displayName;
const SelectScrollUpButton = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  SelectPrimitive.ScrollUpButton,
  {
    ref,
    className: cn(
      "flex cursor-default items-center justify-center py-1",
      className
    ),
    ...props,
    children: /* @__PURE__ */ jsx(ChevronUp, { className: "h-4 w-4" })
  }
));
SelectScrollUpButton.displayName = SelectPrimitive.ScrollUpButton.displayName;
const SelectScrollDownButton = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  SelectPrimitive.ScrollDownButton,
  {
    ref,
    className: cn(
      "flex cursor-default items-center justify-center py-1",
      className
    ),
    ...props,
    children: /* @__PURE__ */ jsx(ChevronDown, { className: "h-4 w-4" })
  }
));
SelectScrollDownButton.displayName = SelectPrimitive.ScrollDownButton.displayName;
const SelectContent = React.forwardRef(({ className, children, position = "popper", ...props }, ref) => /* @__PURE__ */ jsx(SelectPrimitive.Portal, { children: /* @__PURE__ */ jsxs(
  SelectPrimitive.Content,
  {
    ref,
    className: cn(
      "relative z-50 max-h-[--radix-select-content-available-height] min-w-[8rem] overflow-y-auto overflow-x-hidden rounded-md border bg-popover text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-[--radix-select-content-transform-origin]",
      position === "popper" && "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
      className
    ),
    position,
    ...props,
    children: [
      /* @__PURE__ */ jsx(SelectScrollUpButton, {}),
      /* @__PURE__ */ jsx(
        SelectPrimitive.Viewport,
        {
          className: cn(
            "p-1",
            position === "popper" && "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]"
          ),
          children
        }
      ),
      /* @__PURE__ */ jsx(SelectScrollDownButton, {})
    ]
  }
) }));
SelectContent.displayName = SelectPrimitive.Content.displayName;
const SelectLabel = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  SelectPrimitive.Label,
  {
    ref,
    className: cn("px-2 py-1.5 text-sm font-semibold", className),
    ...props
  }
));
SelectLabel.displayName = SelectPrimitive.Label.displayName;
const SelectItem = React.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsxs(
  SelectPrimitive.Item,
  {
    ref,
    className: cn(
      "relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-2 pr-8 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    ),
    ...props,
    children: [
      /* @__PURE__ */ jsx("span", { className: "absolute right-2 flex h-3.5 w-3.5 items-center justify-center", children: /* @__PURE__ */ jsx(SelectPrimitive.ItemIndicator, { children: /* @__PURE__ */ jsx(Check, { className: "h-4 w-4" }) }) }),
      /* @__PURE__ */ jsx(SelectPrimitive.ItemText, { children })
    ]
  }
));
SelectItem.displayName = SelectPrimitive.Item.displayName;
const SelectSeparator = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  SelectPrimitive.Separator,
  {
    ref,
    className: cn("-mx-1 my-1 h-px bg-muted", className),
    ...props
  }
));
SelectSeparator.displayName = SelectPrimitive.Separator.displayName;
const Dialog = DialogPrimitive.Root;
const DialogPortal = DialogPrimitive.Portal;
const DialogOverlay = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  DialogPrimitive.Overlay,
  {
    ref,
    className: cn(
      "fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className
    ),
    ...props
  }
));
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName;
const DialogContent = React.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsxs(DialogPortal, { children: [
  /* @__PURE__ */ jsx(DialogOverlay, {}),
  /* @__PURE__ */ jsxs(
    DialogPrimitive.Content,
    {
      ref,
      className: cn(
        "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg",
        className
      ),
      ...props,
      children: [
        children,
        /* @__PURE__ */ jsxs(DialogPrimitive.Close, { className: "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground", children: [
          /* @__PURE__ */ jsx(X, { className: "h-4 w-4" }),
          /* @__PURE__ */ jsx("span", { className: "sr-only", children: "Close" })
        ] })
      ]
    }
  )
] }));
DialogContent.displayName = DialogPrimitive.Content.displayName;
const DialogHeader = ({
  className,
  ...props
}) => /* @__PURE__ */ jsx(
  "div",
  {
    className: cn(
      "flex flex-col space-y-1.5 text-center sm:text-left",
      className
    ),
    ...props
  }
);
DialogHeader.displayName = "DialogHeader";
const DialogFooter = ({
  className,
  ...props
}) => /* @__PURE__ */ jsx(
  "div",
  {
    className: cn(
      "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",
      className
    ),
    ...props
  }
);
DialogFooter.displayName = "DialogFooter";
const DialogTitle = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  DialogPrimitive.Title,
  {
    ref,
    className: cn(
      "text-lg font-semibold leading-none tracking-tight",
      className
    ),
    ...props
  }
));
DialogTitle.displayName = DialogPrimitive.Title.displayName;
const DialogDescription = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  DialogPrimitive.Description,
  {
    ref,
    className: cn("text-sm text-muted-foreground", className),
    ...props
  }
));
DialogDescription.displayName = DialogPrimitive.Description.displayName;
const labelVariants = cva(
  "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
);
const Label = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  LabelPrimitive.Root,
  {
    ref,
    className: cn(labelVariants(), className),
    ...props
  }
));
Label.displayName = LabelPrimitive.Root.displayName;
const CATEGORIES = {
  income: ["Salary", "Freelance", "Investments", "Refund"],
  expense: ["Food", "Transport", "Shopping", "Bills", "Entertainment", "Health"]
};
const INITIAL_TRANSACTIONS = [
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
  { id: "20", date: "2025-03-12", description: "Tax Refund", amount: 1500, category: "Refund", type: "income" }
];
function computeSummary(transactions) {
  const totalIncome = transactions.filter((t) => t.type === "income").reduce((s, t) => s + t.amount, 0);
  const totalExpenses = transactions.filter((t) => t.type === "expense").reduce((s, t) => s + t.amount, 0);
  return { totalIncome, totalExpenses, balance: totalIncome - totalExpenses };
}
function getBalanceTrend(transactions) {
  const sorted = [...transactions].sort((a, b) => a.date.localeCompare(b.date));
  let balance = 0;
  const points = [];
  for (const t of sorted) {
    balance += t.type === "income" ? t.amount : -t.amount;
    points.push({ date: t.date, balance: Math.round(balance * 100) / 100 });
  }
  return points;
}
function getSpendingByCategory(transactions) {
  const map = {};
  for (const t of transactions.filter((t2) => t2.type === "expense")) {
    map[t.category] = (map[t.category] || 0) + t.amount;
  }
  return Object.entries(map).map(([category, amount]) => ({ category, amount: Math.round(amount * 100) / 100 })).sort((a, b) => b.amount - a.amount);
}
function getInsights(transactions) {
  const spending = getSpendingByCategory(transactions);
  const highestCategory = spending[0] || null;
  const { totalIncome, totalExpenses } = computeSummary(transactions);
  const months = {};
  for (const t of transactions.filter((t2) => t2.type === "expense")) {
    const month = t.date.substring(0, 7);
    months[month] = (months[month] || 0) + t.amount;
  }
  const monthlyExpenses = Object.entries(months).map(([month, total]) => ({
    month,
    total: Math.round(total * 100) / 100
  }));
  return { highestCategory, totalIncome, totalExpenses, monthlyExpenses };
}
const emptyForm = { date: "", description: "", amount: "", category: "", type: "expense" };
function TransactionList({ transactions, role, onAdd, onEdit, onDelete }) {
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [sortKey, setSortKey] = useState("date");
  const [sortDir, setSortDir] = useState("desc");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const filtered = transactions.filter((t) => {
    if (filterType !== "all" && t.type !== filterType) return false;
    if (search && !t.category.toLowerCase().includes(search.toLowerCase()) && !t.description.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  }).sort((a, b) => {
    const mul = sortDir === "asc" ? 1 : -1;
    if (sortKey === "date") return mul * a.date.localeCompare(b.date);
    return mul * (a.amount - b.amount);
  });
  function toggleSort(key) {
    if (sortKey === key) setSortDir((d) => d === "asc" ? "desc" : "asc");
    else {
      setSortKey(key);
      setSortDir("desc");
    }
  }
  function openAdd() {
    setEditingId(null);
    setForm(emptyForm);
    setDialogOpen(true);
  }
  function openEdit(t) {
    setEditingId(t.id);
    setForm({ date: t.date, description: t.description, amount: String(t.amount), category: t.category, type: t.type });
    setDialogOpen(true);
  }
  function handleSave() {
    const amount = parseFloat(form.amount);
    if (!form.date || !form.description || isNaN(amount) || !form.category) return;
    if (editingId) {
      onEdit({ id: editingId, date: form.date, description: form.description, amount, category: form.category, type: form.type });
    } else {
      onAdd({ date: form.date, description: form.description, amount, category: form.category, type: form.type });
    }
    setDialogOpen(false);
  }
  const categoryOptions = form.type === "income" ? CATEGORIES.income : CATEGORIES.expense;
  return /* @__PURE__ */ jsxs(Card, { className: "border-0 shadow-sm", children: [
    /* @__PURE__ */ jsxs(CardHeader, { className: "pb-3", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between", children: [
        /* @__PURE__ */ jsx(CardTitle, { className: "text-base font-semibold", children: "Transactions" }),
        role === "admin" && /* @__PURE__ */ jsxs(Button, { size: "sm", onClick: openAdd, className: "gap-1.5", children: [
          /* @__PURE__ */ jsx(Plus, { className: "h-4 w-4" }),
          " Add Transaction"
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-2 pt-2 sm:flex-row", children: [
        /* @__PURE__ */ jsxs("div", { className: "relative flex-1", children: [
          /* @__PURE__ */ jsx(Search, { className: "absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" }),
          /* @__PURE__ */ jsx(
            Input,
            {
              placeholder: "Search transactions...",
              value: search,
              onChange: (e) => setSearch(e.target.value),
              className: "pl-9"
            }
          )
        ] }),
        /* @__PURE__ */ jsxs(Select, { value: filterType, onValueChange: (v) => setFilterType(v), children: [
          /* @__PURE__ */ jsx(SelectTrigger, { className: "w-full sm:w-[140px]", children: /* @__PURE__ */ jsx(SelectValue, {}) }),
          /* @__PURE__ */ jsxs(SelectContent, { children: [
            /* @__PURE__ */ jsx(SelectItem, { value: "all", children: "All Types" }),
            /* @__PURE__ */ jsx(SelectItem, { value: "income", children: "Income" }),
            /* @__PURE__ */ jsx(SelectItem, { value: "expense", children: "Expense" })
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsx(CardContent, { children: filtered.length === 0 ? /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center justify-center py-12 text-muted-foreground", children: [
      /* @__PURE__ */ jsx(Search, { className: "mb-3 h-10 w-10 opacity-40" }),
      /* @__PURE__ */ jsx("p", { className: "text-sm font-medium", children: "No transactions found" }),
      /* @__PURE__ */ jsx("p", { className: "text-xs", children: "Try adjusting your search or filters" })
    ] }) : /* @__PURE__ */ jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxs("table", { className: "w-full text-sm", children: [
      /* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsxs("tr", { className: "border-b text-left text-muted-foreground", children: [
        /* @__PURE__ */ jsx("th", { className: "pb-3 pr-4", children: /* @__PURE__ */ jsxs("button", { onClick: () => toggleSort("date"), className: "inline-flex items-center gap-1 font-medium hover:text-foreground", children: [
          "Date ",
          /* @__PURE__ */ jsx(ArrowUpDown, { className: "h-3 w-3" })
        ] }) }),
        /* @__PURE__ */ jsx("th", { className: "pb-3 pr-4 font-medium", children: "Description" }),
        /* @__PURE__ */ jsx("th", { className: "pb-3 pr-4 font-medium", children: "Category" }),
        /* @__PURE__ */ jsx("th", { className: "pb-3 pr-4 font-medium", children: "Type" }),
        /* @__PURE__ */ jsx("th", { className: "pb-3 pr-4 text-right", children: /* @__PURE__ */ jsxs("button", { onClick: () => toggleSort("amount"), className: "inline-flex items-center gap-1 font-medium hover:text-foreground", children: [
          "Amount ",
          /* @__PURE__ */ jsx(ArrowUpDown, { className: "h-3 w-3" })
        ] }) }),
        role === "admin" && /* @__PURE__ */ jsx("th", { className: "pb-3 font-medium", children: "Actions" })
      ] }) }),
      /* @__PURE__ */ jsx("tbody", { children: filtered.map((t) => /* @__PURE__ */ jsxs("tr", { className: "border-b border-border/50 last:border-0", children: [
        /* @__PURE__ */ jsx("td", { className: "py-3 pr-4 font-mono text-xs text-muted-foreground", children: new Date(t.date).toLocaleDateString("en-US", { month: "short", day: "numeric" }) }),
        /* @__PURE__ */ jsx("td", { className: "py-3 pr-4 font-medium", children: t.description }),
        /* @__PURE__ */ jsx("td", { className: "py-3 pr-4", children: /* @__PURE__ */ jsx(Badge, { variant: "secondary", className: "font-normal", children: t.category }) }),
        /* @__PURE__ */ jsx("td", { className: "py-3 pr-4", children: /* @__PURE__ */ jsx("span", { className: `inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${t.type === "income" ? "bg-income/15 text-income-foreground" : "bg-expense/15 text-expense-foreground"}`, children: t.type === "income" ? "Income" : "Expense" }) }),
        /* @__PURE__ */ jsxs("td", { className: `py-3 pr-4 text-right font-mono font-medium ${t.type === "income" ? "text-income-foreground" : "text-expense-foreground"}`, children: [
          t.type === "income" ? "+" : "-",
          "₹",
          t.amount.toLocaleString("en-IN", { minimumFractionDigits: 2 })
        ] }),
        role === "admin" && /* @__PURE__ */ jsx("td", { className: "py-3", children: /* @__PURE__ */ jsxs("div", { className: "flex gap-1", children: [
          /* @__PURE__ */ jsx(Button, { variant: "ghost", size: "icon", className: "h-7 w-7", onClick: () => openEdit(t), children: /* @__PURE__ */ jsx(Pencil, { className: "h-3.5 w-3.5" }) }),
          /* @__PURE__ */ jsx(Button, { variant: "ghost", size: "icon", className: "h-7 w-7 text-destructive hover:text-destructive", onClick: () => onDelete(t.id), children: /* @__PURE__ */ jsx(Trash2, { className: "h-3.5 w-3.5" }) })
        ] }) })
      ] }, t.id)) })
    ] }) }) }),
    /* @__PURE__ */ jsx(Dialog, { open: dialogOpen, onOpenChange: setDialogOpen, children: /* @__PURE__ */ jsxs(DialogContent, { children: [
      /* @__PURE__ */ jsx(DialogHeader, { children: /* @__PURE__ */ jsx(DialogTitle, { children: editingId ? "Edit Transaction" : "Add Transaction" }) }),
      /* @__PURE__ */ jsxs("div", { className: "grid gap-4 py-4", children: [
        /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
          /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsx(Label, { children: "Date" }),
            /* @__PURE__ */ jsx(Input, { type: "date", value: form.date, onChange: (e) => setForm({ ...form, date: e.target.value }) })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsx(Label, { children: "Type" }),
            /* @__PURE__ */ jsxs(Select, { value: form.type, onValueChange: (v) => setForm({ ...form, type: v, category: "" }), children: [
              /* @__PURE__ */ jsx(SelectTrigger, { children: /* @__PURE__ */ jsx(SelectValue, {}) }),
              /* @__PURE__ */ jsxs(SelectContent, { children: [
                /* @__PURE__ */ jsx(SelectItem, { value: "income", children: "Income" }),
                /* @__PURE__ */ jsx(SelectItem, { value: "expense", children: "Expense" })
              ] })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsx(Label, { children: "Description" }),
          /* @__PURE__ */ jsx(Input, { value: form.description, onChange: (e) => setForm({ ...form, description: e.target.value }), placeholder: "e.g. Monthly Salary" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
          /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsx(Label, { children: "Amount" }),
            /* @__PURE__ */ jsx(Input, { type: "number", step: "0.01", value: form.amount, onChange: (e) => setForm({ ...form, amount: e.target.value }), placeholder: "0.00" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsx(Label, { children: "Category" }),
            /* @__PURE__ */ jsxs(Select, { value: form.category, onValueChange: (v) => setForm({ ...form, category: v }), children: [
              /* @__PURE__ */ jsx(SelectTrigger, { children: /* @__PURE__ */ jsx(SelectValue, { placeholder: "Select" }) }),
              /* @__PURE__ */ jsx(SelectContent, { children: categoryOptions.map((c) => /* @__PURE__ */ jsx(SelectItem, { value: c, children: c }, c)) })
            ] })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs(DialogFooter, { children: [
        /* @__PURE__ */ jsx(Button, { variant: "outline", onClick: () => setDialogOpen(false), children: "Cancel" }),
        /* @__PURE__ */ jsx(Button, { onClick: handleSave, children: editingId ? "Save Changes" : "Add" })
      ] })
    ] }) })
  ] });
}
function InsightsPanel({ highestCategory, totalIncome, totalExpenses, monthlyExpenses }) {
  const savingsRate = totalIncome > 0 ? ((totalIncome - totalExpenses) / totalIncome * 100).toFixed(1) : "0";
  return /* @__PURE__ */ jsxs(Card, { className: "border-0 shadow-sm", children: [
    /* @__PURE__ */ jsx(CardHeader, { className: "pb-3", children: /* @__PURE__ */ jsx(CardTitle, { className: "text-base font-semibold", children: "Insights" }) }),
    /* @__PURE__ */ jsxs(CardContent, { className: "space-y-5", children: [
      highestCategory && /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-3", children: [
        /* @__PURE__ */ jsx("div", { className: "flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-expense/15", children: /* @__PURE__ */ jsx(ArrowDownRight, { className: "h-4 w-4 text-expense-foreground" }) }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("p", { className: "text-sm font-medium", children: "Top Spending" }),
          /* @__PURE__ */ jsxs("p", { className: "text-xs text-muted-foreground", children: [
            highestCategory.category,
            " — ",
            /* @__PURE__ */ jsxs("span", { className: "font-mono font-medium text-expense-foreground", children: [
              "₹",
              highestCategory.amount.toLocaleString("en-IN")
            ] })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-3", children: [
        /* @__PURE__ */ jsx("div", { className: "flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-income/15", children: /* @__PURE__ */ jsx(TrendingUp, { className: "h-4 w-4 text-income-foreground" }) }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("p", { className: "text-sm font-medium", children: "Savings Rate" }),
          /* @__PURE__ */ jsxs("p", { className: "text-xs text-muted-foreground", children: [
            "You saved ",
            /* @__PURE__ */ jsxs("span", { className: "font-mono font-medium text-income-foreground", children: [
              savingsRate,
              "%"
            ] }),
            " of your income"
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-3", children: [
        /* @__PURE__ */ jsx("div", { className: "flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-chart-1/15", children: /* @__PURE__ */ jsx(BarChart3, { className: "h-4 w-4 text-chart-1" }) }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("p", { className: "text-sm font-medium", children: "Income vs Expenses" }),
          /* @__PURE__ */ jsxs("div", { className: "mt-1.5 space-y-1.5", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 text-xs", children: [
              /* @__PURE__ */ jsx("div", { className: "h-2 rounded-full bg-income", style: { width: "100%" } }),
              /* @__PURE__ */ jsxs("span", { className: "shrink-0 font-mono text-muted-foreground", children: [
                "₹",
                totalIncome.toLocaleString("en-IN")
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 text-xs", children: [
              /* @__PURE__ */ jsx("div", { className: "h-2 rounded-full bg-expense", style: { width: `${totalIncome > 0 ? totalExpenses / totalIncome * 100 : 0}%` } }),
              /* @__PURE__ */ jsxs("span", { className: "shrink-0 font-mono text-muted-foreground", children: [
                "₹",
                totalExpenses.toLocaleString("en-IN")
              ] })
            ] })
          ] })
        ] })
      ] }),
      monthlyExpenses.length > 0 && /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("p", { className: "mb-2 text-sm font-medium", children: "Monthly Expenses" }),
        /* @__PURE__ */ jsx("div", { className: "space-y-1.5", children: monthlyExpenses.map((m) => /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between text-xs", children: [
          /* @__PURE__ */ jsx("span", { className: "text-muted-foreground", children: (/* @__PURE__ */ new Date(m.month + "-01")).toLocaleDateString("en-US", { month: "long", year: "numeric" }) }),
          /* @__PURE__ */ jsxs("span", { className: "font-mono font-medium", children: [
            "₹",
            m.total.toLocaleString("en-IN")
          ] })
        ] }, m.month)) })
      ] })
    ] })
  ] });
}
function RoleSwitch({ role, onChange }) {
  return /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
    /* @__PURE__ */ jsx("div", { className: "flex h-8 w-8 items-center justify-center rounded-lg bg-secondary", children: role === "admin" ? /* @__PURE__ */ jsx(Shield, { className: "h-4 w-4" }) : /* @__PURE__ */ jsx(Eye, { className: "h-4 w-4 text-muted-foreground" }) }),
    /* @__PURE__ */ jsxs(Select, { value: role, onValueChange: (v) => onChange(v), children: [
      /* @__PURE__ */ jsx(SelectTrigger, { className: "h-8 w-[110px] text-xs", children: /* @__PURE__ */ jsx(SelectValue, {}) }),
      /* @__PURE__ */ jsxs(SelectContent, { children: [
        /* @__PURE__ */ jsx(SelectItem, { value: "viewer", children: "Viewer" }),
        /* @__PURE__ */ jsx(SelectItem, { value: "admin", children: "Admin" })
      ] })
    ] })
  ] });
}
function Dashboard() {
  const [transactions, setTransactions] = useState(INITIAL_TRANSACTIONS);
  const [role, setRole] = useState("admin");
  const summary = computeSummary(transactions);
  const balanceTrend = getBalanceTrend(transactions);
  const spending = getSpendingByCategory(transactions);
  const insights = getInsights(transactions);
  function handleAdd(t) {
    setTransactions((prev) => [{
      ...t,
      id: crypto.randomUUID()
    }, ...prev]);
  }
  function handleEdit(updated) {
    setTransactions((prev) => prev.map((t) => t.id === updated.id ? updated : t));
  }
  function handleDelete(id) {
    setTransactions((prev) => prev.filter((t) => t.id !== id));
  }
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-background", children: [
    /* @__PURE__ */ jsx("header", { className: "border-b bg-card", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6", children: [
      /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx("h1", { className: "text-xl font-bold tracking-tight", children: "PersonalFinanceDashboard" }) }),
      /* @__PURE__ */ jsx(RoleSwitch, { role, onChange: setRole })
    ] }) }),
    /* @__PURE__ */ jsxs("main", { className: "mx-auto max-w-7xl space-y-6 px-4 py-6 sm:px-6", children: [
      /* @__PURE__ */ jsx(SummaryCards, { balance: summary.balance, totalIncome: summary.totalIncome, totalExpenses: summary.totalExpenses }),
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 gap-6 lg:grid-cols-2", children: [
        /* @__PURE__ */ jsx(BalanceChart, { data: balanceTrend }),
        /* @__PURE__ */ jsx(SpendingChart, { data: spending })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 gap-6 lg:grid-cols-[1fr_320px]", children: [
        /* @__PURE__ */ jsx(TransactionList, { transactions, role, onAdd: handleAdd, onEdit: handleEdit, onDelete: handleDelete }),
        /* @__PURE__ */ jsx(InsightsPanel, { highestCategory: insights.highestCategory, totalIncome: insights.totalIncome, totalExpenses: insights.totalExpenses, monthlyExpenses: insights.monthlyExpenses })
      ] })
    ] })
  ] });
}
export {
  Dashboard as component
};
