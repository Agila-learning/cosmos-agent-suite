import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

const activities = [
  { agent: "Rajesh Kumar", action: "Joined network", time: "2h ago", level: "silver" },
  { agent: "Priya Sharma", action: "KYC approved", time: "5h ago", level: "gold" },
  { agent: "Amit Patel", action: "Added 3 agents", time: "1d ago", level: "gold" },
  { agent: "Sneha Reddy", action: "Upgraded to Gold", time: "2d ago", level: "gold" },
  { agent: "Vikram Singh", action: "Resume uploaded", time: "3d ago", level: "silver" },
];

const getLevelBadge = (level: string) => {
  const colors = {
    diamond: "bg-gradient-diamond text-white",
    gold: "bg-gradient-gold text-white",
    silver: "bg-gradient-silver text-foreground"
  };
  return colors[level as keyof typeof colors];
};

export const RecentActivity = () => {
  return (
    <Card className="shadow-card h-full">
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {activities.map((activity, idx) => (
          <div key={idx} className="flex items-start gap-3 animate-fade-in" style={{ animationDelay: `${idx * 0.1}s` }}>
            <Avatar className="h-10 w-10">
              <AvatarFallback className="bg-muted text-foreground">
                {activity.agent.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground truncate">{activity.agent}</p>
              <p className="text-xs text-muted-foreground">{activity.action}</p>
            </div>
            <div className="text-right">
              <Badge className={`${getLevelBadge(activity.level)} text-xs mb-1`}>
                {activity.level}
              </Badge>
              <p className="text-xs text-muted-foreground">{activity.time}</p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};
