export interface Visit {
  id: number
  date: string
  procedure: string
  tooth: string
  condition: string
  notes: string
}

export interface Patient {
  id: number
  external_id?: string
  name: string
  age: number
  contact?: string
  medicalNotes?: string
  lastVisit?: string
  lastNote?: string
  visits: Visit[]
  teethStatus: { [key: string]: string }
}

export const SEED_PATIENTS: Patient[] = [
  {
    id: 1,
    external_id: 'ext-1',
    name: 'Sarah Johnson',
    age: 34,
    contact: '(555) 123-4567',
    medicalNotes: 'Penicillin allergy, high blood pressure',
    lastVisit: '2024-04-10',
    lastNote: 'Needs filling on tooth #14',
    visits: [
      {
        id: 1,
        date: '2024-04-10',
        procedure: 'Cleaning',
        tooth: '#14, #15',
        condition: 'Cavity detected',
        notes: 'Upper molars show signs of decay. Recommended filling.',
      },
      {
        id: 2,
        date: '2024-03-15',
        procedure: 'Check-up',
        tooth: 'All',
        condition: 'Generally healthy',
        notes: 'Routine examination. Scaling recommended.',
      },
    ],
    teethStatus: {
      1: 'healthy', 2: 'healthy', 3: 'healthy', 4: 'healthy', 5: 'filling', 6: 'healthy', 7: 'healthy', 8: 'healthy',
      9: 'healthy', 10: 'healthy', 11: 'cavity', 12: 'healthy', 13: 'healthy', 14: 'cavity', 15: 'cavity', 16: 'healthy',
      17: 'healthy', 18: 'healthy', 19: 'healthy', 20: 'healthy', 21: 'healthy', 22: 'healthy', 23: 'healthy', 24: 'missing',
      25: 'healthy', 26: 'healthy', 27: 'healthy', 28: 'healthy', 29: 'healthy', 30: 'healthy', 31: 'healthy', 32: 'healthy',
    },
  },
  {
    id: 2,
    external_id: 'ext-2',
    name: 'Michael Chen',
    age: 52,
    contact: '(555) 234-5678',
    medicalNotes: 'Diabetic, takes Metformin',
    lastVisit: '2024-04-05',
    lastNote: 'Root canal therapy scheduled',
    visits: [
      {
        id: 3,
        date: '2024-04-05',
        procedure: 'Root canal',
        tooth: '#30',
        condition: 'Infected pulp',
        notes: 'Initial treatment. Follow-up in 2 weeks.',
      },
    ],
    teethStatus: Object.fromEntries(Array.from({ length: 32 }, (_, i) => [i + 1, 'healthy'])) as { [key: string]: string },
  },
  {
    id: 3,
    external_id: 'ext-3',
    name: 'Emily Rodriguez',
    age: 28,
    contact: '(555) 345-6789',
    medicalNotes: 'Anxiety disorder, bruxism noted',
    lastVisit: '2024-04-08',
    lastNote: 'Ongoing treatment',
    visits: [
      {
        id: 4,
        date: '2024-04-08',
        procedure: 'Filling',
        tooth: '#8',
        condition: 'Small cavity',
        notes: 'Composite filling placed. Patient advised about grinding.',
      },
    ],
    teethStatus: Object.fromEntries(Array.from({ length: 32 }, (_, i) => [i + 1, 'healthy'])) as { [key: string]: string },
  },
  // additional seeded patients (ids 4..12)
  ...Array.from({ length: 9 }, (_, idx) => {
    const i = idx + 4
    return {
      id: i,
      external_id: `ext-${i}`,
      name: ['James Carter','Olivia Vance','Robert Downey','Jessica Alba','David Beckham','Emma Watson','William Prince','Sophia Loren','Henry Cavill'][idx],
      age: [41,24,58,39,49,33,45,72,36][idx],
      contact: `(555) ${[ '456-7890','567-8901','678-9012','789-0123','890-1234','901-2345','012-3456','123-9876','234-8765' ][idx]}`,
      medicalNotes: ['No known allergies','Sensitive teeth','Taking blood thinners','Pregnancy patient (2nd trimester)','Bruxism, uses nightguard','Allergic to latex','High cholesterol','Osteoporosis medications','Healthy, active patient'][idx],
      lastVisit: ['2024-04-11','2024-04-02','2024-04-12','2024-03-28','2024-04-01','2024-04-04','2024-04-06','2024-03-20','2024-04-14'][idx],
      lastNote: ['Check-up next month','Recommended sensitivity toothpaste','Teeth cleaning completed','Routine scaling done','Nightguard adjustment check','Small pit on tooth #19 monitored','Routine check-up scheduled','Denture adjustments','Routine scaling completed'][idx],
      visits: [],
      teethStatus: Object.fromEntries(Array.from({ length: 32 }, (_, i) => [i + 1, 'healthy'])) as { [key: string]: string },
    }
  })
]
