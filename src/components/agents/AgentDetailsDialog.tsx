import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { MapPin, Phone, Mail, Calendar, Users, Briefcase, TrendingUp } from "lucide-react";

interface Agent {
  id: number;
  name: string;
  level: string;
  location: string;
  phone: string;
  email: string;
  agents: number;
  businessBackground?: string;
  joinedDate?: string;
  kycStatus?: string;
  performance?: string;
}

interface AgentDetailsDialogProps {
  agent: Agent | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const getLevelBadge = (level: string) => {
  const colors = {
    diamond: "bg-gradient-diamond text-white",
    gold: "bg-gradient-gold text-white",
    silver: "bg-gradient-silver text-foreground"
  };
  return colors[level as keyof typeof colors];
};

export const AgentDetailsDialog = ({ agent, open, onOpenChange }: AgentDetailsDialogProps) => {
  if (!agent) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">Agent Details</DialogTitle>
        </DialogHeader>

        <div className="space-y-6 animate-fade-in">
          {/* Header Section */}
          <div className="flex items-start gap-4">
            <Avatar className="h-20 w-20">
              <AvatarFallback className="bg-gradient-primary text-white text-xl">
                {agent.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h3 className="text-2xl font-bold text-foreground">{agent.name}</h3>
              <Badge className={`${getLevelBadge(agent.level)} mt-2`}>
                {agent.level.toUpperCase()} AGENT
              </Badge>
              <Badge className="ml-2 mt-2" variant={agent.kycStatus === 'approved' ? 'default' : 'secondary'}>
                KYC: {agent.kycStatus || 'Pending'}
              </Badge>
            </div>
          </div>

          <Separator />

          {/* Contact Information */}
          <div className="space-y-4">
            <h4 className="font-semibold text-lg flex items-center gap-2">
              <Phone className="h-5 w-5 text-primary" />
              Contact Information
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pl-7">
              <div className="flex items-center gap-3">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-xs text-muted-foreground">Location</p>
                  <p className="font-medium">{agent.location}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-xs text-muted-foreground">Phone</p>
                  <p className="font-medium">{agent.phone}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 md:col-span-2">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-xs text-muted-foreground">Email</p>
                  <p className="font-medium">{agent.email}</p>
                </div>
              </div>
            </div>
          </div>

          <Separator />

          {/* Network Information */}
          <div className="space-y-4">
            <h4 className="font-semibold text-lg flex items-center gap-2">
              <Users className="h-5 w-5 text-primary" />
              Network Information
            </h4>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 pl-7">
              <div className="p-4 bg-muted/50 rounded-lg">
                <p className="text-xs text-muted-foreground mb-1">Sub-Agents</p>
                <p className="text-2xl font-bold text-foreground">{agent.agents}</p>
              </div>
              <div className="p-4 bg-muted/50 rounded-lg">
                <p className="text-xs text-muted-foreground mb-1">Total Network</p>
                <p className="text-2xl font-bold text-foreground">{agent.agents * 3 + agent.agents}</p>
              </div>
              <div className="p-4 bg-muted/50 rounded-lg">
                <p className="text-xs text-muted-foreground mb-1">Performance</p>
                <p className="text-2xl font-bold text-green-600">{agent.performance || '95%'}</p>
              </div>
            </div>
          </div>

          <Separator />

          {/* Professional Background */}
          <div className="space-y-4">
            <h4 className="font-semibold text-lg flex items-center gap-2">
              <Briefcase className="h-5 w-5 text-primary" />
              Professional Background
            </h4>
            <div className="pl-7">
              <p className="text-muted-foreground">
                {agent.businessBackground || 'No background information provided yet.'}
              </p>
            </div>
          </div>

          <Separator />

          {/* Timeline */}
          <div className="space-y-4">
            <h4 className="font-semibold text-lg flex items-center gap-2">
              <Calendar className="h-5 w-5 text-primary" />
              Timeline
            </h4>
            <div className="pl-7 space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-primary mt-2"></div>
                <div>
                  <p className="font-medium">Joined Forge India</p>
                  <p className="text-xs text-muted-foreground">{agent.joinedDate || 'January 2024'}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-green-600 mt-2"></div>
                <div>
                  <p className="font-medium">KYC Verification</p>
                  <p className="text-xs text-muted-foreground">Completed</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-blue-600 mt-2"></div>
                <div>
                  <p className="font-medium">First Sub-Agent Onboarded</p>
                  <p className="text-xs text-muted-foreground">February 2024</p>
                </div>
              </div>
            </div>
          </div>

          {/* Performance Metrics */}
          <div className="space-y-4">
            <h4 className="font-semibold text-lg flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              Recent Performance
            </h4>
            <div className="grid grid-cols-2 gap-4 pl-7">
              <div className="p-3 border rounded-lg">
                <p className="text-xs text-muted-foreground">This Month</p>
                <p className="text-lg font-semibold text-green-600">+{Math.floor(Math.random() * 20 + 10)}%</p>
              </div>
              <div className="p-3 border rounded-lg">
                <p className="text-xs text-muted-foreground">Active Days</p>
                <p className="text-lg font-semibold text-foreground">{Math.floor(Math.random() * 10 + 20)}/30</p>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
