import React from 'react'

import { HeaderThemeProvider } from './HeaderTheme'
import { ThemeProvider } from './Theme'
import { SessionProvider } from './SessionProvider'
import { LanguageProvider } from '@/contexts/LanguageContext'

export const Providers: React.FC<{
  children: React.ReactNode
}> = ({ children }) => {
  return (
    <SessionProvider>
      <LanguageProvider>
        <ThemeProvider>
          <HeaderThemeProvider>{children}</HeaderThemeProvider>
        </ThemeProvider>
      </LanguageProvider>
    </SessionProvider>
  )
}
