'use client'

import { useRef, useState, useEffect } from 'react'

import Image from 'next/image'

import Drawer from '@mui/material/Drawer'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import Button from '@mui/material/Button'
import LoadingButton from '@mui/lab/LoadingButton'

import UndoIcon from '@mui/icons-material/Undo'
import DeleteIcon from '@mui/icons-material/Delete'

import { cn } from '@/lib/utils'

import styles from './bottom-action-drawer.styles.module.scss'

interface BottomActionDrawerProps {
  open?: boolean
  title?: string
  loading?: boolean
  onClose: () => void
  action?: () => void
  actionVariant?: 'contained' | 'outlined'
  actionLabel?: string
  actionIcon?: React.ReactNode | null
  onDelete?: () => void
  color?: 'main' | 'error'
  image?: string
}

export const BottomActionDrawer: React.FC<React.PropsWithChildren<BottomActionDrawerProps>> = ({
  open = true,
  title = 'Título',
  children,
  loading = false,
  onClose,
  action,
  actionVariant = 'contained',
  actionLabel = 'Ação',
  onDelete,
  color = 'main',
  actionIcon = null,
  image,
}) => {
  const [contentPosition, setContentPosition] = useState({ top: 0 })
  const [contentElement, setContentElement] = useState<HTMLDivElement | null>(null)

  const hasAction = Boolean(action)
  const hasDelete = Boolean(onDelete)

  useEffect(() => {
    const updatePosition = () => {
      if (!open || !contentElement) {
        return
      }

      const rect = contentElement.getBoundingClientRect()

      setContentPosition({ top: rect.top + window.scrollY })
    }

    updatePosition()

    const resizeObserver = new ResizeObserver(updatePosition)
    if (contentElement) {
      resizeObserver.observe(contentElement)
    }

    window.addEventListener('resize', updatePosition)
    window.addEventListener('scroll', updatePosition)

    return () => {
      resizeObserver.disconnect()
      window.removeEventListener('resize', updatePosition)
      window.removeEventListener('scroll', updatePosition)
    }
  }, [open, contentElement])

  return (
    <Drawer
      anchor="bottom"
      open={open}
      onClose={onClose}
      className={cn(styles.drawer, { [styles.error]: color === 'error' })}
    >
      <div
        ref={setContentElement}
        className={styles.content}
      >
        {Boolean(image) ? (
          <img
            className={styles.image}
            src={image}
            alt=""
            style={{
              top: contentPosition.top - 322,
            }}
          />
        ) : null}

        <Typography
          variant="h4"
          gutterBottom
          className={styles.title}
        >
          {title}
        </Typography>

        <div>{children}</div>

        <div className={styles.actions}>
          <IconButton
            aria-label="voltar"
            color={color}
            onClick={onClose}
          >
            <UndoIcon fontSize="inherit" />
          </IconButton>

          {hasDelete ? (
            <IconButton
              aria-label="deletar"
              color={color}
              onClick={onDelete}
            >
              <DeleteIcon fontSize="inherit" />
            </IconButton>
          ) : null}

          {hasAction && loading ? (
            <LoadingButton
              variant="outlined"
              sx={{ marginLeft: 'auto' }}
              loading
            />
          ) : null}

          {hasAction && !loading ? (
            <Button
              variant={actionVariant}
              color={color}
              sx={{ marginLeft: 'auto' }}
              startIcon={actionIcon}
            >
              {actionLabel}
            </Button>
          ) : null}
        </div>
      </div>
    </Drawer>
  )
}
