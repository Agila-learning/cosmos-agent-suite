import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { ResumeUpload } from "@/components/resume/ResumeUpload";
import { JobApplications } from "@/components/resume/JobApplications";

const Resume = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6 animate-fade-in">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Resume & Jobs</h1>
          <p className="text-muted-foreground">Upload your resume and track job applications</p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ResumeUpload />
          <JobApplications />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Resume;
