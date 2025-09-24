// import React, { useEffect, useState } from "react";
// import api from "../utils/axios";

// const Profile = () => {
//   const [user, setUser] = useState({ firstName: "", lastName: "", email: "" });
//   const [password, setPassword] = useState({ current: "", new: "", confirm: "" });
//   const [isEditing, setIsEditing] = useState(false);
//   const [loading, setLoading] = useState(true);
//   const [message, setMessage] = useState("");

//   // Fetch user data
//   useEffect(() => {
//     const fetchUserData = async () => {
//       try {
//         setLoading(true);
//         const response = await api.get("/users/me");
//         setUser(response.data.data);
//       } catch (error) {
//         console.error("Error fetching user data:", error);
//         setMessage("Error loading profile data");
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchUserData();
//   }, []);

//   // Save profile changes
//   const handleSaveProfile = async () => {
//     try {
//       setLoading(true);
//       const response = await api.put("/updateMe", user);
//       setMessage(response.data.message || "Profile updated successfully!");
//       setIsEditing(false);
//     } catch (error) {
//       console.error("Error updating profile:", error);
//       const backendMessage = error.response?.data?.message || "Error updating profile";
//       setMessage(backendMessage);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Change password
//   const handlePasswordChange = async () => {
//     if (!password.current) {
//       setMessage("Please enter your current password");
//       return;
//     }
//     if (!password.new || !password.confirm) {
//       setMessage("Please enter your new password");
//       return;
//     }
//     if (password.new !== password.confirm) {
//       setMessage("New passwords don't match!");
//       return;
//     }

//     try {
//       setLoading(true);
//       const response = await api.put("/users/change-password", {
//         currentPassword: password.current,
//         newPassword: password.new
//       });
//       setMessage(response.data.message || "Password changed successfully!");
//       setPassword({ current: "", new: "", confirm: "" });
//     } catch (error) {
//       console.error("Error changing password:", error);
//       const backendMessage = error.response?.data?.message || "Error changing password";
//       setMessage(backendMessage);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Logout
//   const handleLogout = async () => {
//     if (window.confirm("Are you sure you want to logout?")) {
//       try {
//         await api.post("/logout");
//         localStorage.removeItem("token");
//         window.location.href = "/login";
//       } catch (error) {
//         console.error("Logout error:", error);
//       }
//     }
//   };

//   // Delete account
//   const handleDeleteAccount = async () => {
//     if (window.confirm("This action cannot be undone. Delete your account?")) {
//       try {
//         await api.delete("/deleteMe");
//         localStorage.removeItem("token");
//         window.location.href = "/";
//       } catch (error) {
//         console.error("Error deleting account:", error);
//         setMessage("Error deleting account");
//       }
//     }
//   };

//   if (loading) {
//     return (
//       <div className="h-screen bg-gray-50 flex items-center justify-center">
//         <div className="text-center">
//           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
//           <p className="mt-4 text-gray-600">Loading profile...</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="h-screen flex flex-col bg-gray-50">
//       {/* Header */}
//       <header className="bg-white shadow-sm border-b">
//         <div className="px-6 py-4 flex justify-between items-center">
//           <h1 className="text-2xl font-bold text-gray-900">YourWebsiteName</h1>
//           <button className="text-blue-600 font-medium">Profile</button>
//         </div>
//       </header>

//       {/* Message Alert */}
//       {message && (
//         <div className="p-4 bg-gray-50">
//           <div
//             className={`p-4 rounded-lg ${
//               message.toLowerCase().includes("error") ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"
//             }`}
//           >
//             {message}
//             <button onClick={() => setMessage("")} className="float-right font-bold">
//               ×
//             </button>
//           </div>
//         </div>
//       )}

//       {/* Main Content */}
//       <div className="flex flex-1 overflow-hidden">
//         {/* Sidebar */}
//         <div className="w-1/3 bg-white p-6 border-r flex flex-col items-center">
//           <div className="w-24 h-24 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-3xl font-bold mb-4">
//             {user.firstName?.charAt(0) || "U"}
//             {user.lastName?.charAt(0) || ""}
//           </div>
//           <h2 className="text-xl font-semibold text-gray-900">{user.firstName} {user.lastName}</h2>
//           <p className="text-gray-600 mt-1">{user.email}</p>

//           <div className="mt-6 space-y-3 w-full">
//             <button
//               onClick={() => setIsEditing(!isEditing)}
//               disabled={loading}
//               className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-400"
//             >
//               {loading ? "Loading..." : isEditing ? "Cancel Editing" : "Edit Profile"}
//             </button>

//             <button
//               onClick={handleLogout}
//               disabled={loading}
//               className="w-full px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors disabled:bg-gray-100"
//             >
//               Log out
//             </button>
//           </div>
//         </div>

