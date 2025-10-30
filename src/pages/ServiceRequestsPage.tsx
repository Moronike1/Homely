import { useEffect, useState } from "react";

interface ServiceRequest {
  _id: string;
  name: string;
  email: string;
  phone: string;
  serviceType: string;
  description: string;
  status: string;
  createdAt: string;
}

export default function ServiceRequestsPage() {
  const [requests, setRequests] = useState<ServiceRequest[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/service-requests");
        const data = await response.json();
        setRequests(data);
      } catch (error) {
        console.error("Error fetching service requests:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, []);

  if (loading) return <p className="text-center text-gray-500">Loading...</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Service Requests</h1>
      {requests.length === 0 ? (
        <p className="text-gray-500">No requests found.</p>
      ) : (
        <ul className="space-y-4">
          {requests.map((req) => (
            <li key={req._id} className="p-4 border rounded-lg shadow-md">
              <h2 className="font-semibold">{req.serviceType}</h2>
              <p><strong>Name:</strong> {req.name}</p>
              <p><strong>Email:</strong> {req.email}</p>
              <p><strong>Phone:</strong> {req.phone}</p>
              <p><strong>Description:</strong> {req.description}</p>
              <p><strong>Status:</strong> {req.status}</p>
              <p className="text-sm text-gray-400">
                {new Date(req.createdAt).toLocaleString()}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
