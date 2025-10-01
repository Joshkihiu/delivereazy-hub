import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { ArrowLeft } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const Auth = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [showOTP, setShowOTP] = useState(false);
  const navigate = useNavigate();

  const handlePhoneSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowOTP(true);
  };

  const handleOTPVerify = (e: React.FormEvent) => {
    e.preventDefault();
    // In real implementation, verify OTP with backend
    navigate("/role-selection");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/20 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6 transition-colors">
          <ArrowLeft className="w-4 h-4" />
          Back to home
        </Link>

        {!showOTP ? (
          <Card>
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">Welcome to Endea</CardTitle>
              <CardDescription>Sign in or create an account to continue</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="phone" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="phone">Phone</TabsTrigger>
                  <TabsTrigger value="email">Email</TabsTrigger>
                </TabsList>

                <TabsContent value="phone">
                  <form onSubmit={handlePhoneSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <div className="flex gap-2">
                        <Input
                          type="text"
                          value="+254"
                          disabled
                          className="w-20"
                        />
                        <Input
                          id="phone"
                          type="tel"
                          placeholder="114113788"
                          value={phoneNumber}
                          onChange={(e) => setPhoneNumber(e.target.value)}
                          required
                        />
                      </div>
                    </div>
                    <Button type="submit" className="w-full">
                      Continue
                    </Button>
                  </form>
                </TabsContent>

                <TabsContent value="email">
                  <form onSubmit={handlePhoneSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="your@email.com"
                        required
                      />
                    </div>
                    <Button type="submit" className="w-full">
                      Continue
                    </Button>
                  </form>
                </TabsContent>
              </Tabs>

              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-card px-2 text-muted-foreground">Or continue with</span>
                </div>
              </div>

              <div className="space-y-3">
                <Button variant="outline" className="w-full" type="button">
                  <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                    <path
                      fill="currentColor"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="currentColor"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="currentColor"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="currentColor"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                  Sign in with Google
                </Button>
              </div>
            </CardContent>
          </Card>
        ) : (
          <Card>
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">Enter the code</CardTitle>
              <CardDescription>
                A code was sent to your WhatsApp +254{phoneNumber}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleOTPVerify} className="space-y-4">
                <div className="flex gap-2 justify-center">
                  {[1, 2, 3, 4].map((i) => (
                    <Input
                      key={i}
                      type="text"
                      maxLength={1}
                      className="w-14 h-14 text-center text-2xl"
                    />
                  ))}
                </div>
                <p className="text-center text-sm text-muted-foreground">
                  Resend code in <span className="text-foreground font-medium">18s</span>
                </p>
                <Button type="button" variant="link" className="w-full">
                  Try a different method
                </Button>
                <Button type="submit" className="w-full">
                  Verify
                </Button>
              </form>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Auth;
