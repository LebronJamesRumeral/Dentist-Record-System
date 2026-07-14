'use client'

import { useState } from 'react'
import { X, ChevronDown } from 'lucide-react'

interface AddVisitModalProps {
  onClose: () => void
  onSubmit: (visit: any) => void
  patient: any
}

const procedures = [
  'Cleaning',
  'Filling',
  'Extraction',
  'Root canal',
  'Crown placement',
  'Check-up',
  'Scaling',
  'Whitening',
]

const conditions = [
  'Healthy',
  'Cavity',
  'Infected pulp',
  'Fractured',
  'Decay detected',
  'Requires extraction',
]

export default function AddVisitModal({
  onClose,
  onSubmit,
  patient,
}: AddVisitModalProps) {
  const today = new Date().toISOString().split('T')[0]

  const [formData, setFormData] = useState({
    date: today,
    procedure: 'Cleaning',
    tooth: 'All',
    condition: 'Healthy',
    notes: '',
  })

  const [isToothOpen, setIsToothOpen] = useState(false)
  const [isProcedureOpen, setIsProcedureOpen] = useState(false)
  const [isConditionOpen, setIsConditionOpen] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.date || !formData.procedure) {
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
        <div className="bg-card rounded-2xl border border-border max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-xl">
          {/* Header */}
          <div className="sticky top-0 bg-card border-b border-border p-6 flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-foreground">Add Visit</h2>
              <p className="text-sm text-muted-foreground mt-1">{patient.name}</p>
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
                  className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              {/* Procedure */}
              <div className="relative">
                <label className="block text-sm font-semibold text-foreground mb-2">
                  Procedure <span className="text-destructive">*</span>
                </label>
                <button
                  type="button"
                  onClick={() => setIsProcedureOpen(!isProcedureOpen)}
                  className="w-full flex items-center justify-between px-4 py-3 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary text-left text-sm"
                >
                  <span>{formData.procedure}</span>
                  <ChevronDown className="w-4 h-4 text-muted-foreground transition-transform duration-200" style={{ transform: isProcedureOpen ? 'rotate(180deg)' : 'none' }} />
                </button>
                {isProcedureOpen && (
                  <>
                    <div className="fixed inset-0 z-40" onClick={() => setIsProcedureOpen(false)} />
                    <div className="absolute left-0 right-0 z-50 mt-1 max-h-48 overflow-y-auto rounded-lg border border-border bg-card shadow-lg py-1 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-muted-foreground/30 [&::-webkit-scrollbar-thumb]:rounded-full">
                      {procedures.map((proc) => (
                        <button
                          key={proc}
                          type="button"
                          onClick={() => {
                            setFormData({ ...formData, procedure: proc })
                            setIsProcedureOpen(false)
                          }}
                          className={`w-full px-4 py-2 text-left hover:bg-secondary text-foreground text-sm font-medium transition-colors ${formData.procedure === proc ? 'bg-secondary' : ''}`}
                        >
                          {proc}
                        </button>
                      ))}
                    </div>
                  </>
                )}
              </div>

              {/* Tooth Number */}
              <div className="relative">
                <label className="block text-sm font-semibold text-foreground mb-2">
                  Tooth Number
                </label>
                <button
                  type="button"
                  onClick={() => setIsToothOpen(!isToothOpen)}
                  className="w-full flex items-center justify-between px-4 py-3 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary text-left text-sm"
                >
                  <span>{formData.tooth}</span>
                  <ChevronDown className="w-4 h-4 text-muted-foreground transition-transform duration-200" style={{ transform: isToothOpen ? 'rotate(180deg)' : 'none' }} />
                </button>
                {isToothOpen && (
                  <>
                    <div className="fixed inset-0 z-40" onClick={() => setIsToothOpen(false)} />
                    <div className="absolute left-0 right-0 z-50 mt-1 max-h-48 overflow-y-auto rounded-lg border border-border bg-card shadow-lg py-1 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-muted-foreground/30 [&::-webkit-scrollbar-thumb]:rounded-full">
                      <button
                        type="button"
                        onClick={() => {
                          setFormData({ ...formData, tooth: 'All' })
                          setIsToothOpen(false)
                        }}
                        className={`w-full px-4 py-2 text-left hover:bg-secondary text-foreground text-sm font-medium transition-colors ${formData.tooth === 'All' ? 'bg-secondary' : ''}`}
                      >
                        All
                      </button>
                      {Array.from({ length: 32 }, (_, i) => `#${i + 1}`).map((t) => (
                        <button
                          key={t}
                          type="button"
                          onClick={() => {
                            setFormData({ ...formData, tooth: t })
                            setIsToothOpen(false)
                          }}
                          className={`w-full px-4 py-2 text-left hover:bg-secondary text-foreground text-sm font-medium transition-colors ${formData.tooth === t ? 'bg-secondary' : ''}`}
                        >
                          Tooth {t}
                        </button>
                      ))}
                    </div>
                  </>
                )}
              </div>

              {/* Condition */}
              <div className="relative">
                <label className="block text-sm font-semibold text-foreground mb-2">
                  Tooth Condition
                </label>
                <button
                  type="button"
                  onClick={() => setIsConditionOpen(!isConditionOpen)}
                  className="w-full flex items-center justify-between px-4 py-3 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary text-left text-sm"
                >
                  <span>{formData.condition}</span>
                  <ChevronDown className="w-4 h-4 text-muted-foreground transition-transform duration-200" style={{ transform: isConditionOpen ? 'rotate(180deg)' : 'none' }} />
                </button>
                {isConditionOpen && (
                  <>
                    <div className="fixed inset-0 z-40" onClick={() => setIsConditionOpen(false)} />
                    <div className="absolute left-0 right-0 z-50 mt-1 max-h-48 overflow-y-auto rounded-lg border border-border bg-card shadow-lg py-1 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-muted-foreground/30 [&::-webkit-scrollbar-thumb]:rounded-full">
                      {conditions.map((cond) => (
                        <button
                          key={cond}
                          type="button"
                          onClick={() => {
                            setFormData({ ...formData, condition: cond })
                            setIsConditionOpen(false)
                          }}
                          className={`w-full px-4 py-2 text-left hover:bg-secondary text-foreground text-sm font-medium transition-colors ${formData.condition === cond ? 'bg-secondary' : ''}`}
                        >
                          {cond}
                        </button>
                      ))}
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Clinical Notes */}
            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">
                Clinical Notes
              </label>
              <textarea
                value={formData.notes}
                onChange={(e) =>
                  setFormData({ ...formData, notes: e.target.value })
                }
                className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                placeholder="Record treatment details, recommendations, follow-up plans..."
                rows={5}
              />
            </div>

            {/* Preview */}
            <div className="p-4 rounded-lg bg-secondary border border-border">
              <p className="text-xs text-muted-foreground uppercase tracking-wide mb-3 font-semibold">
                Visit Summary
              </p>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Date:</span>
                  <span className="font-medium text-foreground">
                    {new Date(formData.date).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Procedure:</span>
                  <span className="font-medium text-foreground">
                    {formData.procedure}
                  </span>
                </div>
                {formData.tooth && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Tooth:</span>
                    <span className="font-medium text-foreground">
                      {formData.tooth}
                    </span>
                  </div>
                )}
              </div>
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
                Save Visit
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}
