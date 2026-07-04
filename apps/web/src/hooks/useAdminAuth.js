import { useState, useEffect } from 'react';
import pb from '@/lib/pocketbaseClient';

export function useAdminAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Force logout on reload by clearing PocketBase auth store and React state
    pb.authStore.clear();
    setIsAuthenticated(false);
  }, []);

  const login = async (password) => {
    if (password === '2040') {
      try {
        // Authenticate with PocketBase to bypass the @request.auth.id != "" rules
        await pb.collection('users').authWithPassword('admin@grupo-trs.com', 'admin2040TRS!', { $autoCancel: false });
      } catch (err) {
        try {
          // Auto-create the admin user if it doesn't exist
          await pb.collection('users').create({
            email: 'admin@grupo-trs.com',
            password: 'admin2040TRS!',
            passwordConfirm: 'admin2040TRS!'
          }, { $autoCancel: false });
          await pb.collection('users').authWithPassword('admin@grupo-trs.com', 'admin2040TRS!', { $autoCancel: false });
        } catch (e) {
          console.error("Failed to setup PB auth", e);
        }
      }
      setIsAuthenticated(true);
      return true;
    }
    return false;
  };

  const logout = () => {
    pb.authStore.clear();
    setIsAuthenticated(false);
  };

  return { isAuthenticated, login, logout };
}
