
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import HealthCardForm from "@/components/healthcare/HealthCardForm";
import DoctorFinder from "@/components/healthcare/DoctorFinder";

const Healthcare = () => {
  const [activeTab, setActiveTab] = useState("healthcard");
  
  return (
    <div className="dashboard-section">
      <h1 className="text-2xl font-bold mb-6">Healthcare Module</h1>
      
      <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full md:w-auto grid-cols-2">
          <TabsTrigger value="healthcard">Health Card</TabsTrigger>
          <TabsTrigger value="doctors">Find Doctors</TabsTrigger>
        </TabsList>
        
        <TabsContent value="healthcard" className="mt-6">
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Health Card Application</h2>
            <p className="text-muted-foreground">
              Apply for a health card to access government healthcare services and store your medical information securely.
            </p>
          </div>
          
          <HealthCardForm />
        </TabsContent>
        
        <TabsContent value="doctors" className="mt-6">
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Find Healthcare Providers</h2>
            <p className="text-muted-foreground">
              Search for doctors and healthcare facilities near you based on your needs.
            </p>
          </div>
          
          <DoctorFinder />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Healthcare;