//         {/* Main Section */}
//         <div className="w-2/3 bg-white p-6 overflow-auto">
//           {/* Personal Info */}
//           <div className="mb-8">
//             <h2 className="text-lg font-semibold text-gray-900 mb-4">Personal Information</h2>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">FIRST NAME</label>
//                 {isEditing ? (
//                   <input
//                     type="text"
//                     value={user.firstName}
//                     onChange={(e) => setUser({ ...user, firstName: e.target.value })}
//                     className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                     disabled={loading}
//                   />
//                 ) : (
//                   <p className="px-3 py-2 bg-gray-50 rounded-lg text-gray-900">{user.firstName || "Not set"}</p>
//                 )}
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">LAST NAME</label>
//                 {isEditing ? (
//                   <input
//                     type="text"
//                     value={user.lastName}
//                     onChange={(e) => setUser({ ...user, lastName: e.target.value })}
//                     className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                     disabled={loading}
//                   />
//                 ) : (
//                   <p className="px-3 py-2 bg-gray-50 rounded-lg text-gray-900">{user.lastName || "Not set"}</p>
//                 )}
//               </div>

//               <div className="md:col-span-2">
//                 <label className="block text-sm font-medium text-gray-700 mb-2">EMAIL</label>
//                 {isEditing ? (
//                   <input
//                     type="email"
//                     value={user.email}
//                     onChange={(e) => setUser({ ...user, email: e.target.value })}
//                     className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                     disabled={loading}
//                   />
//                 ) : (
//                   <p className="px-3 py-2 bg-gray-50 rounded-lg text-gray-900">{user.email || "Not set"}</p>
//                 )}
//               </div>
//             </div>

//             {isEditing && (
//               <button
//                 onClick={handleSaveProfile}
//                 disabled={loading}
//                 className="mt-4 px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:bg-gray-400"
//               >
//                 {loading ? "Saving..." : "Save Changes"}
//               </button>
//             )}
//           </div>

//           {/* Change Password */}
//           <div className="mb-8">
//             <h2 className="text-lg font-semibold text-gray-900 mb-4">Change Password</h2>
//             <div className="space-y-4 max-w-md">
//               <input
//                 type="password"
//                 placeholder="Current Password"
//                 value={password.current}
//                 onChange={(e) => setPassword({ ...password, current: e.target.value })}
//                 className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 disabled={loading}
//               />
//               <input
//                 type="password"
//                 placeholder="New Password"
//                 value={password.new}
//                 onChange={(e) => setPassword({ ...password, new: e.target.value })}
//                 className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 disabled={loading}
//               />
//               <input
//                 type="password"
//                 placeholder="Confirm New Password"
//                 value={password.confirm}
//                 onChange={(e) => setPassword({ ...password, confirm: e.target.value })}
//                 className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 disabled={loading}
//               />
//               <button
//                 onClick={handlePasswordChange}
//                 disabled={loading}
//                 className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-400"
//               >
//                 {loading ? "Changing..." : "Change Password"}
//               </button>
//             </div>
//           </div>

//           {/* Delete Account */}
//           <div className="border-t pt-6">
//             <h2 className="text-lg font-semibold text-red-700 mb-2">Danger Zone</h2>
//             <button
//               onClick={handleDeleteAccount}
//               disabled={loading}
//               className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:bg-gray-400"
//             >
//               Delete account
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Profile;




import React, { useEffect, useState } from "react";
import api from "../utils/axios";

