'use client'

import { useState } from 'react'

import { useRouter } from 'next/navigation'

import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'

import { MainLayout, MainMenu, NoteCard, UserAvatar } from '@/components'
import { useNotesStore } from '@/stores/notes.store'

import styles from './page.styles.module.scss'

export default function NotasPage() {
  const router = useRouter()

  const [search, setSearch] = useState('')
  const term = search.toLowerCase().trim()

  const notes = useNotesStore((state) => state.notes)
  const empty = notes.length === 0

  const filteredNotes = notes.filter((note) => {
    if (!Boolean(term)) {
      return true
    }

    const titleMatch = note.title.toLowerCase().includes(term)
    if (titleMatch) {
      return true
    }

    const contentMatch = note.content.toLowerCase().includes(term)
    if (contentMatch) {
      return true
    }

    const tagsMatch = note.tags.some((tag) => tag.toLowerCase().includes(term))
    if (tagsMatch) {
      return true
    }

    return false
  })

  const getContent = () => {
    if (empty) {
      return (
        <div className={styles.empty}>
          <img
            src="/images/empty.png"
            alt="Nenhuma nota encontrada"
          />
        </div>
      )
    }

    return (
      <>
        <Typography
          variant="subtitle1"
          gutterBottom
        >
          {filteredNotes.length} notas
        </Typography>

        <div className={styles.notes}>
          {filteredNotes.map((note) => (
            <NoteCard
              key={note.id}
              note={note}
            />
          ))}
        </div>
      </>
    )
  }

  return (
    <MainLayout
      title="Notas"
      footer={<MainMenu action={() => router.push('/notas/criar')} />}
      top={
        empty ? null : (
          <TextField
            label="Pesquisar notas"
            variant="outlined"
            size="small"
            sx={{ width: '100%' }}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        )
      }
      headerAside={<UserAvatar />}
    >
      {getContent()}
    </MainLayout>
  )
}
