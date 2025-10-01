import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { MapPin, Phone, MessageSquare, Star, Navigation, Clock, Package } from "lucide-react";

const LiveTracking = () => {
  const [deliveryStatus] = useState({
    status: "in_transit",
    driver: {
      name: "John Kamau",
      photo: "",
      rating: 4.9,
      vehicle: "Motorcycle",
      plate: "KBZ 123A",
    },
    eta: "12 min",
    currentLocation: "Arriving at Westlands",
    progress: 60,
  });

  const statusSteps = [
    { id: "confirmed", label: "Confirmed", completed: true },
    { id: "picked_up", label: "Picked Up", completed: true },
    { id: "in_transit", label: "In Transit", completed: true },
    { id: "delivered", label: "Delivered", completed: false },
  ];

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Map Area */}
      <Card className="relative h-[40vh] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-secondary/10 flex items-center justify-center">
          <div className="text-center space-y-2">
            <Navigation className="w-16 h-16 text-primary mx-auto animate-pulse" />
            <p className="text-muted-foreground">Live map tracking</p>
            <p className="text-sm text-muted-foreground">{deliveryStatus.currentLocation}</p>
          </div>
        </div>
      </Card>

      {/* ETA Banner */}
      <Card className="bg-primary text-primary-foreground p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Clock className="w-8 h-8" />
            <div>
              <p className="text-sm opacity-90">Estimated Arrival</p>
              <p className="text-2xl font-bold">{deliveryStatus.eta}</p>
            </div>
          </div>
          <Badge variant="secondary" className="text-primary">
            On Time
          </Badge>
        </div>
      </Card>

      {/* Progress Bar */}
      <Card className="p-6">
        <div className="space-y-4">
          <div className="flex justify-between items-center mb-2">
            {statusSteps.map((step, index) => (
              <div key={step.id} className="flex flex-col items-center flex-1">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    step.completed ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground"
                  }`}
                >
                  {step.completed ? "✓" : index + 1}
                </div>
                <p className="text-xs mt-2 text-center">{step.label}</p>
              </div>
            ))}
          </div>
          <div className="relative h-2 bg-secondary rounded-full overflow-hidden">
            <div
              className="absolute left-0 top-0 h-full bg-primary transition-all duration-500"
              style={{ width: `${deliveryStatus.progress}%` }}
            />
          </div>
        </div>
      </Card>

      {/* Driver Info */}
      <Card className="p-6">
        <div className="flex items-center gap-4 mb-4">
          <Avatar className="w-16 h-16">
            <AvatarImage src={deliveryStatus.driver.photo} />
            <AvatarFallback className="bg-primary text-primary-foreground text-xl">
              {deliveryStatus.driver.name.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <h3 className="font-bold text-lg">{deliveryStatus.driver.name}</h3>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
              <span>{deliveryStatus.driver.rating}</span>
              <span>•</span>
              <span>{deliveryStatus.driver.vehicle}</span>
            </div>
          </div>
          <Badge variant="outline">{deliveryStatus.driver.plate}</Badge>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <Button variant="outline" className="gap-2">
            <Phone className="w-4 h-4" />
            Call
          </Button>
          <Button variant="outline" className="gap-2">
            <MessageSquare className="w-4 h-4" />
            Message
          </Button>
        </div>
      </Card>

      {/* Delivery Details */}
      <Card className="p-6 space-y-4">
        <h3 className="font-bold text-lg flex items-center gap-2">
          <Package className="w-5 h-5 text-primary" />
          Delivery Details
        </h3>
        
        <div className="space-y-3">
          <div className="flex items-start gap-3">
            <MapPin className="w-5 h-5 text-primary mt-0.5" />
            <div>
              <p className="text-sm font-medium">Pickup</p>
              <p className="text-sm text-muted-foreground">Westlands Mall, Nairobi</p>
              <p className="text-xs text-muted-foreground mt-1">Completed at 2:45 PM</p>
            </div>
          </div>
          
          <div className="border-l-2 border-dashed border-border ml-2 h-8" />
          
          <div className="flex items-start gap-3">
            <MapPin className="w-5 h-5 text-destructive mt-0.5" />
            <div>
              <p className="text-sm font-medium">Drop-off</p>
              <p className="text-sm text-muted-foreground">Kilimani Apartments, Block C</p>
              <p className="text-xs text-muted-foreground mt-1">ETA: 3:10 PM</p>
            </div>
          </div>
        </div>

        <div className="bg-secondary/50 rounded-lg p-3 mt-4">
          <p className="text-sm font-medium mb-1">Delivery Instructions</p>
          <p className="text-sm text-muted-foreground">
            Please call when you arrive. Hand to resident directly.
          </p>
        </div>
      </Card>

      {/* Support */}
      <Button variant="outline" className="w-full">
        Need Help? Contact Support
      </Button>
    </div>
  );
};

export default LiveTracking;
