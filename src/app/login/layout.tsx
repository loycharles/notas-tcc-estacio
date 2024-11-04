'use client'

import { useRouter } from 'next/navigation'
import { useQuery } from '@tanstack/react-query'

import { account } from '@/lib/appwrite'

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const router = useRouter()

  const { isLoading } = useQuery({
    queryKey: ['user', 'login'],
    queryFn: async () => {
      try {
        await account.get()

        router.push('/notas')
      } catch (error) {
        return null
      }

      return null
    },
  })

  if (isLoading) {
    return <div>Loading...</div>
  }

  return children
}
