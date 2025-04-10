
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import FundsList from "@/components/funds/FundsList";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Activity, ArrowRight, Landmark, Shield } from "lucide-react";

const Funds = () => {
  const [activeTab, setActiveTab] = useState("donations");
  
  return (
    <div className="dashboard-section">
      <h1 className="text-2xl font-bold mb-6">Funds Module</h1>
      
      <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full md:w-auto grid-cols-2">
          <TabsTrigger value="donations">Donation Opportunities</TabsTrigger>
          <TabsTrigger value="transparency">Transparency & Ledger</TabsTrigger>
        </TabsList>
        
        <TabsContent value="donations" className="mt-6">
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Fund Donation Opportunities</h2>
            <p className="text-muted-foreground">
              Explore opportunities to help individuals and organizations in need through financial donations.
            </p>
          </div>
          
          <FundsList />
        </TabsContent>
        
        <TabsContent value="transparency" className="mt-6">
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Transparency & Fund Tracking</h2>
            <p className="text-muted-foreground">
              TrustBridge ensures full transparency in how funds are collected and distributed through our secure blockchain ledger.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-trustbridge-blue" />
                  Secure Blockchain
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Every transaction is recorded on a transparent, immutable blockchain ledger that ensures accountability.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5 text-trustbridge-green" />
                  Real-time Tracking
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Track your donations in real-time and see exactly how your contributions are being used.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2">
                  <Landmark className="h-5 w-5 text-trustbridge-yellow" />
                  Verification System
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  All recipients are verified through our multi-step verification process before receiving funds.
                </p>
              </CardContent>
            </Card>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Recent Transactions</CardTitle>
              <CardDescription>Public record of recent fund movements</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-2 font-medium">Transaction ID</th>
                        <th className="text-left py-2 font-medium">Date</th>
                        <th className="text-left py-2 font-medium">From</th>
                        <th className="text-left py-2 font-medium">To</th>
                        <th className="text-right py-2 font-medium">Amount</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b">
                        <td className="py-2 text-xs text-muted-foreground">0x8a2c...f3e4</td>
                        <td className="py-2">Apr 10, 2025</td>
                        <td className="py-2">Citizen (0x47b...21a)</td>
                        <td className="py-2">New Hope Orphanage</td>
                        <td className="py-2 text-right">₹1,200</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-2 text-xs text-muted-foreground">0x3e5f...8c9d</td>
                        <td className="py-2">Apr 09, 2025</td>
                        <td className="py-2">Govt. Disaster Fund</td>
                        <td className="py-2">Flood Relief in Assam</td>
                        <td className="py-2 text-right">₹250,000</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-2 text-xs text-muted-foreground">0x7b4d...2e9f</td>
                        <td className="py-2">Apr 08, 2025</td>
                        <td className="py-2">NGO (0x98d...45c)</td>
                        <td className="py-2">Golden Years Elderly Home</td>
                        <td className="py-2 text-right">₹45,000</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-2 text-xs text-muted-foreground">0x2c8a...9f1e</td>
                        <td className="py-2">Apr 07, 2025</td>
                        <td className="py-2">Citizen (0x56c...78d)</td>
                        <td className="py-2">Asha Cancer Treatment</td>
                        <td className="py-2 text-right">₹5,000</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                
                <div className="flex justify-center">
                  <Button variant="outline" className="gap-2">
                    <span>View Complete Ledger</span>
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Funds;
