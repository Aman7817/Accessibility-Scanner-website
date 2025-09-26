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



// import React, { useEffect, useState, useRef } from "react";
// import api from "../utils/axios";

// // Accessible Profile component with WCAG-friendly structure
// // TailwindCSS used for styling (sr-only for screen-reader-only content)

// export default function Profile() {
//   const [user, setUser] = useState({ firstName: "", lastName: "", email: "" });
//   const [password, setPassword] = useState({ current: "", new: "", confirm: "" });
//   const [isEditing, setIsEditing] = useState(false);
//   const [loading, setLoading] = useState(true);
//   const [message, setMessage] = useState("");
//   const [messageType, setMessageType] = useState("info"); // 'info' | 'success' | 'error'

//   // confirmation modal state (used for logout / delete)
//   const [confirmOpen, setConfirmOpen] = useState(false);
//   const [confirmAction, setConfirmAction] = useState(null);
//   const confirmRef = useRef(null);

//   // Fetch user data
//   useEffect(() => {
//     let mounted = true;
//     const fetchUserData = async () => {
//       try {
//         setLoading(true);
//         const response = await api.get("/users/me");
//         if (mounted) setUser(response.data.data || {});
//       } catch (error) {
//         console.error("Error fetching user data:", error);
//         setMessageType("error");
//         setMessage("Error loading profile data");
//       } finally {
//         if (mounted) setLoading(false);
//       }
//     };
//     fetchUserData();
//     return () => (mounted = false);
//   }, []);

//   // Accessible message setter
//   const showMessage = (text, type = "info") => {
//     setMessageType(type);
//     setMessage(text);
//     // auto-clear success messages after a while
//     if (type === "success") {
//       setTimeout(() => setMessage(""), 4000);
//     }
//   };

//   // Save profile changes
//   const handleSaveProfile = async () => {
//     try {
//       setLoading(true);
//       const response = await api.put("/updateMe", user);
//       showMessage(response.data.message || "Profile updated successfully!", "success");
//       setIsEditing(false);
//     } catch (error) {
//       console.error("Error updating profile:", error);
//       const backendMessage = error.response?.data?.message || "Error updating profile";
//       showMessage(backendMessage, "error");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Change password
//   const handlePasswordChange = async () => {
//     if (!password.current) return showMessage("Please enter your current password", "error");
//     if (!password.new || !password.confirm) return showMessage("Please enter your new password", "error");
//     if (password.new !== password.confirm) return showMessage("New passwords don't match!", "error");

//     try {
//       setLoading(true);
//       const response = await api.put("/users/change-password", {
//         currentPassword: password.current,
//         newPassword: password.new,
//       });
//       showMessage(response.data.message || "Password changed successfully!", "success");
//       setPassword({ current: "", new: "", confirm: "" });
//     } catch (error) {
//       console.error("Error changing password:", error);
//       const backendMessage = error.response?.data?.message || "Error changing password";
//       showMessage(backendMessage, "error");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Confirm modal helpers
//   const openConfirm = (actionFn) => {
//     setConfirmAction(() => actionFn);
//     setConfirmOpen(true);
//   };
//   const closeConfirm = () => {
//     setConfirmOpen(false);
//     setConfirmAction(null);
//   };

//   useEffect(() => {
//     if (confirmOpen && confirmRef.current) {
//       confirmRef.current.focus();
//     }
//   }, [confirmOpen]);

//   // Logout
//   const handleLogout = async () => {
//     try {
//       await api.post("/users/logout");
//       localStorage.removeItem("token");
//       window.location.href = "/login";
//     } catch (error) {
//       console.error("Logout error:", error);
//       showMessage("Logout failed", "error");
//     }
//   };

//   // Delete account
//   const handleDeleteAccount = async () => {
//     try {
//       await api.delete("/users/deleteMe");
//       localStorage.removeItem("token");
//       window.location.href = "/";
//     } catch (error) {
//       console.error("Error deleting account:", error);
//       showMessage("Error deleting account", "error");
//     }
//   };

