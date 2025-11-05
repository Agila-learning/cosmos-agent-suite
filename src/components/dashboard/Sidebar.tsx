import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { 
  LayoutDashboard, 
  Users, 
  FileCheck, 
  MessageSquare, 
  FileText,
  Settings,
  LogOut,
  BarChart3
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import forgeLogo from "@/assets/forge-logo.jpeg";

const menuItems = [
  { icon: LayoutDashboard, label: "Dashboard", path: "/dashboard" },
  { icon: Users, label: "Agents", path: "/agents" },
  { icon: BarChart3, label: "Analytics", path: "/analytics" },
  { icon: FileCheck, label: "KYC", path: "/kyc" },
  { icon: MessageSquare, label: "Team Chat", path: "/chat" },
  { icon: FileText, label: "Resume & Jobs", path: "/resume" },
  { icon: Users, label: "Manage Agents", path: "/admin/agents", adminOnly: true },
];

export const Sidebar = () => {
  const location = useLocation();
  const { user } = useAuth();
  const { logout } = useAuth();

  return (
    <aside className="w-64 bg-sidebar border-r border-sidebar-border flex flex-col">
      <div className="p-6 border-b border-sidebar-border">
        <div className="flex items-center gap-3">
          <img 
            src={forgeLogo} 
            alt="Forge India" 
            className="w-12 h-12 rounded-lg object-cover shadow-card"
          />
          <div>
            <h2 className="text-sidebar-foreground font-bold">FORGE INDIA</h2>
            <p className="text-xs text-sidebar-foreground/60">Shaping Future</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 p-4 space-y-1">
        {menuItems.filter(item => !(item as any).adminOnly || user?.role === 'diamond').map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-lg transition-all",
                isActive
                  ? "bg-sidebar-accent text-sidebar-accent-foreground shadow-glow"
                  : "text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground"
              )}
            >
              <Icon className="h-5 w-5" />
              <span className="font-medium">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-sidebar-border space-y-1">
        <Link
          to="/settings"
          className={cn(
            "flex items-center gap-3 px-4 py-3 rounded-lg transition-all",
            location.pathname === "/settings"
              ? "bg-sidebar-accent text-sidebar-accent-foreground"
              : "text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground"
          )}
        >
          <Settings className="h-5 w-5" />
          <span className="font-medium">Settings</span>
        </Link>
        <button 
          onClick={logout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sidebar-foreground/70 hover:bg-destructive/10 hover:text-destructive transition-all"
        >
          <LogOut className="h-5 w-5" />
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </aside>
  );
};
