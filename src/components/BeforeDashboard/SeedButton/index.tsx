'use client'

import React, { Fragment, useCallback, useState } from 'react'

import { useLanguage } from '@/contexts/LanguageContext'

import './index.scss'

const SuccessMessage: React.FC = () => {
  const { t } = useLanguage()
  return (
  <div>
    {t('dashboard.seed.success')}
    <a target="_blank" href="/">
      {t('dashboard.seed.visit_website')}
    </a>
  </div>
)
}

export const SeedButton: React.FC = () => {
  const { t } = useLanguage()
  const [loading, setLoading] = useState(false)
  const [seeded, setSeeded] = useState(false)
  const [error, setError] = useState<null | string>(null)

  const handleClick = useCallback(
    async (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault()

      if (seeded) {
        console.log(t('dashboard.seed.already_seeded'))
        return
      }
      if (loading) {
        console.log(t('dashboard.seed.already_in_progress'))
        return
      }
      if (error) {
        console.error(t('dashboard.seed.error_refresh'))
        return
      }

      setLoading(true)

      try {
        const promise = new Promise((resolve, reject) => {
          try {
            fetch('/next/seed', { method: 'POST', credentials: 'include' })
              .then((res) => {
                if (res.ok) {
                  resolve(true)
                  setSeeded(true)
                } else {
                  reject(t('dashboard.seed.error_occurred'))
                }
              })
              .catch((error) => {
                reject(error)
              })
          } catch (error) {
            reject(error)
          }
        })
        
        promise.then(() => {
          console.log(t('dashboard.seed.loading'))
        }).catch((error) => {
          console.error(t('dashboard.seed.error_occurred'), error)
        })
      } catch (err) {
        const error = err instanceof Error ? err.message : String(err)
        setError(error)
      }
    },
    [loading, seeded, error, t],
  )

  let message = ''
  if (loading) message = ` (${t('dashboard.seed.seeding')})`
  if (seeded) message = ` (${t('dashboard.seed.done')})`
  if (error) message = ` (${t('dashboard.seed.error')}: ${error})`

  return (
    <Fragment>
      <button className="seedButton" onClick={handleClick}>
        {t('dashboard.seed.button')}
      </button>
      {message}
    </Fragment>
  )
}
