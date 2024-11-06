'use client'

import { useState } from 'react'

import { MainLayout, UserAvatar, NoteForm, NoteFormMenu } from '@/components'

interface Note {
  title: string
  content: string
  tags: string[]
}

export default function CriarNotaPage() {
  const [note, updateNote] = useState<Note>({
    title: '',
    content: '',
    tags: [],
  })

  return (
    <MainLayout
      title="Criar Nota"
      footer={<NoteFormMenu />}
      headerAside={<UserAvatar />}
    >
      <NoteForm
        title={note.title}
        content={note.content}
        tags={note.tags}
        onTitleChange={(title) => updateNote((current) => ({ ...current, title }))}
        onContentChange={(content) => updateNote((current) => ({ ...current, content }))}
        onTagsChange={(tags) => updateNote((current) => ({ ...current, tags }))}
      />
    </MainLayout>
  )
}
