'use client'

import { useState } from 'react'

import { useRouter } from 'next/navigation'

import Card from '@mui/material/Card'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'

import DeleteIcon from '@mui/icons-material/Delete'

import { MainLayout, MainMenu, UserAvatar, BottomActionDrawer } from '@/components'
import { useNotesStore, deleteTag } from '@/stores/notes.store'

import styles from './page.styles.module.scss'

export default function TagsPage() {
  const router = useRouter()

  const [tagToDelete, setTagToDelete] = useState<string | null>(null)
  const deleteTagDrawerOpen = Boolean(tagToDelete)

  const [search, setSearch] = useState('')
  const term = search.toLowerCase().trim()

  const tags = useNotesStore((state) => state.tags)
  const empty = tags.length === 0

  const filteredTags = tags.filter((tag) => {
    if (!Boolean(term)) {
      return true
    }

    return tag.toLowerCase().includes(term)
  })

  const getContent = () => {
    if (empty) {
      return <div className={styles.empty}>Nenhuma tag encontrada</div>
    }

    return (
      <>
        <Typography
          variant="subtitle1"
          gutterBottom
        >
          {filteredTags.length} tags
        </Typography>

        <div className={styles.tags}>
          {filteredTags.map((tag) => (
            <Card
              key={tag}
              className={styles.card}
            >
              <Typography
                variant="subtitle1"
                className={styles.cardTitle}
              >
                {`# ${tag}`}
              </Typography>

              <IconButton
                aria-label="remover"
                onClick={() => setTagToDelete(tag)}
              >
                <DeleteIcon />
              </IconButton>
            </Card>
          ))}
        </div>
      </>
    )
  }

  return (
    <MainLayout
      title="Tags"
      footer={<MainMenu />}
      top={
        empty ? null : (
          <TextField
            label="Pesquisar tags"
            variant="outlined"
            size="small"
            sx={{ width: '100%' }}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        )
      }
      headerAside={<UserAvatar />}
    >
      {getContent()}

      <BottomActionDrawer
        open={deleteTagDrawerOpen}
        title="Excluir tag"
        color="error"
        onClose={() => setTagToDelete(null)}
        actionLabel="Excluir tag"
        action={() => {
          deleteTag(tagToDelete as string)
          setTagToDelete(null)
        }}
      >
        Deseja realmente excluir a tag <strong># {tagToDelete}</strong>?
      </BottomActionDrawer>
    </MainLayout>
  )
}
