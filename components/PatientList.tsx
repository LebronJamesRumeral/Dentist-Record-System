'use client'

import { useState } from 'react'
import { Plus, Search, Calendar } from 'lucide-react'

interface Patient {
  id: number
  name: string
  age: number
  lastVisit: string
  lastNote: string
}

interface PatientListProps {
  patients: Patient[]
  onSelectPatient: (patient: Patient) => void
  onAddPatient: () => void
}

export default function PatientList({
  patients,
  onSelectPatient,
  onAddPatient,
}: PatientListProps) {
  const [searchQuery, setSearchQuery] = useState('')

  const filteredPatients = patients.filter(
    (p) =>
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.lastNote.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    })
  }

  return (
    <div className="p-4 md:p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-foreground mb-2">
          Dental Records
        </h1>
        <p className="text-muted-foreground">
          Manage patient records and track dental treatments
        </p>
      </div>

      {/* Search and Add Button */}
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
          <input
            type="text"
            placeholder="Search by name or notes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 rounded-lg border border-border bg-card text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        <button
          onClick={onAddPatient}
          className="flex items-center justify-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:opacity-90 transition-opacity"
        >
          <Plus className="w-5 h-5" />
          Add Patient
        </button>
      </div>

      {/* Patient Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPatients.length > 0 ? (
          filteredPatients.map((patient) => (
            <button
              key={patient.id}
              onClick={() => onSelectPatient(patient)}
              className="text-left p-6 rounded-xl bg-card border border-border hover:border-primary hover:shadow-lg transition-all duration-200 cursor-pointer group"
            >
              {/* Patient Name */}
              <h3 className="text-xl font-bold text-foreground mb-1 group-hover:text-primary transition-colors">
                {patient.name}
              </h3>

              {/* Age */}
              <p className="text-sm text-muted-foreground mb-4">Age: {patient.age}</p>

              {/* Last Visit */}
              <div className="flex items-start gap-3 mb-3 p-3 bg-secondary rounded-lg">
                <Calendar className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                <div className="flex-1">
                  <p className="text-xs text-muted-foreground">Last Visit</p>
                  <p className="text-sm font-semibold text-foreground">
                    {formatDate(patient.lastVisit)}
                  </p>
                </div>
              </div>

              {/* Last Note */}
              <p className="text-sm text-foreground bg-muted rounded-lg p-3 border-l-4 border-primary">
                {patient.lastNote}
              </p>
            </button>
          ))
        ) : (
          <div className="col-span-full text-center py-12">
            <p className="text-muted-foreground">
              No patients found. Add a patient to get started.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
