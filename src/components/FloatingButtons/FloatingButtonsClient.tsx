'use client'

import React from 'react'
import type { FloatingButton } from '@/payload-types'
import type { Media } from '@/payload-types'

type Button = NonNullable<FloatingButton['buttons']>[number]

interface Props {
  buttons: Button[]
}

export const FloatingButtonsClient: React.FC<Props> = ({ buttons }) => {
  const activeButtons = buttons.filter((btn) => btn.enabled !== false)

  if (activeButtons.length === 0) return null

  return (
    <div
      className="floating-buttons-container"
      aria-label="ติดต่อเรา"
    >
      {[...activeButtons].reverse().map((btn, i) => (
        <FloatingButton key={btn.id || i} btn={btn} />
      ))}

      <style jsx global>{`
        .floating-buttons-container {
          position: fixed;
          bottom: 24px;
          right: 20px;
          z-index: 9999;
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 12px;
        }

        .floating-btn-wrapper {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: flex-end;
        }

        .floating-btn {
          width: 56px;
          height: 56px;
          border-radius: 50%;
          border: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.25);
          transition: transform 0.2s ease, box-shadow 0.2s ease;
          text-decoration: none;
          overflow: hidden;
          flex-shrink: 0;
          position: relative;
        }

        .floating-btn:hover {
          transform: scale(1.12);
          box-shadow: 0 6px 24px rgba(0, 0, 0, 0.35);
        }

        .floating-btn:active {
          transform: scale(0.96);
        }

        .floating-btn img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center;
          display: block;
          border-radius: 50%;
        }

        .floating-btn-tooltip {
          position: absolute;
          right: 68px;
          background: rgba(30, 30, 30, 0.92);
          color: #fff;
          padding: 6px 12px;
          border-radius: 8px;
          font-size: 13px;
          white-space: nowrap;
          pointer-events: none;
          opacity: 0;
          transform: translateX(8px);
          transition: opacity 0.18s ease, transform 0.18s ease;
          box-shadow: 0 2px 10px rgba(0,0,0,0.2);
        }

        .floating-btn-tooltip::after {
          content: '';
          position: absolute;
          right: -6px;
          top: 50%;
          transform: translateY(-50%);
          border: 6px solid transparent;
          border-right: none;
          border-left-color: rgba(30, 30, 30, 0.92);
        }

        .floating-btn-wrapper:hover .floating-btn-tooltip {
          opacity: 1;
          transform: translateX(0);
        }

        /* Pulse animation สำหรับปุ่มแรกสุด */
        .floating-btn-pulse::before {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: 50%;
          animation: floating-pulse 2s ease-out infinite;
          background: inherit;
          opacity: 0;
        }

        @keyframes floating-pulse {
          0%   { transform: scale(1);   opacity: 0.6; }
          100% { transform: scale(1.9); opacity: 0; }
        }

        @media (max-width: 480px) {
          .floating-buttons-container {
            bottom: 16px;
            right: 14px;
            gap: 10px;
          }
          .floating-btn {
            width: 50px;
            height: 50px;
          }
          .floating-btn-tooltip {
            display: none;
          }
        }
      `}</style>
    </div>
  )
}

const FloatingButton: React.FC<{ btn: Button }> = ({ btn }) => {
  const iconMedia = btn.icon && typeof btn.icon === 'object' ? (btn.icon as Media) : null
  const iconUrl = iconMedia?.url || null
  const bg = btn.backgroundColor || '#25D366'

  return (
    <div className="floating-btn-wrapper">
      {btn.tooltip && (
        <span className="floating-btn-tooltip" role="tooltip">
          {btn.tooltip}
        </span>
      )}
      <a
        href={btn.link}
        target={btn.openInNewTab ? '_blank' : '_self'}
        rel={btn.openInNewTab ? 'noopener noreferrer' : undefined}
        aria-label={btn.label}
        className="floating-btn floating-btn-pulse"
        style={{ backgroundColor: bg }}
      >
        {iconUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={iconUrl} alt={btn.label} width={56} height={56} />
        ) : (
          <DefaultIcon label={btn.label} color={btn.iconColor || '#fff'} />
        )}
      </a>
    </div>
  )
}

/** Fallback SVG icon based on label keyword matching */
const DefaultIcon: React.FC<{ label: string; color: string }> = ({ label, color }) => {
  const lower = label.toLowerCase()

  if (lower.includes('line')) {
    return (
      <svg viewBox="0 0 40 40" width="28" height="28" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fill={color} d="M20 3C10.6 3 3 9.7 3 18c0 5.5 3.3 10.4 8.4 13.3-.4 1.4-1.3 4.9-1.5 5.6-.2.8.3 1.6 1.1 1.2.6-.3 7.4-4.9 10.4-6.9.5 0 1.1.1 1.6.1 9.4 0 17-6.7 17-15S29.4 3 20 3z"/>
        <path fill={color === '#fff' ? '#25D366' : color} d="M20 3C10.6 3 3 9.7 3 18c0 5.5 3.3 10.4 8.4 13.3-.4 1.4-1.3 4.9-1.5 5.6-.2.8.3 1.6 1.1 1.2.6-.3 7.4-4.9 10.4-6.9.5 0 1.1.1 1.6.1 9.4 0 17-6.7 17-15S29.4 3 20 3z"/>
        <path fill="white" d="M12 15.5h2v5h-2zm3.5 0h1.8l3.2 3.3v-3.3h2v5h-1.8l-3.2-3.3v3.3h-2zm8 0h5v1.7h-3v.7h3v1.7h-3v.7h3V22h-5z"/>
      </svg>
    )
  }

  if (lower.includes('โทร') || lower.includes('call') || lower.includes('phone') || lower.includes('tel')) {
    return (
      <svg viewBox="0 0 24 24" width="26" height="26" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fill={color} d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C10.6 21 3 13.4 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1L6.6 10.8z"/>
      </svg>
    )
  }

  // Generic link icon
  return (
    <svg viewBox="0 0 24 24" width="26" height="26" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fill={color} d="M3.9 12c0-1.7 1.4-3.1 3.1-3.1h4V7H7C4.2 7 2 9.2 2 12s2.2 5 5 5h4v-1.9H7c-1.7 0-3.1-1.4-3.1-3.1zM8 13h8v-2H8v2zm9-6h-4v1.9h4c1.7 0 3.1 1.4 3.1 3.1s-1.4 3.1-3.1 3.1h-4V17h4c2.8 0 5-2.2 5-5s-2.2-5-5-5z"/>
    </svg>
  )
}
