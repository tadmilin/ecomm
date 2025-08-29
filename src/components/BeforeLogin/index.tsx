import React from 'react'

interface BeforeLoginProps {
  title: string
  subtitle: string
}

const BeforeLogin: React.FC<BeforeLoginProps> = ({ title, subtitle }) => {
  return (
    <div>
      <p>
        <b>{title}</b>
        {subtitle}
      </p>
    </div>
  )
}

export default BeforeLogin
