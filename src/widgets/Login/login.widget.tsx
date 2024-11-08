'use client'

import Button from '@mui/material/Button'

import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome'

import { loginWithGoogle } from '@/lib/auth'
import { GoogleIcon } from '@/icons'

import styles from './login.styles.module.scss'

export const LoginWidget = () => {
  return (
    <div className={styles.layout}>
      <header className={styles.header}>
        <h1 className={styles.title}>Notas</h1>
      </header>
      <div className={styles.top}>
        <div className={styles.callout}>
          <div>
            <AutoAwesomeIcon sx={{ width: 32, height: 32 }} />
          </div>
          <div>
            <p>Organize suas notas gerando tags com IA</p>
          </div>
        </div>
      </div>
      <main className={styles.main} />
      <div className={styles.footer}>
        <Button
          variant="contained"
          color="white"
          startIcon={
            <GoogleIcon
              width={24}
              height={24}
            />
          }
          sx={{ width: '100%' }}
          onClick={() => {
            loginWithGoogle()
          }}
        >
          Entrar com o Google
        </Button>
      </div>
    </div>
  )
}
