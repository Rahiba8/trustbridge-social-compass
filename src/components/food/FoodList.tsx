
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Filter, SlidersHorizontal } from "lucide-react";
import FoodCard from "./FoodCard";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose
} from "@/components/ui/dialog";

interface FoodListing {
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

// Mock data
const mockFoodListings: FoodListing[] = [
  {
    id: "1",
    name: "Fresh Vegetable Curry",
    contents: ["Vegetables", "Dairy-Free", "Gluten-Free"],
    expiryDate: "2025-04-11T18:00:00",
    quantity: 5,
    price: null,
    location: "Green Life Restaurant, Bandra",
    distance: 1.2,
    image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=700&q=80",
    isFree: true,
    provider: {
      name: "Green Life Restaurant",
      type: "restaurant",
      rating: 4.8
    }
  },
  {
    id: "2",
    name: "Rice and Dal Combo",
    contents: ["Rice", "Lentils", "Vegetarian"],
    expiryDate: "2025-04-12T14:00:00",
    quantity: 8,
    price: 50,
    location: "Community Kitchen, Andheri",
    distance: 3.5,
    image: "https://images.unsplash.com/photo-1593916086971-528daeac419a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=700&q=80",
    isFree: false,
    provider: {
      name: "Community Kitchen",
      type: "restaurant",
      rating: 4.5
    }
  },
  {
    id: "3",
    name: "Bread and Sandwich Platter",
    contents: ["Bread", "Vegetables", "Contains Gluten"],
    expiryDate: "2025-04-10T20:00:00",
    quantity: 2,
    price: null,
    location: "Daily Bread Bakery, Colaba",
    distance: 5.8,
    image: "https://images.unsplash.com/photo-1604467794349-0b74285de7e7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=700&q=80",
    isFree: true,
    provider: {
      name: "Daily Bread Bakery",
      type: "restaurant",
      rating: 4.3
    }
  },
  {
    id: "4",
    name: "Homemade Biryani",
    contents: ["Rice", "Spices", "Non-Vegetarian"],
    expiryDate: "2025-04-11T13:00:00",
    quantity: 3,
    price: 120,
    location: "Rashid's Home Kitchen, Kurla",
    distance: 2.3,
    image: "https://images.unsplash.com/photo-1589302168068-964664d93dc0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=700&q=80",
    isFree: false,
    provider: {
      name: "Rashid Kumar",
      type: "individual",
      rating: 4.2
    }
  },
  {
    id: "5",
    name: "Fresh Fruit Basket",
    contents: ["Fruits", "Vegan", "Organic"],
    expiryDate: "2025-04-14T12:00:00",
    quantity: 4,
    price: 80,
    location: "Organic Harvest, Juhu",
    distance: 4.1,
    image: "https://images.unsplash.com/photo-1619566636858-adf3ef46400b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=700&q=80",
    isFree: false,
    provider: {
      name: "Organic Harvest",
      type: "restaurant",
      rating: 4.7
    }
  },
  {
    id: "6",
    name: "Packaged Meals",
    contents: ["Mixed", "Contains Allergens"],
    expiryDate: "2025-04-13T19:00:00",
    quantity: 10,
    price: null,
    location: "Food For All, Dadar",
    distance: 3.0,
    image: "https://images.unsplash.com/photo-1629385721542-51af63c637ab?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=700&q=80",
    isFree: true,
    provider: {
      name: "Food For All NGO",
      type: "restaurant",
      rating: 4.9
    }
  }
];

const FoodList = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [filters, setFilters] = useState({
    freeOnly: false,
    nearbyOnly: false,
    vegetarianOnly: false,
    nonExpiringSoon: false
  });
  const [sortOption, setSortOption] = useState("nearest");
  const [foodListings, setFoodListings] = useState<FoodListing[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Simulate API call
    const fetchFoodListings = async () => {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1000));
      setFoodListings(mockFoodListings);
      setLoading(false);
    };
    
    fetchFoodListings();
  }, []);
  
  const handleFilterChange = (key: keyof typeof filters) => {
    setFilters(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };
  
  // Apply filters and sorting
  let filteredFood = [...foodListings];
  
  // Apply search filter
  filteredFood = filteredFood.filter(food => 
    food.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    food.contents.some(item => item.toLowerCase().includes(searchQuery.toLowerCase())) ||
    food.location.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  // Apply category filter
  if (selectedCategory !== "all") {
    if (selectedCategory === "restaurant") {
      filteredFood = filteredFood.filter(food => food.provider.type === "restaurant");
    } else if (selectedCategory === "individual") {
      filteredFood = filteredFood.filter(food => food.provider.type === "individual");
    } else if (selectedCategory === "free") {
      filteredFood = filteredFood.filter(food => food.isFree);
    } else if (selectedCategory === "paid") {
      filteredFood = filteredFood.filter(food => !food.isFree);
    }
  }
  
  // Apply additional filters
  if (filters.freeOnly) {
    filteredFood = filteredFood.filter(food => food.isFree);
  }
  
  if (filters.nearbyOnly) {
    filteredFood = filteredFood.filter(food => food.distance <= 3);
  }
  
  if (filters.vegetarianOnly) {
    filteredFood = filteredFood.filter(food => 
      food.contents.some(item => 
        item.toLowerCase().includes("veg") || 
        item.toLowerCase().includes("vegan")
      )
    );
  }
  
  if (filters.nonExpiringSoon) {
    const now = new Date();
    filteredFood = filteredFood.filter(food => {
      const expiry = new Date(food.expiryDate);
      const hoursRemaining = Math.floor((expiry.getTime() - now.getTime()) / (1000 * 60 * 60));
      return hoursRemaining > 12;
    });
  }
  
  // Apply sorting
  if (sortOption === "nearest") {
    filteredFood.sort((a, b) => a.distance - b.distance);
  } else if (sortOption === "expiring") {
    filteredFood.sort((a, b) => new Date(a.expiryDate).getTime() - new Date(b.expiryDate).getTime());
  } else if (sortOption === "quantity") {
    filteredFood.sort((a, b) => b.quantity - a.quantity);
  }
  
  return (
    <div className="w-full">
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-grow">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search for food, ingredients, or location"
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <div className="flex gap-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" className="gap-2">
                <Filter className="h-4 w-4" />
                Filters
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Filter Food Listings</DialogTitle>
                <DialogDescription>
                  Customize your search to find food that meets your requirements
                </DialogDescription>
              </DialogHeader>
              
              <div className="grid gap-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="category">Food Source</Label>
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger>
                      <SelectValue placeholder="All categories" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Sources</SelectItem>
                      <SelectItem value="restaurant">Restaurants</SelectItem>
                      <SelectItem value="individual">Individuals</SelectItem>
                      <SelectItem value="free">Free Food Only</SelectItem>
                      <SelectItem value="paid">Paid Food Only</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label>Additional Filters</Label>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="free-only" 
                        checked={filters.freeOnly}
                        onCheckedChange={() => handleFilterChange("freeOnly")}
                      />
                      <Label htmlFor="free-only">Free food only</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="nearby-only" 
                        checked={filters.nearbyOnly}
                        onCheckedChange={() => handleFilterChange("nearbyOnly")}
                      />
                      <Label htmlFor="nearby-only">Within 3km only</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="vegetarian-only" 
                        checked={filters.vegetarianOnly}
                        onCheckedChange={() => handleFilterChange("vegetarianOnly")}
                      />
                      <Label htmlFor="vegetarian-only">Vegetarian only</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="non-expiring-soon" 
                        checked={filters.nonExpiringSoon}
                        onCheckedChange={() => handleFilterChange("nonExpiringSoon")}
                      />
                      <Label htmlFor="non-expiring-soon">Not expiring soon</Label>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="sort">Sort By</Label>
                  <Select value={sortOption} onValueChange={setSortOption}>
                    <SelectTrigger>
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="nearest">Nearest First</SelectItem>
                      <SelectItem value="expiring">Expiring Soon</SelectItem>
                      <SelectItem value="quantity">Most Available</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <DialogClose asChild>
                <Button className="w-full">Apply Filters</Button>
              </DialogClose>
            </DialogContent>
          </Dialog>
          
          <Select value={sortOption} onValueChange={setSortOption}>
            <SelectTrigger className="w-[130px]">
              <div className="flex items-center gap-2">
                <SlidersHorizontal className="h-4 w-4" />
                <span>Sort</span>
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="nearest">Nearest</SelectItem>
              <SelectItem value="expiring">Expiring Soon</SelectItem>
              <SelectItem value="quantity">Most Available</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <Tabs defaultValue="all" className="mb-6" onValueChange={setSelectedCategory}>
        <TabsList>
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="free">Free</TabsTrigger>
          <TabsTrigger value="paid">Paid</TabsTrigger>
          <TabsTrigger value="restaurant">Restaurant</TabsTrigger>
          <TabsTrigger value="individual">Individual</TabsTrigger>
        </TabsList>
      </Tabs>
      
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map(i => (
            <div key={i} className="h-72 rounded-lg animate-pulse bg-muted"></div>
          ))}
        </div>
      ) : filteredFood.length === 0 ? (
        <div className="text-center py-12">
          <h3 className="text-lg font-medium">No food listings found</h3>
          <p className="text-muted-foreground mt-2">Try adjusting your filters</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredFood.map(food => (
            <FoodCard
              key={food.id}
              {...food}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default FoodList;
