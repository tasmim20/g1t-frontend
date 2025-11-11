// src/pages/dashboard/admin.tsx
import { useAuthUser } from "@/src/redux/api/authApi/useAuthUser";

const AdminDashboard = () => {
  const { user } = useAuthUser();

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <p>Name: {user?.name}</p>
      <p>Email: {user?.email}</p>
      <p>Role: {user?.role}</p>
      {/* Add Admin-specific content */}
    </div>
  );
};

export default AdminDashboard;
