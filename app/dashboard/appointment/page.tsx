"use client";

import { useEffect, useState } from "react";
import { Calendar, Search, Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from '@/components/ui/input'
import PageHeader from '@/components/PageHeader'
import { SEED_PATIENTS } from '@/lib/mock/patients'
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
  patient: string; // display name
  patientExternalId?: string; // external UUID from patients
  date: string;
  time: string;
  reason: string;
  notes: string;
  tooth?: string;
  toothCondition?: string;
}

export default function AppointmentPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [search, setSearch] = useState("");
  const [selectedAppointment, setSelectedAppointment] = useState<any>(null);
  const [isEditing, setIsEditing] = useState(false)
  const [editForm, setEditForm] = useState<Appointment | null>(null)
  const [patientSearch, setPatientSearch] = useState('')

  const [appointments, setAppointments] = useState<Appointment[]>(() => {
    try {
      const raw = typeof window !== 'undefined' ? window.localStorage.getItem('dv_appointments') : null
      if (raw) return JSON.parse(raw) as Appointment[]
    } catch (e) {
      // ignore
    }

    // fallback seeded appointments (minimal)
    return [
      {
        id: 1,
        patient: "Sarah Johnson",
        patientExternalId: 'ext-1',
        date: "2024-04-20",
        time: "10:00 AM",
        reason: "Routine Checkup",
        notes: "Patient requested early morning slot.",
        tooth: 'All',
        toothCondition: 'Healthy',
      },
      {
        id: 2,
        patient: "Michael Chen",
        patientExternalId: 'ext-2',
        date: "2024-04-21",
        time: "2:30 PM",
        reason: "Root Canal Follow-up",
        notes: "Check healing progress.",
        tooth: 'All',
        toothCondition: 'Healthy',
      },
      {
        id: 3,
        patient: "Emily Rodriguez",
        patientExternalId: 'ext-3',
        date: "2024-04-22",
        time: "11:15 AM",
        reason: "Filling",
        notes: "Composite filling for tooth #8.",
        tooth: '8',
        toothCondition: 'Filling',
      },
    ]
  })

  useEffect(() => {
    try {
      // migrate appointments missing external ids: try to look up by name in patients
      const rawPatients = typeof window !== 'undefined' ? window.localStorage.getItem('dv_patients') : null
      const patients = rawPatients ? JSON.parse(rawPatients) : SEED_PATIENTS

      const migrated = appointments.map((a) => {
        if (a.patientExternalId) return a
        const found = (patients || []).find((p:any) => String(p.name).toLowerCase() === String(a.patient).toLowerCase())
        if (found && found.external_id) return { ...a, patientExternalId: found.external_id }
        return a
      })

      window.localStorage.setItem('dv_appointments', JSON.stringify(migrated))
    } catch (e) {
      // ignore
    }
  }, [appointments])

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

  // keep edit form in sync with selected appointment
  useEffect(() => {
    if (selectedAppointment) {
      setEditForm({ ...selectedAppointment })
      setIsEditing(false)
      setPatientSearch('')
    } else {
      setEditForm(null)
      setIsEditing(false)
    }
  }, [selectedAppointment])

  const handleCompleteAppointment = (appt: Appointment) => {
    // remove appointment from list
    setAppointments((prev) => prev.filter((a) => a.id !== appt.id))

    try {
      const raw = typeof window !== 'undefined' ? window.localStorage.getItem('dv_patients') : null
      let patients = raw ? JSON.parse(raw) : null
      if (!patients) {
        // clone SEED_PATIENTS so we don't mutate the exported constant
        patients = SEED_PATIENTS.map((p: any) => ({ ...p }))
      }

      // prefer matching by external id if available
      let idx = -1
      if (appt.patientExternalId) {
        idx = patients.findIndex((p: any) => String(p.external_id) === String(appt.patientExternalId))
      }
      if (idx === -1) {
        idx = patients.findIndex((p: any) => String(p.name).toLowerCase() === String(appt.patient).toLowerCase())
      }

      if (idx !== -1) {
        const patient = patients[idx]
        const visit = {
          id: Date.now(),
          date: appt.date,
          procedure: appt.reason,
          tooth: appt.tooth || '',
          condition: appt.toothCondition || '',
          notes: appt.notes || ''
        }
        patient.visits = [visit, ...(patient.visits || [])]
        patient.lastVisit = appt.date
        patient.lastNote = `${appt.reason} — ${appt.notes || ''}`
        patients[idx] = patient
        window.localStorage.setItem('dv_patients', JSON.stringify(patients))
      }
    } catch (e) {
      console.error('Failed to append visit to patient', e)
    }
  }

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
    <div className="min-h-screen bg-background">
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
                {!isEditing && (
                  <>
                    <span className="block font-semibold text-lg mb-1">{selectedAppointment.patient}</span>
                    <span className="block text-sm text-muted-foreground mb-2">Reason: {selectedAppointment.reason}</span>
                    <span className="block text-xs text-muted-foreground italic">{selectedAppointment.notes}</span>
                    <div className="mt-2 text-sm text-muted-foreground">Tooth: {selectedAppointment.tooth || 'All'} • Condition: {selectedAppointment.toothCondition || 'Healthy'}</div>
                  </>
                )}

                {isEditing && editForm && (
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm font-semibold mb-1">Patient</label>
                      <input value={editForm.patient} onChange={(e) => setEditForm({ ...editForm, patient: e.target.value })} className="w-full px-3 py-2 rounded-md border border-border bg-background text-foreground text-sm" />
                      <div className="mt-1">
                        <input placeholder="Search patients..." value={patientSearch} onChange={(e) => setPatientSearch(e.target.value)} className="w-full px-3 py-2 rounded-md border border-border bg-background text-foreground text-sm" />
                        <div className="max-h-32 overflow-y-auto mt-1 border border-border rounded-md bg-card">
                          {(function(){ try { const raw = typeof window !== 'undefined' ? window.localStorage.getItem('dv_patients') : null; const list = raw ? JSON.parse(raw) : SEED_PATIENTS; return list.filter((p:any) => p.name.toLowerCase().includes(patientSearch.toLowerCase())).map((p:any)=> <button key={p.id} type="button" className={`w-full text-left px-3 py-2 text-sm ${editForm.patient===p.name ? 'bg-secondary' : ''}`} onClick={()=> setEditForm({...editForm, patient: p.name})}>{p.name}</button>) } catch(e){ return null } })()}
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-sm font-semibold mb-1">Date</label>
                        <input type="date" value={editForm.date} onChange={(e)=> setEditForm({...editForm, date: e.target.value})} className="w-full px-3 py-2 rounded-md border border-border bg-background text-foreground text-sm" />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold mb-1">Time</label>
                        <input value={editForm.time} onChange={(e)=> setEditForm({...editForm, time: e.target.value})} className="w-full px-3 py-2 rounded-md border border-border bg-background text-foreground text-sm" />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-sm font-semibold mb-1">Tooth</label>
                        <select value={editForm.tooth || 'All'} onChange={(e)=> setEditForm({...editForm, tooth: e.target.value})} className="w-full px-3 py-2 rounded-md border border-border bg-background text-foreground text-sm">
                          <option>All</option>
                          {Array.from({length:32},(_,i)=> (<option key={i+1} value={String(i+1)}>{i+1}</option>))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-semibold mb-1">Tooth Condition</label>
                        <select value={editForm.toothCondition || 'Healthy'} onChange={(e)=> setEditForm({...editForm, toothCondition: e.target.value})} className="w-full px-3 py-2 rounded-md border border-border bg-background text-foreground text-sm">
                          <option>Healthy</option>
                          <option>Cavity</option>
                          <option>Filling</option>
                          <option>Missing</option>
                          <option>Treatment</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold mb-1">Reason</label>
                      <input value={editForm.reason} onChange={(e)=> setEditForm({...editForm, reason: e.target.value})} className="w-full px-3 py-2 rounded-md border border-border bg-background text-foreground text-sm" />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold mb-1">Notes</label>
                      <textarea value={editForm.notes} onChange={(e)=> setEditForm({...editForm, notes: e.target.value})} className="w-full px-3 py-2 rounded-md border border-border bg-background text-foreground text-sm" rows={3} />
                    </div>
                  </div>
                )}
              </div>
              <div className="flex justify-end gap-2 mt-4">
                {!isEditing && (
                  <>
                    <Button variant="ghost" onClick={() => setIsEditing(true)}>Edit</Button>
                    <Button variant="ghost" onClick={() => { handleCompleteAppointment(selectedAppointment); setSelectedAppointment(null) }}>Complete</Button>
                    <Button variant="default" onClick={() => setSelectedAppointment(null)}>Close</Button>
                  </>
                )}

                {isEditing && (
                  <>
                    <Button variant="outline" onClick={() => { setIsEditing(false); setEditForm({ ...selectedAppointment }) }}>Cancel</Button>
                    <Button variant="default" onClick={() => {
                      if (!editForm) return
                      setAppointments((prev) => prev.map((a) => a.id === editForm.id ? editForm : a))
                      setIsEditing(false)
                      setSelectedAppointment(editForm)
                    }}>Save</Button>
                  </>
                )}
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
    </div>
  );
}
