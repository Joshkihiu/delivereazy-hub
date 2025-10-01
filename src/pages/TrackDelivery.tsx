import LiveTracking from "@/components/LiveTracking";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const TrackDelivery = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="border-b border-border bg-card/50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/customer">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
            </Link>
            <h1 className="text-xl font-bold">Track Delivery</h1>
            <div className="w-20" />
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <LiveTracking />
      </div>
    </div>
  );
};

export default TrackDelivery;
