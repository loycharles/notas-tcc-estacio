'use client'

import { useState } from 'react'

import { useRouter } from 'next/navigation'

import { useQuery } from '@tanstack/react-query'

import Snackbar from '@mui/material/Snackbar'
import Alert from '@mui/material/Alert'

import { MainLayout, UserAvatar, NoteForm, NoteFormMenu } from '@/components'
import { saveNote, getNote } from '@/stores/notes.store'

interface Note {
  title: string
  content: string
  tags: string[]
}

interface NoteFormWidgetProps {
  title: string
  noteId?: string
}

export const NoteFormWidget = ({ title, noteId }: NoteFormWidgetProps) => {
  const router = useRouter()

  const [errorSnackbarOpen, setErrorSnackbarOpen] = useState(false)
  const [successSnackbarOpen, setSuccessSnackbarOpen] = useState(false)

  const [note, updateNote] = useState<Note>({
    title: '',
    content: '',
    tags: ['exemple1', 'exemple2', 'exemple3', 'exemple4', 'exemple5'],
  })

  const { isLoading } = useQuery({
    queryKey: ['note', noteId],
    queryFn: () => {
      if (!noteId) {
        return null
      }

      const savedNote = getNote(noteId)

      if (!savedNote) {
        return null
      }

      updateNote(savedNote)

      return savedNote
    },
  })

  const handleCloseErrorSnackbar = () => setErrorSnackbarOpen(false)
  const handleOpenErrorSnackbar = () => setErrorSnackbarOpen(true)

  const handleCloseSuccessSnackbar = () => setSuccessSnackbarOpen(false)
  const handleOpenSuccessSnackbar = () => setSuccessSnackbarOpen(true)

  const handleSaveNote = () => {
    if (!note.title.trim() || !note.content.trim()) {
      handleOpenErrorSnackbar()

      return
    }

    saveNote({
      ...note,
      createdAt: new Date(),
      updatedAt: new Date(),
    })

    handleOpenSuccessSnackbar()

    router.push('/notas')
  }

  return (
    <MainLayout
      title={title}
      footer={
        <NoteFormMenu
          disabled={isLoading}
          onSave={handleSaveNote}
          onDelete={() => router.push('/notas')}
        />
      }
      headerAside={<UserAvatar />}
    >
      <Snackbar
        open={errorSnackbarOpen}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        autoHideDuration={6000}
        onClose={handleCloseErrorSnackbar}
      >
        <Alert
          onClose={handleCloseErrorSnackbar}
          severity="error"
          variant="filled"
          sx={{ width: '100%' }}
        >
          Preencha o título e o conteúdo da nota
        </Alert>
      </Snackbar>

      <Snackbar
        open={successSnackbarOpen}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        autoHideDuration={5000}
        onClose={handleCloseSuccessSnackbar}
      >
        <Alert
          onClose={handleCloseSuccessSnackbar}
          severity="success"
          variant="filled"
          sx={{ width: '100%' }}
        >
          Nota salva com sucesso
        </Alert>
      </Snackbar>

      <NoteForm
        title={note.title}
        content={note.content}
        tags={note.tags}
        disabled={isLoading}
        onTitleChange={(title) => updateNote((current) => ({ ...current, title }))}
        onContentChange={(content) => updateNote((current) => ({ ...current, content }))}
        onTagsChange={(tags) => updateNote((current) => ({ ...current, tags }))}
      />
    </MainLayout>
  )
}
