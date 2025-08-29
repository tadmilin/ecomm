import { Banner } from '@payloadcms/ui/elements/Banner'
import React from 'react'

import { SeedButton } from './SeedButton'
import './index.scss'

const baseClass = 'before-dashboard'

interface BeforeDashboardProps {
  welcomeTitle: string
  welcomeSubtitle: string
}

const BeforeDashboard: React.FC<BeforeDashboardProps> = ({
  welcomeTitle,
  welcomeSubtitle
}) => {
  
  return (
    <div className={baseClass}>
      <Banner className={`${baseClass}__banner`} type="success">
        <h4>{welcomeTitle}</h4>
      </Banner>
      {welcomeSubtitle}
      <ul className={`${baseClass}__instructions`}>
        <li>
          <SeedButton messages={{
            button: "Seed Database",
            seeding: "Seeding...",
            done: "Database seeded",
            error: "Error",
            alreadySeeded: "Database already seeded",
            alreadyInProgress: "Seeding in progress",
            errorRefresh: "Error occurred. Please refresh the page.",
            errorOccurred: "An error occurred while seeding the database",
            loading: "Seeding database...",
            success: "Database seeded successfully! ",
            visitWebsite: "Visit your website"
          }} />
          Click the button above to seed your database with sample content. Then 
          <a href="/" target="_blank">
            visit your website
          </a>
           to see the results.
        </li>
        <li>
          If you selected a cloud repository when creating this project, you can 
          <i>push to GitHub</i>
           to automatically deploy your changes.
        </li>
        <li>
          To modify this content, edit the 
          <a
            href="https://payloadcms.com/docs/configuration/collections"
            rel="noopener noreferrer"
            target="_blank"
          >
            collections
          </a>
           and 
          <a
            href="https://payloadcms.com/docs/fields/overview"
            rel="noopener noreferrer"
            target="_blank"
          >
            fields
          </a>
           in your codebase. If you are new to Payload, check out the 
          <a
            href="https://payloadcms.com/docs/getting-started/what-is-payload"
            rel="noopener noreferrer"
            target="_blank"
          >
            getting started guide
          </a>
           in our documentation.
        </li>
        <li>
          Commit and push your changes to see them reflected here.
        </li>
      </ul>
      Pro tip: You can create custom components to enhance your admin experience. Learn more in our 
      <a
        href="https://payloadcms.com/docs/custom-components/overview"
        rel="noopener noreferrer"
        target="_blank"
      >
        custom components guide
      </a>
      .
    </div>
  )
}

export default BeforeDashboard
