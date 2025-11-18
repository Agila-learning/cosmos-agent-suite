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
    <aside className="w-64 bg-sidebar border-r border-sidebar-border flex flex-col hidden lg:flex">
      <div className="p-4 sm:p-6 border-b border-sidebar-border">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-md overflow-hidden bg-card flex-shrink-0">
            <img 
              src={forgeLogo} 
              alt="Forge India" 
              className="w-full h-full object-contain p-1"
            />
          </div>
          <div className="min-w-0 flex-1">
            <h2 className="text-sidebar-foreground font-bold text-sm sm:text-base truncate">FORGE INDIA</h2>
            <p className="text-xs text-sidebar-foreground/60 truncate">Shaping Future</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 p-3 sm:p-4 space-y-1 overflow-y-auto">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "flex items-center gap-3 px-3 sm:px-4 py-2 sm:py-3 rounded-lg transition-all text-sm",
                isActive
                  ? "bg-sidebar-accent text-sidebar-accent-foreground shadow-glow"
                  : "text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground"
              )}
            >
              <Icon className="h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0" />
              <span className="font-medium truncate">{item.name}</span>
            </Link>
          );
        })}
      </nav>

      <div className="p-3 sm:p-4 border-t border-sidebar-border space-y-1">
        <button 
          onClick={logout}
          className="w-full flex items-center gap-3 px-3 sm:px-4 py-2 sm:py-3 rounded-lg text-sidebar-foreground/70 hover:bg-destructive/10 hover:text-destructive transition-all text-sm"
        >
          <LogOut className="h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0" />
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </aside>
  );
};
