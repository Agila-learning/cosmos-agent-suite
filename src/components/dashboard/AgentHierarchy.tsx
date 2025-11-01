import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users } from "lucide-react";

const hierarchyData = {
  name: "You (Diamond)",
  level: "diamond",
  children: [
    {
      name: "Gold Agent 1",
      level: "gold",
      children: [
        { name: "Silver Agent 1", level: "silver" },
        { name: "Silver Agent 2", level: "silver" },
      ]
    },
    {
      name: "Gold Agent 2",
      level: "gold",
      children: [
        { name: "Silver Agent 3", level: "silver" },
        { name: "Silver Agent 4", level: "silver" },
        { name: "Silver Agent 5", level: "silver" },
      ]
    },
  ]
};

const getLevelColor = (level: string) => {
  switch (level) {
    case "diamond": return "bg-gradient-diamond text-white";
    case "gold": return "bg-gradient-gold text-white";
    case "silver": return "bg-gradient-silver text-foreground";
    default: return "bg-secondary";
  }
};

const TreeNode = ({ node, level = 0 }: any) => {
  return (
    <div className="relative">
      <div className={`flex items-center gap-3 p-4 rounded-lg ${getLevelColor(node.level)} mb-3 animate-slide-in`}
           style={{ marginLeft: `${level * 2}rem` }}>
        <Users className="h-5 w-5" />
        <span className="font-medium">{node.name}</span>
        <Badge variant="outline" className="ml-auto bg-white/20 border-white/40">
          {node.children?.length || 0} agents
        </Badge>
      </div>
      {node.children?.map((child: any, idx: number) => (
        <TreeNode key={idx} node={child} level={level + 1} />
      ))}
    </div>
  );
};

export const AgentHierarchy = () => {
  return (
    <Card className="shadow-card">
      <CardHeader>
        <CardTitle>Agent Hierarchy</CardTitle>
      </CardHeader>
      <CardContent>
        <TreeNode node={hierarchyData} />
      </CardContent>
    </Card>
  );
};
