import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen, Video, FileText, Award, Clock, CheckCircle2, PlayCircle, Lock } from "lucide-react";
import { useState } from "react";

const courses = [
  {
    id: 1,
    title: "Agent Onboarding 101",
    description: "Essential training for new agents",
    duration: "2 hours",
    progress: 100,
    status: "completed",
    modules: 8,
    category: "Beginner",
    icon: BookOpen,
  },
  {
    id: 2,
    title: "Advanced Sales Techniques",
    description: "Master the art of closing deals",
    duration: "4 hours",
    progress: 45,
    status: "in-progress",
    modules: 12,
    category: "Advanced",
    icon: Video,
  },
  {
    id: 3,
    title: "Customer Relationship Management",
    description: "Build lasting client relationships",
    duration: "3 hours",
    progress: 0,
    status: "locked",
    modules: 10,
    category: "Intermediate",
    icon: FileText,
  },
  {
    id: 4,
    title: "Leadership & Team Building",
    description: "Grow your agent network effectively",
    duration: "5 hours",
    progress: 0,
    status: "locked",
    modules: 15,
    category: "Advanced",
    icon: Award,
  },
];

const certifications = [
  {
    id: 1,
    name: "Certified Sales Professional",
    issued: "Jan 2024",
    status: "earned",
  },
  {
    id: 2,
    name: "Team Leadership Excellence",
    issued: "Pending",
    status: "in-progress",
  },
  {
    id: 3,
    name: "Customer Success Specialist",
    issued: "Not Started",
    status: "available",
  },
];

const Training = () => {
  const [selectedCourse, setSelectedCourse] = useState(courses[1]);

  return (
    <DashboardLayout>
      <div className="space-y-6 animate-fade-in">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Training & Development</h1>
            <p className="text-muted-foreground">Enhance your skills and earn certifications</p>
          </div>
          <Badge className="bg-gradient-primary text-white px-4 py-2">
            <Award className="h-4 w-4 mr-2" />
            3 Certifications Earned
          </Badge>
        </div>

        {/* Progress Overview */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="hover-scale border-l-4 border-l-primary">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-gradient-primary rounded-lg">
                  <BookOpen className="h-6 w-6 text-white" />
                </div>
                <div>
                  <p className="text-2xl font-bold">4</p>
                  <p className="text-sm text-muted-foreground">Total Courses</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="hover-scale border-l-4 border-l-green-600">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-green-600 rounded-lg">
                  <CheckCircle2 className="h-6 w-6 text-white" />
                </div>
                <div>
                  <p className="text-2xl font-bold">1</p>
                  <p className="text-sm text-muted-foreground">Completed</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="hover-scale border-l-4 border-l-gold">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-gradient-gold rounded-lg">
                  <PlayCircle className="h-6 w-6 text-white" />
                </div>
                <div>
                  <p className="text-2xl font-bold">1</p>
                  <p className="text-sm text-muted-foreground">In Progress</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="hover-scale border-l-4 border-l-muted">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-muted rounded-lg">
                  <Clock className="h-6 w-6 text-muted-foreground" />
                </div>
                <div>
                  <p className="text-2xl font-bold">14h</p>
                  <p className="text-sm text-muted-foreground">Total Duration</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="courses" className="space-y-4">
          <TabsList className="grid w-full sm:w-auto grid-cols-2 sm:inline-flex">
            <TabsTrigger value="courses">My Courses</TabsTrigger>
            <TabsTrigger value="certifications">Certifications</TabsTrigger>
          </TabsList>

          <TabsContent value="courses" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Course List */}
              <div className="lg:col-span-2 space-y-4">
                {courses.map((course) => {
                  const Icon = course.icon;
                  return (
                    <Card
                      key={course.id}
                      className={`hover-scale cursor-pointer transition-all ${
                        selectedCourse.id === course.id ? 'ring-2 ring-primary shadow-glow' : ''
                      }`}
                      onClick={() => setSelectedCourse(course)}
                    >
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div className="flex items-start gap-4">
                            <div className={`p-3 rounded-lg ${
                              course.status === 'completed' ? 'bg-green-600' :
                              course.status === 'in-progress' ? 'bg-gradient-primary' :
                              'bg-muted'
                            }`}>
                              <Icon className={`h-6 w-6 ${course.status === 'locked' ? 'text-muted-foreground' : 'text-white'}`} />
                            </div>
                            <div>
                              <CardTitle className="text-lg">{course.title}</CardTitle>
                              <CardDescription className="mt-1">{course.description}</CardDescription>
                              <div className="flex items-center gap-4 mt-3">
                                <Badge variant="outline">{course.category}</Badge>
                                <span className="text-sm text-muted-foreground flex items-center gap-1">
                                  <Clock className="h-3 w-3" />
                                  {course.duration}
                                </span>
                                <span className="text-sm text-muted-foreground">
                                  {course.modules} modules
                                </span>
                              </div>
                            </div>
                          </div>
                          {course.status === 'locked' && <Lock className="h-5 w-5 text-muted-foreground" />}
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-muted-foreground">Progress</span>
                            <span className="font-medium">{course.progress}%</span>
                          </div>
                          <Progress value={course.progress} className="h-2" />
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>

              {/* Course Details */}
              <div className="space-y-4">
                <Card className="shadow-card">
                  <CardHeader>
                    <CardTitle>Course Details</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h3 className="font-semibold mb-2">{selectedCourse.title}</h3>
                      <p className="text-sm text-muted-foreground">{selectedCourse.description}</p>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Duration</span>
                        <span className="font-medium">{selectedCourse.duration}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Modules</span>
                        <span className="font-medium">{selectedCourse.modules}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Level</span>
                        <Badge variant="outline">{selectedCourse.category}</Badge>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Status</span>
                        <Badge className={
                          selectedCourse.status === 'completed' ? 'bg-green-600' :
                          selectedCourse.status === 'in-progress' ? 'bg-gradient-primary' :
                          'bg-muted'
                        }>
                          {selectedCourse.status}
                        </Badge>
                      </div>
                    </div>
                    <Button 
                      className="w-full bg-gradient-primary"
                      disabled={selectedCourse.status === 'locked'}
                    >
                      {selectedCourse.status === 'completed' ? 'Review Course' :
                       selectedCourse.status === 'in-progress' ? 'Continue Learning' :
                       'Unlock Course'}
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="certifications" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {certifications.map((cert) => (
                <Card key={cert.id} className="hover-scale">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className={`p-3 rounded-lg ${
                        cert.status === 'earned' ? 'bg-gradient-gold' :
                        cert.status === 'in-progress' ? 'bg-gradient-primary' :
                        'bg-muted'
                      }`}>
                        <Award className={`h-6 w-6 ${cert.status === 'available' ? 'text-muted-foreground' : 'text-white'}`} />
                      </div>
                      <div className="flex-1">
                        <CardTitle className="text-base">{cert.name}</CardTitle>
                        <p className="text-sm text-muted-foreground mt-1">{cert.issued}</p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <Badge className={`w-full justify-center ${
                      cert.status === 'earned' ? 'bg-gradient-gold' :
                      cert.status === 'in-progress' ? 'bg-gradient-primary' :
                      'bg-muted'
                    }`}>
                      {cert.status === 'earned' ? 'Earned' :
                       cert.status === 'in-progress' ? 'In Progress' :
                       'Start Training'}
                    </Badge>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default Training;
