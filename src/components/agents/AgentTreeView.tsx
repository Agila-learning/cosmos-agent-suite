import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ChevronDown, ChevronRight, Users } from "lucide-react";
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";

interface TreeNode {
  id: string;
  name: string;
  level: string;
  location: string;
  agents: number;
  children?: TreeNode[];
}

const mockTreeData: TreeNode = {
  id: '1',
  name: 'Rajesh Kumar',
  level: 'diamond',
  location: 'Mumbai',
  agents: 13,
  children: [
    {
      id: '2',
      name: 'Priya Sharma',
      level: 'gold',
      location: 'Delhi',
      agents: 5,
      children: [
        { id: '4', name: 'Sneha Reddy', level: 'silver', location: 'Hyderabad', agents: 2 },
        { id: '5', name: 'Vikram Singh', level: 'silver', location: 'Chennai', agents: 0 },
      ]
    },
    {
      id: '3',
      name: 'Amit Patel',
      level: 'gold',
      location: 'Bangalore',
      agents: 8,
      children: [
        { id: '6', name: 'Kavita Desai', level: 'silver', location: 'Pune', agents: 3 },
        { id: '7', name: 'Rohit Malhotra', level: 'silver', location: 'Kolkata', agents: 1 },
        { id: '8', name: 'Anita Gupta', level: 'silver', location: 'Jaipur', agents: 0 },
      ]
    },
  ]
};

const getLevelColor = (level: string) => {
  const colors = {
    diamond: "bg-gradient-diamond text-white",
    gold: "bg-gradient-gold text-white",
    silver: "bg-gradient-silver text-foreground"
  };
  return colors[level as keyof typeof colors];
};

const TreeNodeComponent = ({ node, depth = 0 }: { node: TreeNode; depth?: number }) => {
  const [isExpanded, setIsExpanded] = useState(depth < 2);

  return (
    <div className="animate-fade-in">
      <div 
        className={`flex items-center gap-3 p-3 rounded-lg hover:bg-muted/50 transition-all cursor-pointer mb-2`}
        style={{ marginLeft: `${depth * 1.5}rem` }}
        onClick={() => setIsExpanded(!isExpanded)}
      >
        {node.children && node.children.length > 0 && (
          <button className="hover-scale">
            {isExpanded ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
          </button>
        )}
        {(!node.children || node.children.length === 0) && <div className="w-4" />}
        
        <Avatar className="h-8 w-8">
          <AvatarFallback className={getLevelColor(node.level)}>
            {node.name.split(' ').map(n => n[0]).join('')}
          </AvatarFallback>
        </Avatar>
        
        <div className="flex-1">
          <p className="font-medium text-sm">{node.name}</p>
          <p className="text-xs text-muted-foreground">{node.location}</p>
        </div>
        
        <Badge className={`${getLevelColor(node.level)} text-xs`}>
          {node.level}
        </Badge>
        
        <div className="flex items-center gap-1 text-xs text-muted-foreground">
          <Users className="h-3 w-3" />
          <span>{node.agents}</span>
        </div>
      </div>
      
      {isExpanded && node.children && (
        <div className="border-l-2 border-border ml-6">
          {node.children.map((child) => (
            <TreeNodeComponent key={child.id} node={child} depth={depth + 1} />
          ))}
        </div>
      )}
    </div>
  );
};

export const AgentTreeView = () => {
  const { user } = useAuth();

  return (
    <Card className="shadow-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Users className="h-5 w-5 text-primary" />
          Agent Network Tree
        </CardTitle>
      </CardHeader>
      <CardContent>
        {user?.role === 'diamond' ? (
          <div className="space-y-2">
            <TreeNodeComponent node={mockTreeData} />
          </div>
        ) : (
          <div className="text-center py-8 text-muted-foreground">
            <Users className="h-12 w-12 mx-auto mb-3 opacity-20" />
            <p>Full network tree view is available for Diamond agents only.</p>
            <p className="text-sm mt-2">You can see your direct sub-agents in the Agent Management section.</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
