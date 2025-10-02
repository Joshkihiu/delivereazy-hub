import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useDropzone } from "react-dropzone";
import { Bike, User, Upload } from "lucide-react";

const DelivererSignup = () => {
  const [deliveryMethod, setDeliveryMethod] = useState<"motorcycle" | "foot">("motorcycle");
  const [bondAmount, setBondAmount] = useState("");
  const [idDocument, setIdDocument] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const { getRootProps, getInputProps } = useDropzone({
    accept: { 'image/*': [], 'application/pdf': [] },
    maxFiles: 1,
    onDrop: (acceptedFiles) => {
      if (acceptedFiles.length > 0) {
        setIdDocument(acceptedFiles[0]);
      }
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      const bond = parseFloat(bondAmount);
      if (isNaN(bond) || bond < 1000) {
        throw new Error("Bond amount must be at least KSh 1000");
      }

      let idDocumentUrl = "";
      if (idDocument) {
        const fileExt = idDocument.name.split('.').pop();
        const fileName = `${user.id}-${Date.now()}.${fileExt}`;
        const { error: uploadError, data } = await supabase.storage
          .from('id_documents')
          .upload(fileName, idDocument);

        if (uploadError) throw uploadError;
        
        const { data: { publicUrl } } = supabase.storage
          .from('id_documents')
          .getPublicUrl(fileName);
        
        idDocumentUrl = publicUrl;
      }

      const { error } = await supabase
        .from('deliverers')
        .insert({
          user_id: user.id,
          delivery_method: deliveryMethod,
          bond_amount: bond,
          id_document_url: idDocumentUrl,
          verification_status: 'pending',
        });

      if (error) throw error;

      const { error: roleError } = await supabase
        .from('user_roles')
        .insert({ user_id: user.id, role: 'deliverer' });

      if (roleError && !roleError.message.includes('duplicate')) throw roleError;

      toast({
        title: "Application submitted!",
        description: "Your deliverer application is under review.",
      });
      
      navigate("/delivery-dashboard");
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to submit application",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle className="text-2xl">Become a Deliverer</CardTitle>
          <CardDescription>
            Complete your application to start delivering with Endea
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label>Delivery Method</Label>
              <RadioGroup value={deliveryMethod} onValueChange={(v) => setDeliveryMethod(v as any)}>
                <div className="flex items-center space-x-2 border rounded-lg p-4 cursor-pointer hover:bg-secondary/50">
                  <RadioGroupItem value="motorcycle" id="motorcycle" />
                  <label htmlFor="motorcycle" className="flex items-center gap-2 cursor-pointer flex-1">
                    <Bike className="w-5 h-5" />
                    <div>
                      <p className="font-medium">Motorcycle</p>
                      <p className="text-sm text-muted-foreground">Faster deliveries, higher bond required</p>
                    </div>
                  </label>
                </div>
                <div className="flex items-center space-x-2 border rounded-lg p-4 cursor-pointer hover:bg-secondary/50">
                  <RadioGroupItem value="foot" id="foot" />
                  <label htmlFor="foot" className="flex items-center gap-2 cursor-pointer flex-1">
                    <User className="w-5 h-5" />
                    <div>
                      <p className="font-medium">On Foot</p>
                      <p className="text-sm text-muted-foreground">Short distance deliveries</p>
                    </div>
                  </label>
                </div>
              </RadioGroup>
            </div>

            <div className="space-y-2">
              <Label htmlFor="bond">Bond Amount (KSh)</Label>
              <Input
                id="bond"
                type="number"
                min="1000"
                step="100"
                placeholder="Minimum KSh 1000"
                value={bondAmount}
                onChange={(e) => setBondAmount(e.target.value)}
                required
              />
              <p className="text-sm text-muted-foreground">
                Your bond determines the maximum order value you can accept. Higher bond = more orders.
              </p>
            </div>

            <div className="space-y-2">
              <Label>ID Document (National ID, Passport, or Driver's License)</Label>
              <div
                {...getRootProps()}
                className="border-2 border-dashed rounded-lg p-8 text-center cursor-pointer hover:bg-secondary/50 transition-colors"
              >
                <input {...getInputProps()} />
                <Upload className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                {idDocument ? (
                  <p className="text-sm font-medium">{idDocument.name}</p>
                ) : (
                  <>
                    <p className="text-sm font-medium">Click to upload or drag and drop</p>
                    <p className="text-xs text-muted-foreground mt-1">PDF or Image (max 10MB)</p>
                  </>
                )}
              </div>
            </div>

            <div className="bg-secondary/30 rounded-lg p-4">
              <h3 className="font-semibold mb-2">Important Information:</h3>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Your bond is refundable when you stop delivering</li>
                <li>• You can only accept orders below your bond amount</li>
                <li>• ID verification typically takes 24-48 hours</li>
                <li>• You'll be notified once approved</li>
              </ul>
            </div>

            <Button type="submit" className="w-full" disabled={loading || !idDocument}>
              {loading ? "Submitting..." : "Submit Application"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default DelivererSignup;