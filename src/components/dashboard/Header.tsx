import { useState } from "react";
import { Search, LogOut, Settings as SettingsIcon, User } from "lucide-react";
import { Input } from "@/components/ui/input";
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
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

const mockSearchData = [
  { type: 'agent', name: 'Rajesh Kumar', location: 'Mumbai', level: 'diamond' },
  { type: 'agent', name: 'Priya Sharma', location: 'Delhi', level: 'gold' },
  { type: 'agent', name: 'Amit Patel', location: 'Bangalore', level: 'silver' },
  { type: 'location', name: 'Mumbai', count: 45 },
  { type: 'location', name: 'Delhi', count: 32 },
];

export const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredResults = mockSearchData.filter(item =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getLevelBadge = (level: string) => {
    const colors = {
      diamond: "bg-gradient-diamond",
      gold: "bg-gradient-gold",
      silver: "bg-gradient-silver"
    };
    return colors[level as keyof typeof colors];
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  return (
    <header className="h-16 border-b bg-card px-6 flex items-center justify-between">
      <div className="flex-1 max-w-md relative">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground z-10" />
          <Input
            placeholder="Search agents, locations..."
            className="pl-9"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setSearchOpen(e.target.value.length > 0);
            }}
            onFocus={() => searchQuery && setSearchOpen(true)}
          />
        </div>
        
        {searchOpen && filteredResults.length > 0 && (
          <div className="absolute top-full mt-2 w-full bg-card border rounded-lg shadow-glow z-50 animate-fade-in">
            <Command>
              <CommandList>
                <CommandGroup heading="Search Results">
                  {filteredResults.map((item, idx) => (
                    <CommandItem key={idx} className="cursor-pointer">
                      {item.type === 'agent' ? (
                        <div className="flex items-center justify-between w-full">
                          <span>{item.name}</span>
                          <div className="flex items-center gap-2">
                            <span className="text-xs text-muted-foreground">{item.location}</span>
                            <Badge className={`${getLevelBadge((item as any).level)} text-white text-xs`}>
                              {(item as any).level}
                            </Badge>
                          </div>
                        </div>
                      ) : (
                        <div className="flex items-center justify-between w-full">
                          <span>📍 {item.name}</span>
                          <span className="text-xs text-muted-foreground">{(item as any).count} agents</span>
                        </div>
                      )}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </div>
        )}
      </div>

      <div className="flex items-center gap-4">
        <ThemeToggle />
        <NotificationsDropdown />

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className="flex items-center gap-3 cursor-pointer hover-scale">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-medium">{user?.name}</p>
                <Badge variant="outline" className={`${getLevelBadge(user?.role || 'silver')} border-0 text-white text-xs`}>
                  {user?.role} Agent
                </Badge>
              </div>
              <Avatar>
                <AvatarImage src="" />
                <AvatarFallback className="bg-gradient-primary text-white">
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
            <DropdownMenuItem onClick={() => navigate('/settings')} className="cursor-pointer">
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
