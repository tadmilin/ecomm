'use client'

import React, { Fragment, useCallback, useState } from 'react'

import './index.scss'

interface SeedMessages {
  button: string
  seeding: string
  done: string
  error: string
  alreadySeeded: string
  alreadyInProgress: string
  errorRefresh: string
  errorOccurred: string
  loading: string
  success: string
  visitWebsite: string
}



interface SeedButtonProps {
  messages: SeedMessages
}

export const SeedButton: React.FC<SeedButtonProps> = ({ messages }) => {
  const [loading, setLoading] = useState(false)
  const [seeded, setSeeded] = useState(false)
  const [error, setError] = useState<null | string>(null)

  const handleClick = useCallback(
    async (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault()

      if (seeded) {
        console.log(messages.alreadySeeded)
        return
      }
      if (loading) {
        console.log(messages.alreadyInProgress)
        return
      }
      if (error) {
        console.error(messages.errorRefresh)
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
                  reject(messages.errorOccurred)
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
          console.log(messages.loading)
        }).catch((error) => {
          console.error(messages.errorOccurred, error)
        })
      } catch (err) {
        const error = err instanceof Error ? err.message : String(err)
        setError(error)
      }
    },
    [loading, seeded, error, messages],
  )

  let message = ''
  if (loading) message = ` (${messages.seeding})`
  if (seeded) message = ` (${messages.done})`
  if (error) message = ` (${messages.error}: ${error})`

  return (
    <Fragment>
      <button className="seedButton" onClick={handleClick}>
        {messages.button}
      </button>
      {message}
    </Fragment>
  )
}
