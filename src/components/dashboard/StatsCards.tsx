import { Card } from "@/components/ui/card";
import { Users, TrendingUp, DollarSign, Award } from "lucide-react";

const stats = [
  {
    title: "Total Agents",
    value: "156",
    change: "+12%",
    icon: Users,
    gradient: "bg-gradient-primary"
  },
  {
    title: "Team Growth",
    value: "23%",
    change: "+5%",
    icon: TrendingUp,
    gradient: "bg-gradient-diamond"
  },
  {
    title: "Revenue",
    value: "₹39,000",
    change: "+18%",
    icon: DollarSign,
    gradient: "bg-gradient-gold"
  },
  {
    title: "Your Level",
    value: "Diamond",
    change: "Elite",
    icon: Award,
    gradient: "bg-gradient-diamond"
  },
];

export const StatsCards = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <Card key={stat.title} className="p-6 shadow-card hover:shadow-glow transition-all">
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 ${stat.gradient} rounded-xl flex items-center justify-center`}>
                <Icon className="h-6 w-6 text-white" />
              </div>
              <span className="text-sm font-medium text-green-600">{stat.change}</span>
            </div>
            <h3 className="text-2xl font-bold text-foreground mb-1">{stat.value}</h3>
            <p className="text-sm text-muted-foreground">{stat.title}</p>
          </Card>
        );
      })}
    </div>
  );
};
