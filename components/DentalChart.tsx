'use client'

import { useState } from 'react'
import { Smile } from 'lucide-react'

interface DentalChartProps {
  teethStatus: Record<number, string>
}

const getStatusColor = (status: string) => {
  switch (status) {
    case 'healthy':
      return 'bg-green-100 border-green-300 text-green-800'
    case 'cavity':
      return 'bg-red-100 border-red-300 text-red-800'
    case 'filling':
      return 'bg-blue-100 border-blue-300 text-blue-800'
    case 'treatment':
      return 'bg-yellow-100 border-yellow-300 text-yellow-800'
    case 'missing':
      return 'bg-gray-100 border-gray-300 text-gray-800'
    default:
      return 'bg-gray-100 border-gray-300 text-gray-800'
  }
}

const getStatusLabel = (status: string) => {
  switch (status) {
    case 'healthy':
      return 'Healthy'
    case 'cavity':
      return 'Cavity'
    case 'filling':
      return 'Filling'
    case 'treatment':
      return 'Treatment'
    case 'missing':
      return 'Missing'
    default:
      return 'Unknown'
  }
}

export default function DentalChart({ teethStatus }: DentalChartProps) {
  const [selectedTooth, setSelectedTooth] = useState<number | null>(null)

  // Teeth are numbered 1-16 (upper), 17-32 (lower)
  const upperTeeth = Array.from({ length: 16 }, (_, i) => i + 1)
  const lowerTeeth = Array.from({ length: 16 }, (_, i) => i + 17)

  return (
    <div>
      {/* Legend */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mb-8 p-4 bg-secondary rounded-lg">
        {[
          { status: 'healthy', label: 'Healthy' },
          { status: 'cavity', label: 'Cavity' },
          { status: 'filling', label: 'Filling' },
          { status: 'treatment', label: 'Treatment' },
          { status: 'missing', label: 'Missing' },
        ].map(({ status, label }) => (
          <div key={status} className="flex items-center gap-2">
            <div
              className={`w-4 h-4 rounded ${getStatusColor(status).split(' ')[0]}`}
            />
            <span className="text-xs text-foreground">{label}</span>
          </div>
        ))}
      </div>

      {/* Dental Chart */}
      <div className="space-y-8">
        {/* Upper Teeth */}
        <div>
          <h3 className="text-sm font-semibold text-foreground mb-4 px-2">
            Upper Teeth
          </h3>
          <div className="grid grid-cols-8 gap-2">
            {upperTeeth.map((tooth) => (
              <button
                key={tooth}
                onClick={() => setSelectedTooth(selectedTooth === tooth ? null : tooth)}
                className={`p-3 rounded-lg border-2 transition-all ${
                  selectedTooth === tooth ? 'ring-2 ring-primary ring-offset-2' : ''
                } ${getStatusColor(teethStatus[tooth])}`}
              >
                <div className="text-xs font-bold">{tooth}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="h-1 bg-border rounded-full" />

        {/* Lower Teeth */}
        <div>
          <h3 className="text-sm font-semibold text-foreground mb-4 px-2">
            Lower Teeth
          </h3>
          <div className="grid grid-cols-8 gap-2">
            {lowerTeeth.map((tooth) => (
              <button
                key={tooth}
                onClick={() => setSelectedTooth(selectedTooth === tooth ? null : tooth)}
                className={`p-3 rounded-lg border-2 transition-all ${
                  selectedTooth === tooth ? 'ring-2 ring-primary ring-offset-2' : ''
                } ${getStatusColor(teethStatus[tooth])}`}
              >
                <div className="text-xs font-bold">{tooth}</div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Selected Tooth Info */}
      {selectedTooth && (
        <div className="mt-8 p-6 bg-primary/5 border-l-4 border-primary rounded-lg">
          <h4 className="font-semibold text-foreground mb-2">Tooth #{selectedTooth}</h4>
          <div className="flex items-center gap-2">
            <div
              className={`w-3 h-3 rounded-full ${getStatusColor(teethStatus[selectedTooth]).split(' ')[0]}`}
            />
            <span className="text-sm text-foreground font-medium">
              {getStatusLabel(teethStatus[selectedTooth])}
            </span>
          </div>
        </div>
      )}
    </div>
  )
}
