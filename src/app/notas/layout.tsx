'use client'

import { useRouter } from 'next/navigation'
import { useQuery } from '@tanstack/react-query'

import CircularProgress from '@mui/material/CircularProgress'
import Box from '@mui/material/Box'

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
    return (
      <Box
        sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}
      >
        <CircularProgress color="main" />
      </Box>
    )
  }

  return children
}
