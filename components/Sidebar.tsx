'use client'

import { Users, Calendar, FileText, Settings, LogOut, BarChart3 } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface SidebarProps {
  currentPage: string
  onNavigate: (page: string) => void
  userEmail?: string
}

export default function Sidebar({ currentPage, onNavigate, userEmail }: SidebarProps) {
  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated')
    localStorage.removeItem('userEmail')
    window.location.href = '/'
  }

  const menuItems = [
    {
      id: 'patients',
      label: 'Patients',
      icon: Users,
    },
    {
      id: 'appointments',
      label: 'Appointments',
      icon: Calendar,
    },
    {
      id: 'reports',
      label: 'Reports',
      icon: BarChart3,
    },
    {
      id: 'documents',
      label: 'Documents',
      icon: FileText,
    },
    {
      id: 'settings',
      label: 'Settings',
      icon: Settings,
    },
  ]

  // Desktop sidebar (hidden on mobile)
  return (
    <>
      <aside className="hidden md:flex w-72 flex-col h-screen sticky top-0 text-white overflow-hidden bg-[linear-gradient(180deg,#0b1224_0%,#13254f_48%,#1d3b8b_100%)] shadow-[0_20px_50px_rgba(10,16,32,0.35)]">
        <div className="relative flex h-full flex-col">
          <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.16),transparent_32%),radial-gradient(circle_at_20%_25%,rgba(255,209,102,0.12),transparent_28%)]" />

          {/* Logo */}
          <div className="relative p-6 border-b border-white/10 flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-white/12 backdrop-blur-md border border-white/10 flex items-center justify-center shadow-[inset_0_1px_0_rgba(255,255,255,0.18)]">
              <span className="font-bold text-lg tracking-tight">DV</span>
            </div>
            <div>
              <h2 className="text-2xl font-bold tracking-tight">DentalVault</h2>
              <p className="text-xs text-white/75 mt-1">Clinical Dashboard</p>
            </div>
          </div>

        {/* User Info */}
          {userEmail && (
            <div className="relative px-6 py-4 border-b border-white/10 bg-white/5 backdrop-blur-sm">
              <p className="text-[11px] uppercase tracking-[0.2em] text-white/70">Logged in as</p>
              <p className="text-sm font-medium truncate mt-2 text-white">{userEmail}</p>
            </div>
          )}

          {/* Navigation Menu */}
          <nav className="relative flex-1 px-4 py-6 space-y-2 overflow-y-auto">
            {menuItems.map((item) => {
              const Icon = item.icon
              const isActive = currentPage === item.id
              return (
                <button
                  key={item.id}
                  onClick={() => onNavigate(item.id)}
                  className={`w-full text-left px-3 py-3 rounded-2xl transition-all duration-200 flex items-center gap-3 border ${
                    isActive
                      ? 'bg-white/12 border-white/20 shadow-[0_8px_24px_rgba(0,0,0,0.18)]'
                      : 'border-transparent text-white/86 hover:bg-white/8 hover:border-white/10'
                  }`}
                >
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${isActive ? 'bg-[#ffd166]/18' : 'bg-white/6'}`}>
                    <Icon className={`w-5 h-5 ${isActive ? 'text-[#ffd166]' : 'text-white/72'}`} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-semibold tracking-tight">{item.label}</p>
                  </div>
                </button>
              )
            })}
          </nav>
          {/* Logout Button */}
          <div className="relative p-4 border-t border-white/10 bg-black/10 backdrop-blur-sm">
            <Button
              onClick={handleLogout}
              variant="outline"
              className="w-full justify-start gap-2 bg-white/10 text-white border-white/15 hover:bg-white/16 hover:text-white"
            >
              <LogOut className="w-4 h-4" />
              Sign Out
            </Button>
          </div>
        </div>
      </aside>
      {/* Mobile bottom nav */}
      <div className="fixed md:hidden bottom-4 left-4 right-4 z-50">
        <nav className="bg-[linear-gradient(135deg,#0b1224_0%,#13254f_50%,#1c3884_100%)] border border-white/10 rounded-2xl flex justify-between items-center h-16 px-4 shadow-[0_8px_32px_rgba(10,16,32,0.45)]">
          {menuItems.map((item) => {
            const Icon = item.icon
            const isActive = currentPage === item.id
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`flex items-center justify-center h-10 transition-all duration-300 rounded-xl focus:outline-none ${
                  isActive
                    ? 'bg-white/12 text-[#ffd166] px-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.1)] border border-white/15 font-semibold'
                    : 'text-white/60 hover:text-white hover:bg-white/5 p-2'
                }`}
              >
                <Icon className="w-5 h-5 flex-shrink-0" />
                {isActive && (
                  <span className="text-xs font-semibold ml-2 text-white whitespace-nowrap overflow-hidden transition-all duration-300">
                    {item.label}
                  </span>
                )}
              </button>
            )
          })}
          <button
            onClick={handleLogout}
            className="flex items-center justify-center h-10 text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 p-2.5 rounded-xl transition-all duration-300 focus:outline-none"
            aria-label="Sign Out"
          >
            <LogOut className="w-5 h-5 flex-shrink-0" />
          </button>
        </nav>
      </div>
    </>
  )
}
