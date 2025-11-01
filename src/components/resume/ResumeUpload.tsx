import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Upload, FileText } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export const ResumeUpload = () => {
  const { toast } = useToast();

  const handleUpload = () => {
    toast({
      title: "Resume uploaded",
      description: "Your resume has been uploaded successfully.",
    });
  };

  return (
    <Card className="shadow-card">
      <CardHeader>
        <CardTitle>Upload Resume</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary transition-colors cursor-pointer">
          <FileText className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
          <Input
            type="file"
            accept=".pdf,.doc,.docx"
            className="hidden"
            id="resume"
          />
          <Label htmlFor="resume" className="cursor-pointer">
            <p className="text-sm font-medium mb-2">Upload your resume</p>
            <p className="text-xs text-muted-foreground">PDF, DOC, DOCX (Max 5MB)</p>
          </Label>
        </div>

        <Button onClick={handleUpload} className="w-full bg-gradient-primary">
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
