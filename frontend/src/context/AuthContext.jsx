// import React, { createContext, useContext, useState, useEffect } from "react";
// import api from "../utils/axios";

// export const AuthContext = createContext();

// export function useAuth() {
//   return useContext(AuthContext);
// }

// export function AuthProvider({ children }) {
//   // Vite env: use VITE_ prefix
//   const API_BASE = import.meta.env.VITE_API_URL || ""; 

//   const [user, setUser] = useState(() => {
//     try {
//       const raw = localStorage.getItem("auth_user");
//       return raw ? JSON.parse(raw) : null;
//     } catch {
//       return null;
//     }
//   });

//   const [token, setToken] = useState(() => localStorage.getItem("auth_token") || null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     setLoading(false);
//   }, []);

//   // persist token & user
//   useEffect(() => {
//     if (token) localStorage.setItem("auth_token", token);
//     else localStorage.removeItem("auth_token");
//   }, [token]);

//   useEffect(() => {
//     if (user) localStorage.setItem("auth_user", JSON.stringify(user));
//     else localStorage.removeItem("auth_user");
//   }, [user]);

//   // wrapper for auth fetch
//   const authFetch = (url, opts = {}) => {
//     const headers = { ...(opts.headers || {}) };
//     if (token) headers["Authorization"] = `Bearer ${token}`;
//     const fetchOpts = { ...opts, headers };
//     return fetch(`${API_BASE}${url}`, fetchOpts);
//   };

//   // mock create user (dev fallback)
//   const _mockCreateUser = ({ email, password, firstName = "", lastName = "" }) => {
//     const newUser = {
//       id: Math.random().toString(36).substr(2, 9),
//       email,
//       firstName,
//       lastName,
//       name: `${firstName} ${lastName}`.trim() || email.split("@")[0],
//       bio: ""
//     };
//     localStorage.setItem("auth_user", JSON.stringify(newUser));
//     localStorage.setItem("auth_token", "mock-token-" + newUser.id);
//     return { user: newUser, token: localStorage.getItem("auth_token") };
//   };

//   // LOGIN
//   const login = async ({ email, password }) => {
//     setLoading(true);
//     try {
//       if (API_BASE) {
//         const res = await api.post(`${API_BASE}/users/login`, { email, password });
//         const data = res.data;
//         setToken(data.token || data.accessToken || null);
//         setUser(data.user || data);
//         setLoading(false);
//         return { ok: true, data };
//       } else {
//         const { user: u, token: t } = _mockCreateUser({ email, firstName: "Demo", lastName: "User" });
//         setToken(t);
//         setUser(u);
//         setLoading(false);
//         return { ok: true, data: { user: u, token: t } };
//       }
//     } catch (err) {
//       setLoading(false);
//       return { ok: false, error: err.message || String(err) };
//     }
//   };

//   // SIGNUP
//   const signup = async ({ email, password, firstName = "", lastName = "" }) => {
//     setLoading(true);
//     try {
//       if (API_BASE) {
//         const res = await api.post(`${API_BASE}/users/signup`, { email, password, firstName, lastName });
//         const data = res.data;
//         if (data.token || data.accessToken) {
//           const tok = data.token || data.accessToken;
//           setToken(tok);
//           setUser(data.user || data);
//         }
//         setLoading(false);
//         return { ok: true, data };
//       } else {
//         const { user: u, token: t } = _mockCreateUser({ email, password, firstName, lastName });
//         setToken(t);
//         setUser(u);
//         setLoading(false);
//         return { ok: true, data: { user: u, token: t } };
//       }
//     } catch (err) {
//       setLoading(false);
//       return { ok: false, error: err.message || String(err) };
//     }
//   };

//   // LOGOUT
//   const logout = async () => {
//     if (API_BASE) {
//       try {
//         await api.post(`${API_BASE}/users/logout`, {}, { headers: token ? { Authorization: `Bearer ${token}` } : {} });
//       } catch {}
//     }
//     setToken(null);
//     setUser(null);
//     localStorage.removeItem("auth_token");
//     localStorage.removeItem("auth_user");
//   };

//   // fetch profile
//   const fetchProfile = async () => {
//     if (!API_BASE) return user;
//     try {
//       const res = await authFetch("/api/auth/me", { method: "GET" });
//       if (!res.ok) {
//         if (res.status === 401) logout();
//         throw new Error("Failed to fetch profile");
//       }
//       const data = await res.json();
//       const fetchedUser = data.user || data;
//       setUser(fetchedUser);
//       return { user: fetchedUser };
//     } catch {
//       return null;
//     }
//   };

