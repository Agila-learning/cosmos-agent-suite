import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Users, Award, TrendingUp, Shield } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-20">
        <div className="text-center max-w-4xl mx-auto mb-16 animate-fade-in">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center shadow-glow animate-glow">
              <span className="text-white font-bold text-2xl">FI</span>
            </div>
            <div className="text-left">
              <h1 className="text-3xl font-bold text-foreground">FORGE INDIA CONNECT</h1>
              <p className="text-sm text-muted-foreground">Shaping Future</p>
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
              className="bg-gradient-primary text-lg px-8 py-6"
              onClick={() => navigate('/dashboard')}
            >
              Get Started - ₹250
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 py-6">
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
      </div>
    </div>
  );
};

export default Index;
