'use client'

import { useRouter } from 'next/navigation'
import { useQuery } from '@tanstack/react-query'

import CircularProgress from '@mui/material/CircularProgress'
import Box from '@mui/material/Box'

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
