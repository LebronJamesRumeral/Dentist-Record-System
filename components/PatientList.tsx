'use client'

import { useState } from 'react'
import { Plus, Search, Calendar } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

interface Patient {
  id: number
  name: string
  age: number
  contact: string
  medicalNotes: string
  lastVisit: string
  lastNote: string
}

interface PatientListProps {
  patients: Patient[]
  onSelectPatient: (patient: Patient) => void
  onAddPatient: () => void
  embedded?: boolean
}

export default function PatientList({
  patients,
  onSelectPatient,
  onAddPatient,
  embedded = false,
}: PatientListProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  const handleSearchChange = (val: string) => {
    setSearchQuery(val)
    setCurrentPage(1)
  }

  const filteredPatients = patients.filter(
    (p) =>
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.lastNote.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.medicalNotes.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    })
  }

  const containerClass = embedded ? '' : 'p-4 md:p-8'

  // Pagination calculations
  const totalPages = Math.ceil(filteredPatients.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentPagePatients = filteredPatients.slice(startIndex, endIndex)

  return (
    <div className={containerClass}>
      {/* Header */}
      {!embedded && (
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground shadow-sm">
            Patient selection
          </div>
          <h1 className="mt-4 text-4xl font-bold tracking-tight text-foreground">
            Dental Records
          </h1>
          <p className="mt-2 max-w-2xl text-muted-foreground">
            Search, review, and open a patient record from the list below.
          </p>
        </div>
      )}

      {/* Search and Add Button */}
      <div className="mb-8 flex flex-col gap-4 rounded-2xl border border-border bg-card/80 p-4 shadow-sm md:flex-row md:items-center">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search by name or notes..."
            value={searchQuery}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="w-full rounded-xl py-3 pl-10 pr-4 text-foreground placeholder-muted-foreground shadow-sm"
          />
        </div>
        <Button onClick={onAddPatient} className="flex items-center justify-center gap-2 px-6 py-3 md:w-auto">
          <Plus className="w-5 h-5" />
          Add Patient
        </Button>
      </div>

      {/* Patients Display */}
      {filteredPatients.length > 0 ? (
        <>
          {/* Desktop Table View */}
          <div className="hidden md:block bg-card rounded-2xl border border-border shadow-sm overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-secondary/40">
                  <TableHead className="font-semibold px-6 py-4">Patient Name</TableHead>
                  <TableHead className="font-semibold px-6 py-4">Age</TableHead>
                  <TableHead className="font-semibold px-6 py-4">Contact Number</TableHead>
                  <TableHead className="font-semibold px-6 py-4">Last Visit</TableHead>
                  <TableHead className="font-semibold px-6 py-4">Last Note</TableHead>
                  <TableHead className="font-semibold px-6 py-4 text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {currentPagePatients.map((patient) => (
                  <TableRow
                    key={patient.id}
                    className="hover:bg-muted/50 cursor-pointer transition-colors"
                    onClick={() => onSelectPatient(patient)}
                  >
                    <TableCell className="font-semibold px-6 py-4 text-foreground">
                      {patient.name}
                    </TableCell>
                    <TableCell className="px-6 py-4 text-muted-foreground">
                      {patient.age}
                    </TableCell>
                    <TableCell className="px-6 py-4 text-muted-foreground">
                      {patient.contact || 'N/A'}
                    </TableCell>
                    <TableCell className="px-6 py-4 text-muted-foreground">
                      {formatDate(patient.lastVisit)}
                    </TableCell>
                    <TableCell className="px-6 py-4 text-foreground max-w-xs truncate">
                      {patient.lastNote || 'No notes'}
                    </TableCell>
                    <TableCell className="px-6 py-4 text-right" onClick={(e) => e.stopPropagation()}>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onSelectPatient(patient)}
                        className="font-semibold text-primary hover:text-primary/80"
                      >
                        View
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Mobile Cards View */}
          <div className="md:hidden space-y-4">
            {currentPagePatients.map((patient) => (
              <div
                key={patient.id}
                role="button"
                tabIndex={0}
                onClick={() => onSelectPatient(patient)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') onSelectPatient(patient)
                }}
                className="bg-card rounded-2xl border border-border p-5 shadow-sm flex flex-col gap-3 relative cursor-pointer hover:border-primary/40 transition-all duration-200"
              >
                <div className="flex items-start justify-between">
                  <h3 className="text-lg font-bold text-foreground pr-2">
                    {patient.name}
                  </h3>
                  <span className="rounded-full border border-border/80 px-2.5 py-0.5 text-xs font-semibold text-muted-foreground bg-card shadow-sm">
                    Active
                  </span>
                </div>

                <div className="text-xs text-muted-foreground flex flex-col gap-1">
                  <p className="font-medium text-foreground/80">
                    {patient.contact || 'No contact'} • Age {patient.age}
                  </p>
                  <p className="text-[11px] uppercase tracking-wider text-muted-foreground mt-0.5">
                    Last Visit: {formatDate(patient.lastVisit)}
                  </p>
                </div>

                {patient.lastNote && (
                  <div className="bg-muted/50 rounded-xl p-3 border-l-4 border-primary text-xs text-foreground/90 mt-1">
                    {patient.lastNote}
                  </div>
                )}

                <div className="flex justify-end mt-1">
                  <span className="text-sm font-bold text-primary hover:underline">
                    View
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination Control */}
          {totalPages > 1 && (
            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-t border-border pt-6">
              <p className="text-sm text-muted-foreground text-center sm:text-left">
                Showing <span className="font-semibold text-foreground">{startIndex + 1}</span> to{' '}
                <span className="font-semibold text-foreground">
                  {Math.min(endIndex, filteredPatients.length)}
                </span>{' '}
                of <span className="font-semibold text-foreground">{filteredPatients.length}</span> patients
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
        <div className="text-center py-12 bg-card rounded-2xl border border-border p-6 shadow-sm">
          <p className="text-muted-foreground">
            No patients found. Add a patient to get started.
          </p>
        </div>
      )}
    </div>
  )
}
