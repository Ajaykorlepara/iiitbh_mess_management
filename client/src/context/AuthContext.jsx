import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem('iiit_mess_user');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { return null; }
    }
    // Default demo student
    return {
      id: "usr_student_1",
      rollNumber: "B423032",
      name: "Ajay Korlepara",
      email: "b423032@iiit-bh.ac.in",
      role: "student",
      phone: "+91 98765 43210",
      hostel: "Kharavela Hostel (KHR-A)",
      room: "A-204",
      messWing: "Central Mess 1",
      dietaryPreference: "Non-Veg",
      walletBalance: 450,
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80"
    };
  });

  const [demoUsers, setDemoUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetch('/api/auth/demo-users')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) setDemoUsers(data);
      })
      .catch(err => console.log('Using local demo users fallback'));
  }, []);

  const switchUser = (user) => {
    setCurrentUser(user);
    localStorage.setItem('iiit_mess_user', JSON.stringify(user));
  };

  const loginWithRollNumber = async (identifier) => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ identifier })
      });
      const data = await res.json();
      if (data.user) {
        switchUser(data.user);
        return { success: true };
      }
      return { success: false, error: data.error || 'Login failed' };
    } catch (err) {
      return { success: false, error: err.message };
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('iiit_mess_user');
  };

  return (
    <AuthContext.Provider value={{
      currentUser,
      demoUsers,
      switchUser,
      loginWithRollNumber,
      logout,
      isAdmin: currentUser?.role === 'admin' || currentUser?.role === 'committee',
      isStudent: currentUser?.role === 'student'
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
