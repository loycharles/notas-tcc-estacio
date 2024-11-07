'use client'

import { useState } from 'react'

import { useRouter } from 'next/navigation'

import { useQuery } from '@tanstack/react-query'

import Snackbar from '@mui/material/Snackbar'
import Alert from '@mui/material/Alert'

import { MainLayout, UserAvatar, NoteForm, NoteFormMenu, BottomActionDrawer } from '@/components'
import { saveNote, getNote, deleteNote } from '@/stores/notes.store'

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

  const [note, updateNote] = useState<Note>({
    title: '',
    content: '',
    tags: [],
  })

  const [errorSnackbarOpen, setErrorSnackbarOpen] = useState(false)
  const [successSnackbarOpen, setSuccessSnackbarOpen] = useState(false)
  const [deleteSnackbarOpen, setDeleteSnackbarOpen] = useState(false)

  const [deleteDrawerOpen, setDeleteDrawerOpen] = useState(false)

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

  const handleCloseDeleteSnackbar = () => setDeleteSnackbarOpen(false)
  const handleOpenDeleteSnackbar = () => setDeleteSnackbarOpen(true)

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

  const handleDeleteNote = () => {
    deleteNote(noteId as string)
    handleOpenDeleteSnackbar()
    router.push('/notas')
  }

  return (
    <MainLayout
      title={title}
      footer={
        <NoteFormMenu
          disabled={isLoading}
          onSave={handleSaveNote}
          onDelete={noteId ? () => setDeleteDrawerOpen(true) : undefined}
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

      <Snackbar
        open={deleteSnackbarOpen}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        autoHideDuration={5000}
        onClose={handleCloseDeleteSnackbar}
      >
        <Alert
          onClose={handleCloseDeleteSnackbar}
          severity="success"
          variant="filled"
          sx={{ width: '100%' }}
        >
          Nota deletada com sucesso
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

      <BottomActionDrawer
        open={deleteDrawerOpen}
        title="Excluir nota"
        color="error"
        onClose={() => setDeleteDrawerOpen(false)}
        actionLabel="Excluir nota"
        action={handleDeleteNote}
      >
        Deseja realmente excluir a nota <strong>{note.title}</strong>?
      </BottomActionDrawer>
    </MainLayout>
  )
}
