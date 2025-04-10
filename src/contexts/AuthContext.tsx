
import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from "@/components/ui/sonner";

export type UserRole = 'government' | 'ngo' | 'citizen' | null;

interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string, role: UserRole) => Promise<void>;
  register: (name: string, email: string, password: string, role: UserRole) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock users for demonstration
const MOCK_USERS: User[] = [
  {
    id: '1',
    name: 'Government Admin',
    email: 'gov@example.com',
    role: 'government',
    avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=GA'
  },
  {
    id: '2',
    name: 'NGO Manager',
    email: 'ngo@example.com',
    role: 'ngo',
    avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=NM'
  },
  {
    id: '3',
    name: 'Citizen User',
    email: 'citizen@example.com',
    role: 'citizen',
    avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=CU'
  }
];

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  
  // Check for saved user on startup
  useEffect(() => {
    const savedUser = localStorage.getItem('trustbridge_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);
  
  // Login function - in a real app, this would make an API call
  const login = async (email: string, password: string, role: UserRole) => {
    setIsLoading(true);
    
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Find the mock user that matches the credentials
      const foundUser = MOCK_USERS.find(u => 
        u.email === email && u.role === role
      );
      
      if (!foundUser) {
        throw new Error('Invalid credentials or user not found');
      }
      
      // Set the logged in user
      setUser(foundUser);
      localStorage.setItem('trustbridge_user', JSON.stringify(foundUser));
      
      toast.success(`Welcome back, ${foundUser.name}!`);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Login failed');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };
  
  // Register function - in a real app, this would make an API call
  const register = async (name: string, email: string, password: string, role: UserRole) => {
    setIsLoading(true);
    
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Check if user already exists
      const userExists = MOCK_USERS.some(u => u.email === email);
      
      if (userExists) {
        throw new Error('User already exists with this email');
      }
      
      // Create a new user (in a real app this would be stored in a database)
      const newUser: User = {
        id: (MOCK_USERS.length + 1).toString(),
        name,
        email,
        role,
        avatar: `https://api.dicebear.com/7.x/initials/svg?seed=${name.substring(0, 2)}`
      };
      
      // Set the new user as logged in
      setUser(newUser);
      localStorage.setItem('trustbridge_user', JSON.stringify(newUser));
      
      toast.success(`Welcome to TrustBridge, ${name}!`);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Registration failed');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };
  
  // Logout function
  const logout = () => {
    setUser(null);
    localStorage.removeItem('trustbridge_user');
    toast.success('You have been logged out');
  };
  
  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated: !!user,
      isLoading,
      login,
      register,
      logout
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
