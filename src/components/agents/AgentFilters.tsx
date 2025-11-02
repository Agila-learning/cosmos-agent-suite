import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Filter } from "lucide-react";

interface AgentFiltersProps {
  onSearchChange: (search: string) => void;
  onLevelChange: (level: string) => void;
  onLocationChange: (location: string) => void;
}

export const AgentFilters = ({ onSearchChange, onLevelChange, onLocationChange }: AgentFiltersProps) => {
  return (
    <Card className="p-4 shadow-card">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search by name, phone, email..." 
            className="pl-9" 
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>
        
        <Select onValueChange={onLevelChange}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <Filter className="h-4 w-4 mr-2" />
            <SelectValue placeholder="Level" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Levels</SelectItem>
            <SelectItem value="diamond">Diamond</SelectItem>
            <SelectItem value="gold">Gold</SelectItem>
            <SelectItem value="silver">Silver</SelectItem>
          </SelectContent>
        </Select>

        <Select onValueChange={onLocationChange}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Location" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Locations</SelectItem>
            <SelectItem value="mumbai">Mumbai</SelectItem>
            <SelectItem value="delhi">Delhi</SelectItem>
            <SelectItem value="bangalore">Bangalore</SelectItem>
            <SelectItem value="hyderabad">Hyderabad</SelectItem>
            <SelectItem value="chennai">Chennai</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </Card>
  );
};