const Profile = () => {
  const [user, setUser] = useState({ firstName: "", lastName: "", email: "" });
  const [password, setPassword] = useState({ current: "", new: "", confirm: "" });
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  // Fetch user data
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true);
        const response = await api.get("/users/me");
        setUser(response.data.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
        setMessage("Error loading profile data");
      } finally {
        setLoading(false);
      }
    };
    fetchUserData();
  }, []);

  // Save profile changes
  const handleSaveProfile = async () => {
    try {
      setLoading(true);
      const response = await api.put("/updateMe", user);
      setMessage(response.data.message || "Profile updated successfully!");
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating profile:", error);
      const backendMessage = error.response?.data?.message || "Error updating profile";
      setMessage(backendMessage);
    } finally {
      setLoading(false);
    }
  };

  // Change password
  const handlePasswordChange = async () => {
    if (!password.current) {
      setMessage("Please enter your current password");
      return;
    }
    if (!password.new || !password.confirm) {
      setMessage("Please enter your new password");
      return;
    }
    if (password.new !== password.confirm) {
      setMessage("New passwords don't match!");
      return;
    }

    try {
      setLoading(true);
      const response = await api.put("/users/change-password", {
        currentPassword: password.current,
        newPassword: password.new
      });
      setMessage(response.data.message || "Password changed successfully!");
      setPassword({ current: "", new: "", confirm: "" });
    } catch (error) {
      console.error("Error changing password:", error);
      const backendMessage = error.response?.data?.message || "Error changing password";
      setMessage(backendMessage);
    } finally {
      setLoading(false);
    }
  };

  // Logout
  const handleLogout = async () => {
    if (window.confirm("Are you sure you want to logout?")) {
      try {
        await api.post("/users/logout");
        localStorage.removeItem("token");
        window.location.href = "/login";
      } catch (error) {
        console.error("Logout error:", error);
      }
    }
  };

  // Delete account
  const handleDeleteAccount = async () => {
    if (window.confirm("This action cannot be undone. Delete your account?")) {
      try {
        await api.delete("/users/deleteMe");
        localStorage.removeItem("token");
        window.location.href = "/";
      } catch (error) {
        console.error("Error deleting account:", error);
        setMessage("Error deleting account");
      }
    }
  };

  if (loading) {
    return (
      <div className="h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col bg-gradient-to-br from-blue-50 to-indigo-50">
      {/* Header */}
      <header className="bg-white shadow-md border-b">
        <div className="px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">WebLoom</h1>
          <button className="text-blue-600 font-medium">Profile</button>
        </div>
      </header>

      {/* Message Alert */}
      {message && (
        <div className="p-4">
          <div
            className={`p-4 rounded-lg shadow-sm ${
              message.toLowerCase().includes("error")
                ? "bg-red-100 text-red-700"
                : "bg-green-100 text-green-700"
            }`}
          >
            {message}
            <button onClick={() => setMessage("")} className="float-right font-bold">
              ×
            </button>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <div className="w-1/3 p-6 bg-white rounded-tr-xl shadow-lg border-r flex flex-col items-center">
          <div className="w-24 h-24 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-3xl font-bold mb-4 shadow-lg">
            {user.firstName?.charAt(0) || "U"}
            {user.lastName?.charAt(0) || ""}
          </div>
          <h2 className="text-xl font-semibold text-gray-900">{user.firstName} {user.lastName}</h2>
          <p className="text-gray-600 mt-1">{user.email}</p>

          <div className="mt-6 space-y-3 w-full">
            <button
              onClick={() => setIsEditing(!isEditing)}
              disabled={loading}
              className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 shadow-md transition-colors disabled:bg-gray-400"
            >
              {loading ? "Loading..." : isEditing ? "Cancel Editing" : "Edit Profile"}
            </button>

            <button
              onClick={handleLogout}
              disabled={loading}
              className="w-full px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 shadow-sm transition-colors disabled:bg-gray-100"
            >
              Log out
            </button>
          </div>
        </div>

        {/* Main Section */}
        <div className="w-2/3 p-6 overflow-auto">
          {/* Personal Info Card */}
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Personal Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">FIRST NAME</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={user.firstName}
                    onChange={(e) => setUser({ ...user, firstName: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                ) : (
                  <p className="px-3 py-2 bg-blue-50 rounded-lg text-gray-900">{user.firstName || "Not set"}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">LAST NAME</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={user.lastName}
                    onChange={(e) => setUser({ ...user, lastName: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                ) : (
                  <p className="px-3 py-2 bg-blue-50 rounded-lg text-gray-900">{user.lastName || "Not set"}</p>
                )}
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">EMAIL</label>
                {isEditing ? (
                  <input
                    type="email"
                    value={user.email}
                    onChange={(e) => setUser({ ...user, email: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                ) : (
                  <p className="px-3 py-2 bg-blue-50 rounded-lg text-gray-900">{user.email || "Not set"}</p>
                )}
              </div>
            </div>

            {isEditing && (
              <button
                onClick={handleSaveProfile}
                className="mt-4 px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 shadow-md transition-colors"
              >
                Save Changes
              </button>
            )}
          </div>

          {/* Change Password Card */}
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Change Password</h2>
            <div className="space-y-4 max-w-md">
              <input
                type="password"
                placeholder="Current Password"
                value={password.current}
                onChange={(e) => setPassword({ ...password, current: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="password"
                placeholder="New Password"
                value={password.new}
                onChange={(e) => setPassword({ ...password, new: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="password"
                placeholder="Confirm New Password"
                value={password.confirm}
                onChange={(e) => setPassword({ ...password, confirm: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={handlePasswordChange}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 shadow-md transition-colors"
              >
                Change Password
              </button>
            </div>
          </div>

          {/* Danger Zone Card */}
          <div className="bg-white rounded-xl shadow-lg p-6 border-t">
            <h2 className="text-lg font-semibold text-red-700 mb-4">Danger Zone</h2>
            <button
              onClick={handleDeleteAccount}
              className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 shadow-md transition-colors"
            >
              Delete account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
