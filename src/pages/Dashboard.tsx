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
        <Card className="bg-gradient-primary text-white border-0 shadow-glow overflow-hidden relative">
          <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
          <CardContent className="p-8 relative z-10">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h1 className="text-4xl font-bold mb-3 animate-fade-in">
                  Welcome to Forge India Connect
                </h1>
                <p className="text-white/90 text-xl mb-4 font-semibold">
                  Multi-Agent Management Application
                </p>
                <p className="text-white/80 max-w-3xl leading-relaxed">
                  Empowering your agent network with cutting-edge tools for growth, collaboration, and success. 
                  Manage your team, track performance, and scale your business effortlessly. Your journey to 
                  excellence starts here with Forge India's comprehensive agent management platform.
                </p>
              </div>
              <img 
                src="/src/assets/forge-logo.jpeg" 
                alt="Forge India" 
                className="h-20 w-20 object-contain rounded-lg shadow-lg hidden md:block"
              />
            </div>
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
