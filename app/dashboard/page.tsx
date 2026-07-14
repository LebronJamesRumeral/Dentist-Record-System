'use client'

import { useEffect, useState } from 'react'
import { Plus, Search, Clock } from 'lucide-react'
import Sidebar from '@/components/Sidebar'
import PatientList from '@/components/PatientList'
import PatientRecord from '@/components/PatientRecord'
import AddPatientModal from '@/components/AddPatientModal'
import AddVisitModal from '@/components/AddVisitModal'
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
  name: string
  age: number
  contact: string
  medicalNotes: string
  lastVisit: string
  lastNote: string
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
  const [patients, setPatients] = useState<Patient[]>([
    {
      id: 1,
      name: 'Sarah Johnson',
      age: 34,
      contact: '(555) 123-4567',
      medicalNotes: 'Penicillin allergy, high blood pressure',
      lastVisit: '2024-04-10',
      lastNote: 'Needs filling on tooth #14',
      visits: [
        {
          id: 1,
          date: '2024-04-10',
          procedure: 'Cleaning',
          tooth: '#14, #15',
          condition: 'Cavity detected',
          notes: 'Upper molars show signs of decay. Recommended filling.',
        },
        {
          id: 2,
          date: '2024-03-15',
          procedure: 'Check-up',
          tooth: 'All',
          condition: 'Generally healthy',
          notes: 'Routine examination. Scaling recommended.',
        },
      ],
      teethStatus: {
        1: 'healthy', 2: 'healthy', 3: 'healthy', 4: 'healthy', 5: 'filling', 6: 'healthy', 7: 'healthy', 8: 'healthy',
        9: 'healthy', 10: 'healthy', 11: 'cavity', 12: 'healthy', 13: 'healthy', 14: 'cavity', 15: 'cavity', 16: 'healthy',
        17: 'healthy', 18: 'healthy', 19: 'healthy', 20: 'healthy', 21: 'healthy', 22: 'healthy', 23: 'healthy', 24: 'missing',
        25: 'healthy', 26: 'healthy', 27: 'healthy', 28: 'healthy', 29: 'healthy', 30: 'healthy', 31: 'healthy', 32: 'healthy',
      },
    },
    {
      id: 2,
      name: 'Michael Chen',
      age: 52,
      contact: '(555) 234-5678',
      medicalNotes: 'Diabetic, takes Metformin',
      lastVisit: '2024-04-05',
      lastNote: 'Root canal therapy scheduled',
      visits: [
        {
          id: 3,
          date: '2024-04-05',
          procedure: 'Root canal',
          tooth: '#30',
          condition: 'Infected pulp',
          notes: 'Initial treatment. Follow-up in 2 weeks.',
        },
      ],
      teethStatus: {
        1: 'healthy', 2: 'healthy', 3: 'healthy', 4: 'healthy', 5: 'healthy', 6: 'healthy', 7: 'healthy', 8: 'healthy',
        9: 'healthy', 10: 'healthy', 11: 'healthy', 12: 'healthy', 13: 'healthy', 14: 'healthy', 15: 'healthy', 16: 'healthy',
        17: 'healthy', 18: 'healthy', 19: 'healthy', 20: 'healthy', 21: 'healthy', 22: 'healthy', 23: 'healthy', 24: 'healthy',
        25: 'healthy', 26: 'healthy', 27: 'healthy', 28: 'healthy', 29: 'healthy', 30: 'treatment', 31: 'healthy', 32: 'healthy',
      },
    },
    {
      id: 3,
      name: 'Emily Rodriguez',
      age: 28,
      contact: '(555) 345-6789',
      medicalNotes: 'Anxiety disorder, bruxism noted',
      lastVisit: '2024-04-08',
      lastNote: 'Ongoing treatment',
      visits: [
        {
          id: 4,
          date: '2024-04-08',
          procedure: 'Filling',
          tooth: '#8',
          condition: 'Small cavity',
          notes: 'Composite filling placed. Patient advised about grinding.',
        },
      ],
      teethStatus: {
        1: 'healthy', 2: 'healthy', 3: 'healthy', 4: 'healthy', 5: 'healthy', 6: 'healthy', 7: 'healthy', 8: 'filling',
        9: 'healthy', 10: 'healthy', 11: 'healthy', 12: 'healthy', 13: 'healthy', 14: 'healthy', 15: 'healthy', 16: 'healthy',
        17: 'healthy', 18: 'healthy', 19: 'healthy', 20: 'healthy', 21: 'healthy', 22: 'healthy', 23: 'healthy', 24: 'healthy',
        25: 'healthy', 26: 'healthy', 27: 'healthy', 28: 'healthy', 29: 'healthy', 30: 'healthy', 31: 'healthy', 32: 'healthy',
      },
    },
    {
      id: 4,
      name: 'James Carter',
      age: 41,
      contact: '(555) 456-7890',
      medicalNotes: 'No known allergies',
      lastVisit: '2024-04-11',
      lastNote: 'Check-up next month',
      visits: [],
      teethStatus: Object.fromEntries(Array.from({ length: 32 }, (_, i) => [i + 1, 'healthy'])),
    },
    {
      id: 5,
      name: 'Olivia Vance',
      age: 24,
      contact: '(555) 567-8901',
      medicalNotes: 'Sensitive teeth',
      lastVisit: '2024-04-02',
      lastNote: 'Recommended sensitivity toothpaste',
      visits: [],
      teethStatus: Object.fromEntries(Array.from({ length: 32 }, (_, i) => [i + 1, 'healthy'])),
    },
    {
      id: 6,
      name: 'Robert Downey',
      age: 58,
      contact: '(555) 678-9012',
      medicalNotes: 'Taking blood thinners',
      lastVisit: '2024-04-12',
      lastNote: 'Teeth cleaning completed',
      visits: [],
      teethStatus: Object.fromEntries(Array.from({ length: 32 }, (_, i) => [i + 1, 'healthy'])),
    },
    {
      id: 7,
      name: 'Jessica Alba',
      age: 39,
      contact: '(555) 789-0123',
      medicalNotes: 'Pregnancy patient (2nd trimester)',
      lastVisit: '2024-03-28',
      lastNote: 'Routine scaling done',
      visits: [],
      teethStatus: Object.fromEntries(Array.from({ length: 32 }, (_, i) => [i + 1, 'healthy'])),
    },
    {
      id: 8,
      name: 'David Beckham',
      age: 49,
      contact: '(555) 890-1234',
      medicalNotes: 'Bruxism, uses nightguard',
      lastVisit: '2024-04-01',
      lastNote: 'Nightguard adjustment check',
      visits: [],
      teethStatus: Object.fromEntries(Array.from({ length: 32 }, (_, i) => [i + 1, 'healthy'])),
    },
    {
      id: 9,
      name: 'Emma Watson',
      age: 33,
      contact: '(555) 901-2345',
      medicalNotes: 'Allergic to latex',
      lastVisit: '2024-04-04',
      lastNote: 'Small pit on tooth #19 monitored',
      visits: [],
      teethStatus: Object.fromEntries(Array.from({ length: 32 }, (_, i) => [i + 1, 'healthy'])),
    },
    {
      id: 10,
      name: 'William Prince',
      age: 45,
      contact: '(555) 012-3456',
      medicalNotes: 'High cholesterol',
      lastVisit: '2024-04-06',
      lastNote: 'Routine check-up scheduled',
      visits: [],
      teethStatus: Object.fromEntries(Array.from({ length: 32 }, (_, i) => [i + 1, 'healthy'])),
    },
    {
      id: 11,
      name: 'Sophia Loren',
      age: 72,
      contact: '(555) 123-9876',
      medicalNotes: 'Osteoporosis medications',
      lastVisit: '2024-03-20',
      lastNote: 'Denture adjustments',
      visits: [],
      teethStatus: Object.fromEntries(Array.from({ length: 32 }, (_, i) => [i + 1, 'healthy'])),
    },
    {
      id: 12,
      name: 'Henry Cavill',
      age: 36,
      contact: '(555) 234-8765',
      medicalNotes: 'Healthy, active patient',
      lastVisit: '2024-04-14',
      lastNote: 'Routine scaling completed',
      visits: [],
      teethStatus: Object.fromEntries(Array.from({ length: 32 }, (_, i) => [i + 1, 'healthy'])),
    },
  ])

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
  }, [])

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
    <div className="flex md:flex-row flex-col h-screen bg-background">
      {/* Sidebar (desktop) and bottom nav (mobile) */}
      <Sidebar
        currentPage={currentPage}
        onNavigate={(page) => {
          if (page === 'appointments') {
            window.location.href = '/dashboard/appointment';
          } else if (page === 'patients') {
            window.location.href = '/dashboard';
          } else if (page === 'reports') {
            window.location.href = '/dashboard/reports';
          } else if (page === 'documents') {
            window.location.href = '/dashboard/documents';
          } else if (page === 'settings') {
            window.location.href = '/dashboard/settings';
          } else {
            setCurrentPage(page);
          }
        }}
        userEmail={userEmail}
      />

      <main className="flex-1 overflow-auto">
        <div className="p-4 md:p-8 md:pl-12 pb-24 md:pb-8">
          {currentPage === 'patients' ? (
            <div>
              {currentView === 'list' ? (
                <>
                  <PageHeader title="Dental Records" subtitle="Search, review, and open a patient record from the cards below." />
                  <PatientList
                    patients={patients}
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
      </main>

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
