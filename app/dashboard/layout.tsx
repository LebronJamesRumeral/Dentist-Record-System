'use client'

import { useEffect, useMemo, useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import Sidebar from '@/components/Sidebar'

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const pathname = usePathname()
  const router = useRouter()
  const [userEmail, setUserEmail] = useState('')

  useEffect(() => {
    const email = window.localStorage.getItem('userEmail') || ''
    setUserEmail(email)
  }, [])

  const currentPage = useMemo(() => {
    if (pathname?.startsWith('/dashboard/appointment')) return 'appointments'
    if (pathname?.startsWith('/dashboard/reports')) return 'reports'
    if (pathname?.startsWith('/dashboard/documents')) return 'documents'
    if (pathname?.startsWith('/dashboard/settings')) return 'settings'
    return 'patients'
  }, [pathname])

  const handleNavigate = (page: string) => {
    if (page === 'appointments') {
      router.push('/dashboard/appointment')
    } else if (page === 'patients') {
      router.push('/dashboard')
    } else if (page === 'reports') {
      router.push('/dashboard/reports')
    } else if (page === 'documents') {
      router.push('/dashboard/documents')
    } else if (page === 'settings') {
      router.push('/dashboard/settings')
    }
  }

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar currentPage={currentPage} onNavigate={handleNavigate} userEmail={userEmail} />

      <main className="flex-1 min-w-0 overflow-y-auto">
        <div className="min-h-full w-full animate-[dashboard-page-enter_280ms_ease-out]">
          {children}
        </div>
      </main>
    </div>
  )
}
