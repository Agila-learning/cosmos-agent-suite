import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Upload, FileText, Download, Trash2, Eye, CheckCircle, Clock, AlertCircle } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Document {
  id: number;
  name: string;
  type: string;
  category: string;
  uploadDate: string;
  status: 'approved' | 'pending' | 'rejected';
  size: string;
}

const mockDocuments: Document[] = [
  { id: 1, name: "PAN Card.pdf", type: "Identity", category: "certificate", uploadDate: "2024-02-15", status: "approved", size: "2.3 MB" },
  { id: 2, name: "Aadhar Card.pdf", type: "Identity", category: "certificate", uploadDate: "2024-02-15", status: "approved", size: "1.8 MB" },
  { id: 3, name: "Insurance License.pdf", type: "License", category: "license", uploadDate: "2024-02-20", status: "pending", size: "3.5 MB" },
  { id: 4, name: "Sales Training Certificate.pdf", type: "Training", category: "training", uploadDate: "2024-02-25", status: "approved", size: "1.2 MB" },
  { id: 5, name: "Business Registration.pdf", type: "Business", category: "certificate", uploadDate: "2024-03-01", status: "pending", size: "2.7 MB" },
];

const Documents = () => {
  const [documents, setDocuments] = useState<Document[]>(mockDocuments);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const { toast } = useToast();

  const filteredDocuments = selectedCategory === "all" 
    ? documents 
    : documents.filter(doc => doc.category === selectedCategory);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "approved": return <CheckCircle className="h-4 w-4 text-green-600" />;
      case "pending": return <Clock className="h-4 w-4 text-yellow-600" />;
      case "rejected": return <AlertCircle className="h-4 w-4 text-red-600" />;
      default: return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved": return "bg-green-100 text-green-800 border-green-200";
      case "pending": return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "rejected": return "bg-red-100 text-red-800 border-red-200";
      default: return "";
    }
  };

  const handleUpload = () => {
    toast({
      title: "Document Uploaded",
      description: "Your document has been uploaded successfully and is pending review.",
    });
  };

  const handleDelete = (id: number) => {
    setDocuments(documents.filter(doc => doc.id !== id));
    toast({
      title: "Document Deleted",
      description: "The document has been removed from your library.",
      variant: "destructive",
    });
  };

  return (
    <DashboardLayout>
      <div className="space-y-6 animate-fade-in p-4 sm:p-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">Document Management</h1>
          <p className="text-muted-foreground text-sm sm:text-base">Upload and manage your certificates, licenses, and training materials</p>
        </div>

        {/* Upload Section */}
        <Card className="hover-scale animate-scale-in">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
              <Upload className="h-5 w-5" />
              Upload New Document
            </CardTitle>
            <CardDescription>Add certificates, licenses, or training materials</CardDescription>
          </CardHeader>
          <CardContent>
            <Dialog>
              <DialogTrigger asChild>
                <Button className="w-full sm:w-auto">
                  <Upload className="mr-2 h-4 w-4" />
                  Upload Document
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Upload Document</DialogTitle>
                  <DialogDescription>
                    Choose a document type and upload your file
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="doc-type">Document Type</Label>
                    <Select>
                      <SelectTrigger id="doc-type">
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="certificate">Certificate</SelectItem>
                        <SelectItem value="license">License</SelectItem>
                        <SelectItem value="training">Training Material</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="file-upload">File</Label>
                    <Input id="file-upload" type="file" accept=".pdf,.jpg,.jpeg,.png" />
                  </div>
                  <Button onClick={handleUpload} className="w-full">
                    Upload
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </CardContent>
        </Card>

        {/* Filter Section */}
        <Card className="animate-fade-in">
          <CardContent className="pt-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <Label htmlFor="filter">Filter by Category</Label>
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger id="filter" className="mt-2">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Documents</SelectItem>
                    <SelectItem value="certificate">Certificates</SelectItem>
                    <SelectItem value="license">Licenses</SelectItem>
                    <SelectItem value="training">Training Materials</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Documents List */}
        <div className="grid gap-4">
          {filteredDocuments.map((doc, index) => (
            <Card 
              key={doc.id} 
              className="hover-scale animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardContent className="p-4 sm:p-6">
                <div className="flex flex-col sm:flex-row sm:items-center gap-4 justify-between">
                  <div className="flex items-start gap-3 flex-1 min-w-0">
                    <div className="p-2 bg-primary/10 rounded-lg flex-shrink-0">
                      <FileText className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-sm sm:text-base truncate">{doc.name}</h3>
                      <div className="flex flex-wrap items-center gap-2 mt-1">
                        <Badge variant="outline" className="text-xs">{doc.type}</Badge>
                        <span className="text-xs text-muted-foreground">{doc.size}</span>
                        <span className="text-xs text-muted-foreground hidden sm:inline">Uploaded: {doc.uploadDate}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap">
                    <Badge className={`${getStatusColor(doc.status)} flex items-center gap-1 text-xs`}>
                      {getStatusIcon(doc.status)}
                      {doc.status}
                    </Badge>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="text-xs">
                        <Eye className="h-3 w-3 sm:mr-2" />
                        <span className="hidden sm:inline">View</span>
                      </Button>
                      <Button variant="outline" size="sm" className="text-xs">
                        <Download className="h-3 w-3 sm:mr-2" />
                        <span className="hidden sm:inline">Download</span>
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => handleDelete(doc.id)}
                        className="text-destructive hover:text-destructive text-xs"
                      >
                        <Trash2 className="h-3 w-3 sm:mr-2" />
                        <span className="hidden sm:inline">Delete</span>
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Documents;
