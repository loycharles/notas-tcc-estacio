'use client'

import { useRouter, usePathname } from 'next/navigation'

import BottomNavigation from '@mui/material/BottomNavigation'
import BottomNavigationAction from '@mui/material/BottomNavigationAction'

import RestoreIcon from '@mui/icons-material/Restore'
import BookmarksIcon from '@mui/icons-material/Bookmarks'
import AddBoxIcon from '@mui/icons-material/AddBox'

import { cn } from '@/lib/utils'

import styles from './main-menu.styles.module.scss'

interface MainMenuProps {
  action?: () => void
  createLabel?: string
}

const Actions = {
  Notes: 0,
  Tags: 1,
  Create: 2,
}

export const MainMenu = ({ action = () => null, createLabel = 'Criar Nota' }: MainMenuProps) => {
  const router = useRouter()
  const pathname = usePathname()

  return (
    <BottomNavigation
      className={`${styles.main} ${styles.menu}`}
      showLabels
      onChange={(_, value) => {
        switch (value) {
          case Actions.Notes:
            router.push('/notas')
            break
          case Actions.Tags:
            router.push('/notas/tags')
            break
          case Actions.Create:
            action()
            break
        }
      }}
    >
      <BottomNavigationAction
        label="Notas"
        icon={<RestoreIcon />}
        className={cn(styles.item, { [styles.active]: pathname === '/notas' })}
      />
      <BottomNavigationAction
        label="Tags"
        icon={<BookmarksIcon />}
        className={cn(styles.item, { [styles.active]: pathname === '/notas/tags' })}
      />
      <BottomNavigationAction
        label={createLabel}
        icon={<AddBoxIcon />}
        className={cn(styles.item, styles.action)}
      />
    </BottomNavigation>
  )
}