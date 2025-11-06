import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { useNotifications } from './NotificationContext';

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'diamond' | 'gold' | 'silver';
  phone: string;
  location: string;
  parentId: string | null;
  kycStatus: 'pending' | 'approved' | 'rejected';
  resumeUploaded: boolean;
  businessBackground?: string;
  attendance: Array<{ date: string; status: 'present' | 'absent' }>;
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock users database
const mockUsers: Record<string, { password: string; user: User }> = {
  'admin@forge.com': {
    password: 'admin123',
    user: {
      id: '0',
      name: 'Admin',
      email: 'admin@forge.com',
      role: 'admin',
      phone: '+91 98765 43210',
      location: 'Mumbai',
      parentId: null,
      kycStatus: 'approved',
      resumeUploaded: true,
      businessBackground: 'System Administrator',
      attendance: [],
      avatar: ''
    }
  },
  'diamond@forge.com': {
    password: 'diamond123',
    user: {
      id: '1',
      name: 'Rajesh Kumar',
      email: 'diamond@forge.com',
      role: 'diamond',
      phone: '+91 98765 43210',
      location: 'Mumbai',
      parentId: '0',
      kycStatus: 'approved',
      resumeUploaded: true,
      businessBackground: 'Previously ran a successful consulting business',
      attendance: [],
      avatar: ''
    }
  },
  'gold@forge.com': {
    password: 'gold123',
    user: {
      id: '2',
      name: 'Priya Sharma',
      email: 'gold@forge.com',
      role: 'gold',
      phone: '+91 98765 43211',
      location: 'Delhi',
      parentId: '1',
      kycStatus: 'approved',
      resumeUploaded: true,
      businessBackground: 'Insurance agent for 5 years',
      attendance: [],
      avatar: ''
    }
  },
  'silver@forge.com': {
    password: 'silver123',
    user: {
      id: '3',
      name: 'Amit Patel',
      email: 'silver@forge.com',
      role: 'silver',
      phone: '+91 98765 43212',
      location: 'Bangalore',
      parentId: '2',
      kycStatus: 'pending',
      resumeUploaded: false,
      businessBackground: '',
      attendance: [],
      avatar: ''
    }
  }
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();
  const { addNotification } = useNotifications();

  useEffect(() => {
    // Check for stored session
    const storedUser = localStorage.getItem('forgeUser');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    const userCredentials = mockUsers[email.toLowerCase()];
    
    if (userCredentials && userCredentials.password === password) {
      setUser(userCredentials.user);
      localStorage.setItem('forgeUser', JSON.stringify(userCredentials.user));
      
      addNotification({
        title: "Login Successful",
        message: `Welcome back, ${userCredentials.user.name}!`,
        type: "success"
      });

      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('forgeUser');
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
