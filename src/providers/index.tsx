import React from 'react'

import { HeaderThemeProvider } from './HeaderTheme'
import { ThemeProvider } from './Theme'
import { SessionProvider } from './SessionProvider'
import { CartProvider } from './CartProvider'
import { SidebarProvider } from './SidebarProvider'

export const Providers: React.FC<{
  children: React.ReactNode
}> = ({ children }) => {
  return (
    <SessionProvider>
      <ThemeProvider>
        <HeaderThemeProvider>
          <SidebarProvider>
            <CartProvider>{children}</CartProvider>
          </SidebarProvider>
        </HeaderThemeProvider>
      </ThemeProvider>
    </SessionProvider>
  )
}
