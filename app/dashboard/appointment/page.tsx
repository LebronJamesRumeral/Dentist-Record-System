"use client";

import { useEffect, useState } from "react";
import Sidebar from "@/components/Sidebar";
import { Calendar, Search, Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from '@/components/ui/input'
import PageHeader from '@/components/PageHeader'
import AddAppointmentModal from "@/components/AddAppointmentModal";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
interface Appointment {
  id: number;
  patient: string;
  date: string;
  time: string;
  reason: string;
  notes: string;
}

export default function AppointmentPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [search, setSearch] = useState("");
  const [selectedAppointment, setSelectedAppointment] = useState<any>(null);

  const [appointments, setAppointments] = useState<Appointment[]>([
    {
      id: 1,
      patient: "Sarah Johnson",
      date: "2024-04-20",
      time: "10:00 AM",
      reason: "Routine Checkup",
      notes: "Patient requested early morning slot.",
    },
    {
      id: 2,
      patient: "Michael Chen",
      date: "2024-04-21",
      time: "2:30 PM",
      reason: "Root Canal Follow-up",
      notes: "Check healing progress.",
    },
    {
      id: 3,
      patient: "Emily Rodriguez",
      date: "2024-04-22",
      time: "11:15 AM",
      reason: "Filling",
      notes: "Composite filling for tooth #8.",
    },
    {
      id: 4,
      patient: "James Carter",
      date: "2024-04-23",
      time: "09:30 AM",
      reason: "Cleaning & Scaling",
      notes: "Regular check-up.",
    },
    {
      id: 5,
      patient: "Olivia Vance",
      date: "2024-04-24",
      time: "11:00 AM",
      reason: "Consultation",
      notes: "Discuss sensitive teeth remedies.",
    },
    {
      id: 6,
      patient: "Robert Downey",
      date: "2024-04-25",
      time: "01:30 PM",
      reason: "Deep Cleaning",
      notes: "Patient is on blood thinners.",
    },
    {
      id: 7,
      patient: "Jessica Alba",
      date: "2024-04-26",
      time: "03:00 PM",
      reason: "Routine Checkup",
      notes: "Second trimester checkup.",
    },
    {
      id: 8,
      patient: "David Beckham",
      date: "2024-04-27",
      time: "10:30 AM",
      reason: "Nightguard Fitting",
      notes: "Adjusting teeth grinding guard.",
    },
    {
      id: 9,
      patient: "Emma Watson",
      date: "2024-04-28",
      time: "02:00 PM",
      reason: "Cavity Check",
      notes: "Latex allergy precautions.",
    },
    {
      id: 10,
      patient: "William Prince",
      date: "2024-04-29",
      time: "09:00 AM",
      reason: "Routine Checkup",
      notes: "Standard visual exam.",
    },
    {
      id: 11,
      patient: "Sophia Loren",
      date: "2024-04-30",
      time: "11:30 AM",
      reason: "Denture Adjustment",
      notes: "Slight discomfort on lower denture.",
    },
    {
      id: 12,
      patient: "Henry Cavill",
      date: "2024-05-01",
      time: "04:00 PM",
      reason: "Cleaning",
      notes: "Routine scaling appointment.",
    },
  ])

  const [showAddAppointment, setShowAddAppointment] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const handleSearchChange = (val: string) => {
    setSearch(val);
    setCurrentPage(1);
  };

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

  // Filter and pagination calculations
  const filteredAppointments = appointments.filter(
    (appt) =>
      appt.patient.toLowerCase().includes(search.toLowerCase()) ||
      appt.reason.toLowerCase().includes(search.toLowerCase()) ||
      appt.notes.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filteredAppointments.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentPageAppointments = filteredAppointments.slice(startIndex, endIndex);

  return (
    <div className="flex h-screen bg-background">
      <Sidebar
        currentPage="appointments"
        onNavigate={(page) => {
          if (page === 'appointments') window.location.href = '/dashboard/appointment';
          else if (page === 'patients') window.location.href = '/dashboard';
          else if (page === 'reports') window.location.href = '/dashboard/reports';
          else if (page === 'documents') window.location.href = '/dashboard/documents';
          else if (page === 'settings') window.location.href = '/dashboard/settings';
        }}
        userEmail={userEmail}
      />
      <main className="flex-1 overflow-auto">
        <div className="p-4 md:p-8 md:pl-12 pb-24 md:pb-8">
          <PageHeader
            title="Appointment Records"
            subtitle="Manage appointments and view schedules"
            actions={
              <>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground pointer-events-none" />
                  <Input
                    type="text"
                    placeholder="Search by patient, reason, or notes..."
                    value={search}
                    onChange={(e) => handleSearchChange(e.target.value)}
                    className="pl-10 pr-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
                  />
                </div>
                <Button className="flex gap-2" onClick={() => setShowAddAppointment(true)}>
                  <Plus className="w-5 h-5" />
                  Add Appointment
                </Button>
              </>
            }
          />

          {filteredAppointments.length > 0 ? (
            <>
              {/* Desktop Table View */}
              <div className="hidden md:block bg-card rounded-2xl border border-border shadow-sm overflow-hidden mt-6">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-secondary/40">
                      <TableHead className="font-semibold px-6 py-4">Patient Name</TableHead>
                      <TableHead className="font-semibold px-6 py-4">Date</TableHead>
                      <TableHead className="font-semibold px-6 py-4">Time</TableHead>
                      <TableHead className="font-semibold px-6 py-4">Reason</TableHead>
                      <TableHead className="font-semibold px-6 py-4">Notes</TableHead>
                      <TableHead className="font-semibold px-6 py-4 text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {currentPageAppointments.map((appt) => (
                      <TableRow
                        key={appt.id}
                        className="hover:bg-muted/50 cursor-pointer transition-colors"
                        onClick={() => setSelectedAppointment(appt)}
                      >
                        <TableCell className="font-semibold px-6 py-4 text-foreground">
                          {appt.patient}
                        </TableCell>
                        <TableCell className="px-6 py-4 text-muted-foreground font-medium">
                          {new Date(appt.date).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric',
                          })}
                        </TableCell>
                        <TableCell className="px-6 py-4 text-muted-foreground">
                          {appt.time}
                        </TableCell>
                        <TableCell className="px-6 py-4 text-foreground">
                          {appt.reason}
                        </TableCell>
                        <TableCell className="px-6 py-4 text-muted-foreground max-w-xs truncate">
                          {appt.notes || 'No notes'}
                        </TableCell>
                        <TableCell className="px-6 py-4 text-right" onClick={(e) => e.stopPropagation()}>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setSelectedAppointment(appt)}
                            className="font-semibold text-primary hover:text-primary/80"
                          >
                            Details
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              {/* Mobile Cards View */}
              <div className="md:hidden space-y-4 mt-6">
                {currentPageAppointments.map((appt) => (
                  <div
                    key={appt.id}
                    role="button"
                    tabIndex={0}
                    onClick={() => setSelectedAppointment(appt)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') setSelectedAppointment(appt)
                    }}
                    className="bg-card rounded-2xl border border-border p-5 shadow-sm flex flex-col gap-3 relative cursor-pointer hover:border-primary/40 transition-all duration-200"
                  >
                    <div className="flex items-start justify-between">
                      <h3 className="text-lg font-bold text-foreground pr-2">
                        {appt.patient}
                      </h3>
                      <span className="rounded-full border border-border/80 px-2.5 py-0.5 text-xs font-semibold text-muted-foreground bg-card shadow-sm">
                        Scheduled
                      </span>
                    </div>

                    <div className="text-xs text-muted-foreground flex flex-col gap-1">
                      <p className="font-medium text-foreground/80">
                        {appt.reason} • {appt.time}
                      </p>
                      <p className="text-[11px] uppercase tracking-wider text-muted-foreground mt-0.5">
                        Date: {new Date(appt.date).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                        })}
                      </p>
                    </div>

                    {appt.notes && (
                      <div className="bg-muted/50 rounded-xl p-3 border-l-4 border-primary text-xs text-foreground/90 mt-1">
                        {appt.notes}
                      </div>
                    )}

                    <div className="flex justify-end mt-1">
                      <span className="text-sm font-bold text-primary hover:underline">
                        Details
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pagination Controls */}
              {totalPages > 1 && (
                <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-t border-border pt-6">
                  <p className="text-sm text-muted-foreground text-center sm:text-left">
                    Showing <span className="font-semibold text-foreground">{startIndex + 1}</span> to{' '}
                    <span className="font-semibold text-foreground">
                      {Math.min(endIndex, filteredAppointments.length)}
                    </span>{' '}
                    of <span className="font-semibold text-foreground">{filteredAppointments.length}</span> appointments
                  </p>
                  <div className="flex items-center justify-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                      disabled={currentPage === 1}
                      className="rounded-lg px-3 py-1 text-sm transition-all"
                    >
                      Previous
                    </Button>

                    <div className="flex items-center gap-1">
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                        <Button
                          key={page}
                          variant={currentPage === page ? 'default' : 'outline'}
                          size="icon"
                          onClick={() => setCurrentPage(page)}
                          className={`h-8 w-8 rounded-lg text-sm transition-all ${
                            currentPage === page ? 'pointer-events-none bg-primary text-primary-foreground' : ''
                          }`}
                        >
                          {page}
                        </Button>
                      ))}
                    </div>

                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                      disabled={currentPage === totalPages}
                      className="rounded-lg px-3 py-1 text-sm transition-all"
                    >
                      Next
                    </Button>
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-12 bg-card rounded-2xl border border-border p-6 shadow-sm mt-6">
              <p className="text-muted-foreground">
                No appointments found. Add an appointment to get started.
              </p>
            </div>
          )}
        </div>

        {selectedAppointment && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div className="bg-card rounded-2xl border border-border max-w-md w-full shadow-xl relative p-8">
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-4 right-4 p-2"
                onClick={() => setSelectedAppointment(null)}
                aria-label="Close"
              >
                <X className="w-6 h-6 text-foreground" />
              </Button>
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-foreground mb-1">Appointment Details</h2>
                <p className="text-muted-foreground">{selectedAppointment.date} - {selectedAppointment.time}</p>
              </div>
              <div className="mb-4">
                <span className="block font-semibold text-lg mb-1">{selectedAppointment.patient}</span>
                <span className="block text-sm text-muted-foreground mb-2">Reason: {selectedAppointment.reason}</span>
                <span className="block text-xs text-muted-foreground italic">{selectedAppointment.notes}</span>
              </div>
            </div>
          </div>
        )}

        {showAddAppointment && (
          <AddAppointmentModal
            onClose={() => setShowAddAppointment(false)}
            onSubmit={(newAppt) => {
              setAppointments([...appointments, { id: Date.now(), ...newAppt }])
              setShowAddAppointment(false)
            }}
          />
        )}
      </main>
    </div>
  );
}
