import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

const activities = [
  { agent: "Rajesh Kumar", action: "Joined network", time: "2h ago", level: "silver", type: "join", revenue: "₹0" },
  { agent: "Priya Sharma", action: "KYC approved", time: "5h ago", level: "gold", type: "kyc", revenue: "₹45K" },
  { agent: "Amit Patel", action: "Added 3 agents", time: "1d ago", level: "gold", type: "agents", revenue: "₹120K" },
  { agent: "Sneha Reddy", action: "Upgraded to Gold", time: "2d ago", level: "gold", type: "upgrade", revenue: "₹80K" },
  { agent: "Vikram Singh", action: "Resume uploaded", time: "3d ago", level: "silver", type: "resume", revenue: "₹25K" },
  { agent: "Meena Iyer", action: "Applied for job", time: "4h ago", level: "silver", type: "job", revenue: "₹30K" },
  { agent: "Arjun Desai", action: "Revenue milestone", time: "6h ago", level: "diamond", type: "milestone", revenue: "₹500K" },
  { agent: "Kavita Nair", action: "Team meeting scheduled", time: "8h ago", level: "gold", type: "meeting", revenue: "₹65K" },
];

const getLevelBadge = (level: string) => {
  const colors = {
    diamond: "bg-gradient-diamond text-white",
    gold: "bg-gradient-gold text-white",
    silver: "bg-gradient-silver text-foreground"
  };
  return colors[level as keyof typeof colors];
};

const getActivityIcon = (type: string) => {
  switch (type) {
    case "join": return "👋";
    case "kyc": return "✅";
    case "agents": return "👥";
    case "upgrade": return "⬆️";
    case "resume": return "📄";
    case "job": return "💼";
    case "milestone": return "🎯";
    case "meeting": return "📅";
    default: return "📌";
  }
};

export const RecentActivity = () => {
  return (
    <Card className="shadow-card h-full">
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3 max-h-[600px] overflow-y-auto">
        {activities.map((activity, idx) => (
          <div 
            key={idx} 
            className="p-3 rounded-lg border border-border hover:border-primary hover:bg-accent/50 transition-all animate-fade-in hover-scale cursor-pointer" 
            style={{ animationDelay: `${idx * 0.05}s` }}
          >
            <div className="flex items-start gap-3">
              <div className="text-2xl flex-shrink-0">
                {getActivityIcon(activity.type)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2 mb-1">
                  <p className="text-sm font-semibold text-foreground">{activity.agent}</p>
                  <Badge className={`${getLevelBadge(activity.level)} text-xs`}>
                    {activity.level}
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground mb-2">{activity.action}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">{activity.time}</span>
                  <span className="text-xs font-medium text-primary">{activity.revenue}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};
