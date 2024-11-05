'use client'

import { MainLayout, UserAvatar, NoteForm, NoteFormMenu } from '@/components'

export default function CriarNotaPage() {
  return (
    <MainLayout
      title="Criar Nota"
      footer={<NoteFormMenu />}
      headerAside={<UserAvatar />}
    >
      <NoteForm />
    </MainLayout>
  )
}
