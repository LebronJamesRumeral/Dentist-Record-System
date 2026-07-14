'use client'

import { useEffect, useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import PatientRecord from '@/components/PatientRecord'
import AddVisitModal from '@/components/AddVisitModal'
import { SEED_PATIENTS } from '@/lib/mock/patients'

export default function PatientDetailPage() {
  const params = useParams()
  const id = params?.id as string
  const [patient, setPatient] = useState<any | null>(null)
  const [showAddVisit, setShowAddVisit] = useState(false)
  const router = useRouter()

  useEffect(() => {
    try {
      const raw = typeof window !== 'undefined' ? window.localStorage.getItem('dv_patients') : null
      let found = null
      if (raw) {
        const list = JSON.parse(raw)
        found = list.find((p: any) => String(p.id) === String(id) || String(p.external_id) === String(id))
      }
      // fallback to seeded patients when localStorage is empty or item not found
      if (!found) {
        found = SEED_PATIENTS.find((p: any) => String(p.id) === String(id) || String(p.external_id) === String(id))
      }
      if (found) setPatient(found)
    } catch (e) {
      console.error(e)
    }
  }, [id])

  const handleAddVisit = (visit: any) => {
    if (!patient) return
    try {
      const raw = window.localStorage.getItem('dv_patients')
      const list = raw ? JSON.parse(raw) : []
      const updated = list.map((p: any) => {
        if (String(p.id) === String(id) || String(p.external_id) === String(id)) {
          return { ...p, lastVisit: visit.date, lastNote: `${visit.procedure} on ${visit.tooth}`, visits: [{ id: Date.now(), ...visit }, ...(p.visits || [])] }
        }
        return p
      })
      window.localStorage.setItem('dv_patients', JSON.stringify(updated))
      const newPatient = updated.find((p: any) => String(p.id) === String(id) || String(p.external_id) === String(id))
      setPatient(newPatient)
      setShowAddVisit(false)
    } catch (e) {
      console.error(e)
    }
  }

  if (!patient) {
    return (
      <div className="p-8">
        <p className="text-muted-foreground">Patient not found.</p>
      </div>
    )
  }

  return (
    <div className="p-4 md:p-8">
      <PatientRecord patient={patient} onBack={() => router.back()} onAddVisit={() => setShowAddVisit(true)} />

      {showAddVisit && (
        <AddVisitModal onClose={() => setShowAddVisit(false)} onSubmit={handleAddVisit} patient={patient} />
      )}
    </div>
  )
}
