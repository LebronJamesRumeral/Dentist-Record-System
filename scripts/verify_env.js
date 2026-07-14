// Simple environment verification script
// Usage: node scripts/verify_env.js

const required = [
  'NEXT_PUBLIC_SUPABASE_URL',
  'NEXT_PUBLIC_SUPABASE_ANON_KEY',
  'SUPABASE_SERVICE_ROLE_KEY',
]

console.log('Checking required environment variables...')
let ok = true
for (const key of required) {
  const val = process.env[key]
  if (!val) {
    console.warn(`MISSING: ${key}`)
    ok = false
  } else {
    console.log(`OK: ${key}`)
  }
}

if (!ok) {
  console.log('\nSome required env vars are missing. Copy .env.example to .env.local and fill the values from your Supabase project.')
  process.exit(1)
}

console.log('\nAll required env vars appear set. To verify connectivity, run a small fetch against your Supabase URL or start the app and check auth/DB operations.')
