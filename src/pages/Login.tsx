import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import forgeLogo from "@/assets/forge-logo.jpeg";
import { Shield, Users, Loader2, ArrowLeft } from "lucide-react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const success = await login(email, password);
      
      if (success) {
        toast({
          title: "Login successful",
          description: "Welcome back to Forge India Connect!",
        });
        navigate("/dashboard");
      } else {
        toast({
          title: "Login failed",
          description: "Invalid email or password. Please try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex relative">
      {/* Back Button */}
      <div className="absolute top-4 left-4 z-50">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate(-1)}
          className="hover-scale"
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
      </div>
      
      {/* Theme Toggle */}
      <div className="absolute top-4 right-4 z-50">
        <ThemeToggle />
      </div>
      
      {/* Left side - Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-primary relative overflow-hidden p-8 lg:p-12 items-center justify-center">
        <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
        <div className="relative z-10 space-y-8 text-center animate-fade-in">
          <img 
            src={forgeLogo} 
            alt="Forge India" 
            className="h-32 w-32 object-contain mx-auto rounded-2xl shadow-2xl animate-pulse-glow" 
          />
          <div>
            <h1 className="text-5xl font-bold mb-4 text-white">Forge India Connect</h1>
            <p className="text-xl text-white/90 mb-4 font-semibold">Multi-Agent Management Platform</p>
            <p className="text-white/80 max-w-md mx-auto leading-relaxed">
              Empowering agents with cutting-edge tools for growth, collaboration, and success.
            </p>
          </div>
        </div>
      </div>

      {/* Right side - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-4 sm:p-8">
        <Card className="w-full max-w-md shadow-glow border-2 animate-fade-in">
          <CardHeader className="space-y-1">
            <div className="flex justify-center mb-4 lg:hidden">
              <img src={forgeLogo} alt="Forge India" className="h-16 w-16 object-contain rounded-lg" />
            </div>
            <CardTitle className="text-2xl sm:text-3xl font-bold text-center">Welcome Back</CardTitle>
            <CardDescription className="text-center">
              Sign in to your Forge India Connect account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="agent" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="agent" className="flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  <span className="hidden sm:inline">Agent</span>
                </TabsTrigger>
                <TabsTrigger value="admin" className="flex items-center gap-2">
                  <Shield className="h-4 w-4" />
                  <span className="hidden sm:inline">Admin</span>
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="agent">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="your.email@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      disabled={isLoading}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input
                      id="password"
                      type="password"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      disabled={isLoading}
                    />
                  </div>
                  <Button 
                    type="submit" 
                    className="w-full bg-gradient-primary hover:opacity-90 hover-scale"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Signing in...
                      </>
                    ) : (
                      "Sign In as Agent"
                    )}
                  </Button>
                </form>
                <div className="mt-4 p-3 bg-muted rounded-lg">
                  <p className="text-xs text-muted-foreground mb-2 font-semibold">Test Agent Accounts:</p>
                  <div className="space-y-1 text-xs">
                    <p><strong>Gold:</strong> gold@forge.com / gold123</p>
                    <p><strong>Silver:</strong> silver@forge.com / silver123</p>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="admin">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="admin-email">Admin Email</Label>
                    <Input
                      id="admin-email"
                      type="email"
                      placeholder="admin@forge.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      disabled={isLoading}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="admin-password">Password</Label>
                    <Input
                      id="admin-password"
                      type="password"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      disabled={isLoading}
                    />
                  </div>
                  <Button 
                    type="submit" 
                    className="w-full bg-gradient-diamond hover:opacity-90 hover-scale"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Signing in...
                      </>
                    ) : (
                      "Sign In as Admin"
                    )}
                  </Button>
                </form>
                <div className="mt-4 p-3 bg-muted rounded-lg">
                  <p className="text-xs text-muted-foreground mb-2 font-semibold">Test Admin Account:</p>
                  <p className="text-xs"><strong>Diamond:</strong> admin@forge.com / admin123</p>
                </div>
              </TabsContent>
            </Tabs>
            
            <div className="text-center text-sm mt-6">
              Don't have an account?{" "}
              <Link to="/register" className="text-primary hover:underline font-semibold">
                Sign up
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Login;
