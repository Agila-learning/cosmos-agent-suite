import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { Mail, Phone, MapPin, Briefcase, Calendar, Award } from "lucide-react";
import { ProfilePhotoUpload } from "@/components/profile/ProfilePhotoUpload";

const Profile = () => {
  const { user } = useAuth();
  const { toast } = useToast();

  const handleSave = () => {
    toast({
      title: 'Profile updated',
      description: 'Your profile information has been saved successfully.',
    });
  };

  return (
    <DashboardLayout>
      <div className="space-y-6 animate-fade-in p-4 sm:p-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">My Profile</h1>
          <p className="text-muted-foreground text-sm sm:text-base">View and manage your profile information</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Profile Overview Card */}
          <Card className="shadow-card lg:col-span-1 animate-scale-in">
            <CardContent className="pt-6">
              <div className="flex flex-col items-center text-center space-y-4">
                <ProfilePhotoUpload 
                  name={user?.name || "User"}
                  currentAvatar={user?.avatar}
                />
                <div>
                  <h3 className="text-xl font-bold">{user?.name}</h3>
                  <Badge className={`bg-gradient-${user?.role} mt-2`}>
                    {user?.role.toUpperCase()} AGENT
                  </Badge>
                </div>
                <div className="w-full space-y-2 pt-4 border-t">
                  <div className="flex items-center gap-2 text-sm">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">{user?.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">{user?.phone}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">{user?.location}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Profile Details */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="shadow-card animate-fade-in">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
                  <Mail className="h-5 w-5" />
                  Personal Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-sm">Full Name</Label>
                    <Input defaultValue={user?.name} className="text-sm sm:text-base" />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm">Email Address</Label>
                    <Input defaultValue={user?.email} disabled className="text-sm sm:text-base" />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm">Phone Number</Label>
                    <Input defaultValue={user?.phone} className="text-sm sm:text-base" />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm">Location</Label>
                    <Input defaultValue={user?.location} className="text-sm sm:text-base" />
                  </div>
                </div>
                <Button onClick={handleSave} className="bg-gradient-primary w-full sm:w-auto">
                  Save Changes
                </Button>
              </CardContent>
            </Card>

            <Card className="shadow-card animate-fade-in" style={{ animationDelay: '0.1s' }}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
                  <Briefcase className="h-5 w-5" />
                  Professional Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label className="text-sm">Business Background</Label>
                  <Textarea 
                    placeholder="Tell us about your business experience..."
                    defaultValue={user?.businessBackground}
                    rows={4}
                    className="text-sm sm:text-base"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm">Skills & Expertise</Label>
                  <Input 
                    placeholder="e.g., Sales, Marketing, Team Management"
                    className="text-sm sm:text-base"
                  />
                </div>
                <Button onClick={handleSave} variant="outline" className="w-full sm:w-auto">
                  Update Details
                </Button>
              </CardContent>
            </Card>

            <Card className="shadow-card animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
                  <Award className="h-5 w-5" />
                  Status & Achievements
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-muted-foreground text-sm">Agent Level</Label>
                    <div>
                      <Badge className={`bg-gradient-${user?.role} text-base sm:text-lg px-3 sm:px-4 py-1 sm:py-2`}>
                        {user?.role}
                      </Badge>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-muted-foreground text-sm">KYC Status</Label>
                    <div>
                      <Badge variant={user?.kycStatus === 'approved' ? 'default' : 'secondary'} className="text-base sm:text-lg px-3 sm:px-4 py-1 sm:py-2">
                        {user?.kycStatus}
                      </Badge>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-muted-foreground text-sm">Resume Status</Label>
                    <div>
                      <Badge variant={user?.resumeUploaded ? 'default' : 'secondary'} className="text-base sm:text-lg px-3 sm:px-4 py-1 sm:py-2">
                        {user?.resumeUploaded ? 'Uploaded' : 'Pending'}
                      </Badge>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-muted-foreground text-sm">Member Since</Label>
                    <div className="flex items-center gap-2 text-xs sm:text-sm">
                      <Calendar className="h-4 w-4" />
                      <span>January 2024</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Profile;
