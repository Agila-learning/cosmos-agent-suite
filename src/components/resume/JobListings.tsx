import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Briefcase, MapPin, DollarSign, Clock, Eye } from "lucide-react";
import { JobApplicationDetailsDialog } from "./JobApplicationDetailsDialog";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useNotifications } from "@/contexts/NotificationContext";

const availableJobs = [
  { 
    id: 1, 
    title: "Software Engineer", 
    company: "Tech Corp", 
    location: "Bangalore, India",
    salary: "₹8-12 LPA",
    type: "Full-time",
    posted: "2 days ago",
    description: "We are looking for a talented Software Engineer to join our growing team. You will work on cutting-edge web technologies and contribute to building scalable applications.",
    requirements: ["3+ years of experience with React", "Strong JavaScript/TypeScript skills", "Experience with RESTful APIs", "Good communication skills"]
  },
  { 
    id: 2, 
    title: "Sales Manager", 
    company: "Sales Inc", 
    location: "Mumbai, India",
    salary: "₹6-10 LPA + Commission",
    type: "Full-time",
    posted: "5 days ago",
    description: "Lead our sales team to achieve ambitious targets. This role requires excellent leadership skills and a proven track record in sales.",
    requirements: ["5+ years of sales experience", "Team management experience", "Excellent negotiation skills", "Strong business acumen"]
  },
  { 
    id: 3, 
    title: "Data Analyst", 
    company: "Data Co", 
    location: "Hyderabad, India",
    salary: "₹5-8 LPA",
    type: "Full-time",
    posted: "1 week ago",
    description: "Analyze complex data sets to help drive business decisions. Work with cross-functional teams to identify trends and insights.",
    requirements: ["2+ years in data analysis", "Proficiency in SQL and Python", "Experience with data visualization tools", "Strong analytical mindset"]
  },
  { 
    id: 4, 
    title: "Marketing Specialist", 
    company: "Brand Masters", 
    location: "Delhi, India",
    salary: "₹4-7 LPA",
    type: "Full-time",
    posted: "3 days ago",
    description: "Drive marketing campaigns and brand awareness. Create engaging content and manage social media presence.",
    requirements: ["2+ years marketing experience", "Social media expertise", "Content creation skills", "Analytics proficiency"]
  },
  { 
    id: 5, 
    title: "Product Manager", 
    company: "Innovation Labs", 
    location: "Pune, India",
    salary: "₹12-18 LPA",
    type: "Full-time",
    posted: "1 day ago",
    description: "Lead product strategy and development. Work with engineering and design teams to build innovative solutions.",
    requirements: ["4+ years product management", "Technical background", "Excellent communication", "Strategic thinking"]
  },
  { 
    id: 6, 
    title: "HR Executive", 
    company: "People First", 
    location: "Chennai, India",
    salary: "₹3-5 LPA",
    type: "Full-time",
    posted: "4 days ago",
    description: "Manage recruitment and employee relations. Build a positive workplace culture and support organizational growth.",
    requirements: ["2+ years HR experience", "Recruitment expertise", "Strong interpersonal skills", "HRIS knowledge"]
  }
];

export const JobListings = () => {
  const [selectedJob, setSelectedJob] = useState<typeof availableJobs[0] | null>(null);
  const [detailsDialogOpen, setDetailsDialogOpen] = useState(false);
  const [applyDialogOpen, setApplyDialogOpen] = useState(false);
  const { toast } = useToast();
  const { addNotification } = useNotifications();

  const handleViewJob = (job: typeof availableJobs[0]) => {
    setSelectedJob(job);
    setDetailsDialogOpen(true);
  };

  const handleApply = (job: typeof availableJobs[0]) => {
    setSelectedJob(job);
    setApplyDialogOpen(true);
  };

  const handleSubmitApplication = () => {
    if (selectedJob) {
      toast({
        title: "Application submitted!",
        description: `Your application for ${selectedJob.title} has been submitted successfully.`,
      });
      addNotification({
        title: "Job Application Submitted",
        message: `Applied for ${selectedJob.title} at ${selectedJob.company}`,
        type: "success"
      });
      setApplyDialogOpen(false);
    }
  };

  return (
    <>
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle>Available Job Openings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {availableJobs.map((job) => (
            <div key={job.id} className="p-4 border border-border rounded-lg hover:border-primary transition-colors hover-scale">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-start gap-3 flex-1">
                  <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center flex-shrink-0">
                    <Briefcase className="h-6 w-6 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-foreground text-lg mb-1">{job.title}</h4>
                    <p className="text-sm text-muted-foreground mb-2">{job.company}</p>
                    <div className="flex flex-wrap gap-2 mb-2">
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <MapPin className="h-3 w-3" />
                        <span>{job.location}</span>
                      </div>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <DollarSign className="h-3 w-3" />
                        <span>{job.salary}</span>
                      </div>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        <span>{job.posted}</span>
                      </div>
                    </div>
                    <Badge variant="secondary" className="text-xs">{job.type}</Badge>
                  </div>
                </div>
              </div>
              <div className="flex gap-2 mt-3 pt-3 border-t border-border">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => handleViewJob(job)}
                  className="hover-scale flex-1"
                >
                  <Eye className="h-4 w-4 mr-1" />
                  View Details
                </Button>
                <Button 
                  size="sm" 
                  onClick={() => handleApply(job)}
                  className="bg-gradient-primary flex-1"
                >
                  Apply Now
                </Button>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {selectedJob && (
        <JobApplicationDetailsDialog
          application={{...selectedJob, status: 'pending', applied: selectedJob.posted}}
          open={detailsDialogOpen}
          onOpenChange={setDetailsDialogOpen}
        />
      )}

      <Dialog open={applyDialogOpen} onOpenChange={setApplyDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Apply for {selectedJob?.title}</DialogTitle>
            <DialogDescription>{selectedJob?.company}</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Full Name</Label>
              <Input placeholder="Your full name" />
            </div>
            <div className="space-y-2">
              <Label>Email</Label>
              <Input type="email" placeholder="your.email@example.com" />
            </div>
            <div className="space-y-2">
              <Label>Phone</Label>
              <Input placeholder="+91 XXXXX-XXXXX" />
            </div>
            <div className="space-y-2">
              <Label>Cover Letter</Label>
              <Textarea 
                placeholder="Tell us why you're a great fit for this role..."
                rows={4}
              />
            </div>
            <div className="space-y-2">
              <Label>Resume (Optional)</Label>
              <Input type="file" accept=".pdf,.doc,.docx" />
            </div>
            <div className="flex justify-end gap-3 pt-4">
              <Button variant="outline" onClick={() => setApplyDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleSubmitApplication} className="bg-gradient-primary">
                Submit Application
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
