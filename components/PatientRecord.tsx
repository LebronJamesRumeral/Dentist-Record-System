'use client'

import { useState } from 'react'
import { ArrowLeft, Plus, AlertCircle } from 'lucide-react'
import DentalChart from './DentalChart'
import VisitHistory from './VisitHistory'

interface PatientRecordProps {
  patient: any
  onBack: () => void
  onAddVisit: () => void
}

export default function PatientRecord({
  patient,
  onBack,
  onAddVisit,
}: PatientRecordProps) {
  return (
    <div className="p-4 md:p-8">
      {/* Header with Back Button */}
      <div className="flex items-center gap-4 mb-8">
        <button
          onClick={onBack}
          className="p-2 hover:bg-secondary rounded-lg transition-colors"
        >
          <ArrowLeft className="w-6 h-6 text-foreground" />
        </button>
        <div>
          <h1 className="text-4xl font-bold text-foreground">{patient.name}</h1>
          <p className="text-muted-foreground">Patient Dental Records</p>
        </div>
      </div>

      {/* Patient Info Card */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2 p-6 rounded-xl bg-card border border-border">
          <h2 className="text-lg font-bold text-foreground mb-4">
            Patient Information
          </h2>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wide">
                  Age
                </p>
                <p className="text-lg font-semibold text-foreground">
                  {patient.age} years old
                </p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wide">
                  Contact
                </p>
                <p className="text-lg font-semibold text-foreground">
                  {patient.contact}
                </p>
              </div>
            </div>

            {/* Medical Notes Alert */}
            {patient.medicalNotes && (
              <div className="p-4 bg-accent/10 border border-accent/30 rounded-lg flex gap-3">
                <AlertCircle className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">
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
          <div className="p-6 rounded-xl bg-card border border-border">
            <p className="text-xs text-muted-foreground uppercase tracking-wide mb-2">
              Total Visits
            </p>
            <p className="text-4xl font-bold text-primary">
              {patient.visits.length}
            </p>
          </div>
          <div className="p-6 rounded-xl bg-card border border-border">
            <p className="text-xs text-muted-foreground uppercase tracking-wide mb-2">
              Last Visit
            </p>
            <p className="text-lg font-semibold text-foreground">
              {new Date(patient.lastVisit).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
              })}
            </p>
          </div>
        </div>
      </div>

      {/* Dental Chart Section */}
      <div className="mb-8 p-6 rounded-xl bg-card border border-border">
        <h2 className="text-lg font-bold text-foreground mb-6">Dental Chart</h2>
        <DentalChart teethStatus={patient.teethStatus} />
      </div>

      {/* Visit History Section */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-lg font-bold text-foreground">Visit History</h2>
            <p className="text-sm text-muted-foreground mt-1">
              Clinical records organized by date
            </p>
          </div>
          <button
            onClick={onAddVisit}
            className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg font-semibold hover:opacity-90 transition-opacity"
          >
            <Plus className="w-4 h-4" />
            Add Visit
          </button>
        </div>
        <VisitHistory visits={patient.visits} />
      </div>
    </div>
  )
}
