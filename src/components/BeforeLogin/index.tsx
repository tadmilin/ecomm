import React from 'react'
import { useLanguage } from '@/contexts/LanguageContext'

const BeforeLogin: React.FC = () => {
  const { t } = useLanguage()
  
  return (
    <div>
      <p>
        <b>{t('login.welcome.title')}</b>
        {t('login.welcome.subtitle')}
      </p>
    </div>
  )
}

export default BeforeLogin
