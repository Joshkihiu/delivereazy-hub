import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { MapPin, Search, Home, Calendar, User, Menu, Zap, Package, Clock } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import endeaLogo from "@/assets/endea-logo.png";

const Customer = () => {
  const [destination, setDestination] = useState("");
  const navigate = useNavigate();

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

        {/* Header */}
        <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
          <Button
            size="icon"
            variant="secondary"
            className="rounded-full shadow-lg"
          >
            <Menu className="w-5 h-5" />
          </Button>
          <div className="flex items-center gap-2 bg-card/90 backdrop-blur-sm rounded-full px-4 py-2 shadow-lg">
            <img src={endeaLogo} alt="Endea" className="w-6 h-6" />
            <span className="font-bold">Endea</span>
          </div>
        </div>
      </div>

      {/* Bottom Sheet */}
      <div className="flex-1 bg-card rounded-t-3xl -mt-6 shadow-lg">
        <div className="container mx-auto px-4 py-6 max-w-2xl">
          {/* Quick Actions */}
          <div className="grid grid-cols-3 gap-3 mb-6">
            <button
              onClick={() => navigate("/request-delivery")}
              className="bg-primary text-primary-foreground rounded-xl p-4 hover:opacity-90 transition-opacity"
            >
              <Zap className="w-6 h-6 mx-auto mb-2" />
              <p className="text-xs font-semibold">Express</p>
              <p className="text-xs opacity-75">30 min</p>
            </button>
            <button
              onClick={() => navigate("/request-delivery")}
              className="bg-secondary text-secondary-foreground rounded-xl p-4 hover:bg-secondary/80 transition-colors"
            >
              <Package className="w-6 h-6 mx-auto mb-2" />
              <p className="text-xs font-semibold">Package</p>
              <p className="text-xs opacity-75">Standard</p>
            </button>
            <button
              onClick={() => navigate("/request-delivery")}
              className="bg-secondary text-secondary-foreground rounded-xl p-4 hover:bg-secondary/80 transition-colors"
            >
              <Clock className="w-6 h-6 mx-auto mb-2" />
              <p className="text-xs font-semibold">Schedule</p>
              <p className="text-xs opacity-75">Later</p>
            </button>
          </div>

          {/* Active Delivery Banner */}
          <Card className="bg-gradient-to-r from-primary/10 to-accent/10 border-primary/20 p-4 mb-6 cursor-pointer hover:border-primary/40 transition-colors" onClick={() => navigate("/track-delivery")}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center animate-pulse">
                  <Package className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="font-semibold">Delivery in Progress</p>
                  <p className="text-sm text-muted-foreground">Arriving in 12 min</p>
                </div>
              </div>
              <Button size="sm" variant="outline">Track</Button>
            </div>
          </Card>

          <h2 className="text-2xl font-bold mb-6">Where to deliver?</h2>

          {/* Search Input */}
          <div className="relative mb-6">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5" />
            <Input
              placeholder="Enter pickup or drop-off location"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              onFocus={() => navigate("/request-delivery")}
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
              <NavButton icon={<Calendar className="w-6 h-6" />} label="Orders" />
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
