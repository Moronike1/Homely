import React, { useEffect, useState } from "react";

interface User {
  _id: string;
  name: string;
  email: string;
  phone: string;
  serviceType: string;
  description: string;
  status: "pending" | "in-progress" | "completed";
  createdAt: string;
}

const Admin: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5000/api/users")
      .then((res) => res.json())
      .then((data) => {
        setUsers(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("❌ Error fetching users:", err);
        setLoading(false);
      });
  }, []);

  const getStatusClass = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-200 text-yellow-800 px-2 py-1 rounded-full text-sm";
      case "in-progress":
        return "bg-blue-200 text-blue-800 px-2 py-1 rounded-full text-sm";
      case "completed":
        return "bg-green-200 text-green-800 px-2 py-1 rounded-full text-sm";
      default:
        return "bg-gray-200 text-gray-800 px-2 py-1 rounded-full text-sm";
    }
  };

  if (loading) {
    return <p className="text-center mt-10">⏳ Loading service requests...</p>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>
      {users.length === 0 ? (
        <p className="text-center text-gray-600">No service requests yet.</p>
      ) : (
        <div className="overflow-x-auto shadow-md rounded-lg">
          <table className="min-w-full bg-white border border-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 border">Name</th>
                <th className="px-4 py-2 border">Email</th>
                <th className="px-4 py-2 border">Phone</th>
                <th className="px-4 py-2 border">Service Type</th>
                <th className="px-4 py-2 border">Description</th>
                <th className="px-4 py-2 border">Status</th>
                <th className="px-4 py-2 border">Created At</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id} className="hover:bg-gray-50">
                  <td className="px-4 py-2 border">{user.name}</td>
                  <td className="px-4 py-2 border">{user.email}</td>
                  <td className="px-4 py-2 border">{user.phone}</td>
                  <td className="px-4 py-2 border">{user.serviceType}</td>
                  <td className="px-4 py-2 border">{user.description}</td>
                  <td className="px-4 py-2 border text-center">
                    <span className={getStatusClass(user.status)}>
                      {user.status}
                    </span>
                  </td>
                  <td className="px-4 py-2 border">
                    {new Date(user.createdAt).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Admin;
