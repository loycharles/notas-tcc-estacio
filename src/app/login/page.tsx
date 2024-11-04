'use client'

import Button from '@mui/material/Button'

import { loginWithGoogle } from '@/lib/auth'

export default function LoginPage() {
  return (
    <div>
      LoginPage{' '}
      <Button
        onClick={() => {
          loginWithGoogle()
        }}
      >
        Login
      </Button>
    </div>
  )
}
