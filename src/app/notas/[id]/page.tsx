'use client'

import { useParams } from 'next/navigation'

import { NoteFormWidget } from '@/widgets'

export default function EditarNotaPage() {
  const { id } = useParams()

  return (
    <NoteFormWidget
      title="Editar Nota"
      noteId={id as string}
    />
  )
}
