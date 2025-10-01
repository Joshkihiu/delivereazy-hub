import { Button } from "@/components/ui/button";
import { Package, MapPin, Clock, Shield, Bike, Footprints } from "lucide-react";
import { Link } from "react-router-dom";
import endeaLogo from "@/assets/endea-logo.png";

const Landing = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img src={endeaLogo} alt="Endea Logo" className="w-10 h-10" />
              <span className="text-2xl font-bold">Endea</span>
            </div>
            <div className="flex items-center gap-4">
              <Link to="/auth">
                <Button variant="ghost">Sign In</Button>
              </Link>
              <Link to="/auth">
                <Button>Get Started</Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-background to-accent/5">
        <div className="container mx-auto px-4 py-20 md:py-32">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <div className="flex items-center justify-center gap-4 mb-6">
              <Bike className="w-12 h-12 text-primary" />
              <Footprints className="w-12 h-12 text-primary" />
            </div>
            <h1 className="text-5xl md:text-7xl font-bold text-foreground leading-tight">
              Lightning-Fast <span className="text-primary">Delivery</span>
              <br />
              <span className="text-3xl md:text-5xl">Motorcycle & On-Foot</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto">
              Get your packages delivered in 30 minutes or less. From documents to parcels, 
              our motorcycle and walking couriers deliver across Nairobi with speed and care.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/auth">
                <Button size="lg" className="w-full sm:w-auto text-lg px-8 py-6">
                  Get Started
                </Button>
              </Link>
              <Link to="/become-deliverer">
                <Button size="lg" variant="outline" className="w-full sm:w-auto text-lg px-8 py-6">
                  Become a Deliverer
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
            Why Choose Endea?
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <FeatureCard
              icon={<Clock className="w-12 h-12" />}
              title="Fast Delivery"
              description="Get your items delivered in as fast as 30 minutes"
            />
            <FeatureCard
              icon={<MapPin className="w-12 h-12" />}
              title="Real-time Tracking"
              description="Track your delivery every step of the way"
            />
            <FeatureCard
              icon={<Shield className="w-12 h-12" />}
              title="Secure & Safe"
              description="All deliveries are insured and verified"
            />
            <FeatureCard
              icon={<Package className="w-12 h-12" />}
              title="Flexible Options"
              description="Choose from walking, bike, or motorcycle delivery"
            />
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-secondary/10">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
            How It Works
          </h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <StepCard
              number="1"
              title="Request Delivery"
              description="Enter pickup and drop-off locations with item details"
            />
            <StepCard
              number="2"
              title="Get Matched"
              description="We connect you with the nearest available deliverer"
            />
            <StepCard
              number="3"
              title="Track & Receive"
              description="Track in real-time and receive your item safely"
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to get started?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of satisfied customers today
          </p>
          <Link to="/auth">
            <Button size="lg" variant="secondary" className="text-lg px-8 py-6">
              Sign Up Now
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-background border-t">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p>&copy; 2025 Endea. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

const FeatureCard = ({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) => {
  return (
    <div className="bg-card rounded-xl p-6 text-center hover:shadow-lg transition-shadow">
      <div className="text-primary mb-4 flex justify-center">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
};

const StepCard = ({ number, title, description }: { number: string; title: string; description: string }) => {
  return (
    <div className="text-center">
      <div className="w-16 h-16 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
        {number}
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
};

export default Landing;
