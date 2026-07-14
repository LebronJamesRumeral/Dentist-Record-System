'use client'

import { useEffect, useState } from 'react'
import { X, ChevronDown, Search } from 'lucide-react'
import { SEED_PATIENTS } from '@/lib/mock/patients'

interface AddAppointmentModalProps {
  onClose: () => void
  onSubmit: (appointment: any) => void
}

const reasonsList = [
  'Routine Checkup',
  'Cleaning',
  'Filling',
  'Extraction',
  'Root Canal',
  'Crown placement',
  'Other',
]

const timeSlots = [
  '9:00 AM',
  '9:30 AM',
  '10:00 AM',
  '10:30 AM',
  '11:00 AM',
  '11:30 AM',
  '12:00 PM',
  '12:30 PM',
  '1:00 PM',
  '1:30 PM',
  '2:00 PM',
  '2:30 PM',
  '3:00 PM',
  '3:30 PM',
  '4:00 PM',
  '4:30 PM',
  '5:00 PM',
]

const toothConditions = [
  'Healthy',
  'Cavity',
  'Filling',
  'Missing',
  'Treatment',
]

const toothOptions = ['All', ...Array.from({ length: 32 }, (_, i) => String(i + 1))]

export default function AddAppointmentModal({ onClose, onSubmit }: AddAppointmentModalProps) {
  const today = new Date().toISOString().split('T')[0]

  const [formData, setFormData] = useState<any>({
    patient: '',
    patientExternalId: '',
    date: today,
    time: '10:00 AM',
    reason: 'Routine Checkup',
    notes: '',
    tooth: 'All',
    toothCondition: 'Healthy',
  })

  // patientsList is an array of { name, external_id }
  const [patientsList, setPatientsList] = useState<Array<{ name: string; external_id?: string }>>([])
  const [patientSearch, setPatientSearch] = useState('')

  const [isPatientOpen, setIsPatientOpen] = useState(false)
  const [isReasonOpen, setIsReasonOpen] = useState(false)
  const [isTimeOpen, setIsTimeOpen] = useState(false)
  const [isToothOpen, setIsToothOpen] = useState(false)
  const [isToothConditionOpen, setIsToothConditionOpen] = useState(false)

  useEffect(() => {
    try {
      const raw = typeof window !== 'undefined' ? window.localStorage.getItem('dv_patients') : null
      if (raw) {
        const list = JSON.parse(raw)
        setPatientsList(list.map((p: any) => ({ name: p.name, external_id: p.external_id })))
        return
      }
    } catch (e) {
      // ignore
    }

    setPatientsList(SEED_PATIENTS.map((p) => ({ name: p.name, external_id: p.external_id })))
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.patient || !formData.date || !formData.time || !formData.reason) {
      alert('Please fill in all required fields')
      return
    }
    onSubmit(formData)
  }

  return (
    <>
      <div className="fixed inset-0 bg-black/50 z-40" onClick={onClose} />
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="bg-card rounded-2xl border border-border max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-xl">
          <div className="sticky top-0 bg-card border-b border-border p-6 flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-foreground">Add Appointment</h2>
              <p className="text-sm text-muted-foreground mt-1">Schedule a new patient visit</p>
            </div>
            <button onClick={onClose} className="p-1 hover:bg-secondary rounded-lg transition-colors">
              <X className="w-6 h-6 text-foreground" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-5">
            <div className="relative">
              <label className="block text-sm font-semibold text-foreground mb-2">Patient Name <span className="text-destructive">*</span></label>
              <button
                type="button"
                onClick={() => setIsPatientOpen(!isPatientOpen)}
                className="w-full flex items-center justify-between px-4 py-3 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary text-left text-sm"
              >
                <span>{formData.patient || 'Select patient'}</span>
                <ChevronDown className="w-4 h-4 text-muted-foreground transition-transform duration-200" style={{ transform: isPatientOpen ? 'rotate(180deg)' : 'none' }} />
              </button>

              {isPatientOpen && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setIsPatientOpen(false)} />
                  <div className="absolute left-0 right-0 z-50 mt-1 max-h-48 overflow-y-auto rounded-lg border border-border bg-card shadow-lg py-1 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-muted-foreground/30 [&::-webkit-scrollbar-thumb]:rounded-full">
                    <div className="px-3 pb-2">
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <input
                          value={patientSearch}
                          onChange={(e) => setPatientSearch(e.target.value)}
                          placeholder="Search patients..."
                          className="w-full px-3 py-2 pl-9 rounded-md border border-border bg-background text-foreground text-sm"
                        />
                      </div>
                    </div>
                    {patientsList.filter((pat) => pat.name.toLowerCase().includes(patientSearch.toLowerCase())).map((pat) => (
                      <button
                        key={pat.external_id || pat.name}
                        type="button"
                        onClick={() => {
                          setFormData({ ...formData, patient: pat.name, patientExternalId: pat.external_id || '' })
                          setIsPatientOpen(false)
                        }}
                        className={`w-full px-4 py-2 text-left hover:bg-secondary text-foreground text-sm font-medium transition-colors ${formData.patient === pat.name ? 'bg-secondary' : ''}`}
                      >
                        {pat.name}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">Date <span className="text-destructive">*</span></label>
                <input
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                />
              </div>

              <div className="relative">
                <label className="block text-sm font-semibold text-foreground mb-2">Time <span className="text-destructive">*</span></label>
                <div className="relative">
                  <input
                    type="text"
                    value={formData.time}
                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                    onFocus={() => setIsTimeOpen(true)}
                    placeholder="e.g., 10:00 AM"
                    className="w-full px-4 py-3 pr-10 rounded-lg border border-border bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                  />
                  <button type="button" onClick={() => setIsTimeOpen(!isTimeOpen)} className="absolute right-3 top-1/2 -translate-y-1/2 p-0.5 hover:bg-secondary rounded-md text-muted-foreground transition-colors">
                    <ChevronDown className="w-4 h-4 transition-transform duration-200" style={{ transform: isTimeOpen ? 'rotate(180deg)' : 'none' }} />
                  </button>
                </div>

                {isTimeOpen && (
                  <>
                    <div className="fixed inset-0 z-40" onClick={() => setIsTimeOpen(false)} />
                    <div className="absolute left-0 right-0 z-50 mt-1 max-h-48 overflow-y-auto rounded-lg border border-border bg-card shadow-lg py-1 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-muted-foreground/30 [&::-webkit-scrollbar-thumb]:rounded-full">
                      {timeSlots.map((slot) => (
                        <button
                          key={slot}
                          type="button"
                          onClick={() => {
                            setFormData({ ...formData, time: slot })
                            setIsTimeOpen(false)
                          }}
                          className={`w-full px-4 py-2 text-left hover:bg-secondary text-foreground text-sm font-medium transition-colors ${formData.time === slot ? 'bg-secondary' : ''}`}
                        >
                          {slot}
                        </button>
                      ))}
                    </div>
                  </>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="relative">
                <label className="block text-sm font-semibold text-foreground mb-2">Tooth Number</label>
                <button
                  type="button"
                  onClick={() => setIsToothOpen(!isToothOpen)}
                  className="w-full flex items-center justify-between px-4 py-3 rounded-lg border border-border bg-background text-foreground text-left text-sm"
                >
                  <span>{formData.tooth || 'All'}</span>
                  <ChevronDown className="w-4 h-4 text-muted-foreground" />
                </button>

                {isToothOpen && (
                  <>
                    <div className="fixed inset-0 z-40" onClick={() => setIsToothOpen(false)} />
                    <div className="absolute left-0 right-0 z-50 mt-1 max-h-48 overflow-y-auto rounded-lg border border-border bg-card shadow-lg py-1">
                      {toothOptions.map((t) => (
                        <button
                          key={t}
                          type="button"
                          onClick={() => {
                            setFormData({ ...formData, tooth: t })
                            setIsToothOpen(false)
                          }}
                          className={`w-full px-4 py-2 text-left hover:bg-secondary text-foreground text-sm ${formData.tooth === t ? 'bg-secondary' : ''}`}
                        >
                          {t}
                        </button>
                      ))}
                    </div>
                  </>
                )}
              </div>

              <div className="relative">
                <label className="block text-sm font-semibold text-foreground mb-2">Tooth Condition</label>
                <button
                  type="button"
                  onClick={() => setIsToothConditionOpen(!isToothConditionOpen)}
                  className="w-full flex items-center justify-between px-4 py-3 rounded-lg border border-border bg-background text-foreground text-left text-sm"
                >
                  <span>{formData.toothCondition || 'Healthy'}</span>
                  <ChevronDown className="w-4 h-4 text-muted-foreground" />
                </button>

                {isToothConditionOpen && (
                  <>
                    <div className="fixed inset-0 z-40" onClick={() => setIsToothConditionOpen(false)} />
                    <div className="absolute left-0 right-0 z-50 mt-1 max-h-48 overflow-y-auto rounded-lg border border-border bg-card shadow-lg py-1">
                      {toothConditions.map((c) => (
                        <button
                          key={c}
                          type="button"
                          onClick={() => {
                            setFormData({ ...formData, toothCondition: c })
                            setIsToothConditionOpen(false)
                          }}
                          className={`w-full px-4 py-2 text-left hover:bg-secondary text-foreground text-sm ${formData.toothCondition === c ? 'bg-secondary' : ''}`}
                        >
                          {c}
                        </button>
                      ))}
                    </div>
                  </>
                )}
              </div>
            </div>

            <div className="relative">
              <label className="block text-sm font-semibold text-foreground mb-2">Reason / Procedure <span className="text-destructive">*</span></label>
              <button
                type="button"
                onClick={() => setIsReasonOpen(!isReasonOpen)}
                className="w-full flex items-center justify-between px-4 py-3 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary text-left text-sm"
              >
                <span>{formData.reason}</span>
                <ChevronDown className="w-4 h-4 text-muted-foreground transition-transform duration-200" style={{ transform: isReasonOpen ? 'rotate(180deg)' : 'none' }} />
              </button>

              {isReasonOpen && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setIsReasonOpen(false)} />
                  <div className="absolute left-0 right-0 z-50 mt-1 max-h-48 overflow-y-auto rounded-lg border border-border bg-card shadow-lg py-1 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-muted-foreground/30 [&::-webkit-scrollbar-thumb]:rounded-full">
                    {reasonsList.map((reason) => (
                      <button
                        key={reason}
                        type="button"
                        onClick={() => {
                          setFormData({ ...formData, reason })
                          setIsReasonOpen(false)
                        }}
                        className={`w-full px-4 py-2 text-left hover:bg-secondary text-foreground text-sm font-medium transition-colors ${formData.reason === reason ? 'bg-secondary' : ''}`}
                      >
                        {reason}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">Notes</label>
              <textarea
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none text-sm"
                placeholder="Any special instructions or comments..."
                rows={4}
              />
            </div>

            <div className="flex gap-3 pt-4">
              <button type="button" onClick={onClose} className="flex-1 px-4 py-3 rounded-lg border border-border text-foreground font-semibold hover:bg-secondary transition-colors">Cancel</button>
              <button type="submit" className="flex-1 px-4 py-3 rounded-lg bg-primary text-primary-foreground font-semibold hover:opacity-90 transition-opacity">Save Appointment</button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}
