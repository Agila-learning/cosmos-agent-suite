import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Briefcase, Eye } from "lucide-react";

const applications = [
  { id: 1, title: "Software Engineer", company: "Tech Corp", status: "pending", applied: "2 days ago" },
  { id: 2, title: "Sales Manager", company: "Sales Inc", status: "reviewed", applied: "5 days ago" },
  { id: 3, title: "Data Analyst", company: "Data Co", status: "rejected", applied: "1 week ago" },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case "pending": return "bg-yellow-500/10 text-yellow-700 border-yellow-500/20";
    case "reviewed": return "bg-blue-500/10 text-blue-700 border-blue-500/20";
    case "rejected": return "bg-red-500/10 text-red-700 border-red-500/20";
    default: return "bg-secondary";
  }
};

export const JobApplications = () => {
  return (
    <Card className="shadow-card">
      <CardHeader>
        <CardTitle>Job Applications</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {applications.map((app) => (
          <div key={app.id} className="p-4 border border-border rounded-lg hover:border-primary transition-colors">
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
                  <Briefcase className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h4 className="font-medium text-foreground">{app.title}</h4>
                  <p className="text-sm text-muted-foreground">{app.company}</p>
                </div>
              </div>
              <Badge className={getStatusColor(app.status)}>
                {app.status}
              </Badge>
            </div>
            <div className="flex items-center justify-between mt-3 pt-3 border-t border-border">
              <span className="text-xs text-muted-foreground">Applied {app.applied}</span>
              <Button variant="ghost" size="sm">
                <Eye className="h-4 w-4 mr-1" />
                View
              </Button>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};
