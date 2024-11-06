'use client'

import { useState } from 'react'

import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Chip from '@mui/material/Chip'

import AddBoxIcon from '@mui/icons-material/AddBox'
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome'
import BookmarkIcon from '@mui/icons-material/BookmarkBorder'

import { BottomActionDrawer } from '../BottomActionDrawer'

import styles from './note-form.styles.module.scss'

interface NoteFormProps {
  title?: string
  content?: string
  tags?: string[]
  onTitleChange?: (title: string) => void
  onContentChange?: (content: string) => void
  onTagsChange?: (tags: string[]) => void
}

export const NoteForm = ({
  title = '',
  content = '',
  tags = [],
  onTitleChange = () => {},
  onContentChange = () => {},
  onTagsChange = () => {},
}: NoteFormProps) => {
  const visibleTags = tags.length > 2 ? tags.slice(0, 2) : tags

  return (
    <>
      <div className={styles.form}>
        <TextField
          label="Título"
          variant="outlined"
          value={title}
          onChange={(e) => onTitleChange(e.target.value)}
        />
        <TextField
          className={styles.contentField}
          label="Conteúdo"
          variant="outlined"
          multiline
          value={content}
          onChange={(e) => onContentChange(e.target.value)}
        />

        {tags.length > 0 && (
          <div className={styles.tags}>
            {visibleTags.map((tag) => (
              <Chip
                key={tag}
                label={tag}
                color="main"
                icon={<BookmarkIcon />}
              />
            ))}
          </div>
        )}

        <div className={styles.actions}>
          <Button
            color="main"
            variant="outlined"
            startIcon={<AddBoxIcon />}
          >
            Tag
          </Button>
          <Button
            color="main"
            variant="outlined"
            startIcon={<AutoAwesomeIcon />}
          >
            Gerar tags
          </Button>
        </div>
      </div>

      <BottomActionDrawer
        onClose={() => {}}
        action={() => {}}
      />
    </>
  )
}
