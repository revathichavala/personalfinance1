import { useState } from "react";
import { Search, ArrowUpDown, Plus, Pencil, Trash2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import type { Transaction, TransactionType, Role } from "@/lib/finance-data";
import { CATEGORIES } from "@/lib/finance-data";

interface TransactionListProps {
  transactions: Transaction[];
  role: Role;
  onAdd: (t: Omit<Transaction, "id">) => void;
  onEdit: (t: Transaction) => void;
  onDelete: (id: string) => void;
}

type SortKey = "date" | "amount";
type SortDir = "asc" | "desc";

const emptyForm = { date: "", description: "", amount: "", category: "", type: "expense" as TransactionType };

export function TransactionList({ transactions, role, onAdd, onEdit, onDelete }: TransactionListProps) {
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState<"all" | TransactionType>("all");
  const [sortKey, setSortKey] = useState<SortKey>("date");
  const [sortDir, setSortDir] = useState<SortDir>("desc");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyForm);

  const filtered = transactions
    .filter((t) => {
      if (filterType !== "all" && t.type !== filterType) return false;
      if (search && !t.category.toLowerCase().includes(search.toLowerCase()) && !t.description.toLowerCase().includes(search.toLowerCase())) return false;
      return true;
    })
    .sort((a, b) => {
      const mul = sortDir === "asc" ? 1 : -1;
      if (sortKey === "date") return mul * a.date.localeCompare(b.date);
      return mul * (a.amount - b.amount);
    });

  function toggleSort(key: SortKey) {
    if (sortKey === key) setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    else { setSortKey(key); setSortDir("desc"); }
  }

  function openAdd() {
    setEditingId(null);
    setForm(emptyForm);
    setDialogOpen(true);
  }

  function openEdit(t: Transaction) {
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

  return (
    <Card className="border-0 shadow-sm">
      <CardHeader className="pb-3">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <CardTitle className="text-base font-semibold">Transactions</CardTitle>
          {role === "admin" && (
            <Button size="sm" onClick={openAdd} className="gap-1.5">
              <Plus className="h-4 w-4" /> Add Transaction
            </Button>
          )}
        </div>
        <div className="flex flex-col gap-2 pt-2 sm:flex-row">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search transactions..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9"
            />
          </div>
          <Select value={filterType} onValueChange={(v) => setFilterType(v as typeof filterType)}>
            <SelectTrigger className="w-full sm:w-[140px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="income">Income</SelectItem>
              <SelectItem value="expense">Expense</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent>
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-muted-foreground">
            <Search className="mb-3 h-10 w-10 opacity-40" />
            <p className="text-sm font-medium">No transactions found</p>
            <p className="text-xs">Try adjusting your search or filters</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b text-left text-muted-foreground">
                  <th className="pb-3 pr-4">
                    <button onClick={() => toggleSort("date")} className="inline-flex items-center gap-1 font-medium hover:text-foreground">
                      Date <ArrowUpDown className="h-3 w-3" />
                    </button>
                  </th>
                  <th className="pb-3 pr-4 font-medium">Description</th>
                  <th className="pb-3 pr-4 font-medium">Category</th>
                  <th className="pb-3 pr-4 font-medium">Type</th>
                  <th className="pb-3 pr-4 text-right">
                    <button onClick={() => toggleSort("amount")} className="inline-flex items-center gap-1 font-medium hover:text-foreground">
                      Amount <ArrowUpDown className="h-3 w-3" />
                    </button>
                  </th>
                  {role === "admin" && <th className="pb-3 font-medium">Actions</th>}
                </tr>
              </thead>
              <tbody>
                {filtered.map((t) => (
                  <tr key={t.id} className="border-b border-border/50 last:border-0">
                    <td className="py-3 pr-4 font-mono text-xs text-muted-foreground">
                      {new Date(t.date).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                    </td>
                    <td className="py-3 pr-4 font-medium">{t.description}</td>
                    <td className="py-3 pr-4">
                      <Badge variant="secondary" className="font-normal">{t.category}</Badge>
                    </td>
                    <td className="py-3 pr-4">
                      <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${t.type === "income" ? "bg-income/15 text-income-foreground" : "bg-expense/15 text-expense-foreground"}`}>
                        {t.type === "income" ? "Income" : "Expense"}
                      </span>
                    </td>
                    <td className={`py-3 pr-4 text-right font-mono font-medium ${t.type === "income" ? "text-income-foreground" : "text-expense-foreground"}`}>
                      {t.type === "income" ? "+" : "-"}₹{t.amount.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
                    </td>
                    {role === "admin" && (
                      <td className="py-3">
                        <div className="flex gap-1">
                          <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => openEdit(t)}>
                            <Pencil className="h-3.5 w-3.5" />
                          </Button>
                          <Button variant="ghost" size="icon" className="h-7 w-7 text-destructive hover:text-destructive" onClick={() => onDelete(t.id)}>
                            <Trash2 className="h-3.5 w-3.5" />
                          </Button>
                        </div>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </CardContent>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editingId ? "Edit Transaction" : "Add Transaction"}</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Date</Label>
                <Input type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} />
              </div>
              <div className="space-y-2">
                <Label>Type</Label>
                <Select value={form.type} onValueChange={(v) => setForm({ ...form, type: v as TransactionType, category: "" })}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="income">Income</SelectItem>
                    <SelectItem value="expense">Expense</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-2">
              <Label>Description</Label>
              <Input value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="e.g. Monthly Salary" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Amount</Label>
                <Input type="number" step="0.01" value={form.amount} onChange={(e) => setForm({ ...form, amount: e.target.value })} placeholder="0.00" />
              </div>
              <div className="space-y-2">
                <Label>Category</Label>
                <Select value={form.category} onValueChange={(v) => setForm({ ...form, category: v })}>
                  <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                  <SelectContent>
                    {categoryOptions.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleSave}>{editingId ? "Save Changes" : "Add"}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
}
