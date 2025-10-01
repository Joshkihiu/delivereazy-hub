import DeliveryRequest from "@/components/DeliveryRequest";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const RequestDelivery = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="border-b border-border bg-card/50">
        <div className="container mx-auto px-4 py-4">
          <Link to="/customer">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
          </Link>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <DeliveryRequest />
      </div>
    </div>
  );
};

export default RequestDelivery;
