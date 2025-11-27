import { LogOut, Settings as SettingsIcon, User } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/contexts/AuthContext";
import { NotificationsDropdown } from "@/components/notifications/NotificationsDropdown";
import { ThemeToggle } from "@/components/ThemeToggle";
import { useNavigate } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const getLevelBadge = (level: string) => {
    const colors = {
      diamond: "bg-gradient-diamond",
      gold: "bg-gradient-gold",
      silver: "bg-gradient-silver",
      admin: "bg-gradient-primary"
    };
    return colors[level as keyof typeof colors] || "bg-gradient-primary";
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  return (
    <header className="sticky top-0 z-40 bg-background/95 backdrop-blur-xl border-b border-border/50 px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between shadow-card">
      <div className="flex items-center gap-4">
        <h2 className="text-lg sm:text-xl font-bold bg-gradient-primary bg-clip-text text-transparent truncate">
          Dashboard
        </h2>
      </div>
      
      <div className="flex items-center gap-3 sm:gap-4">
        <ThemeToggle />
        <NotificationsDropdown />
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className="flex items-center gap-3 cursor-pointer hover-scale pl-4 border-l border-border/50">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-semibold">{user?.name}</p>
                <Badge variant="outline" className={`${getLevelBadge(user?.role || 'silver')} border-0 text-white text-xs`}>
                  {user?.role}
                </Badge>
              </div>
              <Avatar className="border-2 border-primary/20 h-10 w-10">
                <AvatarImage src={user?.avatar || ""} />
                <AvatarFallback className="bg-gradient-primary text-primary-foreground">
                  {user ? getInitials(user.name) : 'U'}
                </AvatarFallback>
              </Avatar>
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56 bg-card">
            <DropdownMenuLabel>
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">{user?.name}</p>
                <p className="text-xs leading-none text-muted-foreground">{user?.email}</p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => navigate('/profile')} className="cursor-pointer">
              <User className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => navigate('/settings')} className="cursor-pointer">
              <SettingsIcon className="mr-2 h-4 w-4" />
              <span>Settings</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={logout} className="cursor-pointer text-destructive">
              <LogOut className="mr-2 h-4 w-4" />
              <span>Logout</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};
