
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Heart, Banknote, Utensils, Shield, Users, LineChart } from "lucide-react";

const Home = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="bg-background border-b sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-md bg-primary flex items-center justify-center text-primary-foreground">
              <Shield className="h-5 w-5" />
            </div>
            <h1 className="text-xl font-bold">TrustBridge</h1>
          </div>
          
          <nav className="hidden md:flex items-center gap-6">
            <a href="#features" className="text-sm font-medium hover:text-primary transition-colors">Features</a>
            <a href="#modules" className="text-sm font-medium hover:text-primary transition-colors">Modules</a>
            <a href="#about" className="text-sm font-medium hover:text-primary transition-colors">About</a>
          </nav>
          
          <div className="flex items-center gap-4">
            <Button variant="outline" asChild>
              <Link to="/login">Log In</Link>
            </Button>
            <Button asChild>
              <Link to="/register">Register</Link>
            </Button>
          </div>
        </div>
      </header>
      
      {/* Hero Section */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-background to-secondary">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-5xl font-bold mb-6 animate-fade-in">
            Transparent & Efficient <br />
            <span className="text-primary">Social Welfare Distribution</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 animate-fade-in">
            TrustBridge connects government agencies, NGOs, and citizens through a secure platform for transparent distribution of healthcare, funds, and food resources.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in">
            <Button size="lg" asChild>
              <Link to="/register">Get Started</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link to="/login">Existing User</Link>
            </Button>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section id="features" className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">
            Key Platform Features
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="module-card flex flex-col items-center text-center p-6">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Multi-Role Access</h3>
              <p className="text-muted-foreground">
                Secure role-based access for government officials, NGOs, and citizens with appropriate permissions.
              </p>
            </div>
            
            <div className="module-card flex flex-col items-center text-center p-6">
              <div className="w-12 h-12 rounded-full bg-trustbridge-green/10 flex items-center justify-center mb-4">
                <Shield className="h-6 w-6 text-trustbridge-green" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Blockchain Security</h3>
              <p className="text-muted-foreground">
                All transactions and data are secured using blockchain technology for maximum transparency and security.
              </p>
            </div>
            
            <div className="module-card flex flex-col items-center text-center p-6">
              <div className="w-12 h-12 rounded-full bg-trustbridge-blue/10 flex items-center justify-center mb-4">
                <LineChart className="h-6 w-6 text-trustbridge-blue" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Real-time Analytics</h3>
              <p className="text-muted-foreground">
                Comprehensive dashboards with real-time data to monitor welfare distribution and identify areas of need.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Modules Section */}
      <section id="modules" className="py-16 bg-secondary">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">
            Welfare Modules
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl shadow-md overflow-hidden transition-transform hover:scale-105">
              <div className="h-40 bg-trustbridge-blue/20 flex items-center justify-center">
                <Heart className="h-16 w-16 text-trustbridge-blue" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-3">Healthcare Module</h3>
                <ul className="space-y-2 text-sm text-muted-foreground mb-4">
                  <li>• Secure digital health cards</li>
                  <li>• Medical history storage</li>
                  <li>• Doctor finder with filters</li>
                  <li>• Appointment scheduling</li>
                </ul>
                <Button variant="outline" className="w-full" asChild>
                  <Link to="/login?module=healthcare">Access Healthcare</Link>
                </Button>
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-md overflow-hidden transition-transform hover:scale-105">
              <div className="h-40 bg-trustbridge-green/20 flex items-center justify-center">
                <Banknote className="h-16 w-16 text-trustbridge-green" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-3">Funds Module</h3>
                <ul className="space-y-2 text-sm text-muted-foreground mb-4">
                  <li>• Transparent donation system</li>
                  <li>• Blockchain transaction ledger</li>
                  <li>• Verified recipients</li>
                  <li>• Emergency relief funding</li>
                </ul>
                <Button variant="outline" className="w-full" asChild>
                  <Link to="/login?module=funds">Access Funds</Link>
                </Button>
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-md overflow-hidden transition-transform hover:scale-105">
              <div className="h-40 bg-trustbridge-yellow/20 flex items-center justify-center">
                <Utensils className="h-16 w-16 text-trustbridge-yellow" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-3">Food Module</h3>
                <ul className="space-y-2 text-sm text-muted-foreground mb-4">
                  <li>• Food surplus redistribution</li>
                  <li>• Expiry tracking system</li>
                  <li>• Allergen identification</li>
                  <li>• NGO food claiming</li>
                </ul>
                <Button variant="outline" className="w-full" asChild>
                  <Link to="/login?module=food">Access Food</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* About Section */}
      <section id="about" className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-6">
              About TrustBridge
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              TrustBridge is a revolutionary platform designed to bridge the gap between welfare providers and recipients. 
              Our mission is to create a transparent, efficient, and secure system for social welfare distribution that 
              ensures resources reach those who need them most.
            </p>
            
            <div className="flex justify-center">
              <Button size="lg" asChild>
                <Link to="/register">Join TrustBridge Today</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="py-12 bg-secondary mt-auto">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-2 mb-6 md:mb-0">
              <div className="w-8 h-8 rounded-md bg-primary flex items-center justify-center text-primary-foreground">
                <Shield className="h-5 w-5" />
              </div>
              <h2 className="text-xl font-bold">TrustBridge</h2>
            </div>
            
            <div className="flex flex-col md:flex-row gap-6 md:gap-12">
              <div>
                <h3 className="text-sm font-semibold mb-2">Platform</h3>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li><a href="#features" className="hover:text-primary">Features</a></li>
                  <li><a href="#modules" className="hover:text-primary">Modules</a></li>
                  <li><a href="#about" className="hover:text-primary">About</a></li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-sm font-semibold mb-2">Resources</h3>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li><a href="#" className="hover:text-primary">Documentation</a></li>
                  <li><a href="#" className="hover:text-primary">API</a></li>
                  <li><a href="#" className="hover:text-primary">Privacy Policy</a></li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-sm font-semibold mb-2">Contact</h3>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li><a href="#" className="hover:text-primary">Support</a></li>
                  <li><a href="#" className="hover:text-primary">Partnerships</a></li>
                  <li><a href="#" className="hover:text-primary">Careers</a></li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="border-t mt-10 pt-6 text-center text-sm text-muted-foreground">
            <p>&copy; 2025 TrustBridge. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
