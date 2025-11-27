import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { RecentActivity } from "@/components/dashboard/RecentActivity";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { TrendingUp, Users, Target, Award, ArrowRight, Zap } from "lucide-react";
import { useNavigate } from "react-router-dom";

const AgentDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const stats = [
    {
      label: "Your Agents",
      value: "24",
      icon: Users,
      change: "+12%",
      gradient: "bg-gradient-primary",
      color: "text-primary",
    },
    {
      label: "This Month",
      value: "₹45K",
      icon: TrendingUp,
      change: "+23%",
      gradient: "bg-gradient-success",
      color: "text-success",
    },
    {
      label: "Goal Progress",
      value: "78%",
      icon: Target,
      change: "+8%",
      gradient: "bg-gradient-diamond",
      color: "text-info",
    },
    {
      label: "Rating",
      value: "4.8",
      icon: Award,
      change: "+0.3",
      gradient: "bg-gradient-gold",
      color: "text-warning",
    },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Hero Section */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-mesh p-8 border border-border/50">
          <div className="relative z-10 space-y-4">
            <div className="flex flex-wrap items-center gap-3">
              <Badge className="bg-gradient-primary text-primary-foreground border-0 px-4 py-1.5 text-sm font-medium">
                <Zap className="h-3.5 w-3.5 mr-1.5" />
                {user?.role.charAt(0).toUpperCase() + user?.role.slice(1)} Agent
              </Badge>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              Welcome back, {user?.name}!
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl">
              Track your performance and grow your network to reach new heights
            </p>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card
                key={index}
                className="relative overflow-hidden hover-scale cursor-pointer border border-border/50 transition-all duration-300 hover:shadow-card-hover group"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className={`absolute top-0 left-0 w-1 h-full ${stat.gradient}`} />
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <p className="text-sm text-muted-foreground font-medium mb-2">
                        {stat.label}
                      </p>
                      <p className="text-3xl font-bold">{stat.value}</p>
                    </div>
                    <div className={`p-3 rounded-xl ${stat.gradient} transition-transform duration-300 group-hover:scale-110`}>
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary" className="text-xs font-medium bg-success/10 text-success border-0">
                      {stat.change}
                    </Badge>
                    <span className="text-xs text-muted-foreground">vs last month</span>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Profile Overview & Performance */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Profile Overview */}
          <Card className="shadow-card hover:shadow-card-hover transition-all duration-300">
            <CardHeader className="border-b border-border/50">
              <CardTitle className="text-xl">Profile Overview</CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-5">
              <div className="flex items-center justify-between p-4 rounded-lg bg-gradient-secondary border border-border/50">
                <span className="text-sm font-medium text-muted-foreground">Agent Level</span>
                <Badge className="bg-gradient-primary text-primary-foreground border-0">
                  {user?.role}
                </Badge>
              </div>
              <div className="flex items-center justify-between p-4 rounded-lg bg-card hover:bg-accent transition-colors">
                <span className="text-sm font-medium text-muted-foreground">Location</span>
                <span className="font-semibold">{user?.location}</span>
              </div>
              <div className="flex items-center justify-between p-4 rounded-lg bg-card hover:bg-accent transition-colors">
                <span className="text-sm font-medium text-muted-foreground">KYC Status</span>
                <Badge
                  variant={user?.kycStatus === "approved" ? "default" : "secondary"}
                  className={user?.kycStatus === "approved" ? "bg-gradient-success text-success-foreground border-0" : ""}
                >
                  {user?.kycStatus}
                </Badge>
              </div>
              <div className="flex items-center justify-between p-4 rounded-lg bg-card hover:bg-accent transition-colors">
                <span className="text-sm font-medium text-muted-foreground">Resume Status</span>
                <Badge
                  variant={user?.resumeUploaded ? "default" : "secondary"}
                  className={user?.resumeUploaded ? "bg-gradient-success text-success-foreground border-0" : ""}
                >
                  {user?.resumeUploaded ? "Uploaded" : "Pending"}
                </Badge>
              </div>
              <Button 
                className="w-full mt-4 bg-gradient-primary text-primary-foreground hover:opacity-90 transition-opacity"
                onClick={() => navigate("/profile")}
              >
                Edit Profile
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </CardContent>
          </Card>

          {/* Monthly Goal Progress */}
          <Card className="shadow-card hover:shadow-card-hover transition-all duration-300">
            <CardHeader className="border-b border-border/50">
              <CardTitle className="text-xl">Monthly Goal Progress</CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Revenue Target</span>
                  <span className="text-sm font-bold">₹45K / ₹60K</span>
                </div>
                <Progress value={75} className="h-3" />
                <p className="text-xs text-muted-foreground">75% complete - Keep it up!</p>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">New Agents</span>
                  <span className="text-sm font-bold">18 / 25</span>
                </div>
                <Progress value={72} className="h-3" />
                <p className="text-xs text-muted-foreground">72% complete - Almost there!</p>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Training Sessions</span>
                  <span className="text-sm font-bold">8 / 10</span>
                </div>
                <Progress value={80} className="h-3" />
                <p className="text-xs text-muted-foreground">80% complete - Excellent!</p>
              </div>

              <Button 
                className="w-full mt-4 bg-gradient-diamond text-primary-foreground hover:opacity-90 transition-opacity"
                onClick={() => navigate("/analytics")}
              >
                View Detailed Analytics
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity */}
        <div className="animate-fade-in" style={{ animationDelay: "0.3s" }}>
          <RecentActivity />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AgentDashboard;
