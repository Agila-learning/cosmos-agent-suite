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

            <div className="space-y-2 md:col-span-2">
              <Label>Home Photo with GPS Location</Label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary transition-colors cursor-pointer">
                  <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                  <Input
                    type="file"
                    accept="image/*"
                    capture="environment"
                    onChange={(e) => {
                      handleFileChange('homePhoto', e.target.files?.[0] || null);
                      captureLocation();
                    }}
                    className="hidden"
                    id="homePhoto"
                  />
                  <Label htmlFor="homePhoto" className="cursor-pointer text-sm text-muted-foreground">
                    {formData.homePhoto ? "Photo captured ✓" : "Take photo with GPS"}
                  </Label>
                  <p className="text-xs text-muted-foreground mt-2">GPS will be auto-captured</p>
                </div>
                
                <div className={`border-2 rounded-lg p-6 flex flex-col items-center justify-center ${formData.location ? 'border-green-500 bg-green-50 dark:bg-green-950' : 'border-border'}`}>
                  {formData.location ? (
                    <>
                      <CheckCircle className="h-8 w-8 text-green-600 mb-2" />
                      <span className="text-sm font-medium text-green-600">GPS Location Captured</span>
                      <span className="text-xs text-muted-foreground mt-1">
                        Lat: {(formData.location as any).lat?.toFixed(6)}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        Lng: {(formData.location as any).lng?.toFixed(6)}
                      </span>
                    </>
                  ) : (
                    <>
                      <MapPin className="h-8 w-8 text-muted-foreground mb-2" />
                      <span className="text-sm text-muted-foreground">Waiting for location</span>
                    </>
                  )}
                </div>
              </div>
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
