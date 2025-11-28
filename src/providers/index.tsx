import React from 'react'

import { HeaderThemeProvider } from './HeaderTheme'
import { ThemeProvider } from './Theme'
import { SessionProvider } from './SessionProvider'
import { CartProvider } from './CartProvider'

export const Providers: React.FC<{
  children: React.ReactNode
}> = ({ children }) => {
  return (
    <SessionProvider>
      <ThemeProvider>
        <HeaderThemeProvider>
          <CartProvider>{children}</CartProvider>
        </HeaderThemeProvider>
      </ThemeProvider>
    </SessionProvider>
  )
}
