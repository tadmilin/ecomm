import { Banner } from '@payloadcms/ui/elements/Banner'
import React from 'react'

import { SeedButton } from './SeedButton'
import './index.scss'

const baseClass = 'before-dashboard'

interface BeforeDashboardProps {
  welcomeTitle: string
  welcomeSubtitle: string
  instructions: {
    seed: string
    visitWebsite: string
    seeResults: string
    cloudRepo: string
    githubScope: string
    selectedCreating: string
    modify: string
    collections: string
    addMore: string
    fields: string
    newToPayload: string
    gettingStarted: string
    docs: string
    commitPush: string
  }
  proTip: string
  proTipLink: string
  proTipEnd: string
}

const BeforeDashboard: React.FC<BeforeDashboardProps> = ({
  welcomeTitle,
  welcomeSubtitle,
  instructions,
  proTip,
  proTipLink,
  proTipEnd
}) => {
  
  return (
    <div className={baseClass}>
      <Banner className={`${baseClass}__banner`} type="success">
        <h4>{welcomeTitle}</h4>
      </Banner>
      {welcomeSubtitle}
      <ul className={`${baseClass}__instructions`}>
        <li>
          <SeedButton />
          {instructions.seed}
          <a href="/" target="_blank">
            {instructions.visitWebsite}
          </a>
          {instructions.seeResults}
        </li>
        <li>
          {instructions.cloudRepo}
          <i>{instructions.githubScope}</i>
          {instructions.selectedCreating}
        </li>
        <li>
          {instructions.modify}
          <a
            href="https://payloadcms.com/docs/configuration/collections"
            rel="noopener noreferrer"
            target="_blank"
          >
            {instructions.collections}
          </a>
          {instructions.addMore}
          <a
            href="https://payloadcms.com/docs/fields/overview"
            rel="noopener noreferrer"
            target="_blank"
          >
            {instructions.fields}
          </a>
          {instructions.newToPayload}
          <a
            href="https://payloadcms.com/docs/getting-started/what-is-payload"
            rel="noopener noreferrer"
            target="_blank"
          >
            {instructions.gettingStarted}
          </a>
          {instructions.docs}
        </li>
        <li>
          {instructions.commitPush}
        </li>
      </ul>
      {proTip}
      <a
        href="https://payloadcms.com/docs/custom-components/overview"
        rel="noopener noreferrer"
        target="_blank"
      >
        {proTipLink}
      </a>
      {proTipEnd}
    </div>
  )
}

export default BeforeDashboard
