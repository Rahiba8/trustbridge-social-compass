
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Search, MapPin, Star, Phone } from "lucide-react";

interface Doctor {
  id: number;
  name: string;
  specialization: string;
  distance: number;
  rating: number;
  address: string;
  phone: string;
  availability: string;
  affordable: boolean;
  accessible: boolean;
}

const specializations = [
  "General Physician",
  "Pediatrician",
  "Cardiologist",
  "Neurologist",
  "Dermatologist",
  "Psychiatrist",
  "Orthopedic Surgeon",
  "Gynecologist",
  "Ophthalmologist",
  "Dentist"
];

// Mock data for doctors
const mockDoctors: Doctor[] = [
  {
    id: 1,
    name: "Dr. Amit Sharma",
    specialization: "General Physician",
    distance: 1.2,
    rating: 4.8,
    address: "123 Healthcare St, Central Hospital",
    phone: "555-1234",
    availability: "Mon-Fri: 9AM-5PM",
    affordable: true,
    accessible: true
  },
  {
    id: 2,
    name: "Dr. Priya Patel",
    specialization: "Pediatrician",
    distance: 0.8,
    rating: 4.9,
    address: "456 Children's Clinic, Medical Center",
    phone: "555-5678",
    availability: "Mon-Sat: 10AM-6PM",
    affordable: true,
    accessible: false
  },
  {
    id: 3,
    name: "Dr. Raj Kumar",
    specialization: "Cardiologist",
    distance: 2.5,
    rating: 4.7,
    address: "789 Heart Care, Specialty Hospital",
    phone: "555-9012",
    availability: "Tue-Sat: 11AM-7PM",
    affordable: false,
    accessible: true
  },
  {
    id: 4,
    name: "Dr. Sunita Desai",
    specialization: "Neurologist",
    distance: 3.1,
    rating: 4.6,
    address: "101 Brain Health Center",
    phone: "555-3456",
    availability: "Mon, Wed, Fri: 9AM-4PM",
    affordable: false,
    accessible: true
  },
  {
    id: 5,
    name: "Dr. Vijay Mehta",
    specialization: "Dermatologist",
    distance: 1.7,
    rating: 4.5,
    address: "202 Skin Care Clinic",
    phone: "555-7890",
    availability: "Mon-Thu: 10AM-6PM",
    affordable: true,
    accessible: true
  }
];

