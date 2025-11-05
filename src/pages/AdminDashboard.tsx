import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { StatsCards } from "@/components/dashboard/StatsCards";
import { AgentHierarchy } from "@/components/dashboard/AgentHierarchy";
import { RecentActivity } from "@/components/dashboard/RecentActivity";
import { Card, CardContent } from "@/components/ui/card";
import { Users, TrendingUp, Award, Activity } from "lucide-react";
import forgeLogo from "@/assets/forge-logo.jpeg";

const AdminDashboard = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6 animate-fade-in">
        {/* Welcome Section */}
        <Card className="bg-gradient-primary text-white border-0 shadow-glow overflow-hidden relative animate-scale-in">
          <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
          <CardContent className="p-8 relative z-10">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <h1 className="text-4xl font-bold mb-3 animate-fade-in">
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-white/90 to-white/70">
                    Welcome to Forge India Connect
                  </span>
                </h1>
                <p className="text-white/90 text-xl mb-4 font-semibold">
                  Admin Dashboard - Multi-Agent Management
                </p>
                <p className="text-white/80 max-w-3xl leading-relaxed">
                  Empowering your agent network with cutting-edge tools for growth, collaboration, and success. 
                  Monitor your entire team, track performance metrics, and scale your business effortlessly with 
                  complete visibility into your agent hierarchy and operations.
                </p>
              </div>
              <img 
                src={forgeLogo}
                alt="Forge India" 
                className="h-24 w-24 object-contain rounded-lg shadow-lg hidden md:block animate-pulse-glow"
              />
            </div>
          </CardContent>
        </Card>
        
        <StatsCards />
        
        {/* Admin Overview Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="hover-scale cursor-pointer border-2 border-transparent hover:border-primary transition-all shadow-card">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-gradient-primary rounded-lg">
                  <Users className="h-6 w-6 text-white" />
                </div>
                <div>
                  <p className="text-2xl font-bold">156</p>
                  <p className="text-sm text-muted-foreground">Total Agents</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="hover-scale cursor-pointer border-2 border-transparent hover:border-primary transition-all">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-gradient-gold rounded-lg">
                  <Award className="h-6 w-6 text-white" />
                </div>
                <div>
                  <p className="text-2xl font-bold">12</p>
                  <p className="text-sm text-muted-foreground">Diamond Agents</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="hover-scale cursor-pointer border-2 border-transparent hover:border-primary transition-all">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-green-600 rounded-lg">
                  <TrendingUp className="h-6 w-6 text-white" />
                </div>
                <div>
                  <p className="text-2xl font-bold">₹2.4M</p>
                  <p className="text-sm text-muted-foreground">Monthly Revenue</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="hover-scale cursor-pointer border-2 border-transparent hover:border-primary transition-all">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-blue-600 rounded-lg">
                  <Activity className="h-6 w-6 text-white" />
                </div>
                <div>
                  <p className="text-2xl font-bold">92%</p>
                  <p className="text-sm text-muted-foreground">Active Rate</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <AgentHierarchy />
          </div>
          <div>
            <RecentActivity />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AdminDashboard;
