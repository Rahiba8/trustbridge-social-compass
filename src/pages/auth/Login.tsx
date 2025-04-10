
import LoginForm from "@/components/auth/LoginForm";
import { Link } from "react-router-dom";
import { Shield } from "lucide-react";

const Login = () => {
  return (
    <div className="min-h-screen flex flex-col bg-secondary">
      <div className="container flex-1 flex flex-col items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          <div className="flex flex-col items-center mb-6">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-md bg-primary flex items-center justify-center text-primary-foreground">
                <Shield className="h-6 w-6" />
              </div>
              <h1 className="text-2xl font-bold">TrustBridge</h1>
            </Link>
          </div>
          
          <LoginForm />
          
          <p className="text-center text-sm text-muted-foreground mt-8">
            Don't have an account?{" "}
            <Link to="/register" className="text-primary hover:underline">
              Register here
            </Link>
          </p>
        </div>
      </div>
      
      <footer className="py-6 border-t bg-background">
        <div className="container">
          <p className="text-center text-sm text-muted-foreground">
            &copy; 2025 TrustBridge. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Login;