const DoctorFinder = () => {
  const [search, setSearch] = useState("");
  const [selectedSpecialization, setSelectedSpecialization] = useState("");
  const [filters, setFilters] = useState({
    affordable: false,
    accessible: false
  });
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  
  useEffect(() => {
    // Simulate fetching doctors with delay
    const fetchDoctors = async () => {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1000));
      setDoctors(mockDoctors);
      setLoading(false);
    };
    
    fetchDoctors();
  }, []);
  
  const handleFilterChange = (key: keyof typeof filters) => {
    setFilters(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };
  
  const handleSelectDoctor = (doctor: Doctor) => {
    setSelectedDoctor(doctor);
  };
  
  const filteredDoctors = doctors.filter(doctor => {
    // Filter by search term
    const matchesSearch = doctor.name.toLowerCase().includes(search.toLowerCase()) ||
                         doctor.specialization.toLowerCase().includes(search.toLowerCase());
    
    // Filter by specialization
    const matchesSpecialization = selectedSpecialization ? 
                                 doctor.specialization === selectedSpecialization : 
                                 true;
    
    // Filter by affordability
    const matchesAffordable = filters.affordable ? doctor.affordable : true;
    
    // Filter by accessibility
    const matchesAccessible = filters.accessible ? doctor.accessible : true;
    
    return matchesSearch && matchesSpecialization && matchesAffordable && matchesAccessible;
  });
  
  return (
    <div className="w-full">
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Find Nearby Doctors</CardTitle>
          <CardDescription>
            Search for healthcare providers in your area based on your needs
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="search">Search</Label>
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  id="search"
                  placeholder="Search by name or keyword"
                  className="pl-8"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="specialization">Specialization</Label>
              <Select 
                value={selectedSpecialization} 
                onValueChange={setSelectedSpecialization}
              >
                <SelectTrigger>
                  <SelectValue placeholder="All specializations" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All specializations</SelectItem>
                  {specializations.map((spec) => (
                    <SelectItem key={spec} value={spec}>
                      {spec}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-3 pt-2">
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="affordable" 
                  checked={filters.affordable}
                  onCheckedChange={() => handleFilterChange("affordable")}
                />
                <Label htmlFor="affordable">Affordable</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="accessible" 
                  checked={filters.accessible}
                  onCheckedChange={() => handleFilterChange("accessible")}
                />
                <Label htmlFor="accessible">Wheelchair Accessible</Label>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <h3 className="font-medium text-lg mb-4">
            {loading ? 'Finding doctors near you...' : 
              filteredDoctors.length === 0 ? 'No doctors found matching your criteria' :
              `${filteredDoctors.length} doctors found`}
          </h3>
          
          {loading ? (
            <div className="space-y-4">
              {[1, 2, 3].map(i => (
                <Card key={i} className="w-full h-32 animate-pulse bg-muted"></Card>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {filteredDoctors.map(doctor => (
                <Card 
                  key={doctor.id} 
                  className={`w-full transition-all duration-200 hover:shadow-md ${
                    selectedDoctor?.id === doctor.id ? 'ring-2 ring-primary' : ''
                  }`}
                  onClick={() => handleSelectDoctor(doctor)}
                >
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-semibold text-lg">{doctor.name}</h4>
                        <p className="text-muted-foreground">{doctor.specialization}</p>
                        <div className="flex items-center mt-2 text-sm">
                          <MapPin className="h-4 w-4 mr-1 text-muted-foreground" />
                          <span>{doctor.distance} km away</span>
                          <div className="mx-2 h-1 w-1 rounded-full bg-muted-foreground"></div>
                          <div className="flex items-center">
                            <Star className="h-4 w-4 mr-1 text-yellow-400" />
                            <span>{doctor.rating}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        {doctor.affordable && (
                          <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                            Affordable
                          </span>
                        )}
                        {doctor.accessible && (
                          <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                            Accessible
                          </span>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
        
        <div>
          {selectedDoctor ? (
            <Card className="sticky top-6">
              <CardHeader>
                <CardTitle>{selectedDoctor.name}</CardTitle>
                <CardDescription>{selectedDoctor.specialization}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium mb-1">Address</h4>
                  <p className="text-sm flex items-start">
                    <MapPin className="h-4 w-4 mr-2 mt-0.5 text-muted-foreground" />
                    {selectedDoctor.address}
                  </p>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium mb-1">Contact</h4>
                  <p className="text-sm flex items-center">
                    <Phone className="h-4 w-4 mr-2 text-muted-foreground" />
                    {selectedDoctor.phone}
                  </p>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium mb-1">Availability</h4>
                  <p className="text-sm">{selectedDoctor.availability}</p>
                </div>
                
                <div className="pt-2">
                  <div className="flex items-center mb-2">
                    <Star className="h-4 w-4 text-yellow-400" />
                    <Star className="h-4 w-4 text-yellow-400" />
                    <Star className="h-4 w-4 text-yellow-400" />
                    <Star className="h-4 w-4 text-yellow-400" />
                    <Star className="h-4 w-4 text-yellow-400" />
                    <span className="ml-2 text-sm">{selectedDoctor.rating}/5</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full">Book Appointment</Button>
              </CardFooter>
            </Card>
          ) : (
            <Card>
              <CardHeader>
                <CardTitle>Doctor Details</CardTitle>
                <CardDescription>
                  Select a doctor to view their details
                </CardDescription>
              </CardHeader>
              <CardContent className="h-48 flex items-center justify-center text-muted-foreground">
                Please select a doctor from the list
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default DoctorFinder;
