'use client'

import { useState } from 'react'
import { X } from 'lucide-react'

interface AddPatientModalProps {
  onClose: () => void
  onSubmit: (patient: any) => void
}

export default function AddPatientModal({
  onClose,
  onSubmit,
}: AddPatientModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    contact: '',
    medicalNotes: '',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.name || !formData.age) {
      alert('Please fill in all required fields')
      return
    }
    onSubmit({
      ...formData,
      age: parseInt(formData.age),
    })
  }

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 z-40"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="bg-card rounded-2xl border border-border max-w-md w-full max-h-[90vh] overflow-y-auto shadow-xl">
          {/* Header */}
          <div className="sticky top-0 bg-card border-b border-border p-6 flex items-center justify-between">
            <h2 className="text-2xl font-bold text-foreground">Add Patient</h2>
            <button
              onClick={onClose}
              className="p-1 hover:bg-secondary rounded-lg transition-colors"
            >
              <X className="w-6 h-6 text-foreground" />
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-6 space-y-5">
            {/* Full Name */}
            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">
                Full Name <span className="text-destructive">*</span>
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="John Doe"
              />
            </div>

            {/* Age */}
            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">
                Age <span className="text-destructive">*</span>
              </label>
              <input
                type="number"
                min="1"
                max="150"
                value={formData.age}
                onChange={(e) =>
                  setFormData({ ...formData, age: e.target.value })
                }
                className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="35"
              />
            </div>

            {/* Contact Number */}
            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">
                Contact Number
              </label>
              <input
                type="tel"
                value={formData.contact}
                onChange={(e) =>
                  setFormData({ ...formData, contact: e.target.value })
                }
                className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="(555) 123-4567"
              />
            </div>

            {/* Medical Notes */}
            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">
                Medical Notes
              </label>
              <textarea
                value={formData.medicalNotes}
                onChange={(e) =>
                  setFormData({ ...formData, medicalNotes: e.target.value })
                }
                className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                placeholder="Allergies, conditions, medications..."
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
                Add Patient
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}
