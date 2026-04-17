'use client'

import { useState } from 'react'
import { X } from 'lucide-react'

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
    tooth: '',
    condition: 'Healthy',
    notes: '',
  })

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
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">
                  Procedure <span className="text-destructive">*</span>
                </label>
                <select
                  value={formData.procedure}
                  onChange={(e) =>
                    setFormData({ ...formData, procedure: e.target.value })
                  }
                  className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  {procedures.map((proc) => (
                    <option key={proc} value={proc}>
                      {proc}
                    </option>
                  ))}
                </select>
              </div>

              {/* Tooth Number */}
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">
                  Tooth Number
                </label>
                <input
                  type="text"
                  value={formData.tooth}
                  onChange={(e) =>
                    setFormData({ ...formData, tooth: e.target.value })
                  }
                  className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="e.g., #14, #15 or 'All'"
                />
              </div>

              {/* Condition */}
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">
                  Tooth Condition
                </label>
                <select
                  value={formData.condition}
                  onChange={(e) =>
                    setFormData({ ...formData, condition: e.target.value })
                  }
                  className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  {conditions.map((cond) => (
                    <option key={cond} value={cond}>
                      {cond}
                    </option>
                  ))}
                </select>
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
