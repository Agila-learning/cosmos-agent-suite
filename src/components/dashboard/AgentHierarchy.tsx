import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Users, ChevronDown, ChevronRight, MapPin, Phone, Mail } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";

interface AgentNode {
  name: string;
  level: string;
  email?: string;
  phone?: string;
  location?: string;
  performance?: string;
  joined?: string;
  children?: AgentNode[];
}

const hierarchyData: AgentNode = {
  name: "Rajesh Kumar (You)",
  level: "diamond",
  email: "rajesh@forge.com",
  phone: "+91 98765 43210",
  location: "Mumbai",
  performance: "Excellent",
  joined: "Jan 2020",
  children: [
    {
      name: "Priya Sharma",
      level: "gold",
      email: "priya@forge.com",
      phone: "+91 98765 43211",
      location: "Delhi",
      performance: "Good",
      joined: "Mar 2021",
      children: [
        { 
          name: "Sneha Reddy", 
          level: "silver",
          email: "sneha@forge.com",
          phone: "+91 98765 43213",
          location: "Hyderabad",
          performance: "Average",
          joined: "Jun 2022"
        },
        { 
          name: "Vikram Singh", 
          level: "silver",
          email: "vikram@forge.com",
          phone: "+91 98765 43214",
          location: "Chennai",
          performance: "Good",
          joined: "Aug 2022"
        },
      ]
    },
    {
      name: "Amit Patel",
      level: "gold",
      email: "amit@forge.com",
      phone: "+91 98765 43212",
      location: "Bangalore",
      performance: "Excellent",
      joined: "May 2021",
      children: [
        { 
          name: "Kavita Desai", 
          level: "silver",
          email: "kavita@forge.com",
          phone: "+91 98765 43215",
          location: "Pune",
          performance: "Good",
          joined: "Oct 2022"
        },
        { 
          name: "Rohit Malhotra", 
          level: "silver",
          email: "rohit@forge.com",
          phone: "+91 98765 43216",
          location: "Kolkata",
          performance: "Average",
          joined: "Dec 2022"
        },
        { 
          name: "Anita Gupta", 
          level: "silver",
          email: "anita@forge.com",
          phone: "+91 98765 43217",
          location: "Jaipur",
          performance: "Excellent",
          joined: "Feb 2023"
        },
      ]
    },
  ]
};

const getLevelColor = (level: string) => {
  switch (level) {
    case "diamond": return "bg-gradient-diamond text-white";
    case "gold": return "bg-gradient-gold text-white";
    case "silver": return "bg-gradient-silver text-foreground";
    default: return "bg-secondary";
  }
};

const TreeNode = ({ node, level = 0 }: { node: AgentNode; level?: number }) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [selectedAgent, setSelectedAgent] = useState<AgentNode | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleAgentClick = () => {
    setSelectedAgent(node);
    setDialogOpen(true);
  };

  return (
    <>
      <div className="relative">
        <div 
          className={`flex items-center gap-3 p-4 rounded-lg ${getLevelColor(node.level)} mb-3 animate-slide-in hover-scale cursor-pointer transition-all`}
          style={{ marginLeft: `${level * 1.5}rem` }}
        >
          {node.children && node.children.length > 0 && (
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6"
              onClick={(e) => {
                e.stopPropagation();
                setIsExpanded(!isExpanded);
              }}
            >
              {isExpanded ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
            </Button>
          )}
          {(!node.children || node.children.length === 0) && <div className="w-6" />}
          
          <div className="flex-1 flex items-center gap-3" onClick={handleAgentClick}>
            <Users className="h-5 w-5" />
            <div className="flex-1">
              <span className="font-medium block">{node.name}</span>
              {node.location && (
                <span className="text-xs opacity-80 flex items-center gap-1 mt-1">
                  <MapPin className="h-3 w-3" />
                  {node.location}
                </span>
              )}
            </div>
            <Badge variant="outline" className="bg-white/20 border-white/40">
              {node.children?.length || 0} agents
            </Badge>
          </div>
        </div>
        
        {isExpanded && node.children?.map((child, idx) => (
          <TreeNode key={idx} node={child} level={level + 1} />
        ))}
      </div>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>{selectedAgent?.name}</DialogTitle>
          </DialogHeader>
          {selectedAgent && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Level</span>
                <Badge className={getLevelColor(selectedAgent.level)}>
                  {selectedAgent.level}
                </Badge>
              </div>
              
              {selectedAgent.email && (
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{selectedAgent.email}</span>
                </div>
              )}
              
              {selectedAgent.phone && (
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{selectedAgent.phone}</span>
                </div>
              )}
              
              {selectedAgent.location && (
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{selectedAgent.location}</span>
                </div>
              )}
              
              <Separator />
              
              {selectedAgent.performance && (
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Performance</span>
                  <Badge variant="outline">{selectedAgent.performance}</Badge>
                </div>
              )}
              
              {selectedAgent.joined && (
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Joined</span>
                  <span className="text-sm font-medium">{selectedAgent.joined}</span>
                </div>
              )}
              
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Team Size</span>
                <span className="text-sm font-medium">{selectedAgent.children?.length || 0} agents</span>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export const AgentHierarchy = () => {
  return (
    <Card className="shadow-card">
      <CardHeader>
        <CardTitle>Agent Hierarchy</CardTitle>
      </CardHeader>
      <CardContent>
        <TreeNode node={hierarchyData} />
      </CardContent>
    </Card>
  );
};
