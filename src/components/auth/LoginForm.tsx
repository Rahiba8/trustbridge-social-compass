
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useAuth, UserRole } from "@/contexts/AuthContext";
import { toast } from "@/components/ui/sonner";

const LoginForm = () => {
  const navigate = useNavigate();
  const { login, isLoading } = useAuth();
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<UserRole>(null);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password || !role) {
      toast.error("Please fill in all fields");
      return;
    }
    
    try {
      await login(email, password, role);
      
      // Redirect based on role
      if (role === "government") {
        navigate("/government/dashboard");
      } else if (role === "ngo") {
        navigate("/ngo/dashboard");
      } else if (role === "citizen") {
        navigate("/citizen/dashboard");
      }
    } catch (error) {
      // Error is already handled in the login function
      console.error("Login failed:", error);
    }
  };
  
  // For demo purposes - prefill credentials
  const handleQuickLogin = (demoRole: UserRole) => {
    if (demoRole === "government") {
      setEmail("gov@example.com");
      setPassword("password");
    } else if (demoRole === "ngo") {
      setEmail("ngo@example.com");
      setPassword("password");
    } else if (demoRole === "citizen") {
      setEmail("citizen@example.com");
      setPassword("password");
    }
    setRole(demoRole);
  };
  
  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl text-center">Welcome Back</CardTitle>
        <CardDescription className="text-center">
          Log in to access your TrustBridge account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="Your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="role">Login As</Label>
            <Select value={role || ""} onValueChange={(value) => setRole(value as UserRole)}>
              <SelectTrigger>
                <SelectValue placeholder="Select your role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="government">Government</SelectItem>
                <SelectItem value="ngo">NGO</SelectItem>
                <SelectItem value="citizen">Citizen</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Logging in..." : "Log In"}
          </Button>
        </form>
      </CardContent>
      <CardFooter className="flex flex-col space-y-2">
        <div className="text-center text-sm text-muted-foreground mb-2">
          Don't have an account?{" "}
          <a 
            href="/register" 
            className="text-primary underline hover:text-primary-foreground transition-colors"
          >
            Register here
          </a>
        </div>
        
        <div className="w-full border-t pt-4">
          <p className="text-xs text-center text-muted-foreground mb-2">
            Demo Quick Login
          </p>
          <div className="flex flex-wrap gap-2 justify-center">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => handleQuickLogin("government")}
              className="text-xs border-trustbridge-blue text-trustbridge-blue"
            >
              Government Demo
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => handleQuickLogin("ngo")}
              className="text-xs border-trustbridge-green text-trustbridge-green"
            >
              NGO Demo
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => handleQuickLogin("citizen")}
              className="text-xs border-trustbridge-yellow text-trustbridge-yellow"
            >
              Citizen Demo
            </Button>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};

export default LoginForm;
