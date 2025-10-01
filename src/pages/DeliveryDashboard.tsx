import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Package, TrendingUp, Clock, Star, MapPin, ChevronRight, Bike, DollarSign } from "lucide-react";
import { Link } from "react-router-dom";

const DeliveryDashboard = () => {
  const [isOnline, setIsOnline] = useState(false);

  const stats = [
    { label: "Today's Earnings", value: "KSh 1,450", icon: DollarSign, change: "+12%" },
    { label: "Deliveries", value: "8", icon: Package, change: "+2" },
    { label: "Avg. Rating", value: "4.8", icon: Star, change: "+0.2" },
    { label: "Hours Active", value: "5.2", icon: Clock, change: "+1.2" },
  ];

  const pendingDeliveries = [
    {
      id: "1",
      pickup: "Westlands Mall",
      dropoff: "Kilimani Apartments",
      distance: "3.2 km",
      payment: "KSh 250",
      priority: "Express",
      timeLeft: "5 min",
    },
    {
      id: "2",
      pickup: "Java House Karen",
      dropoff: "Nairobi University",
      distance: "5.8 km",
      payment: "KSh 320",
      priority: "Standard",
      timeLeft: "12 min",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-card border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">Delivery Dashboard</h1>
              <p className="text-sm text-muted-foreground">Welcome back, Alex</p>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-sm font-medium">{isOnline ? "Online" : "Offline"}</span>
              <Switch checked={isOnline} onCheckedChange={setIsOnline} />
            </div>
          </div>
        </div>
      </div>

      {/* Status Banner */}
      {isOnline && (
        <div className="bg-primary/10 border-b border-primary/20">
          <div className="container mx-auto px-4 py-3">
            <div className="flex items-center gap-2 text-primary">
              <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
              <p className="text-sm font-medium">You're online and ready to receive deliveries</p>
            </div>
          </div>
        </div>
      )}

      <div className="container mx-auto px-4 py-6 max-w-6xl space-y-6">
        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat) => (
            <Card key={stat.label} className="p-4">
              <div className="flex items-start justify-between mb-2">
                <stat.icon className="w-5 h-5 text-muted-foreground" />
                <Badge variant="secondary" className="text-xs">
                  {stat.change}
                </Badge>
              </div>
              <p className="text-2xl font-bold mb-1">{stat.value}</p>
              <p className="text-xs text-muted-foreground">{stat.label}</p>
            </Card>
          ))}
        </div>

        {/* Available Deliveries */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold">Available Deliveries</h2>
            <Button variant="ghost" size="sm">
              View All <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </div>

          <div className="space-y-3">
            {pendingDeliveries.map((delivery) => (
              <Card key={delivery.id} className="p-4 hover:border-primary transition-colors cursor-pointer">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                      <Bike className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <Badge variant={delivery.priority === "Express" ? "default" : "secondary"} className="mb-1">
                        {delivery.priority}
                      </Badge>
                      <p className="text-sm text-muted-foreground">Accept within {delivery.timeLeft}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xl font-bold text-primary">{delivery.payment}</p>
                    <p className="text-xs text-muted-foreground">{delivery.distance}</p>
                  </div>
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex items-start gap-2">
                    <MapPin className="w-4 h-4 text-primary mt-0.5" />
                    <div>
                      <p className="text-sm font-medium">Pickup</p>
                      <p className="text-sm text-muted-foreground">{delivery.pickup}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <MapPin className="w-4 h-4 text-destructive mt-0.5" />
                    <div>
                      <p className="text-sm font-medium">Drop-off</p>
                      <p className="text-sm text-muted-foreground">{delivery.dropoff}</p>
                    </div>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button className="flex-1">Accept</Button>
                  <Button variant="outline" className="flex-1">Decline</Button>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-4">
          <Link to="/earnings">
            <Card className="p-4 hover:border-primary transition-colors cursor-pointer">
              <TrendingUp className="w-8 h-8 text-primary mb-2" />
              <p className="font-semibold">View Earnings</p>
              <p className="text-sm text-muted-foreground">Track your income</p>
            </Card>
          </Link>
          <Link to="/delivery-history">
            <Card className="p-4 hover:border-primary transition-colors cursor-pointer">
              <Clock className="w-8 h-8 text-primary mb-2" />
              <p className="font-semibold">History</p>
              <p className="text-sm text-muted-foreground">Past deliveries</p>
            </Card>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DeliveryDashboard;
