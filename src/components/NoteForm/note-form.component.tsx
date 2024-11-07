'use client'

import { useState } from 'react'

import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Chip from '@mui/material/Chip'

import AddBoxIcon from '@mui/icons-material/AddBox'
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome'
import BookmarkIcon from '@mui/icons-material/BookmarkBorder'

import { AddTagDrawer, TagsListDrawer } from './components'

import styles from './note-form.styles.module.scss'

interface NoteFormProps {
  title?: string
  content?: string
  tags?: string[]
  disabled?: boolean
  onTitleChange?: (title: string) => void
  onContentChange?: (content: string) => void
  onTagsChange?: (tags: string[]) => void
}

const VISIBLE_TAGS_LIMIT = 2

export const NoteForm = ({
  title = '',
  content = '',
  tags = [],
  disabled = false,
  onTitleChange = (title: string) => {},
  onContentChange = (content: string) => {},
  onTagsChange = (tags: string[]) => {},
}: NoteFormProps) => {
  const [addTagDrawerOpen, setAddTagDrawerOpen] = useState(false)
  const [tagsListDrawerOpen, setTagsListDrawerOpen] = useState(false)

  const sortedTags = tags.sort()
  const visibleTags =
    sortedTags.length > VISIBLE_TAGS_LIMIT ? sortedTags.slice(0, VISIBLE_TAGS_LIMIT) : sortedTags

  const openAddTagDrawer = () => setAddTagDrawerOpen(true)
  const closeAddTagDrawer = () => setAddTagDrawerOpen(false)

  const openTagsListDrawer = () => setTagsListDrawerOpen(true)
  const closeTagsListDrawer = () => setTagsListDrawerOpen(false)

  const deleteTag = (tag: string) => {
    const remainingTags = tags.filter((t) => t !== tag)

    if (remainingTags.length === 0) {
      closeTagsListDrawer()
    }

    onTagsChange(remainingTags)
  }

  return (
    <>
      <div className={styles.form}>
        <TextField
          label="Título"
          variant="outlined"
          value={title}
          onChange={(e) => onTitleChange(e.target.value)}
          disabled={disabled}
        />
        <TextField
          className={styles.contentField}
          label="Conteúdo"
          variant="outlined"
          multiline
          value={content}
          onChange={(e) => onContentChange(e.target.value)}
          disabled={disabled}
        />

        {tags.length > 0 && (
          <div className={styles.tags}>
            {visibleTags.map((tag) => (
              <Chip
                key={tag}
                label={tag}
                color="main"
                icon={<BookmarkIcon />}
                sx={{ maxWidth: '130px' }}
                onClick={openTagsListDrawer}
              />
            ))}

            {sortedTags.length > VISIBLE_TAGS_LIMIT ? (
              <Chip
                label={`+${sortedTags.length - VISIBLE_TAGS_LIMIT}`}
                color="main"
                icon={<BookmarkIcon />}
                onClick={openTagsListDrawer}
              />
            ) : null}
          </div>
        )}

        <div className={styles.actions}>
          <Button
            color="main"
            variant="outlined"
            startIcon={<AddBoxIcon />}
            onClick={openAddTagDrawer}
            disabled={disabled}
          >
            Tag
          </Button>
          <Button
            color="main"
            variant="outlined"
            startIcon={<AutoAwesomeIcon />}
            disabled={disabled}
          >
            Gerar tags
          </Button>
        </div>
      </div>

      <AddTagDrawer
        open={addTagDrawerOpen}
        onClose={closeAddTagDrawer}
        onAddTag={(tag) => {
          onTagsChange([...tags, tag])
        }}
      />

      <TagsListDrawer
        open={tagsListDrawerOpen}
        tags={sortedTags}
        onClose={closeTagsListDrawer}
        onDeleteTag={deleteTag}
      />
    </>
  )
}
