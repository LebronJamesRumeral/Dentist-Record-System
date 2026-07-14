import React from 'react'
import { Button } from '@/components/ui/button'

interface PageHeaderProps {
  title: string
  subtitle?: string
  actions?: React.ReactNode
}

export default function PageHeader({ title, subtitle, actions }: PageHeaderProps) {
  return (
    <div className="w-full">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
        <div>
          <h1 className="text-2xl md:text-4xl font-bold tracking-tight text-foreground">{title}</h1>
          {subtitle && <p className="text-muted-foreground text-sm md:text-lg mt-1">{subtitle}</p>}
        </div>
        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">{actions}</div>
      </div>
    </div>
  )
}
