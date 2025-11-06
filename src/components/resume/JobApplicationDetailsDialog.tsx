import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Briefcase, MapPin, Calendar, DollarSign, FileText } from "lucide-react";

interface JobApplication {
  id: number;
  title: string;
  company: string;
  status: string;
  applied: string;
  location?: string;
  salary?: string;
  description?: string;
  requirements?: string[];
}

interface JobApplicationDetailsDialogProps {
  application: JobApplication | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const getStatusColor = (status: string) => {
  switch (status) {
    case "pending": return "bg-yellow-500/10 text-yellow-700 border-yellow-500/20";
    case "reviewed": return "bg-blue-500/10 text-blue-700 border-blue-500/20";
    case "rejected": return "bg-red-500/10 text-red-700 border-red-500/20";
    case "accepted": return "bg-green-500/10 text-green-700 border-green-500/20";
    default: return "bg-secondary";
  }
};

export const JobApplicationDetailsDialog = ({ 
  application, 
  open, 
  onOpenChange 
}: JobApplicationDetailsDialogProps) => {
  if (!application) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto sm:max-w-lg md:max-w-xl lg:max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-xl sm:text-2xl pr-8">{application.title}</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          <div className="flex items-center gap-4 flex-wrap">
            <div className="flex items-center gap-2">
              <Briefcase className="h-4 w-4 text-muted-foreground" />
              <span className="font-medium">{application.company}</span>
            </div>
            {application.location && (
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">{application.location}</span>
              </div>
            )}
            {application.salary && (
              <div className="flex items-center gap-2">
                <DollarSign className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">{application.salary}</span>
              </div>
            )}
          </div>

          <div className="flex items-center gap-4">
            <Badge className={getStatusColor(application.status)}>
              {application.status}
            </Badge>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Calendar className="h-4 w-4" />
              <span>Applied {application.applied}</span>
            </div>
          </div>

          {application.description && (
            <>
              <Separator />
              <div>
                <h3 className="font-semibold mb-2 flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  Job Description
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {application.description}
                </p>
              </div>
            </>
          )}

          {application.requirements && application.requirements.length > 0 && (
            <>
              <Separator />
              <div>
                <h3 className="font-semibold mb-3">Requirements</h3>
                <ul className="space-y-2">
                  {application.requirements.map((req, idx) => (
                    <li key={idx} className="text-sm text-muted-foreground flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>{req}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
