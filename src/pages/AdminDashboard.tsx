import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { StatsCards } from "@/components/dashboard/StatsCards";
import { AgentHierarchy } from "@/components/dashboard/AgentHierarchy";
import { RecentActivity } from "@/components/dashboard/RecentActivity";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, BarChart3, Settings, FileText, Plus, TrendingUp } from "lucide-react";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const navigate = useNavigate();

  const quickActions = [
    {
      label: "Add Agent",
      icon: Plus,
      description: "Onboard new agent",
      action: () => navigate("/agents"),
      isPrimary: true,
    },
    {
      label: "View Reports",
      icon: FileText,
      description: "Analytics & insights",
      action: () => navigate("/analytics"),
      isPrimary: false,
    },
    {
      label: "Analytics",
      icon: BarChart3,
      description: "Performance metrics",
      action: () => navigate("/analytics"),
      isPrimary: false,
    },
    {
      label: "Settings",
      icon: Settings,
      description: "System configuration",
      action: () => navigate("/settings"),
      isPrimary: false,
    },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header Section */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-mesh p-8 border border-border/50">
          <div className="relative z-10 space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium">
              <TrendingUp className="h-4 w-4" />
              <span>Admin Dashboard</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              Welcome back, Admin
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl">
              Monitor your network, track performance, and manage your team efficiently
            </p>
          </div>
        </div>

        {/* Stats Section */}
        <div className="animate-fade-in">
          <StatsCards />
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          {/* Agent Hierarchy - Takes 2 columns */}
          <div className="xl:col-span-2 animate-fade-in" style={{ animationDelay: "0.1s" }}>
            <AgentHierarchy />
          </div>

          {/* Recent Activity - Takes 1 column */}
          <div className="animate-fade-in" style={{ animationDelay: "0.2s" }}>
            <RecentActivity />
          </div>
        </div>

        {/* Quick Actions Section */}
        <Card className="animate-fade-in shadow-card hover:shadow-card-hover transition-all duration-300" style={{ animationDelay: "0.3s" }}>
          <CardHeader className="border-b border-border/50">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-2xl">Quick Actions</CardTitle>
                <CardDescription className="text-base mt-2">
                  Common tasks and shortcuts for efficient management
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {quickActions.map((action, index) => {
                const Icon = action.icon;
                return (
                  <Button
                    key={index}
                    onClick={action.action}
                    variant={action.isPrimary ? "default" : "secondary"}
                    className={`h-auto flex flex-col items-start gap-3 p-6 hover-scale transition-all duration-200 ${
                      action.isPrimary
                        ? "bg-gradient-primary text-primary-foreground shadow-glow hover:shadow-elevated"
                        : "bg-card hover:bg-accent border border-border hover:border-primary/20"
                    }`}
                  >
                    <div className={`p-3 rounded-lg ${
                      action.isPrimary 
                        ? "bg-white/20" 
                        : "bg-primary/10"
                    }`}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="text-left">
                      <div className="font-semibold text-base">{action.label}</div>
                      <div className={`text-sm mt-1 ${
                        action.isPrimary
                          ? "text-primary-foreground/80"
                          : "text-muted-foreground"
                      }`}>
                        {action.description}
                      </div>
                    </div>
                  </Button>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default AdminDashboard;
