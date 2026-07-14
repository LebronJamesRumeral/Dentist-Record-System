'use client'

import { useEffect, useState } from 'react'
import { Plus, Search, Clock } from 'lucide-react'
import PatientList from '@/components/PatientList'
import PatientRecord from '@/components/PatientRecord'
import AddPatientModal from '@/components/AddPatientModal'
import AddVisitModal from '@/components/AddVisitModal'
import { SEED_PATIENTS } from '@/lib/mock/patients'
import { Button } from '@/components/ui/button'
import PageHeader from '@/components/PageHeader'

interface Visit {
  id: number
  date: string
  procedure: string
  tooth: string
  condition: string
  notes: string
}

interface Patient {
  id: number
  external_id?: string
  name: string
  age: number
  contact?: string
  medicalNotes?: string
  lastVisit?: string
  lastNote?: string
  visits: Visit[]
  teethStatus: { [key: string]: string }
}

export default function DashboardPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [userEmail, setUserEmail] = useState('')
  const [currentPage, setCurrentPage] = useState('patients')
  const [currentView, setCurrentView] = useState<'list' | 'record'>('list')
  const [selectedPatient, setSelectedPatient] = useState<any>(null)
  const [showAddPatient, setShowAddPatient] = useState(false)
  const [showAddVisit, setShowAddVisit] = useState(false)
  const [patients, setPatients] = useState<Patient[]>(() => {
    try {
      const raw = typeof window !== 'undefined' ? window.localStorage.getItem('dv_patients') : null
      if (raw) {
        return JSON.parse(raw) as Patient[]
      }
    } catch (e) {
      // ignore parse errors
    }
    // use shared seed list
    return SEED_PATIENTS.map((p) => ({
      ...p,
      external_id: p.external_id || ((typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') ? crypto.randomUUID() : `ext-${p.id}`),
    }))
  })

  // Check authentication on mount
  useEffect(() => {
    const auth = localStorage.getItem('isAuthenticated')
    const email = localStorage.getItem('userEmail')
    if (!auth) {
      window.location.href = '/'
    } else {
      setIsAuthenticated(true)
      setUserEmail(email || '')
    }
    // persist patients to localStorage whenever they change
  }, [])

  // persist patients whenever they change
  useEffect(() => {
    try {
      window.localStorage.setItem('dv_patients', JSON.stringify(patients))
    } catch (e) {
      // ignore
    }
  }, [patients])

  const handleAddPatient = (newPatient: any) => {
    const patient = {
      id: Math.max(...patients.map((p) => p.id), 0) + 1,
      ...newPatient,
      visits: [],
      teethStatus: Object.fromEntries(Array.from({ length: 32 }, (_, i) => [i + 1, 'healthy'])),
    }
    setPatients([...patients, patient])
    setShowAddPatient(false)
  }

  const handleAddVisit = (visit: any) => {
    if (!selectedPatient) return
    const updatedPatients = patients.map((p) => {
      if (p.id === selectedPatient.id) {
        return {
          ...p,
          lastVisit: visit.date,
          lastNote: `${visit.procedure} on ${visit.tooth}`,
          visits: [{ id: Date.now(), ...visit }, ...p.visits],
        }
      }
      return p
    })
    setPatients(updatedPatients)
    setSelectedPatient(updatedPatients.find((p) => p.id === selectedPatient.id))
    setShowAddVisit(false)
  }

  if (!isAuthenticated) {
    return null
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="p-4 md:p-8 md:pl-12 pb-24 md:pb-8">
          {currentPage === 'patients' ? (
            <div>
              {currentView === 'list' ? (
                <>
                  <PageHeader title="Dental Records" subtitle="Search, review, and open a patient record from the cards below." />
                  <PatientList
                    patients={patients as any}
                    onSelectPatient={(patient) => {
                      setSelectedPatient(patient)
                      setCurrentView('record')
                    }}
                    onAddPatient={() => setShowAddPatient(true)}
                    embedded={true}
                  />
                </>
              ) : (
                <PatientRecord
                  patient={selectedPatient}
                  onBack={() => {
                    setCurrentView('list')
                    setSelectedPatient(null)
                  }}
                  onAddVisit={() => setShowAddVisit(true)}
                  embedded={true}
                />
              )}
            </div>
          ) : currentPage === 'appointments' ? (
            <></>
          ) : currentPage === 'reports' ? (
            <div className="pt-4">
              <PageHeader title="Reports & Analytics" subtitle="View analytics and download reports" />
              <div className="rounded-lg border border-border bg-card p-6 md:p-12 text-center">
                <BarChart3Icon className="w-12 h-12 md:w-16 md:h-16 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground text-base md:text-lg">Analytics dashboard coming soon</p>
              </div>
            </div>
          ) : currentPage === 'documents' ? (
            <div className="pt-4">
              <PageHeader title="Documents" subtitle="Manage and upload documents" />
              <div className="rounded-lg border border-border bg-card p-6 md:p-12 text-center">
                <DocumentIcon className="w-12 h-12 md:w-16 md:h-16 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground text-base md:text-lg">Document management coming soon</p>
              </div>
            </div>
          ) : (
            <div className="pt-4">
              <PageHeader title="Settings" subtitle="Manage clinic preferences" />
              <div className="rounded-lg border border-border bg-card p-6 md:p-12 text-center">
                <SettingsIcon className="w-12 h-12 md:w-16 md:h-16 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground text-base md:text-lg">Clinic settings coming soon</p>
              </div>
            </div>
          )}
        </div>
      {showAddPatient && (
        <AddPatientModal
          onClose={() => setShowAddPatient(false)}
          onSubmit={handleAddPatient}
        />
      )}

      {showAddVisit && selectedPatient && (
        <AddVisitModal
          onClose={() => setShowAddVisit(false)}
          onSubmit={handleAddVisit}
          patient={selectedPatient}
        />
      )}
    </div>
  )
}

function BarChart3Icon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="3" height="15" />
      <rect x="10" y="7" width="3" height="11" />
      <rect x="17" y="2" width="3" height="16" />
    </svg>
  )
}

function DocumentIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
    </svg>
  )
}

function SettingsIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="3" />
      <path d="M12 1v6m0 6v6M4.22 4.22l4.24 4.24m2.12 0l4.24-4.24M1 12h6m6 0h6m-1.78 7.78l-4.24-4.24m-2.12 0l-4.24 4.24" />
    </svg>
  )
}
