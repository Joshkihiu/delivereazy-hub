import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Home, Calendar, User, Info } from "lucide-react";
import { Link } from "react-router-dom";

const Rides = () => {
  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="container mx-auto px-4 py-6 max-w-2xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold">Rides</h1>
          <Button size="icon" variant="ghost">
            <Info className="w-5 h-5" />
          </Button>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="upcoming" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
            <TabsTrigger value="past">Past</TabsTrigger>
          </TabsList>

          <TabsContent value="upcoming" className="space-y-6">
            {/* Empty State */}
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <div className="w-32 h-32 mb-6">
                <div className="relative">
                  <div className="absolute inset-0 bg-secondary rounded-3xl rotate-12"></div>
                  <div className="relative bg-card border-4 border-background rounded-3xl p-6 shadow-lg">
                    <Calendar className="w-16 h-16 text-primary mx-auto mb-2" />
                    <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center absolute -bottom-2 -right-2">
                      <svg className="w-6 h-6 text-primary-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
              <h2 className="text-2xl font-bold mb-2">No Upcoming rides</h2>
              <p className="text-muted-foreground mb-2 max-w-md">
                Whatever is on your schedule, a Scheduled Ride can get you there on time
              </p>
              <Button variant="link" className="text-primary">
                Learn how it works
              </Button>
            </div>

            {/* CTA Button */}
            <Button size="lg" className="w-full h-14 text-lg">
              Schedule a ride
            </Button>
          </TabsContent>

          <TabsContent value="past" className="space-y-4">
            <div className="text-center py-16 text-muted-foreground">
              <p>No past rides yet</p>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-card border-t">
        <div className="container mx-auto px-4">
          <div className="flex justify-around py-3">
            <Link to="/customer">
              <NavButton icon={<Home className="w-6 h-6" />} label="Home" />
            </Link>
            <NavButton icon={<Calendar className="w-6 h-6" />} label="Rides" active />
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

export default Rides;
