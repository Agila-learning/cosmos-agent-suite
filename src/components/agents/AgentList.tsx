import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Phone, Mail, MoreVertical } from "lucide-react";

const agents = [
  { id: 1, name: "Rajesh Kumar", level: "silver", location: "Mumbai", phone: "+91 98765 43210", email: "rajesh@example.com", agents: 0 },
  { id: 2, name: "Priya Sharma", level: "gold", location: "Delhi", phone: "+91 98765 43211", email: "priya@example.com", agents: 5 },
  { id: 3, name: "Amit Patel", level: "gold", location: "Bangalore", phone: "+91 98765 43212", email: "amit@example.com", agents: 8 },
  { id: 4, name: "Sneha Reddy", level: "silver", location: "Hyderabad", phone: "+91 98765 43213", email: "sneha@example.com", agents: 2 },
  { id: 5, name: "Vikram Singh", level: "silver", location: "Chennai", phone: "+91 98765 43214", email: "vikram@example.com", agents: 0 },
];

const getLevelBadge = (level: string) => {
  const colors = {
    diamond: "bg-gradient-diamond text-white",
    gold: "bg-gradient-gold text-white",
    silver: "bg-gradient-silver text-foreground"
  };
  return colors[level as keyof typeof colors];
};

export const AgentList = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {agents.map((agent) => (
        <Card key={agent.id} className="p-6 shadow-card hover:shadow-glow transition-all">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <Avatar className="h-12 w-12">
                <AvatarFallback className="bg-gradient-primary text-white">
                  {agent.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-semibold text-foreground">{agent.name}</h3>
                <Badge className={`${getLevelBadge(agent.level)} text-xs`}>
                  {agent.level}
                </Badge>
              </div>
            </div>
            <Button variant="ghost" size="icon">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </div>

          <div className="space-y-2 text-sm">
            <div className="flex items-center gap-2 text-muted-foreground">
              <MapPin className="h-4 w-4" />
              <span>{agent.location}</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Phone className="h-4 w-4" />
              <span>{agent.phone}</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Mail className="h-4 w-4" />
              <span className="truncate">{agent.email}</span>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-border">
            <div className="flex justify-between items-center text-sm">
              <span className="text-muted-foreground">Sub-agents</span>
              <span className="font-semibold text-foreground">{agent.agents}</span>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};
