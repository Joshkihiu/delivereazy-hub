import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { MapPin, Package, Clock, Zap, DollarSign, ChevronRight } from "lucide-react";

const DeliveryRequest = () => {
  const [step, setStep] = useState(1);
  const [deliverySpeed, setDeliverySpeed] = useState("standard");
  const [packageSize, setPackageSize] = useState("small");

  const speedOptions = [
    { id: "express", label: "Express", time: "30 min", price: 350, icon: Zap },
    { id: "standard", label: "Standard", time: "1 hour", price: 250, icon: Clock },
    { id: "scheduled", label: "Scheduled", time: "Custom", price: 200, icon: Clock },
  ];

  const sizeOptions = [
    { id: "small", label: "Small", desc: "Documents, keys", price: 0 },
    { id: "medium", label: "Medium", desc: "Bags, boxes", price: 50 },
    { id: "large", label: "Large", desc: "Suitcases", price: 100 },
  ];

  const calculateTotal = () => {
    const speedPrice = speedOptions.find((s) => s.id === deliverySpeed)?.price || 0;
    const sizePrice = sizeOptions.find((s) => s.id === packageSize)?.price || 0;
    return speedPrice + sizePrice;
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Progress Steps */}
      <div className="flex items-center justify-between mb-8">
        {[1, 2, 3].map((i) => (
          <div key={i} className="flex items-center flex-1">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                step >= i ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground"
              }`}
            >
              {i}
            </div>
            {i < 3 && (
              <div className={`h-1 flex-1 mx-2 ${step > i ? "bg-primary" : "bg-secondary"}`} />
            )}
          </div>
        ))}
      </div>

      {/* Step 1: Locations */}
      {step === 1 && (
        <Card className="p-6 space-y-6">
          <div>
            <h2 className="text-2xl font-bold mb-2">Where to?</h2>
            <p className="text-muted-foreground">Set your pickup and drop-off locations</p>
          </div>

          <div className="space-y-4">
            <div>
              <Label htmlFor="pickup">Pickup Location</Label>
              <div className="relative mt-2">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-primary" />
                <Input id="pickup" placeholder="Enter pickup address" className="pl-11" />
              </div>
            </div>

            <div>
              <Label htmlFor="dropoff">Drop-off Location</Label>
              <div className="relative mt-2">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-destructive" />
                <Input id="dropoff" placeholder="Enter drop-off address" className="pl-11" />
              </div>
            </div>

            <div className="bg-secondary/50 rounded-lg p-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Estimated distance</span>
                <span className="font-bold">4.2 km</span>
              </div>
            </div>
          </div>

          <Button className="w-full" size="lg" onClick={() => setStep(2)}>
            Continue <ChevronRight className="w-5 h-5 ml-2" />
          </Button>
        </Card>
      )}

      {/* Step 2: Package Details */}
      {step === 2 && (
        <Card className="p-6 space-y-6">
          <div>
            <h2 className="text-2xl font-bold mb-2">Package Details</h2>
            <p className="text-muted-foreground">Tell us about your delivery</p>
          </div>

          <div className="space-y-4">
            <div>
              <Label className="mb-3 block">Delivery Speed</Label>
              <div className="grid gap-3">
                {speedOptions.map((option) => (
                  <button
                    key={option.id}
                    onClick={() => setDeliverySpeed(option.id)}
                    className={`p-4 rounded-lg border-2 text-left transition-all ${
                      deliverySpeed === option.id
                        ? "border-primary bg-primary/5"
                        : "border-border hover:border-primary/50"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <option.icon className="w-5 h-5 text-primary" />
                        <div>
                          <p className="font-semibold">{option.label}</p>
                          <p className="text-sm text-muted-foreground">{option.time}</p>
                        </div>
                      </div>
                      <Badge variant="secondary">KSh {option.price}</Badge>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <Label className="mb-3 block">Package Size</Label>
              <div className="grid grid-cols-3 gap-3">
                {sizeOptions.map((option) => (
                  <button
                    key={option.id}
                    onClick={() => setPackageSize(option.id)}
                    className={`p-4 rounded-lg border-2 text-center transition-all ${
                      packageSize === option.id
                        ? "border-primary bg-primary/5"
                        : "border-border hover:border-primary/50"
                    }`}
                  >
                    <Package className="w-6 h-6 text-primary mx-auto mb-2" />
                    <p className="font-semibold text-sm">{option.label}</p>
                    <p className="text-xs text-muted-foreground">{option.desc}</p>
                    {option.price > 0 && (
                      <Badge variant="secondary" className="mt-2 text-xs">
                        +KSh {option.price}
                      </Badge>
                    )}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <Label htmlFor="notes">Special Instructions (Optional)</Label>
              <Textarea
                id="notes"
                placeholder="Add any special instructions for the deliverer..."
                className="mt-2"
                rows={3}
              />
            </div>
          </div>

          <div className="flex gap-3">
            <Button variant="outline" className="flex-1" onClick={() => setStep(1)}>
              Back
            </Button>
            <Button className="flex-1" onClick={() => setStep(3)}>
              Continue <ChevronRight className="w-5 h-5 ml-2" />
            </Button>
          </div>
        </Card>
      )}

      {/* Step 3: Confirmation */}
      {step === 3 && (
        <Card className="p-6 space-y-6">
          <div>
            <h2 className="text-2xl font-bold mb-2">Confirm & Pay</h2>
            <p className="text-muted-foreground">Review your delivery details</p>
          </div>

          <div className="space-y-4">
            <div className="bg-secondary/50 rounded-lg p-4 space-y-3">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary mt-0.5" />
                <div>
                  <p className="text-sm font-medium">Pickup</p>
                  <p className="text-sm text-muted-foreground">Westlands Mall, Nairobi</p>
                </div>
              </div>
              <div className="border-l-2 border-dashed border-border ml-2 h-6" />
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-destructive mt-0.5" />
                <div>
                  <p className="text-sm font-medium">Drop-off</p>
                  <p className="text-sm text-muted-foreground">Kilimani Apartments, Nairobi</p>
                </div>
              </div>
            </div>

            <div className="border-t border-b border-border py-4 space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Delivery Speed</span>
                <span className="font-medium capitalize">{deliverySpeed}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Package Size</span>
                <span className="font-medium capitalize">{packageSize}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Distance</span>
                <span className="font-medium">4.2 km</span>
              </div>
            </div>

            <div className="bg-primary/10 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted-foreground">Subtotal</span>
                <span className="font-medium">KSh {calculateTotal()}</span>
              </div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted-foreground">Service Fee</span>
                <span className="font-medium">KSh 20</span>
              </div>
              <div className="border-t border-primary/20 pt-2 mt-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold">Total</span>
                  <div className="flex items-center gap-2">
                    <DollarSign className="w-5 h-5 text-primary" />
                    <span className="text-2xl font-bold text-primary">
                      KSh {calculateTotal() + 20}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <Button className="w-full" size="lg">
              Pay with M-Pesa
            </Button>
            <Button variant="outline" className="w-full" size="lg">
              Use Credits (2 available)
            </Button>
          </div>

          <Button variant="ghost" className="w-full" onClick={() => setStep(2)}>
            Back to Edit
          </Button>
        </Card>
      )}
    </div>
  );
};

export default DeliveryRequest;
