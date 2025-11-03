import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { LogIn, Loader2 } from 'lucide-react';
import forgeLogo from '@/assets/forge-logo.jpeg';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
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
          title: 'Login successful',
          description: 'Welcome back to Forge India Connect!',
        });
        navigate('/dashboard');
      } else {
        toast({
          title: 'Login failed',
          description: 'Invalid email or password. Please try again.',
          variant: 'destructive',
        });
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Something went wrong. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      <div className="hidden lg:flex flex-col justify-center items-center bg-gradient-primary text-white p-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
        <div className="relative z-10 space-y-8 text-center">
          <img src={forgeLogo} alt="Forge India" className="h-32 w-32 object-contain mx-auto rounded-2xl shadow-2xl animate-pulse-glow" />
          <div>
            <h1 className="text-5xl font-bold mb-4">Forge India Connect</h1>
            <p className="text-xl text-white/90 mb-4">Multi-Agent Management Platform</p>
            <p className="text-white/80 max-w-md mx-auto">Empowering agents with cutting-edge tools for growth and success.</p>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center p-8 bg-background">
        <Card className="w-full max-w-md shadow-card">
          <CardHeader className="space-y-1 text-center">
            <div className="flex justify-center mb-4 lg:hidden">
              <img src={forgeLogo} alt="Forge India" className="h-16 w-16 object-contain rounded-lg" />
            </div>
            <CardTitle className="text-3xl font-bold">Welcome Back</CardTitle>
            <CardDescription>Sign in to continue</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
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
                className="w-full bg-gradient-primary"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Logging in...
                  </>
                ) : (
                  <>
                    <LogIn className="mr-2 h-4 w-4" />
                    Login to Dashboard
                  </>
                )}
              </Button>
            </form>
            
            <div className="mt-6 p-4 bg-muted/50 rounded-lg">
              <p className="text-xs text-muted-foreground text-center mb-2 font-medium">Demo Credentials:</p>
              <div className="text-xs space-y-1 text-muted-foreground">
                <p>Diamond: admin@forge.com / admin123</p>
                <p>Gold: gold@forge.com / gold123</p>
                <p>Silver: silver@forge.com / silver123</p>
              </div>
            </div>

            <div className="mt-4 text-center text-sm">
              <span className="text-muted-foreground">Don't have an account? </span>
              <Button
                variant="link"
                className="p-0 h-auto text-primary font-medium"
                onClick={() => navigate('/register')}
              >
                Sign up
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Login;
