import { useAuth } from "@/contexts/AuthContext";
import StudentDashboard from "./StudentDashboard";
import AdminDashboard from "./Admin";

const Dashboard = () => {
  const { isAdmin } = useAuth();

  if (isAdmin) {
    return <AdminDashboard />;
  }

  return <StudentDashboard />;
};

export default Dashboard;
