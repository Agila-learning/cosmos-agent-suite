import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { ResumeUpload } from "@/components/resume/ResumeUpload";
import { JobApplications } from "@/components/resume/JobApplications";
import { JobListings } from "@/components/resume/JobListings";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Resume = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6 animate-fade-in">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Resume & Jobs</h1>
          <p className="text-muted-foreground">Manage your resume, find jobs, and track applications</p>
        </div>
        
        <Tabs defaultValue="jobs" className="w-full">
          <TabsList className="grid w-full grid-cols-3 max-w-md">
            <TabsTrigger value="jobs">Available Jobs</TabsTrigger>
            <TabsTrigger value="applications">My Applications</TabsTrigger>
            <TabsTrigger value="resume">My Resume</TabsTrigger>
          </TabsList>
          <TabsContent value="jobs" className="space-y-6 mt-6">
            <JobListings />
          </TabsContent>
          <TabsContent value="applications" className="space-y-6 mt-6">
            <JobApplications />
          </TabsContent>
          <TabsContent value="resume" className="space-y-6 mt-6">
            <ResumeUpload />
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default Resume;
