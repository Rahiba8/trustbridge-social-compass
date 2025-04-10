
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import FundingCard from "./FundingCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Filter } from "lucide-react";

interface FundingRequest {
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

// Mock data
const mockFundingRequests: FundingRequest[] = [
  {
    id: "1",
    title: "New Hope Orphanage",
    description: "Support 50 children with education, food, and healthcare. The orphanage needs funds for renovations and basic supplies.",
    amountRequired: 500000,
    amountRaised: 320000,
    location: "Mumbai, Maharashtra",
    isVerified: true,
    image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=700&q=80",
    category: "Organizations"
  },
  {
    id: "2",
    title: "Flood Relief in Assam",
    description: "Urgent support needed for families affected by the recent floods. Funds will provide food, clean water, and temporary shelter.",
    amountRequired: 1000000,
    amountRaised: 450000,
    location: "Guwahati, Assam",
    isVerified: true,
    image: "https://images.unsplash.com/photo-1547683905-f686c993aae5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=700&q=80",
    category: "Disaster Relief"
  },
  {
    id: "3",
    title: "Golden Years Elderly Home",
    description: "Help provide medical care and companionship to 30 elderly residents who have no family support.",
    amountRequired: 300000,
    amountRaised: 210000,
    location: "Bangalore, Karnataka",
    isVerified: true,
    image: "https://images.unsplash.com/photo-1581579438747-1dc8d17bbce4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=700&q=80",
    category: "Organizations"
  },
  {
    id: "4",
    title: "Drought Relief in Rajasthan",
    description: "Support farmers and rural communities affected by prolonged drought. Funds will provide water supply and agricultural support.",
    amountRequired: 750000,
    amountRaised: 180000,
    location: "Jodhpur, Rajasthan",
    isVerified: false,
    image: "https://images.unsplash.com/photo-1559628152-85bb21d190b4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=700&q=80",
    category: "Disaster Relief"
  },
  {
    id: "5",
    title: "Asha Cancer Treatment",
    description: "10-year-old Asha needs funds for her leukemia treatment. Help her family afford the life-saving medical care she needs.",
    amountRequired: 800000,
    amountRaised: 620000,
    location: "Delhi",
    isVerified: true,
    image: "https://images.unsplash.com/photo-1559628233-eb1b1a45564b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=700&q=80",
    category: "Individual"
  },
  {
    id: "6",
    title: "Cyclone Relief in Odisha",
    description: "Urgent help needed for families displaced by the recent cyclone. Support with temporary shelter, food, and medical supplies.",
    amountRequired: 1200000,
    amountRaised: 350000,
    location: "Bhubaneswar, Odisha",
    isVerified: true,
    image: "https://images.unsplash.com/photo-1509027572446-86c7ab5d63f5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=700&q=80",
    category: "Disaster Relief"
  }
];

const FundsList = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [verifiedOnly, setVerifiedOnly] = useState(false);
  const [fundingRequests, setFundingRequests] = useState<FundingRequest[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Simulate API call
    const fetchFundingRequests = async () => {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1000));
      setFundingRequests(mockFundingRequests);
      setLoading(false);
    };
    
    fetchFundingRequests();
  }, []);
  
  const filteredRequests = fundingRequests.filter(request => {
    // Filter by search query
    const matchesSearch = request.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         request.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         request.location.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Filter by category
    const matchesCategory = selectedCategory === "all" || 
                           (selectedCategory === "disaster" && request.category === "Disaster Relief") ||
                           (selectedCategory === "organizations" && request.category === "Organizations") ||
                           (selectedCategory === "individual" && request.category === "Individual");
    
    // Filter by verification status
    const matchesVerification = !verifiedOnly || request.isVerified;
    
    return matchesSearch && matchesCategory && matchesVerification;
  });
  
  return (
    <div className="w-full">
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-grow">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by name, description, or location"
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <div className="flex items-center space-x-2">
          <Label htmlFor="verified-only" className="text-sm cursor-pointer">
            Verified Only
          </Label>
          <input
            id="verified-only"
            type="checkbox"
            className="rounded border-gray-300 text-primary focus:ring-primary"
            checked={verifiedOnly}
            onChange={() => setVerifiedOnly(!verifiedOnly)}
          />
        </div>
      </div>
      
      <Tabs defaultValue="all" className="mb-6" onValueChange={setSelectedCategory}>
        <TabsList>
          <TabsTrigger value="all">All Categories</TabsTrigger>
          <TabsTrigger value="disaster">Disaster Relief</TabsTrigger>
          <TabsTrigger value="organizations">Organizations</TabsTrigger>
          <TabsTrigger value="individual">Individual</TabsTrigger>
        </TabsList>
      </Tabs>
      
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map(i => (
            <div key={i} className="h-72 rounded-lg animate-pulse bg-muted"></div>
          ))}
        </div>
      ) : filteredRequests.length === 0 ? (
        <div className="text-center py-12">
          <h3 className="text-lg font-medium">No funding requests found</h3>
          <p className="text-muted-foreground mt-2">Try adjusting your filters</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRequests.map(request => (
            <FundingCard
              key={request.id}
              {...request}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default FundsList;
