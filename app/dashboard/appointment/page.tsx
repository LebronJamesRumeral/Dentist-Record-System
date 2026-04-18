"use client";


import { useEffect, useState } from "react";
import Sidebar from "@/components/Sidebar";
import { Calendar, Search, Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AppointmentPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [search, setSearch] = useState("");
  const [selectedAppointment, setSelectedAppointment] = useState(null);

  // Mock data for appointments
  const [appointments] = useState([
    {
      id: 1,
      patient: "Sarah Johnson",
      date: "2024-04-20",
      time: "10:00 AM",
      reason: "Routine Checkup",
      notes: "Patient requested early morning slot."
    },
    {
      id: 2,
      patient: "Michael Chen",
      date: "2024-04-21",
      time: "2:30 PM",
      reason: "Root Canal Follow-up",
      notes: "Check healing progress."
    },
    {
      id: 3,
      patient: "Emily Rodriguez",
      date: "2024-04-22",
      time: "11:15 AM",
      reason: "Filling",
      notes: "Composite filling for tooth #8."
    }
  ]);

  useEffect(() => {
    const auth = localStorage.getItem("isAuthenticated");
    const email = localStorage.getItem("userEmail");
    if (!auth) {
      window.location.href = "/";
    } else {
      setIsAuthenticated(true);
      setUserEmail(email || "");
    }
  }, []);

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="flex h-screen bg-background">
      <Sidebar currentPage="appointments" onNavigate={(page) => {
        if (page === 'appointments') window.location.href = '/dashboard/appointment';
        else if (page === 'patients') window.location.href = '/dashboard';
        else if (page === 'reports') window.location.href = '/dashboard/reports';
        else if (page === 'documents') window.location.href = '/dashboard/documents';
        else if (page === 'settings') window.location.href = '/dashboard/settings';
      }} userEmail={userEmail} />
      <main className="flex-1 overflow-auto">
        <div className="p-8 pl-12">
          <h1 className="text-4xl font-bold text-foreground mb-2">Appointment Records</h1>
          <p className="text-muted-foreground text-lg mb-8">Manage appointments and view schedules</p>
          <div className="flex items-center gap-4 mb-8">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground pointer-events-none" />
              <input
                type="text"
                placeholder="Search by patient, reason, or notes..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="pl-10 pr-4 py-2 border border-border rounded-lg w-full bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
            </div>
            <Button className="flex gap-2">
              <Plus className="w-5 h-5" />
              Add Appointment
            </Button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {appointments
              .filter(appt =>
                appt.patient.toLowerCase().includes(search.toLowerCase()) ||
                appt.reason.toLowerCase().includes(search.toLowerCase()) ||
                appt.notes.toLowerCase().includes(search.toLowerCase())
              )
              .map((appt) => (
                <button
                  key={appt.id}
                  className="bg-card border border-border rounded-xl p-6 shadow-sm flex flex-col gap-2 text-left hover:shadow-lg transition cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary/30"
                  onClick={() => setSelectedAppointment(appt)}
                  tabIndex={0}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <Calendar className="w-5 h-5 text-primary" />
                    <span className="font-semibold text-lg">{appt.date} - {appt.time}</span>
                  </div>
                  <div className="font-bold text-foreground">{appt.patient}</div>
                  <div className="text-sm text-muted-foreground">Reason: {appt.reason}</div>
                  <div className="text-xs text-muted-foreground italic">{appt.notes}</div>
                </button>
              ))}
          </div>

          {/* Appointment Details Modal */}
          {selectedAppointment && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
              <div className="bg-card rounded-2xl border border-border max-w-md w-full shadow-xl relative p-8">
                <button
                  className="absolute top-4 right-4 p-2 rounded-full hover:bg-secondary transition"
                  onClick={() => setSelectedAppointment(null)}
                  aria-label="Close"
                >
                  <X className="w-6 h-6 text-foreground" />
                </button>
                <div className="mb-6">
                  <h2 className="text-2xl font-bold text-foreground mb-1">Appointment Details</h2>
                  <p className="text-muted-foreground">{selectedAppointment.date} - {selectedAppointment.time}</p>
                </div>
                <div className="mb-4">
                  <span className="block font-semibold text-lg mb-1">{selectedAppointment.patient}</span>
                  <span className="block text-sm text-muted-foreground mb-2">Reason: {selectedAppointment.reason}</span>
                  <span className="block text-xs text-muted-foreground italic">{selectedAppointment.notes}</span>
                </div>
                {/* Add more details/actions here if needed */}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
