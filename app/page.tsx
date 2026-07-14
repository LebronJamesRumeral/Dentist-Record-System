'use client'

import { useState } from 'react'
import { ArrowRight, Lock, Mail, ShieldCheck, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    setTimeout(() => {
      if (email && password) {
        localStorage.setItem('isAuthenticated', 'true')
        localStorage.setItem('userEmail', email)
        window.location.href = '/dashboard'
      } else {
        setError('Please enter both email and password')
      }
      setIsLoading(false)
    }, 1000)
  }

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(59,130,246,0.18),_transparent_28%),linear-gradient(135deg,_rgba(248,250,252,1),_rgba(240,244,255,1))] px-3 py-4 sm:px-6 sm:py-8 lg:px-8 flex items-center justify-center">
      <div className="w-full max-w-5xl overflow-hidden rounded-[28px] border border-white/60 bg-white/80 shadow-[0_25px_80px_rgba(15,23,42,0.14)] backdrop-blur-xl">
        <div className="grid lg:grid-cols-[1.05fr_0.95fr]">
          <div className="hidden lg:flex relative flex-col justify-between overflow-hidden bg-[linear-gradient(135deg,_#0f172a_0%,_#1d4ed8_55%,_#3b82f6_100%)] p-10 text-white">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(255,255,255,0.24),_transparent_30%)]" />
            <div className="relative z-10">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-sm font-medium">
                <Sparkles className="h-4 w-4" />
                Smart clinical workflow
              </div>
              <h1 className="text-4xl font-semibold leading-tight">Modern care starts with a calmer workspace.</h1>
              <p className="mt-4 max-w-md text-sm leading-6 text-blue-100">
                Organize patient records, appointments, and documents in one beautifully simple dashboard.
              </p>
            </div>
            <div className="relative z-10 rounded-2xl border border-white/20 bg-white/10 p-5 backdrop-blur-sm">
              <div className="flex items-center gap-3">
                <div className="rounded-2xl bg-white/15 p-2">
                  <ShieldCheck className="h-6 w-6" />
                </div>
                <div>
                  <p className="font-medium">Secure and streamlined</p>
                  <p className="text-sm text-blue-100">Built for fast, confident daily operations.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="p-5 sm:p-8 lg:p-10">
            <div className="mx-auto max-w-md">
              <div className="mb-6 flex items-center justify-center lg:justify-start">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,_#2563eb_0%,_#60a5fa_100%)] text-white shadow-lg shadow-blue-500/20">
                  <Lock className="h-7 w-7" />
                </div>
              </div>

              <div className="text-center lg:text-left">
                <h2 className="text-3xl font-semibold text-slate-900">Welcome back</h2>
                <p className="mt-2 text-sm leading-6 text-slate-600">Sign in to continue managing your dental practice.</p>
              </div>

              <form onSubmit={handleLogin} className="mt-8 space-y-4">
                <div className="space-y-2">
                  <label htmlFor="email" className="block text-sm font-medium text-slate-700">
                    Email address
                  </label>
                  <div className="relative">
                    <Mail className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="doctor@clinic.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="h-12 rounded-2xl border-slate-200 bg-slate-50 pl-11 text-sm shadow-sm focus-visible:ring-2 focus-visible:ring-blue-500"
                      disabled={isLoading}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="password" className="block text-sm font-medium text-slate-700">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                    <Input
                      id="password"
                      type="password"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="h-12 rounded-2xl border-slate-200 bg-slate-50 pl-11 text-sm shadow-sm focus-visible:ring-2 focus-visible:ring-blue-500"
                      disabled={isLoading}
                    />
                  </div>
                </div>

                {error && (
                  <div className="rounded-2xl border border-rose-200 bg-rose-50 px-3 py-2.5">
                    <p className="text-sm text-rose-600">{error}</p>
                  </div>
                )}

                <Button
                  type="submit"
                  className="h-12 w-full rounded-2xl bg-[linear-gradient(135deg,_#2563eb_0%,_#3b82f6_100%)] text-sm font-semibold shadow-lg shadow-blue-500/20 transition hover:opacity-95"
                  disabled={isLoading}
                >
                  {isLoading ? 'Signing in...' : 'Sign in'}
                  {!isLoading && <ArrowRight className="ml-2 h-4 w-4" />}
                </Button>
              </form>

              {process.env.NODE_ENV !== 'production' && (
                <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-center text-sm text-slate-600">
                  Demo credentials: use any email and password to continue.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
