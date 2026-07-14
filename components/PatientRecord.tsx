'use client'

import { ArrowLeft, Plus, AlertCircle, CalendarDays, Phone, UserRound } from 'lucide-react'
import { Button } from '@/components/ui/button'
import DentalChart from './DentalChart'
import VisitHistory from './VisitHistory'

interface PatientRecordProps {
  patient: any
  onBack: () => void
  onAddVisit: () => void
  embedded?: boolean
}

export default function PatientRecord({
  patient,
  onBack,
  onAddVisit,
  embedded = false,
}: PatientRecordProps) {
  const lastVisitDate = new Date(patient.lastVisit).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })

  const containerClass = embedded ? '' : 'p-4 md:p-8'

  return (
    <div className={containerClass}>
      {/* Header with Back Button */}
      <div className="mb-8 rounded-3xl border border-border bg-card p-6 shadow-sm md:p-8">
        <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
            <div className="flex items-start gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={onBack}
              className="mt-1 rounded-xl border border-border bg-background/80 p-2.5 text-foreground transition hover:-translate-x-0.5 hover:border-primary/30 hover:shadow-sm"
            >
              <ArrowLeft className="h-6 w-6" />
            </Button>
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-primary">
                Selected patient
              </div>
              <h1 className="mt-3 text-4xl font-bold tracking-tight text-foreground">{patient.name}</h1>
              <p className="mt-2 text-muted-foreground">Patient Dental Records</p>
            </div>
          </div>

          <Button onClick={onAddVisit} variant="secondary" className="flex items-center gap-2 px-5 py-3 md:self-start">
            <Plus className="h-4 w-4" />
            Add Visit
          </Button>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
          <div className="rounded-2xl bg-secondary/60 p-4">
            <div className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              <UserRound className="h-4 w-4 text-primary" />
              Age
            </div>
            <p className="text-lg font-semibold text-foreground">{patient.age} years old</p>
          </div>
          <div className="rounded-2xl bg-secondary/60 p-4">
            <div className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              <Phone className="h-4 w-4 text-primary" />
              Contact
            </div>
            <p className="text-lg font-semibold text-foreground">{patient.contact}</p>
          </div>
          <div className="rounded-2xl bg-secondary/60 p-4">
            <div className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              <CalendarDays className="h-4 w-4 text-primary" />
              Last visit
            </div>
            <p className="text-lg font-semibold text-foreground">{lastVisitDate}</p>
          </div>
        </div>
      </div>

      {/* Patient Info Card */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2 rounded-3xl border border-border bg-card p-6 shadow-sm">
          <h2 className="mb-4 text-lg font-bold text-foreground">
            Patient Information
          </h2>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                  Age
                </p>
                <p className="text-lg font-semibold text-foreground">
                  {patient.age} years old
                </p>
              </div>
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                  Contact
                </p>
                <p className="text-lg font-semibold text-foreground">
                  {patient.contact}
                </p>
              </div>
            </div>

            {/* Medical Notes Alert */}
            {patient.medicalNotes && (
              <div className="flex gap-3 rounded-2xl border border-accent/30 bg-accent/10 p-4">
                <AlertCircle className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                <div>
                  <p className="mb-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                    Medical Notes
                  </p>
                  <p className="text-sm font-medium text-foreground">
                    {patient.medicalNotes}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Quick Stats */}
        <div className="space-y-4">
          <div className="rounded-3xl border border-border bg-card p-6 shadow-sm">
            <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              Total Visits
            </p>
            <p className="text-4xl font-bold tracking-tight text-primary">
              {patient.visits.length}
            </p>
          </div>
          <div className="rounded-3xl border border-border bg-card p-6 shadow-sm">
            <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              Last Visit
            </p>
            <p className="text-lg font-semibold text-foreground">
              {lastVisitDate}
            </p>
          </div>
        </div>
      </div>

      {/* Dental Chart Section */}
      <div className="mb-8 rounded-3xl border border-border bg-card p-6 shadow-sm">
        <h2 className="mb-6 text-lg font-bold text-foreground">Dental Chart</h2>
        <DentalChart teethStatus={patient.teethStatus} />
      </div>

      {/* Visit History Section */}
      <div className="mb-8">
        <div className="mb-6 flex items-center justify-between gap-4">
          <div>
            <h2 className="text-lg font-bold text-foreground">Visit History</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Clinical records organized by date
            </p>
          </div>
        </div>
        <VisitHistory visits={patient.visits} />
      </div>
    </div>
  )
}
