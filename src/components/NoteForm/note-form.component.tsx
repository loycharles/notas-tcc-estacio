import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Chip from '@mui/material/Chip'

import AddBoxIcon from '@mui/icons-material/AddBox'
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome'
import BookmarkIcon from '@mui/icons-material/BookmarkBorder'

import styles from './note-form.styles.module.scss'

export const NoteForm = () => {
  return (
    <div className={styles.form}>
      <TextField
        label="Título"
        variant="outlined"
      />
      <TextField
        className={styles.contentField}
        label="Conteúdo"
        variant="outlined"
        multiline
      />

      <div>
        <Chip
          label="Chip Filled"
          color="main"
          icon={<BookmarkIcon />}
        />
      </div>

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
  )
}
