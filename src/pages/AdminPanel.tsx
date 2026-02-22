import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function AdminPanel() {
  const { user, loading } = useAuth();

  if (loading) {
    return <p className="pt-24 text-center">Loading admin panel...</p>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (user.email !== "moronikeoluwafemi@gmail.com") {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="pt-24 px-6">
      <h1 className="text-2xl font-bold mb-6">Admin Panel</h1>
      <p>Welcome, Admin.</p>
    </div>
  );
}

