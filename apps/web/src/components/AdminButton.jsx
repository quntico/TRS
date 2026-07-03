import React, { useState } from 'react';
import { Settings } from 'lucide-react';
import { useAdminAuth } from '@/hooks/useAdminAuth';
import AdminDashboard from './AdminDashboard';

export default function AdminButton() {
  const { isAuthenticated } = useAdminAuth();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-md bg-black/50 border border-gray-800 hover:bg-gray-800 hover:border-[#B6F21A]/50 transition-all duration-200 text-xs font-medium text-gray-300"
        title="Admin Panel"
      >
        <Settings className="w-4 h-4" />
        <span>Admin</span>
        {isAuthenticated && <span className="w-2 h-2 rounded-full bg-[#B6F21A] ml-1" />}
      </button>

      {isOpen && (
        <AdminDashboard 
          onClose={() => {
            setIsOpen(false);
            window.location.reload();
          }} 
        />
      )}
    </>
  );
}
