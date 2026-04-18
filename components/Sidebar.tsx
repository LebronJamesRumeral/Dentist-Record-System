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
      <aside className="hidden md:flex w-64 bg-sidebar border-r border-sidebar-border flex-col h-screen sticky top-0">
        {/* Logo */}
        <div className="p-6 border-b border-sidebar-border">
          <h2 className="text-2xl font-bold text-sidebar-primary">DentalVault</h2>
          <p className="text-xs text-sidebar-foreground/60 mt-1">Clinical Dashboard</p>
        </div>

        {/* User Info */}
        {userEmail && (
          <div className="px-6 py-4 border-b border-sidebar-border bg-sidebar-accent/50">
            <p className="text-xs text-sidebar-foreground/60 uppercase tracking-wide">Logged in as</p>
            <p className="text-sm font-medium text-sidebar-foreground truncate mt-1">{userEmail}</p>
          </div>
        )}

        {/* Navigation Menu */}
        <nav className="flex-1 px-3 py-6 space-y-2 overflow-y-auto">
          {menuItems.map((item) => {
            const Icon = item.icon
            const isActive = currentPage === item.id
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-200 flex items-start gap-3 ${
                  isActive
                    ? 'bg-sidebar-primary/90 text-sidebar-primary-foreground shadow-md'
                    : 'text-sidebar-foreground hover:bg-sidebar-accent/60'
                }`}
              >
                <Icon className={`w-5 h-5 mt-0.5 flex-shrink-0 ${isActive ? '' : 'text-sidebar-foreground/60'}`} />
                <div className="min-w-0 flex-1">
                  <p className={`text-sm font-semibold`}>{item.label}</p>
                </div>
              </button>
            )
          })}
        </nav>
        {/* Logout Button */}
        <div className="p-4 border-t border-sidebar-border">
          <Button
            onClick={handleLogout}
            variant="outline"
            className="w-full justify-start gap-2"
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </Button>
        </div>
      </aside>
      {/* Mobile bottom nav */}
      <nav className="fixed md:hidden bottom-0 left-0 right-0 z-50 bg-sidebar border-t border-sidebar-border flex justify-around items-center h-16">
        {menuItems.map((item) => {
          const Icon = item.icon
          const isActive = currentPage === item.id
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`flex flex-col items-center justify-center flex-1 h-full transition-all ${
                isActive
                  ? 'text-sidebar-primary bg-sidebar-primary/10'
                  : 'text-sidebar-foreground hover:bg-sidebar-accent/60'
              }`}
            >
              <Icon className="w-6 h-6 mb-1" />
              <span className="text-xs font-medium">{item.label}</span>
            </button>
          )
        })}
      </nav>
    </>
  )
}
