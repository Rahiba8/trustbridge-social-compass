
import { Button } from "@/components/ui/button";
import { Clock, MapPin, AlertCircle, ShoppingBag, Tag, Calendar } from "lucide-react";
import { toast } from "@/lib/toast";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger
} from "@/components/ui/dialog";

interface FoodCardProps {
  id: string;
  name: string;
  contents: string[];
  expiryDate: string;
  quantity: number;
  price: number | null;
  location: string;
  distance: number;
  image: string;
  isFree: boolean;
  provider: {
    name: string;
    type: "restaurant" | "individual";
    rating: number;
  };
}

const FoodCard = ({
  id,
  name,
  contents,
  expiryDate,
  quantity,
  price,
  location,
  distance,
  image,
  isFree,
  provider
}: FoodCardProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [claimQuantity, setClaimQuantity] = useState(1);
  
  // Calculate time remaining until expiry
  const now = new Date();
  const expiry = new Date(expiryDate);
  const hoursRemaining = Math.max(0, Math.floor((expiry.getTime() - now.getTime()) / (1000 * 60 * 60)));
  
  let expiryText = "";
  if (hoursRemaining === 0) {
    expiryText = "Expires today";
  } else if (hoursRemaining < 24) {
    expiryText = `Expires in ${hoursRemaining} hour${hoursRemaining > 1 ? 's' : ''}`;
  } else {
    const daysRemaining = Math.floor(hoursRemaining / 24);
    expiryText = `Expires in ${daysRemaining} day${daysRemaining > 1 ? 's' : ''}`;
  }
  
  const handleClaim = async () => {
    setIsSubmitting(true);
    
    try {
      // Simulate processing
      await new Promise(resolve => setTimeout(resolve, 1500));
      toast.success(`Successfully claimed ${claimQuantity} ${quantity > 1 ? 'units' : 'unit'} of ${name}`);
      setIsDialogOpen(false);
    } catch (error) {
      toast.error("Failed to claim food. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="module-card overflow-hidden flex flex-col">
      <div className="relative h-48 rounded-lg overflow-hidden mb-4">
        <img 
          src={image} 
          alt={name} 
          className="w-full h-full object-cover"
        />
        {isFree ? (
          <div className="absolute top-2 right-2">
            <Badge className="bg-trustbridge-green text-white">Free</Badge>
          </div>
        ) : (
          <div className="absolute top-2 right-2">
            <Badge variant="outline" className="bg-white/80 backdrop-blur-sm">
              ₹{price}
            </Badge>
          </div>
        )}
      </div>
      
      <h3 className="text-lg font-semibold mb-1">{name}</h3>
      
      <div className="flex items-center text-sm mb-3">
        <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
        <span>{location} ({distance.toFixed(1)} km)</span>
      </div>
      
      <div className="flex flex-wrap gap-1 mb-3">
        {contents.map((item, index) => (
          <span 
            key={index}
            className="inline-flex px-2 py-1 text-xs rounded-full bg-secondary text-secondary-foreground"
          >
            {item}
          </span>
        ))}
      </div>
      
      <div className="mt-auto">
        <div className="flex items-center text-sm mb-2">
          <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
          <span>{new Date(expiryDate).toLocaleDateString()}</span>
        </div>
        
        <div className="flex items-center text-sm mb-3">
          <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
          <span className={hoursRemaining < 12 ? "text-trustbridge-red" : ""}>
            {expiryText}
          </span>
        </div>
        
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center text-sm">
            <ShoppingBag className="h-4 w-4 mr-2 text-muted-foreground" />
            <span>{quantity} available</span>
          </div>
          
          <div className="text-sm text-muted-foreground">
            {provider.type === "restaurant" ? "Restaurant" : "Individual"}
          </div>
        </div>
        
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="w-full">
              {isFree ? "Claim Now" : "Purchase"}
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {isFree ? `Claim ${name}` : `Purchase ${name}`}
              </DialogTitle>
              <DialogDescription>
                {isFree ? 
                  "This food is being offered for free to reduce waste and help those in need." :
                  "This food is being offered at a reduced price to reduce waste and help those in need."
                }
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="text-sm font-medium mb-1">Quantity Available</h4>
                  <p>{quantity} units</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium mb-1">Expires On</h4>
                  <p>{new Date(expiryDate).toLocaleDateString()}</p>
                </div>
              </div>
              
              <div>
                <h4 className="text-sm font-medium mb-1">Contents/Ingredients</h4>
                <div className="flex flex-wrap gap-1">
                  {contents.map((item, index) => (
                    <span 
                      key={index}
                      className="inline-flex px-2 py-1 text-xs rounded-full bg-secondary text-secondary-foreground"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-medium">Select Quantity:</h4>
                <div className="flex items-center">
                  <Button 
                    variant="outline" 
                    size="icon" 
                    onClick={() => setClaimQuantity(Math.max(1, claimQuantity - 1))}
                    disabled={claimQuantity <= 1}
                  >
                    -
                  </Button>
                  <span className="w-8 text-center">{claimQuantity}</span>
                  <Button 
                    variant="outline" 
                    size="icon"
                    onClick={() => setClaimQuantity(Math.min(quantity, claimQuantity + 1))}
                    disabled={claimQuantity >= quantity}
                  >
                    +
                  </Button>
                </div>
              </div>
              
              {!isFree && (
                <div>
                  <h4 className="text-sm font-medium mb-1">Total Cost</h4>
                  <p className="text-lg font-bold">₹{(price! * claimQuantity).toFixed(2)}</p>
                </div>
              )}
              
              <div className="rounded-md bg-secondary p-3">
                <div className="flex gap-2">
                  <AlertCircle className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                  <div className="text-sm text-muted-foreground">
                    Please verify the food quality upon pickup. Check for appropriate packaging and storage.
                  </div>
                </div>
              </div>
            </div>
            
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleClaim} disabled={isSubmitting}>
                {isSubmitting ? "Processing..." : (isFree ? "Confirm Claim" : "Confirm Purchase")}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default FoodCard;
