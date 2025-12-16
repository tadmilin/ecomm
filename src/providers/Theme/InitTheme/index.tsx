import Script from 'next/script'
import React from 'react'

import { themeLocalStorageKey } from '../ThemeSelector/types'

export const InitTheme: React.FC = () => {
  return (
    // eslint-disable-next-line @next/next/no-before-interactive-script-outside-document
    <Script
      dangerouslySetInnerHTML={{
        __html: `
  (function () {
    // Force light mode always
    var themeToSet = 'light'
    document.documentElement.setAttribute('data-theme', themeToSet)
    
    // Clear any stored theme preference
    try {
      window.localStorage.removeItem('${themeLocalStorageKey}')
    } catch (e) {}
  })();
  `,
      }}
      id="theme-script"
      strategy="beforeInteractive"
    />
  )
}
