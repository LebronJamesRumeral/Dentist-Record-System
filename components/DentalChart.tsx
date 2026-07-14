'use client'

import { useState } from 'react'
import { Smile } from 'lucide-react'

interface DentalChartProps {
  teethStatus: Record<number, string>
}

const getStatusColor = (status: string) => {
  switch (status) {
    case 'healthy':
      return { bg: 'bg-green-50', border: 'border-green-300', text: 'text-green-800' }
    case 'cavity':
      return { bg: 'bg-red-50', border: 'border-red-300', text: 'text-red-800' }
    case 'filling':
      return { bg: 'bg-blue-50', border: 'border-blue-300', text: 'text-blue-800' }
    case 'treatment':
      return { bg: 'bg-yellow-50', border: 'border-yellow-300', text: 'text-yellow-800' }
    case 'missing':
      return { bg: 'bg-gray-100', border: 'border-gray-300', text: 'text-gray-800' }
    default:
      return { bg: 'bg-gray-100', border: 'border-gray-300', text: 'text-gray-800' }
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
      <div className="mb-8">
        <div className="rounded-2xl bg-card p-4">
          <div className="flex flex-wrap items-center gap-4">
            {[{
              status: 'healthy',
              label: 'Healthy'
            },{
              status: 'cavity',
              label: 'Cavity'
            },{
              status: 'filling',
              label: 'Filling'
            },{
              status: 'treatment',
              label: 'Treatment'
            },{
              status: 'missing',
              label: 'Missing'
            }].map(({status,label}) => {
              const c = getStatusColor(status)
              return (
                <div key={status} className="flex items-center gap-3">
                  <div className={`w-4 h-4 rounded-md border ${c.border} ${c.bg}`} />
                  <span className="text-sm text-muted-foreground">{label}</span>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Dental Chart */}
      <div className="space-y-8 overflow-x-auto pb-4 -mx-6 px-6 md:mx-0 md:px-0 [&::-webkit-scrollbar]:h-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-muted-foreground/30 [&::-webkit-scrollbar-thumb]:rounded-full">
        <div className="min-w-[640px] space-y-8">
          {/* Upper Teeth */}
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-4 px-2">
              Upper Teeth
            </h3>
            <div className="grid grid-cols-8 gap-3">
              {upperTeeth.map((tooth) => {
                const c = getStatusColor(teethStatus[tooth])
                return (
                  <button
                    key={tooth}
                    onClick={() => setSelectedTooth(selectedTooth === tooth ? null : tooth)}
                    className={`flex items-center justify-center h-14 rounded-xl border-2 bg-white/40 text-sm font-semibold transition-shadow ${c.bg} ${c.border} ${c.text} hover:shadow-md ${selectedTooth === tooth ? 'ring-4 ring-primary/30' : ''}`}
                  >
                    {tooth}
                  </button>
                )
              })}
            </div>
          </div>

          {/* Divider */}
          <div className="h-1 bg-border rounded-full" />

          {/* Lower Teeth */}
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-4 px-2">
              Lower Teeth
            </h3>
            <div className="grid grid-cols-8 gap-3">
              {lowerTeeth.map((tooth) => {
                const c = getStatusColor(teethStatus[tooth])
                return (
                  <button
                    key={tooth}
                    onClick={() => setSelectedTooth(selectedTooth === tooth ? null : tooth)}
                    className={`flex items-center justify-center h-14 rounded-xl border-2 bg-white/40 text-sm font-semibold transition-shadow ${c.bg} ${c.border} ${c.text} hover:shadow-md ${selectedTooth === tooth ? 'ring-4 ring-primary/30' : ''}`}
                  >
                    {tooth}
                  </button>
                )
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Selected Tooth Info */}
      {selectedTooth && (
        <div className="mt-8 rounded-2xl border border-border bg-card p-6 shadow-sm">
          <h4 className="mb-2 text-lg font-semibold text-foreground">Tooth #{selectedTooth}</h4>
          <div className="flex items-center gap-3">
            <div className={`h-4 w-4 rounded-full ${getStatusColor(teethStatus[selectedTooth]).bg} ${getStatusColor(teethStatus[selectedTooth]).border}`} />
            <div>
              <div className="text-sm font-medium text-foreground">{getStatusLabel(teethStatus[selectedTooth])}</div>
              <div className="text-xs text-muted-foreground">Click a tooth to toggle selection</div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
