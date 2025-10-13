import React, { useState, useEffect } from "react";
import Card, { CardContent } from "@/components/UI/Card";
import Button from "@/components/ui/Button";
import api from "../utils/axios";

const Dashboard = () => {
  const [scans, setScans] = useState([]);

  useEffect(() => {
    const fetchScans = async () => {
      try {
        const response = await api.get("/scan"); // GET scans
        setScans(response.data.data || []);
      } catch (err) {
        console.error("Failed to fetch scans", err);
      }
    };
    fetchScans();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this scan?")) return;

    try {
      await api.delete(`/scan/${id}`); // ✅ this will call http://localhost:5000/api/v1/scan/${id}

      setScans((prev) => prev.filter((s) => s._id !== id));
      alert("Scan deleted successfully!");
    } catch (err) {
      console.error("Failed to delete scan", err);
      alert("Failed to delete scan");
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Top Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="shadow-md rounded-2xl">
          <CardContent className="p-4">
            <h2 className="text-lg font-semibold">Total Scans</h2>
            <p className="text-3xl font-bold mt-2">{scans.length}</p>
          </CardContent>
        </Card>
        <Card className="shadow-md rounded-2xl">
          <CardContent className="p-4">
            <h2 className="text-lg font-semibold">Passed</h2>
            <p className="text-3xl font-bold text-green-600 mt-2">
              {scans.filter((s) => s.status === "completed").length}
            </p>
          </CardContent>
        </Card>
        <Card className="shadow-md rounded-2xl">
          <CardContent className="p-4">
            <h2 className="text-lg font-semibold">Failed</h2>
            <p className="text-3xl font-bold text-red-600 mt-2">
              {scans.filter((s) => s.status === "failed").length}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Scan History */}
      <Card className="shadow-md rounded-2xl">
        <CardContent className="p-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Recent Scans</h2>
            <Button variant="outline">View All</Button>
          </div>
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b">
                <th className="p-2">URL</th>
                <th className="p-2">Status</th>
                <th className="p-2">Date</th>
                <th className="p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {scans.length > 0 ? (
                scans.map((scan, index) => (
                  <tr key={scan._id || index} className="border-b">
                    <td className="p-2">{scan.url}</td>
                    <td
                      className={`p-2 ${
                        scan.status === "completed"
                          ? "text-green-600"
                          : scan.status === "failed"
                          ? "text-red-600"
                          : "text-yellow-600"
                      }`}
                    >
                      {scan.status}
                    </td>
                    <td className="p-2">
                      {new Date(scan.createdAt).toLocaleString()}
                    </td>
                    <td className="p-2 flex gap-2">
                      {scan.reportId ? (
                        <Button
                          size="sm"
                          onClick={() =>
                            window.open(
                              `http://localhost:5000/api/v1/scan/reports/${scan.reportId._id}`,
                              "_blank"
                            )
                          }
                        >
                          View
                        </Button>
                      ) : (
                        <span>-</span>
                      )}
                      <Button
                        size="sm"
                        color="red"
                        onClick={() => handleDelete(scan._id)}
                      >
                        Delete
                      </Button>
                      <Button
                          size="sm"
                          onClick={() =>
                            window.open(
                              `http://localhost:5000/api/v1/scan/reports/${scan.reportId._id}/download`,
                              "_blank"
                            )
                          }
                        >
                          Download
                      </Button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="p-2 text-center">
                    No scans found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
