import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { 
  User, 
  Home as HomeIcon, 
  Shield, 
  Lock, 
  Bell, 
  MapPin, 
  Briefcase, 
  Plus,
  Globe,
  MessageSquare,
  Calendar as CalendarIcon,
  LogOut,
  Trash2,
  Home,
  Calendar,
  ChevronRight
} from "lucide-react";
import { Link } from "react-router-dom";

const Account = () => {
  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="container mx-auto px-4 py-6 max-w-2xl">
        {/* Profile Header */}
        <div className="flex items-center gap-4 mb-6">
          <div className="relative">
            <Avatar className="w-20 h-20">
              <AvatarFallback className="bg-primary text-primary-foreground text-2xl">
                JM
              </AvatarFallback>
            </Avatar>
            <Button
              size="icon"
              className="absolute -top-1 -right-1 rounded-full h-8 w-8"
            >
              <Plus className="w-4 h-4" />
            </Button>
          </div>
          <div>
            <h1 className="text-2xl font-bold">Joshua Muhoro</h1>
          </div>
        </div>

        {/* Update Account Banner */}
        <Card className="bg-secondary/30 p-4 mb-6">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
              <Shield className="w-5 h-5 text-primary-foreground" />
            </div>
            <div className="flex-1">
              <p className="font-semibold mb-1">Let's update your account</p>
              <p className="text-sm text-muted-foreground mb-2">Improve your app experience</p>
              <p className="text-sm text-primary font-medium">2 new suggestions</p>
            </div>
          </div>
        </Card>

        {/* Account Settings */}
        <div className="space-y-6">
          <div className="space-y-1">
            <MenuItem icon={<User />} label="Personal info" />
            <MenuItem icon={<HomeIcon />} label="Family profile" />
            <MenuItem icon={<Shield />} label="Safety" />
            <MenuItem icon={<Lock />} label="Login & security" />
            <MenuItem icon={<Bell />} label="Privacy" />
          </div>

          {/* Saved Places */}
          <div>
            <h2 className="font-semibold text-lg mb-3">Saved places</h2>
            <div className="space-y-1">
              <MenuItem icon={<HomeIcon />} label="Enter home location" />
              <MenuItem icon={<Briefcase />} label="Enter work location" />
              <MenuItem icon={<Plus />} label="Add a place" />
            </div>
          </div>

          {/* Settings */}
          <div className="space-y-1">
            <MenuItem icon={<Globe />} label="Language" sublabel="English - GB" />
            <MenuItem icon={<MessageSquare />} label="Communication preferences" />
            <MenuItem icon={<CalendarIcon />} label="Calendars" />
          </div>

          {/* Account Actions */}
          <div className="space-y-1 pt-4">
            <MenuItem icon={<LogOut />} label="Log out" />
            <MenuItem icon={<Trash2 />} label="Delete account" />
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-card border-t">
        <div className="container mx-auto px-4">
          <div className="flex justify-around py-3">
            <Link to="/customer">
              <NavButton icon={<Home className="w-6 h-6" />} label="Home" />
            </Link>
            <Link to="/rides">
              <NavButton icon={<Calendar className="w-6 h-6" />} label="Orders" />
            </Link>
            <NavButton icon={<User className="w-6 h-6" />} label="Account" active />
          </div>
        </div>
      </nav>
    </div>
  );
};

const MenuItem = ({ icon, label, sublabel }: { icon: React.ReactNode; label: string; sublabel?: string }) => {
  return (
    <button className="w-full flex items-center gap-4 p-4 hover:bg-secondary/50 rounded-lg transition-colors text-left">
      <div className="text-muted-foreground">{icon}</div>
      <div className="flex-1">
        <p className="font-medium">{label}</p>
        {sublabel && <p className="text-sm text-muted-foreground">{sublabel}</p>}
      </div>
      <ChevronRight className="w-5 h-5 text-muted-foreground" />
    </button>
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

export default Account;
