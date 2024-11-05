'use client'

import { useState } from 'react'

import { useRouter } from 'next/navigation'

import BottomNavigation from '@mui/material/BottomNavigation'
import BottomNavigationAction from '@mui/material/BottomNavigationAction'

import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import ListItemIcon from '@mui/material/ListItemIcon'

import UndoIcon from '@mui/icons-material/Undo'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import SaveIcon from '@mui/icons-material/Save'
import DeleteIcon from '@mui/icons-material/Delete'

import { cn } from '@/lib/utils'

import styles from './note-form-menu.styles.module.scss'

interface MainMenuProps {
  saveLabel?: string
  deleteLabel?: string
  onSave?: () => void
  onDelete?: () => void
}

export const NoteFormMenu = ({
  onSave = () => null,
  onDelete = () => null,
  saveLabel = 'Salvar',
  deleteLabel = 'Excluir',
}: MainMenuProps) => {
  const router = useRouter()

  const [actionsAnchorEl, setActionsAnchorEl] = useState<null | HTMLElement>(null)
  const actionsOpen = Boolean(actionsAnchorEl)

  const handleActionsClick = (event: React.MouseEvent<HTMLElement>) => {
    setActionsAnchorEl(event.currentTarget)
  }

  const handleActionsClose = () => {
    setActionsAnchorEl(null)
  }

  return (
    <>
      <BottomNavigation
        className={`${styles.main} ${styles.menu}`}
        showLabels
      >
        <BottomNavigationAction
          label="Voltar"
          icon={<UndoIcon />}
          className={styles.item}
          onClick={() => {
            router.push('/notas')
          }}
        />
        <BottomNavigationAction
          label="Ações"
          icon={<MoreVertIcon />}
          className={styles.item}
          onClick={handleActionsClick}
        />
        <BottomNavigationAction
          label={saveLabel}
          icon={<SaveIcon />}
          className={cn(styles.item, styles.action)}
          onClick={onSave}
        />
      </BottomNavigation>

      <Menu
        anchorEl={actionsAnchorEl}
        open={actionsOpen}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        onClose={handleActionsClose}
      >
        <MenuItem onClick={onDelete}>
          <ListItemIcon>
            <DeleteIcon fontSize="small" />
          </ListItemIcon>
          {deleteLabel}
        </MenuItem>
      </Menu>
    </>
  )
}