//   // update profile
//   const updateUser = async (updates = {}) => {
//     const next = { ...(user || {}), ...updates };
//     setUser(next);

//     if (!API_BASE) return { ok: true, user: next };

//     try {
//       const res = await authFetch("/api/auth/me", {
//         method: "PUT",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(updates)
//       });
//       const data = await res.json();
//       if (!res.ok) throw new Error(data?.message || "Update failed");
//       const updatedUser = data.user || data;
//       setUser(updatedUser);
//       return { ok: true, user: updatedUser };
//     } catch (err) {
//       await fetchProfile();
//       return { ok: false, error: err.message || String(err) };
//     }
//   };

//   const value = { user, token, loading, login, signup, logout, authFetch, fetchProfile, updateUser };

//   return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>;
// }

/*
import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in on app load
    const token = localStorage.getItem('authToken');
    const userData = localStorage.getItem('user');
    
    if (token && userData) {
      setUser(JSON.parse(userData));
    }
    setLoading(false);
  }, []);

  const login = (userData, tokens) => {
    setUser(userData);
    localStorage.setItem('accessToken', tokens.accessToken);
    localStorage.setItem('refreshToken', tokens.refreshToken);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user');
  };

  const value = {
    user,
    login,
    logout,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
*/


// import React, { createContext, useState, useContext, useEffect } from 'react';

// const AuthContext = createContext();

// export const useAuth = () => useContext(AuthContext);

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     // Get auth info from localStorage
//     const token = localStorage.getItem('authToken');
//     const userData = localStorage.getItem('user');

//     if (token && userData) {
//       try {
//         setUser(JSON.parse(userData));
//       } catch (err) {
//         console.error('Failed to parse user data:', err);
//         localStorage.removeItem('user');
//         localStorage.removeItem('authToken');
//         setUser(null);
//       }
//     }

//     setLoading(false);
//   }, []);

//   const login = (userData, tokens) => {
//     setUser(userData);
//     localStorage.setItem('authToken', tokens.accessToken); // ensure authToken is stored
//     localStorage.setItem('accessToken', tokens.accessToken);
//     localStorage.setItem('refreshToken', tokens.refreshToken || '');
//     localStorage.setItem('user', JSON.stringify(userData));
//   };

//   const logout = () => {
//     setUser(null);
//     localStorage.removeItem('authToken');
//     localStorage.removeItem('accessToken');
//     localStorage.removeItem('refreshToken');
//     localStorage.removeItem('user');
//   };

//   const value = { user, login, logout, loading };

//   return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
// };


import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log('[Auth] initializing from localStorage...');
    const token = localStorage.getItem('authToken');
    const userData = localStorage.getItem('user');

    if (token && userData) {
      try {
        const parsed = JSON.parse(userData);
        setUser(parsed);
        console.log('[Auth] user loaded from localStorage:', parsed);
      } catch (err) {
        console.error('[Auth] failed to parse user from localStorage:', err);
        localStorage.removeItem('user');
        localStorage.removeItem('authToken');
        setUser(null);
      }
    } else {
      console.log('[Auth] no auth token/user in localStorage');
    }
    setLoading(false);
  }, []);

  const login = (userData, tokens = {}) => {
  console.log('[Auth] login() called with:', userData, tokens);

  if (!userData) {
    console.error('[Auth] login called without userData. Aborting.');
    return;
  }

  setUser(userData);
  if (tokens.accessToken) {
    localStorage.setItem('authToken', tokens.accessToken);
    localStorage.setItem('accessToken', tokens.accessToken);
  }
  localStorage.setItem('refreshToken', tokens.refreshToken || '');
  localStorage.setItem('user', JSON.stringify(userData));
  console.log('[Auth] localStorage updated');
};


  const logout = () => {
    console.log('[Auth] logout()');
    setUser(null);
    localStorage.removeItem('authToken');
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user');
  };

  // Optional: keep tabs in sync (multi-tab sign-in/out)
  useEffect(() => {
    const onStorage = (e) => {
      if (e.key === 'user' || e.key === 'authToken') {
        console.log('[Auth] storage event:', e.key, e.newValue);
        const token = localStorage.getItem('authToken');
        const userStr = localStorage.getItem('user');
        if (token && userStr) {
          try {
            setUser(JSON.parse(userStr));
          } catch {
            setUser(null);
          }
        } else {
          setUser(null);
        }
      }
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  const value = { user, login, logout, loading };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
