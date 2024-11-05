'use client'

import { useRouter } from 'next/navigation'

import { MainLayout, MainMenu, UserAvatar } from '@/components'

export default function NotasPage() {
  const router = useRouter()

  return (
    <MainLayout
      title="Notas"
      footer={<MainMenu action={() => router.push('/notas/criar')} />}
      top={<div>Top</div>}
      headerAside={<UserAvatar />}
    >
      <div>NotasPage</div>
    </MainLayout>
  )
}
