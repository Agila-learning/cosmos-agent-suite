import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { User, Mail, Phone, MapPin, Award, Calendar, Briefcase } from 'lucide-react';

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
      <div className="space-y-6 animate-fade-in">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">My Profile</h1>
          <p className="text-muted-foreground">View and manage your profile information</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Profile Overview Card */}
          <Card className="shadow-card lg:col-span-1">
            <CardContent className="pt-6">
              <div className="flex flex-col items-center text-center space-y-4">
                <Avatar className="h-24 w-24 border-4 border-primary">
                  <AvatarFallback className="text-2xl bg-gradient-primary text-white">
                    {user?.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
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
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Personal Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Full Name</Label>
                    <Input defaultValue={user?.name} />
                  </div>
                  <div className="space-y-2">
                    <Label>Email Address</Label>
                    <Input defaultValue={user?.email} disabled />
                  </div>
                  <div className="space-y-2">
                    <Label>Phone Number</Label>
                    <Input defaultValue={user?.phone} />
                  </div>
                  <div className="space-y-2">
                    <Label>Location</Label>
                    <Input defaultValue={user?.location} />
                  </div>
                </div>
                <Button onClick={handleSave} className="bg-gradient-primary">
                  Save Changes
                </Button>
              </CardContent>
            </Card>

            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Briefcase className="h-5 w-5" />
                  Professional Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Business Background</Label>
                  <Textarea 
                    placeholder="Tell us about your business experience..."
                    defaultValue={user?.businessBackground}
                    rows={4}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Skills & Expertise</Label>
                  <Input 
                    placeholder="e.g., Sales, Marketing, Team Management"
                  />
                </div>
                <Button onClick={handleSave} variant="outline">
                  Update Details
                </Button>
              </CardContent>
            </Card>

            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="h-5 w-5" />
                  Status & Achievements
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-muted-foreground">Agent Level</Label>
                    <div>
                      <Badge className={`bg-gradient-${user?.role} text-lg px-4 py-2`}>
                        {user?.role}
                      </Badge>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-muted-foreground">KYC Status</Label>
                    <div>
                      <Badge variant={user?.kycStatus === 'approved' ? 'default' : 'secondary'} className="text-lg px-4 py-2">
                        {user?.kycStatus}
                      </Badge>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-muted-foreground">Resume Status</Label>
                    <div>
                      <Badge variant={user?.resumeUploaded ? 'default' : 'secondary'} className="text-lg px-4 py-2">
                        {user?.resumeUploaded ? 'Uploaded' : 'Pending'}
                      </Badge>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-muted-foreground">Member Since</Label>
                    <div className="flex items-center gap-2 text-sm">
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
