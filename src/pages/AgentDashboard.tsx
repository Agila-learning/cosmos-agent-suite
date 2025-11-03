import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { AttendanceTracker } from "@/components/attendance/AttendanceTracker";
import { RecentActivity } from "@/components/dashboard/RecentActivity";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Users, Target, Award } from "lucide-react";
import forgeLogo from "@/assets/forge-logo.jpeg";

const AgentDashboard = () => {
  const { user } = useAuth();

  return (
    <DashboardLayout>
      <div className="space-y-6 animate-fade-in">
        {/* Welcome Section */}
        <Card className="bg-gradient-primary text-white border-0 shadow-glow overflow-hidden relative">
          <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
          <CardContent className="p-8 relative z-10">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <h1 className="text-4xl font-bold mb-3 animate-fade-in">
                  Welcome back, {user?.name}!
                </h1>
                <p className="text-white/90 text-xl mb-2 font-semibold">
                  {user?.role.charAt(0).toUpperCase() + user?.role.slice(1)} Agent Dashboard
                </p>
                <p className="text-white/80 max-w-3xl leading-relaxed">
                  Track your performance, manage your attendance, and grow your network. 
                  Stay connected with your team and achieve your goals with Forge India Connect.
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

        {/* Agent Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="hover-scale cursor-pointer">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-gradient-primary rounded-lg">
                  <Users className="h-6 w-6 text-white" />
                </div>
                <div>
                  <p className="text-2xl font-bold">24</p>
                  <p className="text-sm text-muted-foreground">Your Agents</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="hover-scale cursor-pointer">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-green-600 rounded-lg">
                  <TrendingUp className="h-6 w-6 text-white" />
                </div>
                <div>
                  <p className="text-2xl font-bold">₹45K</p>
                  <p className="text-sm text-muted-foreground">This Month</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="hover-scale cursor-pointer">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-blue-600 rounded-lg">
                  <Target className="h-6 w-6 text-white" />
                </div>
                <div>
                  <p className="text-2xl font-bold">78%</p>
                  <p className="text-sm text-muted-foreground">Goal Progress</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="hover-scale cursor-pointer">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-gradient-gold rounded-lg">
                  <Award className="h-6 w-6 text-white" />
                </div>
                <div>
                  <p className="text-2xl font-bold">4.8</p>
                  <p className="text-sm text-muted-foreground">Rating</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Profile Overview */}
        <Card>
          <CardHeader>
            <CardTitle>Profile Overview</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Agent Level</span>
              <Badge className={`bg-gradient-${user?.role}`}>{user?.role}</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Location</span>
              <span className="font-medium">{user?.location}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">KYC Status</span>
              <Badge variant={user?.kycStatus === 'approved' ? 'default' : 'secondary'}>
                {user?.kycStatus}
              </Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Resume Status</span>
              <Badge variant={user?.resumeUploaded ? 'default' : 'secondary'}>
                {user?.resumeUploaded ? 'Uploaded' : 'Pending'}
              </Badge>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <RecentActivity />
          </div>
          <div>
            <AttendanceTracker />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AgentDashboard;