//   if (loading) {
//     return (
//       <div className="h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center">
//         <div className="text-center" aria-live="polite">
//           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto" aria-hidden="true"></div>
//           <p className="mt-4 text-gray-600">Loading profile...</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 to-indigo-50">
//       {/* Skip link for keyboard users */}
//       <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 bg-white p-2 rounded shadow">Skip to content</a>

//       {/* Header */}
//       <header className="bg-white shadow-md border-b" role="banner">
//         <div className="px-6 py-4 flex justify-between items-center">
//           <h1 className="text-2xl font-bold text-gray-900">WebLoom</h1>
//           <nav aria-label="Profile navigation">
//             <button className="text-blue-600 font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 rounded" onClick={() => document.getElementById('main').scrollIntoView()}>
//               Profile
//             </button>
//           </nav>
//         </div>
//       </header>

//       {/* Live region for messages */}
//       <div aria-live="polite" aria-atomic="true" className="mx-6 mt-4">
//         {message && (
//           <div
//             role={messageType === "error" ? "alert" : "status"}
//             className={`p-4 rounded-lg shadow-sm flex items-start justify-between max-w-3xl ${
//               messageType === "error" ? "bg-red-100 text-red-800" : "bg-green-100 text-green-800"
//             }`}
//           >
//             <div className="flex-1">{message}</div>
//             <button onClick={() => setMessage("")} className="ml-4 font-bold focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 rounded" aria-label="Dismiss message">×</button>
//           </div>
//         )}
//       </div>

//       {/* Main Content */}
//       <main id="main" className="flex-1 overflow-hidden mx-6 my-4" role="main">
//         <div className="flex flex-col lg:flex-row gap-6">
//           {/* Sidebar */}
//           <aside className="lg:w-1/3 bg-white rounded-tr-xl shadow-lg border p-6 flex flex-col items-center" aria-label="User sidebar">
//             <div className="w-24 h-24 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-3xl font-bold mb-4 shadow-lg" aria-hidden="true">
//               <span aria-hidden="true">{(user.firstName?.charAt(0) || "U") + (user.lastName?.charAt(0) || "")}</span>
//             </div>

//             <h2 className="text-xl font-semibold text-gray-900">{user.firstName} {user.lastName}</h2>
//             <p className="text-gray-600 mt-1">{user.email}</p>

//             <div className="mt-6 space-y-3 w-full">
//               <button
//                 onClick={() => setIsEditing(!isEditing)}
//                 disabled={loading}
//                 type="button"
//                 className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 shadow-md transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
//               >
//                 {isEditing ? "Cancel Editing" : "Edit Profile"}
//               </button>

//               <button
//                 type="button"
//                 onClick={() => openConfirm(handleLogout)}
//                 disabled={loading}
//                 className="w-full px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 shadow-sm transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
//               >
//                 Log out
//               </button>
//             </div>
//           </aside>

//           {/* Main Section */}
//           <section className="lg:w-2/3 overflow-auto">
//             {/* Personal Info Card */}
//             <form className="bg-white rounded-xl shadow-lg p-6 mb-8" onSubmit={(e) => { e.preventDefault(); handleSaveProfile(); }}>
//               <h2 className="text-lg font-semibold text-gray-900 mb-4">Personal Information</h2>

//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <div>
//                   <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">FIRST NAME</label>
//                   {isEditing ? (
//                     <input
//                       id="firstName"
//                       name="firstName"
//                       type="text"
//                       value={user.firstName}
//                       onChange={(e) => setUser({ ...user, firstName: e.target.value })}
//                       className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                       aria-required="true"
//                     />
//                   ) : (
//                     <p className="px-3 py-2 bg-blue-50 rounded-lg text-gray-900">{user.firstName || "Not set"}</p>
//                   )}
//                 </div>

//                 <div>
//                   <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">LAST NAME</label>
//                   {isEditing ? (
//                     <input
//                       id="lastName"
//                       name="lastName"
//                       type="text"
//                       value={user.lastName}
//                       onChange={(e) => setUser({ ...user, lastName: e.target.value })}
//                       className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                     />
//                   ) : (
//                     <p className="px-3 py-2 bg-blue-50 rounded-lg text-gray-900">{user.lastName || "Not set"}</p>
//                   )}
//                 </div>

