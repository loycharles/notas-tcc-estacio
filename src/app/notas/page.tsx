import { MainLayout, MainMenu } from '@/components'

export default function NotasPage() {
  return (
    <MainLayout
      title="Notas"
      footer={<MainMenu />}
      top={<div>Top</div>}
      headerAside={<div>A</div>}
    >
      <div>NotasPage</div>
    </MainLayout>
  )
}
