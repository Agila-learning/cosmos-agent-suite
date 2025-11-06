import { useAuth } from "@/contexts/AuthContext";
import { Navigate } from "react-router-dom";

const Dashboard = () => {
  const { user } = useAuth();

  // Redirect based on user role
  if (!user) {
    return <Navigate to="/login" />;
  }

  if (user.role === 'admin') {
    return <Navigate to="/admin-dashboard" />;
  }

  if (user.role === 'diamond') {
    return <Navigate to="/admin-dashboard" />;
  }

  return <Navigate to="/agent-dashboard" />;
};

export default Dashboard;