//                 <div className="md:col-span-2">
//                   <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">EMAIL</label>
//                   {isEditing ? (
//                     <input
//                       id="email"
//                       name="email"
//                       type="email"
//                       value={user.email}
//                       onChange={(e) => setUser({ ...user, email: e.target.value })}
//                       className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                       aria-describedby="email-help"
//                     />
//                   ) : (
//                     <p className="px-3 py-2 bg-blue-50 rounded-lg text-gray-900">{user.email || "Not set"}</p>
//                   )}
//                   <p id="email-help" className="sr-only">We'll only use this email for account related communication.</p>
//                 </div>
//               </div>

//               {isEditing && (
//                 <div className="mt-4 flex gap-3">
//                   <button type="submit" className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 shadow-md focus:outline-none focus:ring-2 focus:ring-green-500">Save Changes</button>
//                   <button type="button" onClick={() => setIsEditing(false)} className="px-6 py-2 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300">Cancel</button>
//                 </div>
//               )}
//             </form>

//             {/* Change Password Card */}
//             <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
//               <h2 className="text-lg font-semibold text-gray-900 mb-4">Change Password</h2>
//               <div className="space-y-4 max-w-md">
//                 <label className="sr-only" htmlFor="currentPassword">Current Password</label>
//                 <input
//                   id="currentPassword"
//                   type="password"
//                   placeholder="Current Password"
//                   value={password.current}
//                   onChange={(e) => setPassword({ ...password, current: e.target.value })}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   aria-required="true"
//                 />

//                 <label className="sr-only" htmlFor="newPassword">New Password</label>
//                 <input
//                   id="newPassword"
//                   type="password"
//                   placeholder="New Password"
//                   value={password.new}
//                   onChange={(e) => setPassword({ ...password, new: e.target.value })}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   aria-required="true"
//                 />

//                 <label className="sr-only" htmlFor="confirmPassword">Confirm Password</label>
//                 <input
//                   id="confirmPassword"
//                   type="password"
//                   placeholder="Confirm New Password"
//                   value={password.confirm}
//                   onChange={(e) => setPassword({ ...password, confirm: e.target.value })}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   aria-required="true"
//                 />

//                 <button onClick={handlePasswordChange} className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500">Change Password</button>
//               </div>
//             </div>

//             {/* Danger Zone Card */}
//             <div className="bg-white rounded-xl shadow-lg p-6 border-t">
//               <h2 className="text-lg font-semibold text-red-700 mb-4">Danger Zone</h2>
//               <div className="flex gap-3">
//                 <button
//                   onClick={() => openConfirm(handleDeleteAccount)}
//                   className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 shadow-md focus:outline-none focus:ring-2 focus:ring-red-500"
//                 >
//                   Delete account
//                 </button>

//                 <button
//                   onClick={() => openConfirm(handleLogout)}
//                   className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 >
//                   Log out
//                 </button>
//               </div>
//             </div>
//           </section>
//         </div>
//       </main>

//       {/* Accessible Confirm Modal */}
//       {confirmOpen && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center" role="dialog" aria-modal="true" aria-labelledby="confirmTitle">
//           <div className="fixed inset-0 bg-black/40" onClick={closeConfirm} aria-hidden="true"></div>

//           <div className="bg-white rounded-lg shadow-2xl max-w-lg mx-4 p-6 z-10">
//             <h3 id="confirmTitle" className="text-lg font-semibold">Are you sure?</h3>
//             <p className="mt-2 text-sm text-gray-600">This action cannot be undone. Please confirm.</p>

//             <div className="mt-4 flex gap-3 justify-end">
//               <button ref={confirmRef} onClick={() => { confirmAction && confirmAction(); closeConfirm(); }} className="px-4 py-2 bg-red-600 text-white rounded focus:outline-none focus:ring-2 focus:ring-red-500">Yes, continue</button>
//               <button onClick={closeConfirm} className="px-4 py-2 bg-gray-100 rounded focus:outline-none focus:ring-2 focus:ring-gray-300">Cancel</button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }
