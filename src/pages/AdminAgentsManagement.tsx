import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Edit, Mail, Phone, MapPin, Award, Users, TrendingUp, Calendar } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const mockAgents = [
  { id: 1, name: "Rajesh Kumar", email: "rajesh@example.com", phone: "+91 98765-43210", level: "diamond", location: "Mumbai", agents: 45, revenue: "₹2.4M", kycStatus: "approved", joinDate: "Jan 2024" },
  { id: 2, name: "Priya Sharma", email: "priya@example.com", phone: "+91 98765-43211", level: "gold", location: "Delhi", agents: 32, revenue: "₹1.8M", kycStatus: "approved", joinDate: "Feb 2024" },
  { id: 3, name: "Amit Patel", email: "amit@example.com", phone: "+91 98765-43212", level: "gold", location: "Bangalore", agents: 28, revenue: "₹1.5M", kycStatus: "approved", joinDate: "Mar 2024" },
  { id: 4, name: "Sneha Reddy", email: "sneha@example.com", phone: "+91 98765-43213", level: "silver", location: "Hyderabad", agents: 15, revenue: "₹800K", kycStatus: "pending", joinDate: "Apr 2024" },
  { id: 5, name: "Vikram Singh", email: "vikram@example.com", phone: "+91 98765-43214", level: "silver", location: "Chennai", agents: 12, revenue: "₹650K", kycStatus: "approved", joinDate: "May 2024" },
];

const AdminAgentsManagement = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedAgent, setSelectedAgent] = useState<typeof mockAgents[0] | null>(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const { toast } = useToast();

  const filteredAgents = mockAgents.filter(agent =>
    agent.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    agent.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleEditAgent = (agent: typeof mockAgents[0]) => {
    setSelectedAgent(agent);
    setEditDialogOpen(true);
  };

  const handleSaveChanges = () => {
    toast({
      title: "Agent updated",
      description: "Agent information has been updated successfully.",
    });
    setEditDialogOpen(false);
  };

  const getLevelColor = (level: string) => {
    const colors = {
      diamond: "bg-gradient-diamond",
      gold: "bg-gradient-gold",
      silver: "bg-gradient-silver"
    };
    return colors[level as keyof typeof colors];
  };

  return (
    <DashboardLayout>
      <div className="space-y-6 animate-fade-in">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Agents Management</h1>
            <p className="text-muted-foreground">View and manage all agents in your network</p>
          </div>
          <div className="relative w-full sm:w-auto">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search agents..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 w-full sm:w-[300px]"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAgents.map((agent) => (
            <Card key={agent.id} className="shadow-card hover-scale cursor-pointer transition-all">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-12 w-12">
                      <AvatarFallback className={`${getLevelColor(agent.level)} text-white`}>
                        {agent.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle className="text-lg">{agent.name}</CardTitle>
                      <Badge className={`${getLevelColor(agent.level)} text-white mt-1`}>
                        {agent.level}
                      </Badge>
                    </div>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => handleEditAgent(agent)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-2 text-sm">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground truncate">{agent.email}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">{agent.phone}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">{agent.location}</span>
                </div>
                <div className="pt-3 border-t grid grid-cols-2 gap-4">
                  <div>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground mb-1">
                      <Users className="h-3 w-3" />
                      <span>Agents</span>
                    </div>
                    <p className="text-lg font-bold">{agent.agents}</p>
                  </div>
                  <div>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground mb-1">
                      <TrendingUp className="h-3 w-3" />
                      <span>Revenue</span>
                    </div>
                    <p className="text-lg font-bold">{agent.revenue}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Edit Agent Details</DialogTitle>
            </DialogHeader>
            {selectedAgent && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Full Name</Label>
                    <Input defaultValue={selectedAgent.name} />
                  </div>
                  <div className="space-y-2">
                    <Label>Email</Label>
                    <Input defaultValue={selectedAgent.email} />
                  </div>
                  <div className="space-y-2">
                    <Label>Phone</Label>
                    <Input defaultValue={selectedAgent.phone} />
                  </div>
                  <div className="space-y-2">
                    <Label>Location</Label>
                    <Input defaultValue={selectedAgent.location} />
                  </div>
                  <div className="space-y-2">
                    <Label>Agent Level</Label>
                    <Select defaultValue={selectedAgent.level}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="diamond">Diamond</SelectItem>
                        <SelectItem value="gold">Gold</SelectItem>
                        <SelectItem value="silver">Silver</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>KYC Status</Label>
                    <Select defaultValue={selectedAgent.kycStatus}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="approved">Approved</SelectItem>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="rejected">Rejected</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="flex justify-end gap-3 pt-4">
                  <Button variant="outline" onClick={() => setEditDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleSaveChanges} className="bg-gradient-primary">
                    Save Changes
                  </Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  );
};

export default AdminAgentsManagement;
