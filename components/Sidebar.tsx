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
      description: 'Manage patient records',
    },
    {
      id: 'appointments',
      label: 'Appointments',
      icon: Calendar,
      description: 'View schedule',
    },
    {
      id: 'reports',
      label: 'Reports',
      icon: BarChart3,
      description: 'Analytics & reports',
    },
    {
      id: 'documents',
      label: 'Documents',
      icon: FileText,
      description: 'Medical documents',
    },
    {
      id: 'settings',
      label: 'Settings',
      icon: Settings,
      description: 'Clinic settings',
    },
  ]

  return (
    <aside className="w-64 bg-sidebar border-r border-sidebar-border flex flex-col h-screen sticky top-0">
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
                <p className={`text-sm font-semibold ${isActive ? '' : ''}`}>{item.label}</p>
                <p className={`text-xs truncate ${isActive ? 'text-sidebar-primary-foreground/70' : 'text-sidebar-foreground/50'}`}>
                  {item.description}
                </p>
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
  )
}
