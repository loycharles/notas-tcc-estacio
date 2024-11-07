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
  disabled?: boolean
  onSave?: () => void
  onDelete?: () => void
}

export const NoteFormMenu = ({
  onSave = () => null,
  onDelete,
  saveLabel = 'Salvar',
  deleteLabel = 'Excluir',
  disabled = false,
}: MainMenuProps) => {
  const router = useRouter()

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
        {Boolean(onDelete) && (
          <BottomNavigationAction
            label="Excluir"
            icon={<DeleteIcon />}
            className={styles.item}
            disabled={disabled}
            onClick={onDelete}
          />
        )}
        <BottomNavigationAction
          label={saveLabel}
          icon={<SaveIcon />}
          className={cn(styles.item, styles.action)}
          disabled={disabled}
          onClick={onSave}
        />
      </BottomNavigation>
    </>
  )
}
