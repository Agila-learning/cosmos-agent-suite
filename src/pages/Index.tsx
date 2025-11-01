import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Users, Award, TrendingUp, Shield, Briefcase, Building, Globe } from "lucide-react";
import forgeLogo from "@/assets/forge-logo.jpeg";
import { useAuth } from "@/contexts/AuthContext";

const Index = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    navigate('/dashboard');
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-20">
        <div className="text-center max-w-4xl mx-auto mb-16 animate-fade-in">
          <div className="flex items-center justify-center gap-4 mb-8">
            <img 
              src={forgeLogo} 
              alt="Forge India" 
              className="h-20 w-20 rounded-2xl shadow-glow object-cover" 
            />
            <div className="text-left">
              <h1 className="text-3xl font-bold relative inline-block">
                <span className="relative z-10 bg-clip-text text-transparent bg-gradient-primary animate-pulse">
                  FORGE INDIA CONNECT
                </span>
                <span className="absolute inset-0 bg-gradient-primary opacity-20 blur-xl animate-glow" />
              </h1>
              <p className="text-sm text-muted-foreground backdrop-blur-sm bg-white/10 px-3 py-1 rounded-full inline-block mt-1">
                Shaping Future
              </p>
            </div>
          </div>
          
          <h2 className="text-5xl font-bold text-foreground mb-6">
            Build Your <span className="text-transparent bg-clip-text bg-gradient-primary">Agent Network</span>
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Join India's fastest growing multi-agent platform. Start with Silver, grow to Gold, achieve Diamond status.
          </p>
          
          <div className="flex gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-gradient-primary text-lg px-8 py-6 shadow-glow hover:shadow-xl transition-all"
              onClick={() => navigate('/login')}
            >
              Login to Dashboard
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="text-lg px-8 py-6"
              onClick={() => {
                const element = document.getElementById('services');
                element?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Learn More
            </Button>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {[
            {
              icon: Users,
              title: "Agent Network",
              description: "Build and manage your hierarchical agent team",
              gradient: "bg-gradient-primary"
            },
            {
              icon: Award,
              title: "Level Up",
              description: "Progress from Silver to Gold to Diamond",
              gradient: "bg-gradient-gold"
            },
            {
              icon: TrendingUp,
              title: "Grow Together",
              description: "Earn as your network expands and succeeds",
              gradient: "bg-gradient-diamond"
            },
            {
              icon: Shield,
              title: "Secure KYC",
              description: "Complete verification with Aadhaar & PAN",
              gradient: "bg-gradient-primary"
            }
          ].map((feature, idx) => (
            <Card key={idx} className="p-6 shadow-card hover:shadow-glow transition-all animate-slide-in" style={{ animationDelay: `${idx * 0.1}s` }}>
              <div className={`w-12 h-12 ${feature.gradient} rounded-xl flex items-center justify-center mb-4`}>
                <feature.icon className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-lg font-bold text-foreground mb-2">{feature.title}</h3>
              <p className="text-sm text-muted-foreground">{feature.description}</p>
            </Card>
          ))}
        </div>

        {/* Level Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              level: "Silver",
              gradient: "bg-gradient-silver",
              features: ["Entry level agent", "Build your team", "Basic commission"],
              price: "₹250"
            },
            {
              level: "Gold",
              gradient: "bg-gradient-gold",
              features: ["Manage sub-agents", "Higher commissions", "Exclusive training"],
              price: "Achievement"
            },
            {
              level: "Diamond",
              gradient: "bg-gradient-diamond",
              features: ["Elite network leader", "Maximum earnings", "Premium support"],
              price: "Top Tier"
            }
          ].map((tier, idx) => (
            <Card key={idx} className="p-8 shadow-card hover:shadow-glow transition-all animate-fade-in" style={{ animationDelay: `${idx * 0.15}s` }}>
              <div className={`w-full h-32 ${tier.gradient} rounded-xl flex items-center justify-center mb-6`}>
                <h3 className="text-3xl font-bold text-white">{tier.level}</h3>
              </div>
              <div className="text-center mb-6">
                <p className="text-2xl font-bold text-foreground">{tier.price}</p>
              </div>
              <ul className="space-y-3">
                {tier.features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                    {feature}
                  </li>
                ))}
              </ul>
            </Card>
          ))}
        </div>

        {/* Services Section */}
        <div id="services" className="mt-20 scroll-mt-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-foreground mb-4">Our Services</h2>
            <p className="text-lg text-muted-foreground">Comprehensive solutions for your business needs</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {[
              {
                icon: Briefcase,
                title: "Job Consulting",
                description: "Expert career guidance and job placement assistance",
                gradient: "bg-gradient-primary"
              },
              {
                icon: Shield,
                title: "Insurance Services",
                description: "Comprehensive insurance solutions for your protection",
                gradient: "bg-gradient-gold"
              },
              {
                icon: Building,
                title: "Banking Solutions",
                description: "Financial services and banking assistance",
                gradient: "bg-gradient-diamond"
              },
              {
                icon: Globe,
                title: "Website Development",
                description: "Professional website design and development",
                gradient: "bg-gradient-primary"
              },
              {
                icon: TrendingUp,
                title: "Mobile App Development",
                description: "Custom mobile applications for iOS and Android",
                gradient: "bg-gradient-gold"
              },
              {
                icon: Users,
                title: "Business Consulting",
                description: "Strategic business advice and growth planning",
                gradient: "bg-gradient-diamond"
              }
            ].map((service, idx) => (
              <Card key={idx} className="p-6 shadow-card hover:shadow-glow transition-all animate-fade-in" style={{ animationDelay: `${idx * 0.1}s` }}>
                <div className={`w-14 h-14 ${service.gradient} rounded-xl flex items-center justify-center mb-4`}>
                  <service.icon className="h-7 w-7 text-white" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2">{service.title}</h3>
                <p className="text-sm text-muted-foreground">{service.description}</p>
              </Card>
            ))}
          </div>

          <div className="text-center">
            <Button 
              size="lg" 
              variant="outline"
              className="text-lg px-8 py-6"
              onClick={() => window.open('https://forgeindiaconnect.com/', '_blank')}
            >
              <Globe className="mr-2 h-5 w-5" />
              Visit Our Website
            </Button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t mt-20 py-8">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p>© 2024 Forge India Connect. All rights reserved.</p>
          <p className="text-sm mt-2">Empowering agents, building futures.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
