'use client'

import { Calendar, FileText } from 'lucide-react'

interface Visit {
  id: number
  date: string
  procedure: string
  tooth: string
  condition: string
  notes: string
}

interface VisitHistoryProps {
  visits: Visit[]
}

export default function VisitHistory({ visits }: VisitHistoryProps) {
  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  return (
    <div>
      {visits.length > 0 ? (
        <div className="space-y-4">
          {visits.map((visit, index) => (
            <div key={visit.id} className="relative">
              {/* Timeline line */}
              {index !== visits.length - 1 && (
                <div className="absolute left-6 top-16 h-12 border-l-2 border-border" />
              )}

              <div className="p-6 rounded-xl bg-card border border-border hover:border-primary transition-colors">
                {/* Date and Procedure Header */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10">
                      <Calendar className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground uppercase tracking-wide">
                        Date
                      </p>
                      <p className="text-lg font-bold text-foreground">
                        {formatDate(visit.date)}
                      </p>
                    </div>
                  </div>
                  <div className="inline-flex px-3 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-semibold">
                    {visit.procedure}
                  </div>
                </div>

                {/* Procedure Details Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
                  {/* Tooth Number */}
                  <div className="p-4 rounded-lg bg-secondary">
                    <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">
                      Tooth Number
                    </p>
                    <p className="font-semibold text-foreground">{visit.tooth}</p>
                  </div>

                  {/* Condition */}
                  <div className="p-4 rounded-lg bg-secondary">
                    <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">
                      Condition
                    </p>
                    <p className="font-semibold text-foreground">{visit.condition}</p>
                  </div>

                  {/* Procedure */}
                  <div className="p-4 rounded-lg bg-secondary">
                    <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">
                      Status
                    </p>
                    <p className="font-semibold text-foreground">Completed</p>
                  </div>
                </div>

                {/* Clinical Notes */}
                {visit.notes && (
                  <div className="p-4 rounded-lg bg-muted border-l-4 border-primary flex gap-3">
                    <FileText className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <div className="flex-1">
                      <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">
                        Clinical Notes
                      </p>
                      <p className="text-sm text-foreground leading-relaxed">
                        {visit.notes}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 px-6 rounded-xl bg-card border border-border">
          <Calendar className="w-12 h-12 text-muted-foreground mx-auto mb-3 opacity-50" />
          <p className="text-foreground font-medium">No visits recorded</p>
          <p className="text-muted-foreground text-sm">
            Add a visit to get started
          </p>
        </div>
      )}
    </div>
  )
}
