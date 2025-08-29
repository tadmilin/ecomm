import { Banner } from '@payloadcms/ui/elements/Banner'
import React from 'react'
import { useLanguage } from '@/contexts/LanguageContext'

import { SeedButton } from './SeedButton'
import './index.scss'

const baseClass = 'before-dashboard'

const BeforeDashboard: React.FC = () => {
  const { t } = useLanguage()
  
  return (
    <div className={baseClass}>
      <Banner className={`${baseClass}__banner`} type="success">
        <h4>{t('dashboard.welcome.title')}</h4>
      </Banner>
      {t('dashboard.welcome.subtitle')}
      <ul className={`${baseClass}__instructions`}>
        <li>
          <SeedButton />
          {t('dashboard.instructions.seed')}
          <a href="/" target="_blank">
            {t('dashboard.instructions.visit_website')}
          </a>
          {t('dashboard.instructions.see_results')}
        </li>
        <li>
          {t('dashboard.instructions.cloud_repo')}
          <i>{t('dashboard.instructions.github_scope')}</i>
          {t('dashboard.instructions.selected_creating')}
        </li>
        <li>
          {t('dashboard.instructions.modify')}
          <a
            href="https://payloadcms.com/docs/configuration/collections"
            rel="noopener noreferrer"
            target="_blank"
          >
            {t('dashboard.instructions.collections')}
          </a>
          {t('dashboard.instructions.add_more')}
          <a
            href="https://payloadcms.com/docs/fields/overview"
            rel="noopener noreferrer"
            target="_blank"
          >
            {t('dashboard.instructions.fields')}
          </a>
          {t('dashboard.instructions.new_to_payload')}
          <a
            href="https://payloadcms.com/docs/getting-started/what-is-payload"
            rel="noopener noreferrer"
            target="_blank"
          >
            {t('dashboard.instructions.getting_started')}
          </a>
          {t('dashboard.instructions.docs')}
        </li>
        <li>
          {t('dashboard.instructions.commit_push')}
        </li>
      </ul>
      {t('dashboard.pro_tip')}
      <a
        href="https://payloadcms.com/docs/custom-components/overview"
        rel="noopener noreferrer"
        target="_blank"
      >
        {t('dashboard.pro_tip_link')}
      </a>
      {t('dashboard.pro_tip_end')}
    </div>
  )
}

export default BeforeDashboard
