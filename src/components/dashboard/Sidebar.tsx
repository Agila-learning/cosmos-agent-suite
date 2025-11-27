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
  BarChart3,
  Shield,
  UserCog,
  DollarSign,
  FolderOpen
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import forgeLogo from "@/assets/forge-logo.jpeg";

export const Sidebar = () => {
  const location = useLocation();
  const { user, logout } = useAuth();

  const menuItems = [
    { name: 'Dashboard', icon: LayoutDashboard, path: user?.role === 'admin' || user?.role === 'diamond' ? '/admin-dashboard' : '/agent-dashboard' },
    { name: 'Agents Network', icon: Users, path: '/agents' },
    { name: 'Team Chat', icon: MessageSquare, path: '/chat' },
    { name: 'Resume & Jobs', icon: FileText, path: '/resume' },
    { name: 'Documents', icon: FolderOpen, path: '/documents' },
    { name: 'Commission', icon: DollarSign, path: '/commission' },
    { name: 'Analytics', icon: BarChart3, path: '/analytics' },
    { name: 'KYC Verification', icon: Shield, path: '/kyc' },
    { name: 'Settings', icon: Settings, path: '/settings' },
  ];

  // Add admin-only menu item
  if (user?.role === 'admin' || user?.role === 'diamond') {
    menuItems.splice(2, 0, { name: 'Manage Agents', icon: UserCog, path: '/admin/agents' });
  }

  return (
    <aside className="w-64 bg-sidebar border-r border-sidebar-border flex flex-col hidden lg:flex shadow-card">
      <div className="p-6 border-b border-sidebar-border bg-gradient-mesh">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl overflow-hidden bg-gradient-primary p-0.5 flex-shrink-0 shadow-glow">
            <div className="w-full h-full bg-card rounded-lg p-1.5 flex items-center justify-center">
              <img 
                src={forgeLogo} 
                alt="Forge India" 
                className="w-full h-full object-contain"
              />
            </div>
          </div>
          <div className="min-w-0 flex-1">
            <h2 className="text-sidebar-foreground font-bold text-base truncate">FORGE INDIA</h2>
            <p className="text-xs text-muted-foreground truncate">Shaping Future</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 text-sm font-medium group relative overflow-hidden",
                isActive
                  ? "bg-gradient-primary text-primary-foreground shadow-glow"
                  : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
              )}
            >
              {isActive && (
                <div className="absolute inset-0 bg-white/10 animate-pulse" />
              )}
              <Icon className={cn(
                "h-5 w-5 flex-shrink-0 relative z-10 transition-transform duration-200",
                isActive ? "scale-110" : "group-hover:scale-110"
              )} />
              <span className="truncate relative z-10">{item.name}</span>
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-sidebar-border">
        <button 
          onClick={logout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sidebar-foreground hover:bg-destructive/10 hover:text-destructive transition-all duration-200 text-sm font-medium group"
        >
          <LogOut className="h-5 w-5 flex-shrink-0 transition-transform duration-200 group-hover:scale-110" />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
};
