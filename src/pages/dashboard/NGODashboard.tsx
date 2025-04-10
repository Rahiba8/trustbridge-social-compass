
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import DashboardCard from "@/components/dashboard/DashboardCard";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Heart, Banknote, Utensils, Clock, Users, Building, ArrowRight } from "lucide-react";
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from "recharts";
import { Link } from "react-router-dom";

// Mock data for the chart
const donationData = [
  { name: "Jan", amount: 4500 },
  { name: "Feb", amount: 5200 },
  { name: "Mar", amount: 4800 },
  { name: "Apr", amount: 6500 },
  { name: "May", amount: 7800 },
  { name: "Jun", amount: 9200 },
  { name: "Jul", amount: 8400 },
];

const NGODashboard = () => {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    activeBeneficiaries: 0,
    totalFundsReceived: 0,
    fundsIncrease: 0,
    foodDistributed: 0,
    pendingRequests: 0
  });
  
  // Simulate data fetching
  useEffect(() => {
    const fetchData = async () => {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setStats({
        activeBeneficiaries: 156,
        totalFundsReceived: 87500,
        fundsIncrease: 12.5,
        foodDistributed: 458,
        pendingRequests: 8
      });
      setLoading(false);
    };
    
    fetchData();
  }, []);
  
  const pendingActions = [
    {
      id: 1,
      type: "funds",
      title: "Verify Donation Request",
      description: "Golden Years Elderly Home",
      date: "2025-04-09"
    },
    {
      id: 2,
      type: "food",
      title: "Food Claim Approval",
      description: "Fresh Vegetable Curry (5 units)",
      date: "2025-04-09"
    },
    {
      id: 3,
      type: "healthcare",
      title: "Healthcare Verification",
      description: "3 Healthcard applications pending review",
      date: "2025-04-08"
    },
    {
      id: 4,
      type: "food",
      title: "Food Listing Approval",
      description: "Rice and Dal Combo (8 units)",
      date: "2025-04-08"
    }
  ];
  
  const SkeletonCard = () => (
    <div className="trust-card h-28 animate-pulse bg-muted"></div>
  );
  
  const SkeletonAction = () => (
    <div className="h-16 animate-pulse bg-muted rounded-md mb-2"></div>
  );
  
  return (
    <div className="dashboard-section space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">NGO Dashboard</h1>
          <p className="text-muted-foreground">Manage resources and monitor welfare distribution</p>
        </div>
        <div className="flex gap-4 mt-4 md:mt-0">
          <Button variant="outline" asChild>
            <Link to="/ngo/funds">View Funding Requests</Link>
          </Button>
          <Button asChild>
            <Link to="/ngo/food">Claim Available Food</Link>
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {loading ? (
          <>
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
          </>
        ) : (
          <>
            <DashboardCard
              title="Active Beneficiaries"
              value={stats.activeBeneficiaries}
              description="People currently being served"
              icon={<Users className="h-6 w-6" />}
              className="border-l-4 border-l-trustbridge-blue"
            />
            
            <DashboardCard
              title="Total Funds Received"
              value={`₹${stats.totalFundsReceived.toLocaleString()}`}
              description="From all sources"
              icon={<Banknote className="h-6 w-6" />}
              className="border-l-4 border-l-trustbridge-green"
              trend={{
                value: stats.fundsIncrease,
                isPositive: true
              }}
            />
            
            <DashboardCard
              title="Food Items Distributed"
              value={stats.foodDistributed}
              description="Total meals served"
              icon={<Utensils className="h-6 w-6" />}
              className="border-l-4 border-l-trustbridge-yellow"
            />
            
            <DashboardCard
              title="Pending Requests"
              value={stats.pendingRequests}
              description="Require your attention"
              icon={<Clock className="h-6 w-6" />}
              className="border-l-4 border-l-trustbridge-red"
            />
          </>
        )}
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
        <Card className="lg:col-span-2">
          <CardHeader className="pb-2">
            <CardTitle>Funds Received</CardTitle>
            <CardDescription>Monthly overview of donations received</CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="h-64 animate-pulse bg-muted rounded-md"></div>
            ) : (
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={donationData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis 
                    dataKey="name"
                    tickLine={false}
                    axisLine={false}
                    padding={{ left: 10, right: 10 }}
                  />
                  <YAxis 
                    tickLine={false}
                    axisLine={false}
                    width={80}
                    tickFormatter={(value) => `₹${value}`}
                  />
                  <Tooltip formatter={(value) => [`₹${value}`, 'Amount']} />
                  <Line
                    type="monotone"
                    dataKey="amount"
                    stroke="hsl(var(--primary))"
                    strokeWidth={2}
                    dot={{ r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            )}
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Pending Actions</CardTitle>
            <CardDescription>Items requiring your attention</CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <>
                <SkeletonAction />
                <SkeletonAction />
                <SkeletonAction />
              </>
            ) : (
              <div className="space-y-3">
                {pendingActions.map(action => (
                  <div 
                    key={action.id}
                    className="flex items-start gap-3 p-3 rounded-md hover:bg-secondary"
                  >
                    <div className={`p-2 rounded-full mt-1 ${
                      action.type === "healthcare" ? "bg-trustbridge-blue/10 text-trustbridge-blue" :
                      action.type === "funds" ? "bg-trustbridge-green/10 text-trustbridge-green" :
                      "bg-trustbridge-yellow/10 text-trustbridge-yellow"
                    }`}>
                      {action.type === "healthcare" ? (
                        <Heart className="h-4 w-4" />
                      ) : action.type === "funds" ? (
                        <Banknote className="h-4 w-4" />
                      ) : (
                        <Utensils className="h-4 w-4" />
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">{action.title}</p>
                      <p className="text-sm text-muted-foreground">{action.description}</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {new Date(action.date).toLocaleDateString()}
                      </p>
                    </div>
                    <Button variant="ghost" size="icon" className="mt-1">
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
                
                <Button variant="outline" className="w-full mt-2" asChild>
                  <Link to="/ngo/requests">View All Requests</Link>
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Food Distribution</CardTitle>
              <Button variant="outline" size="sm" asChild>
                <Link to="/ngo/food">View All</Link>
              </Button>
            </div>
            <CardDescription>Recently claimed food items</CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <>
                <SkeletonAction />
                <SkeletonAction />
              </>
            ) : (
              <div className="space-y-3">
                <div className="flex justify-between border-b pb-2 text-sm font-medium text-muted-foreground">
                  <span>Item</span>
                  <span>Quantity</span>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <Utensils className="h-4 w-4 text-trustbridge-yellow" />
                    <span>Fresh Vegetable Curry</span>
                  </div>
                  <span>5 units</span>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <Utensils className="h-4 w-4 text-trustbridge-yellow" />
                    <span>Rice and Dal Combo</span>
                  </div>
                  <span>8 units</span>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <Utensils className="h-4 w-4 text-trustbridge-yellow" />
                    <span>Bread and Sandwich Platter</span>
                  </div>
                  <span>2 units</span>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Beneficiary Programs</CardTitle>
              <Button variant="outline" size="sm" asChild>
                <Link to="/ngo/programs">Manage</Link>
              </Button>
            </div>
            <CardDescription>Active welfare programs</CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <>
                <SkeletonAction />
                <SkeletonAction />
              </>
            ) : (
              <div className="space-y-3">
                <div className="flex justify-between border-b pb-2 text-sm font-medium text-muted-foreground">
                  <span>Program</span>
                  <span>Beneficiaries</span>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <Building className="h-4 w-4 text-trustbridge-blue" />
                    <span>Community Health Clinic</span>
                  </div>
                  <span>73 people</span>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <Building className="h-4 w-4 text-trustbridge-blue" />
                    <span>Daily Meal Program</span>
                  </div>
                  <span>45 people</span>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <Building className="h-4 w-4 text-trustbridge-blue" />
                    <span>Education Support</span>
                  </div>
                  <span>38 children</span>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default NGODashboard;
