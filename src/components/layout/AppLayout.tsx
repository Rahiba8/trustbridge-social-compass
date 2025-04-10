
import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { 
  LayoutDashboard, 
  Heart, 
  Banknote, 
  Utensils, 
  Settings, 
  Menu, 
  X, 
  LogOut,
  Globe,
  Building2,
  User
} from "lucide-react";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface AppLayoutProps {
  children: React.ReactNode;
}

const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  if (!user) {
    navigate("/login");
    return null;
  }
  
  const getRoleIcon = () => {
    switch (user.role) {
      case "government":
        return <Globe className="h-6 w-6" />;
      case "ngo":
        return <Building2 className="h-6 w-6" />;
      case "citizen":
        return <User className="h-6 w-6" />;
      default:
        return null;
    }
  };
  
  const getRoleName = () => {
    switch (user.role) {
      case "government":
        return "Government Dashboard";
      case "ngo":
        return "NGO Dashboard";
      case "citizen":
        return "Citizen Dashboard";
      default:
        return "Dashboard";
    }
  };
  
  const basePath = `/${user.role}`;
  
  const menuItems = [
    {
      title: "Dashboard",
      icon: <LayoutDashboard className="h-5 w-5" />,
      href: `${basePath}/dashboard`,
    },
    {
      title: "Healthcare",
      icon: <Heart className="h-5 w-5" />,
      href: `${basePath}/healthcare`,
    },
    {
      title: "Funds",
      icon: <Banknote className="h-5 w-5" />,
      href: `${basePath}/funds`,
    },
    {
      title: "Food",
      icon: <Utensils className="h-5 w-5" />,
      href: `${basePath}/food`,
    },
    {
      title: "Settings",
      icon: <Settings className="h-5 w-5" />,
      href: `${basePath}/settings`,
    },
  ];
  
  const handleLogout = () => {
    logout();
    navigate("/login");
  };
  
  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar for desktop */}
      <aside className="hidden md:flex flex-col w-64 border-r bg-sidebar border-sidebar-border h-full">
        <div className="px-6 py-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-md bg-primary flex items-center justify-center text-primary-foreground">
              {getRoleIcon()}
            </div>
            <h1 className="text-xl font-semibold">TrustBridge</h1>
          </div>
          <p className="text-sm text-muted-foreground mt-1">{getRoleName()}</p>
        </div>
        
        <div className="px-3 mt-6 flex flex-col flex-1">
          <nav className="space-y-1">
            {menuItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors",
                  location.pathname === item.href
                    ? "bg-primary text-primary-foreground"
                    : "text-foreground hover:bg-secondary"
                )}
              >
                {item.icon}
                {item.title}
              </a>
            ))}
          </nav>
          
          <div className="mt-auto mb-6">
            <Button 
              variant="outline" 
              className="w-full flex items-center gap-2 justify-start" 
              onClick={handleLogout}
            >
              <LogOut className="h-4 w-4" />
              Logout
            </Button>
          </div>
        </div>
      </aside>
      
      {/* Main content area */}
      <div className="flex flex-col flex-1 h-full overflow-hidden">
        {/* Mobile header */}
        <header className="md:hidden border-b bg-background z-10">
          <div className="flex items-center justify-between px-4 py-3">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-md bg-primary flex items-center justify-center text-primary-foreground">
                {getRoleIcon()}
              </div>
              <h1 className="text-xl font-semibold">TrustBridge</h1>
            </div>
            
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
          
          {/* Mobile menu */}
          {mobileMenuOpen && (
            <nav className="border-t p-4 space-y-3 bg-background">
              {menuItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors",
                    location.pathname === item.href
                      ? "bg-primary text-primary-foreground"
                      : "text-foreground hover:bg-secondary"
                  )}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.icon}
                  {item.title}
                </a>
              ))}
              
              <Button 
                variant="outline" 
                className="w-full flex items-center gap-2 justify-start mt-4" 
                onClick={handleLogout}
              >
                <LogOut className="h-4 w-4" />
                Logout
              </Button>
            </nav>
          )}
        </header>
        
        {/* Top bar with user info */}
        <div className="border-b bg-background p-4 hidden md:flex items-center justify-end">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-10 gap-2 px-2">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback>{user.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                </Avatar>
                <div className="text-left">
                  <p className="text-sm font-medium">{user.name}</p>
                  <p className="text-xs text-muted-foreground">{user.email}</p>
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuItem onClick={() => navigate(`${basePath}/profile`)}>
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigate(`${basePath}/settings`)}>
                Settings
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout}>
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        
        {/* Main content */}
        <main className="flex-1 overflow-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AppLayout;
