import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import DashboardCard from "@/components/dashboard/DashboardCard";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from "recharts";
import { Heart, Banknote, Utensils, UsersRound, BadgeCheck, Building, Download, Clock, ArrowRight, Search } from "lucide-react";
import { Link } from "react-router-dom";

const distributionData = [
  { name: "Healthcare", value: 35 },
  { name: "Funds", value: 40 },
  { name: "Food", value: 25 },
];

const COLORS = ["hsl(var(--primary))", "hsl(var(--trustbridge-green))", "hsl(var(--trustbridge-yellow))"];

const moduleData = [
  { name: "Jan", healthcare: 65, funds: 78, food: 42 },
  { name: "Feb", healthcare: 75, funds: 85, food: 58 },
  { name: "Mar", healthcare: 85, funds: 101, food: 67 },
  { name: "Apr", healthcare: 98, funds: 125, food: 70 },
];

const GovernmentDashboard = () => {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    citizensRegistered: 0,
    fundsDisbursed: 0,
    verifiedNGOs: 0,
    pendingApprovals: 0
  });
  
  useEffect(() => {
    const fetchData = async () => {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setStats({
        citizensRegistered: 2458,
        fundsDisbursed: 4250000,
        verifiedNGOs: 35,
        pendingApprovals: 12
      });
      setLoading(false);
    };
    
    fetchData();
  }, []);
  
  const recentApprovals = [
    {
      id: 1,
      type: "ngo",
      title: "NGO Verification",
      entity: "Green Earth Foundation",
      status: "Approved",
      date: "2025-04-08"
    },
    {
      id: 2,
      type: "funds",
      title: "Funds Disbursement",
      entity: "Flood Relief in Assam",
      status: "Processed",
      amount: "₹1,250,000",
      date: "2025-04-07"
    },
    {
      id: 3,
      type: "healthcare",
      title: "Healthcare Policy Update",
      entity: "Maternal Care Extension",
      status: "Published",
      date: "2025-04-05"
    },
    {
      id: 4,
      type: "food",
      title: "Food Safety Standards",
      entity: "Update to Guidelines",
      status: "Published",
      date: "2025-04-02"
    }
  ];
  
  const SkeletonCard = () => (
    <div className="trust-card h-28 animate-pulse bg-muted"></div>
  );
  
  const SkeletonChart = () => (
    <div className="h-80 animate-pulse bg-muted rounded-md"></div>
  );
  
  return (
    <div className="dashboard-section space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Government Dashboard</h1>
          <p className="text-muted-foreground">Monitor and manage welfare distribution systems</p>
        </div>
        <div className="flex gap-4 mt-4 md:mt-0">
          <Button variant="outline" className="gap-2" asChild>
            <Link to="/government/reports">
              <Download className="h-4 w-4" />
              Generate Reports
            </Link>
          </Button>
          <Button className="gap-2" asChild>
            <Link to="/government/approvals">
              <Clock className="h-4 w-4" />
              Pending Approvals ({stats.pendingApprovals})
            </Link>
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
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
              title="Citizens Registered"
              value={stats.citizensRegistered.toLocaleString()}
              description="Total individuals in the system"
              icon={<UsersRound className="h-6 w-6" />}
              className="border-l-4 border-l-trustbridge-blue"
            />
            
            <DashboardCard
              title="Funds Disbursed"
              value={`₹${(stats.fundsDisbursed / 1000000).toFixed(2)}M`}
              description="Total amount distributed"
              icon={<Banknote className="h-6 w-6" />}
              className="border-l-4 border-l-trustbridge-green"
            />
            
            <DashboardCard
              title="Verified NGOs"
              value={stats.verifiedNGOs}
              description="Approved organizations"
              icon={<BadgeCheck className="h-6 w-6" />}
              className="border-l-4 border-l-trustbridge-yellow"
            />
            
            <DashboardCard
              title="Pending Approvals"
              value={stats.pendingApprovals}
              description="Require immediate action"
              icon={<Clock className="h-6 w-6" />}
              className="border-l-4 border-l-trustbridge-red"
            />
          </>
        )}
      </div>
      
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mt-6">
        <Card className="xl:col-span-2">
          <CardHeader>
            <CardTitle>Module Activity</CardTitle>
            <CardDescription>Monthly activity across different welfare modules</CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <SkeletonChart />
            ) : (
              <ResponsiveContainer width="100%" height={350}>
                <BarChart data={moduleData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="healthcare" name="Healthcare" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="funds" name="Funds" fill="hsl(var(--trustbridge-green))" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="food" name="Food" fill="hsl(var(--trustbridge-yellow))" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            )}
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Welfare Distribution</CardTitle>
            <CardDescription>Allocation across modules</CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <SkeletonChart />
            ) : (
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={distributionData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {distributionData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [`${value}%`, 'Allocation']} />
                </PieChart>
              </ResponsiveContainer>
            )}
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Recent Approvals</CardTitle>
              <Button variant="outline" size="sm" asChild>
                <Link to="/government/approvals">
                  View All
                </Link>
              </Button>
            </div>
            <CardDescription>Latest actions and approvals</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {loading ? (
                <>
                  <div className="h-14 animate-pulse bg-muted rounded-md"></div>
                  <div className="h-14 animate-pulse bg-muted rounded-md"></div>
                  <div className="h-14 animate-pulse bg-muted rounded-md"></div>
                </>
              ) : (
                recentApprovals.map(item => (
                  <div 
                    key={item.id}
                    className="flex items-start justify-between p-3 rounded-md hover:bg-secondary"
                  >
                    <div className="flex items-start gap-3">
                      <div className={`p-2 rounded-full ${
                        item.type === "healthcare" ? "bg-trustbridge-blue/10 text-trustbridge-blue" :
                        item.type === "funds" ? "bg-trustbridge-green/10 text-trustbridge-green" :
                        item.type === "food" ? "bg-trustbridge-yellow/10 text-trustbridge-yellow" :
                        "bg-primary/10 text-primary"
                      }`}>
                        {item.type === "healthcare" ? (
                          <Heart className="h-4 w-4" />
                        ) : item.type === "funds" ? (
                          <Banknote className="h-4 w-4" />
                        ) : item.type === "food" ? (
                          <Utensils className="h-4 w-4" />
                        ) : (
                          <Building className="h-4 w-4" />
                        )}
                      </div>
                      <div>
                        <p className="font-medium">{item.title}</p>
                        <p className="text-sm text-muted-foreground">{item.entity}</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {new Date(item.date).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className={`inline-block px-2 py-1 text-xs rounded-full ${
                        item.status === "Approved" ? "bg-green-100 text-green-800" :
                        item.status === "Processed" ? "bg-blue-100 text-blue-800" :
                        "bg-purple-100 text-purple-800"
                      }`}>
                        {item.status}
                      </span>
                      {item.amount && (
                        <p className="text-sm font-medium mt-1">{item.amount}</p>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common administrative tasks</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Button variant="outline" className="h-auto py-6 flex flex-col gap-2" asChild>
                <Link to="/government/healthcare">
                  <Heart className="h-6 w-6 text-trustbridge-blue" />
                  <span className="text-sm">Manage Healthcare</span>
                </Link>
              </Button>
              <Button variant="outline" className="h-auto py-6 flex flex-col gap-2" asChild>
                <Link to="/government/funds">
                  <Banknote className="h-6 w-6 text-trustbridge-green" />
                  <span className="text-sm">Manage Funds</span>
                </Link>
              </Button>
              <Button variant="outline" className="h-auto py-6 flex flex-col gap-2" asChild>
                <Link to="/government/food">
                  <Utensils className="h-6 w-6 text-trustbridge-yellow" />
                  <span className="text-sm">Food Programs</span>
                </Link>
              </Button>
              <Button variant="outline" className="h-auto py-6 flex flex-col gap-2" asChild>
                <Link to="/government/search">
                  <Search className="h-6 w-6 text-primary" />
                  <span className="text-sm">Search Database</span>
                </Link>
              </Button>
            </div>
            
            <div className="mt-6">
              <Button className="w-full" asChild>
                <Link to="/government/new">
                  Create New Welfare Program
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default GovernmentDashboard;
