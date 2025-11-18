import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { StatsCards } from "@/components/dashboard/StatsCards";
import { AgentHierarchy } from "@/components/dashboard/AgentHierarchy";
import { RecentActivity } from "@/components/dashboard/RecentActivity";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, TrendingUp, Award, Activity } from "lucide-react";
import forgeLogo from "@/assets/forge-logo.jpeg";

const AdminDashboard = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6 sm:space-y-8">
        <div className="space-y-2 animate-fade-in">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-primary bg-clip-text">Admin Dashboard</h1>
          <p className="text-sm sm:text-base text-muted-foreground">Comprehensive overview and control of your network</p>
        </div>

        <div className="animate-slide-in">
          <StatsCards />
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-6">
          <div className="animate-fade-in" style={{ animationDelay: "0.1s" }}>
            <AgentHierarchy />
          </div>
          <div className="animate-fade-in" style={{ animationDelay: "0.2s" }}>
            <RecentActivity />
          </div>
        </div>

        <Card className="animate-fade-in shadow-card hover-scale" style={{ animationDelay: "0.3s" }}>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Manage your network efficiently</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
              <button className="p-4 rounded-lg bg-gradient-primary text-primary-foreground hover:opacity-90 transition-opacity text-sm font-medium">
                Add Agent
              </button>
              <button className="p-4 rounded-lg bg-muted hover:bg-muted/80 transition-colors text-sm font-medium">
                View Reports
              </button>
              <button className="p-4 rounded-lg bg-muted hover:bg-muted/80 transition-colors text-sm font-medium">
                Analytics
              </button>
              <button className="p-4 rounded-lg bg-muted hover:bg-muted/80 transition-colors text-sm font-medium">
                Settings
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default AdminDashboard;
