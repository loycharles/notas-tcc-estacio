'use client'

import { useRouter } from 'next/navigation'
import { useQuery } from '@tanstack/react-query'

import { account } from '@/lib/appwrite'
import { updateUser } from '@/stores/user.store'

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const router = useRouter()

  const { isLoading } = useQuery({
    queryKey: ['user'],
    queryFn: async () => {
      try {
        const user = await account.get()

        updateUser(user)

        return user
      } catch (error) {
        router.push('/login')
      }

      return null
    },
  })

  if (isLoading) {
    return <div>Loading...</div>
  }

  return children
}
