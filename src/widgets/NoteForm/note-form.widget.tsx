'use client'

import { useState } from 'react'

import { useRouter } from 'next/navigation'

import { useQuery } from '@tanstack/react-query'
import { toast } from 'react-toastify'

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

  const handleSaveNote = () => {
    if (!note.title.trim() || !note.content.trim()) {
      toast.error('Preencha o título e o conteúdo da nota', {
        autoClose: 5000,
        position: 'top-center',
        closeOnClick: true,
      })

      return
    }

    saveNote({
      ...note,
      createdAt: new Date(),
      updatedAt: new Date(),
    })

    toast.success('Nota salva com sucesso', {
      autoClose: 5000,
      position: 'top-center',
      closeOnClick: true,
    })

    router.push('/notas')
  }

  const handleDeleteNote = () => {
    deleteNote(noteId as string)

    toast.success('Nota deletada com sucesso', {
      autoClose: 5000,
      position: 'top-center',
      closeOnClick: true,
    })

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
