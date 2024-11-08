import { useRouter } from 'next/navigation'

import Card from '@mui/material/Card'
import Chip from '@mui/material/Chip'
import Typography from '@mui/material/Typography'

import BookmarkIcon from '@mui/icons-material/BookmarkBorder'

import { Note } from '@/stores/notes.store'

import styles from './note-card.styles.module.scss'

interface NoteCardProps {
  note: Note
}

const VISIBLE_TAGS_LIMIT = 2

export const NoteCard: React.FC<NoteCardProps> = ({ note }) => {
  const router = useRouter()

  const sortedTags = note.tags.sort()
  const visibleTags =
    sortedTags.length > VISIBLE_TAGS_LIMIT ? sortedTags.slice(0, VISIBLE_TAGS_LIMIT) : sortedTags

  return (
    <Card
      onClick={() => router.push(`/notas/${note.id}`)}
      className={styles.card}
    >
      <div>
        <Typography
          variant="subtitle1"
          className={styles.title}
        >
          {note.title}
        </Typography>
        <Typography
          variant="body1"
          className={styles.content}
        >
          {note.content}
        </Typography>
      </div>

      {note.tags.length > 0 ? (
        <div className={styles.tags}>
          {visibleTags.map((tag) => (
            <Chip
              key={tag}
              label={tag}
              icon={<BookmarkIcon />}
              color="main"
            />
          ))}

          {sortedTags.length > VISIBLE_TAGS_LIMIT ? (
            <Chip
              label={`+${sortedTags.length - VISIBLE_TAGS_LIMIT}`}
              color="main"
              icon={<BookmarkIcon />}
            />
          ) : null}
        </div>
      ) : null}
    </Card>
  )
}
