
import React, { useState } from 'react';
import { LayoutDashboard, Image as ImageIcon, Layers, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAdminAuth } from '@/hooks/useAdminAuth';
import AdminLoginModal from './AdminLoginModal';
import LogoManager from './LogoManager';
import HeroMediaManager from './HeroMediaManager';
import SectionBackgroundsList from './SectionBackgroundsList';

export default function AdminDashboard({ onClose }) {
  const { isAuthenticated, logout } = useAdminAuth();
  const [activeTab, setActiveTab] = useState('logo');

  if (!isAuthenticated) {
    return <AdminLoginModal onClose={onClose} />;
  }

  const tabs = [
    { id: 'logo', label: 'Logo Management', icon: ImageIcon },
    { id: 'hero', label: 'Hero Section', icon: LayoutDashboard },
    { id: 'sections', label: 'Section Backgrounds', icon: Layers },
  ];

  return (
    <div className="fixed inset-0 z-[100] bg-[#0a0a0a] hidden md:flex flex-col">
      <header className="h-16 border-b border-gray-800 bg-[#141414] flex items-center justify-between px-6">
        <div className="flex items-center gap-4">
          <div className="text-[#B6F21A] font-bold text-xl tracking-tight">TRS Admin</div>
        </div>
        <div className="flex items-center gap-4">
          <Button variant="ghost" className="text-gray-400 hover:text-white" onClick={onClose}>
            Back to Site
          </Button>
          <Button variant="outline" className="border-gray-700 text-white hover:bg-gray-800" onClick={logout}>
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        <aside className="w-64 border-r border-gray-800 bg-[#141414] p-4 flex flex-col gap-2">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 text-sm font-medium ${
                activeTab === tab.id
                  ? 'bg-[#B6F21A]/10 text-[#B6F21A]'
                  : 'text-gray-400 hover:bg-white/5 hover:text-white'
              }`}
            >
              <tab.icon className="w-5 h-5" />
              {tab.label}
            </button>
          ))}
        </aside>

        <main className="flex-1 overflow-y-auto p-8">
          <div className="max-w-5xl mx-auto">
            {activeTab === 'logo' && <LogoManager />}
            {activeTab === 'hero' && <HeroMediaManager />}
            {activeTab === 'sections' && <SectionBackgroundsList />}
          </div>
        </main>
      </div>
    </div>
  );
}
