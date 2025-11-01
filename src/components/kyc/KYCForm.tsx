import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Upload, MapPin, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export const KYCForm = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    aadhaar: null,
    pan: null,
    homePhoto: null,
    location: null
  });

  const handleFileChange = (field: string, file: File | null) => {
    setFormData(prev => ({ ...prev, [field]: file }));
  };

  const captureLocation = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setFormData(prev => ({
            ...prev,
            location: {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            } as any
          }));
          toast({
            title: "Location captured",
            description: "Your home location has been recorded successfully.",
          });
        },
        (error) => {
          toast({
            title: "Location error",
            description: "Unable to capture location. Please enable GPS.",
            variant: "destructive",
          });
        }
      );
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "KYC Submitted",
      description: "Your KYC documents are under review.",
    });
  };

  return (
    <Card className="shadow-card">
      <CardHeader>
        <CardTitle>Complete Your KYC</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label>Aadhaar Card</Label>
              <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary transition-colors cursor-pointer">
                <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                <Input
                  type="file"
                  accept="image/*,.pdf"
                  onChange={(e) => handleFileChange('aadhaar', e.target.files?.[0] || null)}
                  className="hidden"
                  id="aadhaar"
                />
                <Label htmlFor="aadhaar" className="cursor-pointer text-sm text-muted-foreground">
                  {formData.aadhaar ? "File selected ✓" : "Click to upload Aadhaar"}
                </Label>
              </div>
            </div>

            <div className="space-y-2">
              <Label>PAN Card</Label>
              <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary transition-colors cursor-pointer">
                <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                <Input
                  type="file"
                  accept="image/*,.pdf"
                  onChange={(e) => handleFileChange('pan', e.target.files?.[0] || null)}
                  className="hidden"
                  id="pan"
                />
                <Label htmlFor="pan" className="cursor-pointer text-sm text-muted-foreground">
                  {formData.pan ? "File selected ✓" : "Click to upload PAN"}
                </Label>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Home Photo</Label>
              <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary transition-colors cursor-pointer">
                <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                <Input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleFileChange('homePhoto', e.target.files?.[0] || null)}
                  className="hidden"
                  id="homePhoto"
                />
                <Label htmlFor="homePhoto" className="cursor-pointer text-sm text-muted-foreground">
                  {formData.homePhoto ? "Photo selected ✓" : "Click to upload photo"}
                </Label>
              </div>
            </div>

            <div className="space-y-2">
              <Label>GPS Location</Label>
              <Button
                type="button"
                onClick={captureLocation}
                variant="outline"
                className="w-full h-full min-h-[120px] flex flex-col gap-2"
              >
                {formData.location ? (
                  <>
                    <CheckCircle className="h-8 w-8 text-green-600" />
                    <span className="text-sm">Location Captured</span>
                  </>
                ) : (
                  <>
                    <MapPin className="h-8 w-8" />
                    <span className="text-sm">Capture Home Location</span>
                  </>
                )}
              </Button>
            </div>
          </div>

          <Button type="submit" className="w-full bg-gradient-primary">
            Submit KYC Documents
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};
