import { createTheme } from '@mui/material/styles'

declare module '@mui/material/styles' {
  interface Palette {
    main: Palette['primary']
    white: Palette['primary']
  }

  interface PaletteOptions {
    main?: PaletteOptions['primary']
    white?: PaletteOptions['primary']
  }
}

declare module '@mui/material/Button' {
  interface ButtonPropsColorOverrides {
    main: true
    white: true
  }
}

declare module '@mui/material/IconButton' {
  interface IconButtonPropsColorOverrides {
    main: true
    white: true
  }
}

declare module '@mui/material/CircularProgress' {
  interface CircularProgressPropsColorOverrides {
    main: true
  }
}

declare module '@mui/material/Chip' {
  interface ChipPropsColorOverrides {
    main: true
  }
}

export const theme = createTheme({
  palette: {
    main: {
      main: '#CC0BBF',
      dark: '#CC0BBF',
      light: '#CC0BBF',
      contrastText: '#fff',
    },
    white: {
      main: '#fff',
      contrastText: '#0f172a',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          variants: [
            {
              props: { variant: 'outlined', color: 'main' },
              style: () => ({
                border: '1px solid var(--color-main)',
                color: 'var(--color-main)',
              }),
            },
          ],
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          variants: [
            {
              props: { color: 'main', variant: 'filled' },
              style: () => ({ backgroundColor: 'var(--color-main)' }),
            },
          ],
        },
      },
    },
  },
})
