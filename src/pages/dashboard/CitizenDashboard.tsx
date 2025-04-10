
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import DashboardCard from "@/components/dashboard/DashboardCard";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Heart, Banknote, Utensils, Clock, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const CitizenDashboard = () => {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    healthcareStatus: "Not Applied",
    healthcareLastUpdate: "",
    donationsMade: 0,
    donationsAmount: 0,
    foodClaimed: 0
  });
  
  // Simulate data fetching
  useEffect(() => {
    const fetchData = async () => {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setStats({
        healthcareStatus: "Approved",
        healthcareLastUpdate: "2025-03-25",
        donationsMade: 3,
        donationsAmount: 2800,
        foodClaimed: 5
      });
      setLoading(false);
    };
    
    fetchData();
  }, []);
  
  const recentActivity = [
    {
      id: 1,
      type: "donation",
      title: "Donated to New Hope Orphanage",
      date: "2025-04-05",
      amount: "₹1,200"
    },
    {
      id: 2,
      type: "food",
      title: "Claimed 2 meals from Green Life Restaurant",
      date: "2025-04-02",
      amount: null
    },
    {
      id: 3,
      type: "healthcare",
      title: "Health Card Application Approved",
      date: "2025-03-25",
      amount: null
    },
    {
      id: 4,
      type: "donation",
      title: "Donated to Flood Relief in Assam",
      date: "2025-03-20",
      amount: "₹1,000"
    }
  ];
  
  const SkeletonCard = () => (
    <div className="trust-card h-28 animate-pulse bg-muted"></div>
  );
  
  const SkeletonActivity = () => (
    <div className="h-14 animate-pulse bg-muted rounded-md mb-2"></div>
  );
  
  return (
    <div className="dashboard-section space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Citizen Dashboard</h1>
          <p className="text-muted-foreground">Overview of your health, donations, and food transactions</p>
        </div>
        <div className="flex gap-4 mt-4 md:mt-0">
          <Button variant="outline" asChild>
            <Link to="/citizen/healthcare">Manage Health Card</Link>
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {loading ? (
          <>
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
          </>
        ) : (
          <>
            <DashboardCard
              title="Health Card Status"
              value={stats.healthcareStatus}
              description={`Last updated: ${new Date(stats.healthcareLastUpdate).toLocaleDateString()}`}
              icon={<Heart className="h-6 w-6" />}
              className="border-l-4 border-l-trustbridge-blue"
            />
            
            <DashboardCard
              title="Donations Made"
              value={stats.donationsMade}
              description={`Total amount: ₹${stats.donationsAmount.toLocaleString()}`}
              icon={<Banknote className="h-6 w-6" />}
              className="border-l-4 border-l-trustbridge-green"
            />
            
            <DashboardCard
              title="Food Items Claimed"
              value={stats.foodClaimed}
              description="Through the food redistribution program"
              icon={<Utensils className="h-6 w-6" />}
              className="border-l-4 border-l-trustbridge-yellow"
            />
          </>
        )}
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Your latest transactions and applications</CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <>
                <SkeletonActivity />
                <SkeletonActivity />
                <SkeletonActivity />
              </>
            ) : (
              <div className="space-y-2">
                {recentActivity.map(activity => (
                  <div 
                    key={activity.id}
                    className="flex items-center justify-between p-3 rounded-md hover:bg-secondary"
                  >
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-full ${
                        activity.type === "healthcare" ? "bg-trustbridge-blue/10 text-trustbridge-blue" :
                        activity.type === "donation" ? "bg-trustbridge-green/10 text-trustbridge-green" :
                        "bg-trustbridge-yellow/10 text-trustbridge-yellow"
                      }`}>
                        {activity.type === "healthcare" ? (
                          <Heart className="h-4 w-4" />
                        ) : activity.type === "donation" ? (
                          <Banknote className="h-4 w-4" />
                        ) : (
                          <Utensils className="h-4 w-4" />
                        )}
                      </div>
                      <div>
                        <p className="font-medium">{activity.title}</p>
                        <p className="text-sm text-muted-foreground">
                          {new Date(activity.date).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    {activity.amount && (
                      <span className="font-medium text-trustbridge-green">
                        {activity.amount}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common tasks you can perform</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button variant="outline" className="w-full justify-between" asChild>
              <Link to="/citizen/healthcare">
                <span className="flex items-center">
                  <Heart className="h-4 w-4 mr-2" />
                  Apply for Health Card
                </span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            
            <Button variant="outline" className="w-full justify-between" asChild>
              <Link to="/citizen/funds">
                <span className="flex items-center">
                  <Banknote className="h-4 w-4 mr-2" />
                  Make a Donation
                </span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            
            <Button variant="outline" className="w-full justify-between" asChild>
              <Link to="/citizen/food">
                <span className="flex items-center">
                  <Utensils className="h-4 w-4 mr-2" />
                  Find Available Food
                </span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            
            <Button variant="outline" className="w-full justify-between" asChild>
              <Link to="/citizen/settings">
                <span className="flex items-center">
                  <Clock className="h-4 w-4 mr-2" />
                  View Transaction History
                </span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CitizenDashboard;
