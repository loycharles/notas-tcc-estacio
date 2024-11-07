import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'

import DeleteIcon from '@mui/icons-material/Delete'

import { BottomActionDrawer } from '@/components'

import styles from './tags-list-drawer.styles.module.scss'

interface TagsListDrawerProps {
  open: boolean
  tags: string[]
  onClose: () => void
  onDeleteTag: (tag: string) => void
}

export const TagsListDrawer = ({ open, tags, onClose, onDeleteTag }: TagsListDrawerProps) => {
  return (
    <BottomActionDrawer
      open={open}
      title="Tags da nota"
      onClose={onClose}
    >
      <Typography
        variant="subtitle1"
        gutterBottom
      >
        {`${tags.length} tags nessa nota`}
      </Typography>

      <div className={styles.overflow}>
        <div className={styles.tags}>
          {tags.map((tag) => (
            <div
              key={tag}
              className={styles.card}
            >
              <div>
                <Typography variant="subtitle1">{`# ${tag}`}</Typography>
              </div>
              <IconButton
                aria-label="remover"
                onClick={() => onDeleteTag(tag)}
              >
                <DeleteIcon />
              </IconButton>
            </div>
          ))}
        </div>
      </div>
    </BottomActionDrawer>
  )
}
