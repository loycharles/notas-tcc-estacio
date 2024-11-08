import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { v4 as uuidv4 } from 'uuid'

type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>
type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>

export interface Note {
  id: string
  title: string
  content: string
  tags: string[]
  createdAt: Date
  updatedAt: Date
}

interface NotesStore {
  notes: Note[]
  tags: string[]
}

export const useNotesStore = create<NotesStore>()(
  persist<NotesStore>(
    () => ({
      notes: [],
      tags: [],
    }),
    {
      name: 'estacio-tcc-notes',
    },
  ),
)

const { setState, getState } = useNotesStore

export const saveTags = (tags: string[]) => {
  const tagsSet = new Set(getState().tags)

  tags.forEach((tag) => tagsSet.add(tag))

  setState({ tags: Array.from(tagsSet) })
}

export const deleteTag = (tag: string) => {
  setState((state) => ({
    tags: state.tags.filter((t) => t !== tag),
    notes: state.notes.map((n) => ({
      ...n,
      tags: n.tags.filter((t) => t !== tag),
    })),
  }))
}

export const saveNote = (note: PartialBy<Note, 'id'>) => {
  if (Boolean(note.id) && Boolean(getState().notes.find((n) => n.id === note.id))) {
    setState((state) => ({
      notes: state.notes.map((n) => (n.id === note.id ? { ...n, ...note } : n)),
    }))

    saveTags(note.tags)

    return note.id
  }

  const id = uuidv4()

  setState((state) => ({
    notes: [...state.notes, { id, ...note }],
  }))

  saveTags(note.tags)

  return id
}

export const deleteNote = (id: string) => {
  setState((state) => ({
    notes: state.notes.filter((n) => n.id !== id),
  }))
}

export const getNote = (id: string) => getState().notes.find((n) => n.id === id)
