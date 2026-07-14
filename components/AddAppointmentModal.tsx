'use client'

import { useState } from 'react'
import { X, ChevronDown } from 'lucide-react'

interface AddAppointmentModalProps {
  onClose: () => void
  onSubmit: (appointment: any) => void
}

const patientsList = [
  'Sarah Johnson',
  'Michael Chen',
  'Emily Rodriguez',
]

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

export default function AddAppointmentModal({
  onClose,
  onSubmit,
}: AddAppointmentModalProps) {
  const today = new Date().toISOString().split('T')[0]

  const [formData, setFormData] = useState({
    patient: 'Sarah Johnson',
    date: today,
    time: '10:00 AM',
    reason: 'Routine Checkup',
    notes: '',
  })

  const [isPatientOpen, setIsPatientOpen] = useState(false)
  const [isReasonOpen, setIsReasonOpen] = useState(false)
  const [isTimeOpen, setIsTimeOpen] = useState(false)

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
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/50 z-40" onClick={onClose} />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="bg-card rounded-2xl border border-border max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-xl">
          {/* Header */}
          <div className="sticky top-0 bg-card border-b border-border p-6 flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-foreground">Add Appointment</h2>
              <p className="text-sm text-muted-foreground mt-1">Schedule a new patient visit</p>
            </div>
            <button
              onClick={onClose}
              className="p-1 hover:bg-secondary rounded-lg transition-colors"
            >
              <X className="w-6 h-6 text-foreground" />
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-6 space-y-5">
            {/* Patient Name */}
            <div className="relative">
              <label className="block text-sm font-semibold text-foreground mb-2">
                Patient Name <span className="text-destructive">*</span>
              </label>
              <button
                type="button"
                onClick={() => setIsPatientOpen(!isPatientOpen)}
                className="w-full flex items-center justify-between px-4 py-3 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary text-left text-sm"
              >
                <span>{formData.patient}</span>
                <ChevronDown className="w-4 h-4 text-muted-foreground transition-transform duration-200" style={{ transform: isPatientOpen ? 'rotate(180deg)' : 'none' }} />
              </button>
              {isPatientOpen && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setIsPatientOpen(false)} />
                  <div className="absolute left-0 right-0 z-50 mt-1 max-h-48 overflow-y-auto rounded-lg border border-border bg-card shadow-lg py-1 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-muted-foreground/30 [&::-webkit-scrollbar-thumb]:rounded-full">
                    {patientsList.map((pat) => (
                      <button
                        key={pat}
                        type="button"
                        onClick={() => {
                          setFormData({ ...formData, patient: pat })
                          setIsPatientOpen(false)
                        }}
                        className={`w-full px-4 py-2 text-left hover:bg-secondary text-foreground text-sm font-medium transition-colors ${formData.patient === pat ? 'bg-secondary' : ''}`}
                      >
                        {pat}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {/* Date */}
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">
                  Date <span className="text-destructive">*</span>
                </label>
                <input
                  type="date"
                  value={formData.date}
                  onChange={(e) =>
                    setFormData({ ...formData, date: e.target.value })
                  }
                  className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                />
              </div>

              {/* Time */}
              <div className="relative">
                <label className="block text-sm font-semibold text-foreground mb-2">
                  Time <span className="text-destructive">*</span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={formData.time}
                    onChange={(e) =>
                      setFormData({ ...formData, time: e.target.value })
                    }
                    onFocus={() => setIsTimeOpen(true)}
                    placeholder="e.g., 10:00 AM"
                    className="w-full px-4 py-3 pr-10 rounded-lg border border-border bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                  />
                  <button
                    type="button"
                    onClick={() => setIsTimeOpen(!isTimeOpen)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-0.5 hover:bg-secondary rounded-md text-muted-foreground transition-colors"
                  >
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

            {/* Reason */}
            <div className="relative">
              <label className="block text-sm font-semibold text-foreground mb-2">
                Reason / Procedure <span className="text-destructive">*</span>
              </label>
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
                          setFormData({ ...formData, reason: reason })
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

            {/* Notes */}
            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">
                Notes
              </label>
              <textarea
                value={formData.notes}
                onChange={(e) =>
                  setFormData({ ...formData, notes: e.target.value })
                }
                className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none text-sm"
                placeholder="Any special instructions or comments..."
                rows={4}
              />
            </div>

            {/* Buttons */}
            <div className="flex gap-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-4 py-3 rounded-lg border border-border text-foreground font-semibold hover:bg-secondary transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 px-4 py-3 rounded-lg bg-primary text-primary-foreground font-semibold hover:opacity-90 transition-opacity"
              >
                Save Appointment
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}
