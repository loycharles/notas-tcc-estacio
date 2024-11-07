'use client'

import { useState } from 'react'

import { useMutation } from '@tanstack/react-query'
import axios from 'axios'

import IconButton from '@mui/material/IconButton'
import Card from '@mui/material/Card'

import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome'
import AddIcon from '@mui/icons-material/Add'
import CloseIcon from '@mui/icons-material/Close'

import { BottomActionDrawer } from '@/components'
import { cn } from '@/lib/utils'

import styles from './ai-tag-drawer.styles.module.scss'

interface AITagDrawerProps {
  open: boolean
  note: {
    title: string
    content: string
  }
  onClose: () => void
  onUse: (tags: string[]) => void
}

interface IAResponse {
  choices: {
    message: {
      tool_calls: {
        function: {
          arguments: string
        }
      }[]
    }
  }[]
}

export const AITagDrawer = ({ open, note, onClose, onUse }: AITagDrawerProps) => {
  const [tags, setTags] = useState<string[]>([])
  const [suggestions, setSuggestions] = useState<string[]>([])
  const hasSuggestions = suggestions.length > 0

  const clear = () => {
    setTags([])
    setSuggestions([])
  }

  const { mutate, isPending } = useMutation({
    mutationFn: async () => {
      const ai = await axios.post<IAResponse>(
        'https://api.groq.com/openai/v1/chat/completions',
        {
          model: 'llama3-groq-70b-8192-tool-use-preview',
          temperature: 0,
          messages: [
            {
              role: 'system',
              content: `
                Você é um assistente de um aplicativo de notas de texto que gera tags para essa nota.
                - Você receberá uma nota e deverá gerar tags para ela.
                - As tags devem ser únicas e não serem repetidas.
                - As tags devem ser relevantes para a nota.
                - As tags devem ser curtas e fáceis de lembrar.
                - Você irá gerar um array de tags.
                - As tags devem estar em português brasileiro.
                - As tags não devem conter caracteres especiais.
                - As tags não devem conter espaços. Devem ser palavras únicas.
              `,
            },
            {
              role: 'user',
              content: `
                # Nota

                título: ${note.title}
                conteúdo: ${note.content}
              `,
            },
          ],
          tools: [
            {
              type: 'function',
              function: {
                name: 'generate_tags',
                description: 'Gera um array de tags para a nota.',
                parameters: {
                  type: 'array',
                  properties: {
                    items: {
                      type: 'string',
                    },
                  },
                },
              },
            },
          ],
          tool_choice: 'required',
        },
        {
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_GROQ_API_KEY}`,
          },
        },
      )

      const args = ai.data.choices[0]?.message.tool_calls[0]?.function.arguments || ''

      setSuggestions(
        (JSON.parse(args).items || []).map((tag: string) => tag.toLocaleLowerCase().trim()),
      )
    },
  })

  const getContent = () => {
    if (isPending) {
      return 'Gerando tags...'
    }

    if (hasSuggestions) {
      return (
        <div className={styles.overflow}>
          <div className={styles.tags}>
            {suggestions.map((tag) => {
              const isSelected = tags.includes(tag)

              return (
                <Card
                  key={tag}
                  className={cn(styles.card, isSelected && styles.selected)}
                >
                  <div className={styles.tag}>
                    <span className={styles.hash}>#</span> {tag}
                  </div>

                  {!isSelected && (
                    <IconButton
                      onClick={() => setTags([...tags, tag])}
                      color="main"
                    >
                      <AddIcon />
                    </IconButton>
                  )}

                  {isSelected && (
                    <IconButton onClick={() => setTags(tags.filter((t) => t !== tag))}>
                      <CloseIcon />
                    </IconButton>
                  )}
                </Card>
              )
            })}
          </div>
        </div>
      )
    }

    return 'Utilize inteligência artificial para sugerir Tags para a sua nota'
  }

  const actions = {
    generate: {
      actionLabel: 'Gerar',
      actionIcon: <AutoAwesomeIcon />,
      actionVariant: 'contained' as const,
      action: () => mutate(),
    },
    use: {
      actionLabel: 'Utilizar',
      actionVariant: 'outlined' as const,
      action: () => {
        onClose()
        onUse(tags)
        clear()
      },
    },
  }

  const action = hasSuggestions ? actions.use : actions.generate

  return (
    <BottomActionDrawer
      open={open}
      onClose={() => {
        onClose()
        clear()
      }}
      title={hasSuggestions ? 'Tags sugeridas' : 'Gerar tags'}
      loading={isPending}
      {...action}
    >
      {getContent()}
    </BottomActionDrawer>
  )
}
