import { Shield, Eye } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { Role } from "@/lib/finance-data";

interface RoleSwitchProps {
  role: Role;
  onChange: (role: Role) => void;
}

export function RoleSwitch({ role, onChange }: RoleSwitchProps) {
  return (
    <div className="flex items-center gap-2">
      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-secondary">
        {role === "admin" ? <Shield className="h-4 w-4" /> : <Eye className="h-4 w-4 text-muted-foreground" />}
      </div>
      <Select value={role} onValueChange={(v) => onChange(v as Role)}>
        <SelectTrigger className="h-8 w-[110px] text-xs">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="viewer">Viewer</SelectItem>
          <SelectItem value="admin">Admin</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
