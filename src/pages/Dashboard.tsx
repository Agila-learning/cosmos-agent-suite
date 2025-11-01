import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { StatsCards } from "@/components/dashboard/StatsCards";
import { AgentHierarchy } from "@/components/dashboard/AgentHierarchy";
import { RecentActivity } from "@/components/dashboard/RecentActivity";
import { AttendanceTracker } from "@/components/attendance/AttendanceTracker";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent } from "@/components/ui/card";

const Dashboard = () => {
  const { user } = useAuth();

  return (
    <DashboardLayout>
      <div className="space-y-6 animate-fade-in">
        {/* Welcome Section */}
        <Card className="bg-gradient-primary text-white border-0 shadow-glow">
          <CardContent className="p-6">
            <h1 className="text-3xl font-bold mb-2">
              Welcome to Forge India Connect
            </h1>
            <p className="text-white/90 text-lg mb-4">
              Multi-Agent Management Application
            </p>
            <p className="text-white/80">
              Empowering your agent network with cutting-edge tools for growth, collaboration, and success. 
              Manage your team, track performance, and scale your business effortlessly. Your journey to 
              excellence starts here with Forge India's comprehensive agent management platform.
            </p>
          </CardContent>
        </Card>
        
        <StatsCards />
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-3">
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
              <div className="xl:col-span-2">
                <AgentHierarchy />
              </div>
              <div>
                <RecentActivity />
              </div>
            </div>
          </div>
          <div>
            <AttendanceTracker />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
