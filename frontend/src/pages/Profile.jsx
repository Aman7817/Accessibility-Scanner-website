// src/pages/Profile.jsx
import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const { user, authFetch, updateUser, fetchProfile, logout } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({
    name: user?.name || "",
    email: user?.email || "",
    bio: user?.bio || ""
  });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // populate form from context user immediately
    setForm({
      name: user?.name || "",
      email: user?.email || "",
      bio: user?.bio || ""
    });
    // fetch fresh profile when page loads
    (async () => {
      setLoading(true);
      try {
        const res = await fetchProfile(); // should update context.user
        if (res && (res.user || res)) {
          const dataUser = res.user || res;
          setForm({
            name: dataUser.name || "",
            email: dataUser.email || "",
            bio: dataUser.bio || ""
          });
        }
      } catch (err) {
        // ignore — fetchProfile should handle errors
      } finally {
        setLoading(false);
      }
    })();
    // eslint-disable-next-line
  }, []);

  const handleChange = (e) => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setLoading(true);
    try {
      // adjust endpoint if your backend uses e.g. /api/user or /api/profile
      const res = await authFetch("/api/auth/me", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data?.message || "Update failed");

      // update context
      updateUser(data.user || data);
      setSuccess("Profile updated");
      setEditing(false);
    } catch (err) {
      setError(err.message || "Update failed");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    if (logout) logout();
    navigate("/login");
  };

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-md p-6">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">Your Profile</h1>
        <div className="space-x-2">
          <button onClick={() => setEditing(s => !s)} className="px-3 py-1 bg-blue-50 text-blue-600 rounded">
            {editing ? "Cancel" : "Edit"}
          </button>
          <button onClick={handleLogout} className="px-3 py-1 bg-red-50 text-red-600 rounded">Logout</button>
        </div>
      </div>

      {error && <div className="text-red-600 mb-3">{error}</div>}
      {success && <div className="text-green-600 mb-3">{success}</div>}

      {loading && !editing ? (
        <div className="p-4 text-gray-600">Loading...</div>
      ) : (
        <>
          {!editing ? (
            <div>
              <p className="text-sm text-gray-600 mb-2"><strong>Name:</strong> {user?.name || '-'}</p>
              <p className="text-sm text-gray-600 mb-2"><strong>Email:</strong> {user?.email || '-'}</p>
              <p className="text-sm text-gray-600 mb-2"><strong>Bio:</strong> {user?.bio || '-'}</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm text-gray-700">Name</label>
                <input name="name" value={form.name} onChange={handleChange} className="w-full px-4 py-2 border rounded" />
              </div>

              <div>
                <label className="block text-sm text-gray-700">Email</label>
                <input name="email" type="email" value={form.email} onChange={handleChange} className="w-full px-4 py-2 border rounded" />
              </div>

              <div>
                <label className="block text-sm text-gray-700">Bio</label>
                <textarea name="bio" value={form.bio} onChange={handleChange} rows={4} className="w-full px-4 py-2 border rounded" />
              </div>

              <div className="flex items-center space-x-2">
                <button type="submit" disabled={loading} className="px-4 py-2 bg-blue-600 text-white rounded">
                  {loading ? 'Saving...' : 'Save changes'}
                </button>
                <button type="button" onClick={() => setEditing(false)} className="px-4 py-2 bg-gray-100 rounded">Cancel</button>
              </div>
            </form>
          )}
        </>
      )}
    </div>
  );
};

export default Profile;
