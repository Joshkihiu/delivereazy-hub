import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { MapPin, Search, Home, Calendar, User, Menu } from "lucide-react";
import { Link } from "react-router-dom";

const Customer = () => {
  const [destination, setDestination] = useState("");

  const savedPlaces = [
    { icon: <Home className="w-5 h-5" />, name: "Enter home location", address: "" },
    { icon: <MapPin className="w-5 h-5" />, name: "Enter work location", address: "" },
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Map Area */}
      <div className="relative h-[45vh] bg-gradient-to-br from-primary/10 to-secondary/20">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center space-y-2">
            <MapPin className="w-16 h-16 text-primary mx-auto" />
            <p className="text-muted-foreground">Map will load here</p>
            <p className="text-sm text-muted-foreground">Integrated with real location services</p>
          </div>
        </div>

        {/* Menu Button */}
        <Button
          size="icon"
          variant="secondary"
          className="absolute top-4 left-4 rounded-full shadow-lg"
        >
          <Menu className="w-5 h-5" />
        </Button>
      </div>

      {/* Bottom Sheet */}
      <div className="flex-1 bg-card rounded-t-3xl -mt-6 shadow-lg">
        <div className="container mx-auto px-4 py-6 max-w-2xl">
          {/* Promo Banner */}
          <Card className="bg-primary text-primary-foreground p-4 mb-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-primary-foreground/20 rounded-full flex items-center justify-center">
                <span className="text-2xl">🎁</span>
              </div>
              <div>
                <p className="font-semibold">50% off 3 deliveries</p>
                <p className="text-sm opacity-90">View details</p>
              </div>
            </div>
          </Card>

          <h2 className="text-2xl font-bold mb-6">Let's go places.</h2>

          {/* Search Input */}
          <div className="relative mb-6">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5" />
            <Input
              placeholder="Where to?"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              className="pl-12 h-14 text-lg"
            />
          </div>

          {/* Recent/Saved Places */}
          <div className="space-y-1">
            {savedPlaces.map((place, index) => (
              <button
                key={index}
                className="w-full flex items-center gap-4 p-4 hover:bg-secondary/50 rounded-lg transition-colors text-left"
              >
                <div className="w-10 h-10 bg-secondary rounded-full flex items-center justify-center text-muted-foreground">
                  {place.icon}
                </div>
                <div className="flex-1">
                  <p className="font-medium">{place.name}</p>
                  {place.address && <p className="text-sm text-muted-foreground">{place.address}</p>}
                </div>
              </button>
            ))}

            <button className="w-full flex items-center gap-4 p-4 hover:bg-secondary/50 rounded-lg transition-colors text-left">
              <div className="w-10 h-10 bg-secondary rounded-full flex items-center justify-center text-muted-foreground">
                <MapPin className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <p className="font-medium">Add a place</p>
              </div>
            </button>
          </div>

          {/* Schedule Ride Banner */}
          <Card className="bg-secondary/30 p-4 mt-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                <Calendar className="w-6 h-6 text-primary-foreground" />
              </div>
              <div className="flex-1">
                <p className="font-semibold">Always arrive on time</p>
                <p className="text-sm text-muted-foreground">Calendar connection makes it easy</p>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Bottom Navigation */}
      <nav className="bg-card border-t">
        <div className="container mx-auto px-4">
          <div className="flex justify-around py-3">
            <NavButton icon={<Home className="w-6 h-6" />} label="Home" active />
            <Link to="/rides">
              <NavButton icon={<Calendar className="w-6 h-6" />} label="Rides" />
            </Link>
            <Link to="/account">
              <NavButton icon={<User className="w-6 h-6" />} label="Account" />
            </Link>
          </div>
        </div>
      </nav>
    </div>
  );
};

const NavButton = ({ icon, label, active = false }: { icon: React.ReactNode; label: string; active?: boolean }) => {
  return (
    <button className="flex flex-col items-center gap-1">
      <div className={active ? "text-foreground" : "text-muted-foreground"}>{icon}</div>
      <span className={`text-xs ${active ? "text-foreground font-medium" : "text-muted-foreground"}`}>{label}</span>
    </button>
  );
};

export default Customer;
