import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Upload, FileText, CheckCircle, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useNotifications } from "@/contexts/NotificationContext";

export const ResumeUpload = () => {
  const { toast } = useToast();
  const { addNotification } = useNotifications();
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadedFile(file);
    }
  };

  const handleUpload = () => {
    if (!uploadedFile) {
      toast({
        title: "No file selected",
        description: "Please select a resume file to upload.",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Resume uploaded",
      description: "Your resume has been uploaded successfully.",
    });

    addNotification({
      title: "Resume Uploaded",
      message: `Your resume "${uploadedFile.name}" has been uploaded successfully`,
      type: "success"
    });
  };

  const removeFile = () => {
    setUploadedFile(null);
  };

  return (
    <Card className="shadow-card">
      <CardHeader>
        <CardTitle>Upload Resume</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {!uploadedFile ? (
          <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary transition-colors cursor-pointer">
            <FileText className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
            <Input
              type="file"
              accept=".pdf,.doc,.docx"
              className="hidden"
              id="resume"
              onChange={handleFileChange}
            />
            <Label htmlFor="resume" className="cursor-pointer">
              <p className="text-sm font-medium mb-2">Upload your resume</p>
              <p className="text-xs text-muted-foreground">PDF, DOC, DOCX (Max 5MB)</p>
            </Label>
          </div>
        ) : (
          <div className="border-2 border-primary rounded-lg p-6 bg-primary/5 animate-fade-in">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <CheckCircle className="h-8 w-8 text-green-600" />
                <div>
                  <p className="font-medium">{uploadedFile.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {(uploadedFile.size / 1024).toFixed(2)} KB
                  </p>
                </div>
              </div>
              <Button variant="ghost" size="icon" onClick={removeFile}>
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}

        <Button 
          onClick={handleUpload} 
          className="w-full bg-gradient-primary hover-scale"
          disabled={!uploadedFile}
        >
          <Upload className="h-4 w-4 mr-2" />
          Upload Resume
        </Button>

        <div className="pt-4 border-t">
          <h4 className="text-sm font-medium mb-2">Tips for a great resume:</h4>
          <ul className="text-xs text-muted-foreground space-y-1">
            <li>• Keep it concise (1-2 pages)</li>
            <li>• Highlight relevant experience</li>
            <li>• Include contact information</li>
            <li>• Use professional formatting</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};
