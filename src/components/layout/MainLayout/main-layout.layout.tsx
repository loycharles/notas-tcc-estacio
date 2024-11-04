import styles from './main-layout.styles.module.scss'

interface MainLayoutProps {
  title: string
  children: React.ReactNode
  footer?: React.ReactNode
  top?: React.ReactNode
  headerAside?: React.ReactNode
}

function MainLayout({
  title,
  children,
  footer = null,
  headerAside = null,
  top = null,
}: MainLayoutProps) {
  return (
    <div className={styles.layout}>
      <header className={styles.header}>
        <h1 className={styles.title}>{title}</h1>
        {headerAside}
      </header>
      {top && <div className={styles.top}>{top}</div>}
      <main className={styles.main}>{children}</main>
      {footer}
    </div>
  )
}

export { MainLayout }
