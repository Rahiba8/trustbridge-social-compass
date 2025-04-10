
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Banknote, MapPin, CheckCircle, AlertCircle } from "lucide-react";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/sonner";

interface FundingCardProps {
  id: string;
  title: string;
  description: string;
  amountRequired: number;
  amountRaised: number;
  location: string;
  isVerified: boolean;
  image: string;
  category: string;
}

const FundingCard = ({
  id,
  title,
  description,
  amountRequired,
  amountRaised,
  location,
  isVerified,
  image,
  category
}: FundingCardProps) => {
  const [donationAmount, setDonationAmount] = useState<string>("100");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  
  const progressPercentage = Math.min(Math.round((amountRaised / amountRequired) * 100), 100);
  
  const handleDonate = async () => {
    setIsSubmitting(true);
    
    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 1500));
      toast.success(`Successfully donated ₹${donationAmount} to ${title}`);
      setIsDialogOpen(false);
    } catch (error) {
      toast.error("Donation failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="module-card overflow-hidden">
      <div className="relative h-48 rounded-lg overflow-hidden mb-4">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover"
        />
        <div className="absolute top-2 right-2">
          <span className={`px-2 py-1 text-xs rounded-full ${
            category === "Disaster Relief" 
              ? "bg-trustbridge-red/20 text-trustbridge-red" 
              : "bg-trustbridge-blue/20 text-trustbridge-blue"
          }`}>
            {category}
          </span>
        </div>
      </div>
      
      <div className="flex justify-between items-start mb-3">
        <h3 className="text-lg font-semibold">{title}</h3>
        {isVerified ? (
          <div className="flex items-center text-xs text-trustbridge-green">
            <CheckCircle className="h-4 w-4 mr-1" />
            Verified
          </div>
        ) : (
          <div className="flex items-center text-xs text-trustbridge-yellow">
            <AlertCircle className="h-4 w-4 mr-1" />
            Pending
          </div>
        )}
      </div>
      
      <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{description}</p>
      
      <div className="flex items-center text-sm mb-2">
        <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
        {location}
      </div>
      
      <div className="mt-4">
        <div className="flex justify-between items-center mb-2 text-sm">
          <span className="font-medium">₹{amountRaised.toLocaleString()}</span>
          <span className="text-muted-foreground">of ₹{amountRequired.toLocaleString()}</span>
        </div>
        <Progress value={progressPercentage} className="h-2" />
      </div>
      
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <Button className="w-full mt-4 flex items-center gap-2">
            <Banknote className="h-4 w-4" />
            Donate Now
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Donate to {title}</DialogTitle>
            <DialogDescription>
              Your contribution will help those in need. All donations are tracked on our transparent ledger system.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="amount">Donation Amount (₹)</Label>
              <Input
                id="amount"
                type="number"
                min="10"
                value={donationAmount}
                onChange={(e) => setDonationAmount(e.target.value)}
              />
            </div>
            
            <div className="flex justify-between gap-2">
              {[100, 500, 1000, 5000].map((amount) => (
                <Button
                  key={amount}
                  variant="outline"
                  size="sm"
                  onClick={() => setDonationAmount(amount.toString())}
                  className={donationAmount === amount.toString() ? "border-primary" : ""}
                >
                  ₹{amount}
                </Button>
              ))}
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleDonate} disabled={isSubmitting}>
              {isSubmitting ? "Processing..." : "Confirm Donation"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default FundingCard;
