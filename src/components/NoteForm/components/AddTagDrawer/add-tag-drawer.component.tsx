import { useState } from 'react'

import TextField from '@mui/material/TextField'

import { BottomActionDrawer } from '@/components'

interface AddTagDrawerProps {
  open: boolean
  onClose: () => void
  onAddTag: (tag: string) => void
}

export const AddTagDrawer = ({ open, onClose, onAddTag }: AddTagDrawerProps) => {
  const [tag, setTag] = useState('')

  return (
    <BottomActionDrawer
      open={open}
      title="Adicionar tag"
      onClose={() => {
        setTag('')
        onClose()
      }}
      action={() => {
        if (tag.length > 0) {
          onAddTag(tag)
        }

        setTag('')
        onClose()
      }}
      actionLabel="Adicionar"
      // image="/images/tag-drawer.png"
    >
      <TextField
        label="Nome da tag"
        variant="outlined"
        value={tag}
        onChange={(e) =>
          setTag(
            e.target.value
              .replace(/[^a-zA-Z0-9]/g, '')
              .toLowerCase()
              .trim(),
          )
        }
        sx={{ width: '100%' }}
      />
    </BottomActionDrawer>
  )
}
