import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import FoodList from "@/components/food/FoodList";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/lib/toast";

const Food = () => {
  const [activeTab, setActiveTab] = useState("available");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    contents: "",
    quantity: "1",
    expiryDate: "",
    expiryTime: "",
    price: "",
    isFree: "true",
    location: "",
  });
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    try {
      // Validate form
      if (!formData.name || !formData.contents || !formData.expiryDate) {
        throw new Error("Please fill in all required fields");
      }
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast.success("Food listing added successfully!");
      setIsDialogOpen(false);
      
      // Reset form
      setFormData({
        name: "",
        contents: "",
        quantity: "1",
        expiryDate: "",
        expiryTime: "",
        price: "",
        isFree: "true",
        location: "",
      });
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to add food listing");
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="dashboard-section">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <h1 className="text-2xl font-bold">Food Redistribution</h1>
        
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="mt-4 md:mt-0 gap-2">
              <Plus className="h-4 w-4" />
              List Food
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>List Food for Redistribution</DialogTitle>
              <DialogDescription>
                Share surplus food with those who need it most. All food must be safe for consumption.
              </DialogDescription>
            </DialogHeader>
            
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="name">Food Name <span className="text-trustbridge-red">*</span></Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="e.g., Fresh Vegetable Curry"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="contents">Contents/Ingredients <span className="text-trustbridge-red">*</span></Label>
                <Textarea
                  id="contents"
                  name="contents"
                  value={formData.contents}
                  onChange={handleInputChange}
                  placeholder="List all ingredients, potential allergens"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="quantity">Quantity <span className="text-trustbridge-red">*</span></Label>
                  <Input
                    id="quantity"
                    name="quantity"
                    type="number"
                    min="1"
                    value={formData.quantity}
                    onChange={handleInputChange}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="isFree">Pricing <span className="text-trustbridge-red">*</span></Label>
                  <Select 
                    value={formData.isFree} 
                    onValueChange={(value) => handleSelectChange("isFree", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select pricing type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="true">Free (Donation)</SelectItem>
                      <SelectItem value="false">For Sale (Discounted)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              {formData.isFree === "false" && (
                <div className="space-y-2">
                  <Label htmlFor="price">Price (₹) <span className="text-trustbridge-red">*</span></Label>
                  <Input
                    id="price"
                    name="price"
                    type="number"
                    min="1"
                    value={formData.price}
                    onChange={handleInputChange}
                    placeholder="Enter price in ₹"
                  />
                </div>
              )}
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="expiryDate">Expiry Date <span className="text-trustbridge-red">*</span></Label>
                  <Input
                    id="expiryDate"
                    name="expiryDate"
                    type="date"
                    value={formData.expiryDate}
                    onChange={handleInputChange}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="expiryTime">Expiry Time</Label>
                  <Input
                    id="expiryTime"
                    name="expiryTime"
                    type="time"
                    value={formData.expiryTime}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="location">Location <span className="text-trustbridge-red">*</span></Label>
                <Input
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  placeholder="Address for pickup"
                />
              </div>
            </div>
            
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleSubmit} disabled={isSubmitting}>
                {isSubmitting ? "Submitting..." : "Submit Listing"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      
      <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full md:w-auto grid-cols-2">
          <TabsTrigger value="available">Available Food</TabsTrigger>
          <TabsTrigger value="my-listings">My Listings</TabsTrigger>
        </TabsList>
        
        <TabsContent value="available" className="mt-6">
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Available Food Listings</h2>
            <p className="text-muted-foreground">
              Browse food available for redistribution from restaurants and individuals. NGOs can claim these items to redistribute to those in need.
            </p>
          </div>
          
          <FoodList />
        </TabsContent>
        
        <TabsContent value="my-listings" className="mt-6">
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">My Food Listings</h2>
            <p className="text-muted-foreground">
              Manage the food items you've listed for redistribution.
            </p>
          </div>
          
          <div className="text-center py-12 bg-muted rounded-lg">
            <h3 className="text-lg font-medium">No active listings</h3>
            <p className="text-muted-foreground mt-2">You haven't listed any food items yet.</p>
            <Button className="mt-4 gap-2" onClick={() => setIsDialogOpen(true)}>
              <Plus className="h-4 w-4" />
              List Food Now
            </Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Food;
