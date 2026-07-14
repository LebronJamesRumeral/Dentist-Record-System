"use client";

import { useEffect, useState } from "react";
import { BarChart3, Users, Calendar, FileText } from "lucide-react";
import { ChartContainer } from "@/components/ui/chart";
import { Button } from '@/components/ui/button'
import PageHeader from '@/components/PageHeader'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  LineChart,
  Line,
} from 'recharts';

export default function ReportsPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [totalPatients, setTotalPatients] = useState<number | null>(null)
  const [appointmentsThisMonth, setAppointmentsThisMonth] = useState<number | null>(null)

  useEffect(() => {
    const auth = localStorage.getItem("isAuthenticated");
    const email = localStorage.getItem("userEmail");
    if (!auth) {
      window.location.href = "/";
    } else {
      setIsAuthenticated(true);
      setUserEmail(email || "");
    }
    try {
      const rawPatients = localStorage.getItem('dv_patients')
      const patients = rawPatients ? JSON.parse(rawPatients) : null
      if (patients) setTotalPatients(patients.length)
      else setTotalPatients(128) // fallback

      const rawAppts = localStorage.getItem('dv_appointments')
      const appts = rawAppts ? JSON.parse(rawAppts) : []
      const now = new Date()
      const countThisMonth = appts.filter((a: any) => {
        const d = new Date(a.date)
        return d.getFullYear() === now.getFullYear() && d.getMonth() === now.getMonth()
      }).length
      setAppointmentsThisMonth(countThisMonth)
    } catch (e) {
      // ignore
    }
  }, []);

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="p-4 md:p-8 md:pl-12 pb-24 md:pb-8">
          <PageHeader
            title="Reports & Analytics"
            subtitle="View clinic analytics and download reports"
            actions={
              <>
                <Button className="px-4 py-2">Download Patient List CSV</Button>
                <Button className="px-4 py-2">Download Appointment PDF</Button>
              </>
            }
          />

          {/* Analytics Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-12">
              <div className="bg-card border border-border rounded-xl p-6 flex flex-col gap-2">
              <div className="flex items-center gap-2 mb-2">
                <Users className="w-5 h-5 text-primary" />
                <span className="font-semibold text-lg">Total Patients</span>
              </div>
              <div className="text-3xl font-bold text-foreground">{totalPatients ?? '—'}</div>
              <div className="text-xs text-muted-foreground">As of this month</div>
            </div>
            <div className="bg-card border border-border rounded-xl p-6 flex flex-col gap-2">
              <div className="flex items-center gap-2 mb-2">
                <Calendar className="w-5 h-5 text-primary" />
                <span className="font-semibold text-lg">Appointments This Month</span>
              </div>
              <div className="text-3xl font-bold text-foreground">{appointmentsThisMonth ?? '—'}</div>
              <div className="text-xs text-muted-foreground">This month</div>
            </div>
            <div className="bg-card border border-border rounded-xl p-6 flex flex-col gap-2">
              <div className="flex items-center gap-2 mb-2">
                <FileText className="w-5 h-5 text-primary" />
                <span className="font-semibold text-lg">Reports Generated</span>
              </div>
              <div className="text-3xl font-bold text-foreground">15</div>
              <div className="text-xs text-muted-foreground">This year</div>
            </div>
          </div>


          <div className="mb-12">
            <h2 className="text-2xl font-bold text-foreground mb-4">Analytics Graphs</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Appointments per Month Bar Chart */}
              <div className="bg-card border border-border rounded-xl p-6">
                <h3 className="font-semibold mb-4">Appointments per Month</h3>
                <ChartContainer config={{ appointments: { color: '#3b82f6', label: 'Appointments' } }}>
                  <BarChart data={[
                    { month: 'Jan', appointments: 20 },
                    { month: 'Feb', appointments: 25 },
                    { month: 'Mar', appointments: 30 },
                    { month: 'Apr', appointments: 42 },
                    { month: 'May', appointments: 35 },
                    { month: 'Jun', appointments: 28 },
                  ]}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="appointments" fill="#3b82f6" />
                  </BarChart>
                </ChartContainer>
              </div>
              {/* New Patients Line Chart */}
              <div className="bg-card border border-border rounded-xl p-6">
                <h3 className="font-semibold mb-4">New Patients Trend</h3>
                <ChartContainer config={{ patients: { color: '#10b981', label: 'New Patients' } }}>
                  <LineChart data={[
                    { month: 'Jan', patients: 8 },
                    { month: 'Feb', patients: 12 },
                    { month: 'Mar', patients: 15 },
                    { month: 'Apr', patients: 18 },
                    { month: 'May', patients: 14 },
                    { month: 'Jun', patients: 10 },
                  ]}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="patients" stroke="#10b981" strokeWidth={2} />
                  </LineChart>
                </ChartContainer>
              </div>
            </div>
          </div>
        </div>
    </div>
  );
}
