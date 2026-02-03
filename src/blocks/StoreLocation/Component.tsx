import type { StoreLocationBlock as StoreLocationBlockProps } from '@/payload-types'
import React from 'react'
import RichText from '@/components/RichText'

export const StoreLocationBlock: React.FC<
  StoreLocationBlockProps & {
    id?: string
    lang?: string
  }
> = (props) => {
  const {
    id,
    title,
    address,
    phone,
    email,
    workingHours,
    googleMapsUrl,
    googleMapsEmbed,
    latitude,
    longitude,
    directions,
    showCoordinates,
  } = props

  const getMethodIcon = (method: string) => {
    switch (method) {
      case 'car':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" />
          </svg>
        )
      case 'train':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        )
      case 'bus':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
          </svg>
        )
      case 'taxi':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        )
      default:
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
          </svg>
        )
    }
  }

  // Extract src from iframe embed code
  const getEmbedSrc = (embedCode: string): string => {
    const match = embedCode.match(/src="([^"]+)"/)
    return match ? match[1] : ''
  }

  const embedSrc = googleMapsEmbed ? getEmbedSrc(googleMapsEmbed) : ''

  return (
    <div className="my-8" id={`block-${id}`}>
      <div className="container mx-auto">
        <div className="bg-white rounded-lg p-4 md:p-8">
          {/* Header Section */}
          {title && (
            <div className="text-center mb-8">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 tracking-tight">
                {typeof title === 'string' ? title : 'เดินทางมาที่ร้าน'}
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                พบกับเราได้ที่สาขาของเรา พร้อมบริการด้วยความประทับใจ
              </p>
            </div>
          )}

          {/* Map Only */}
          <div className="max-w-6xl mx-auto">
            <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-200/50 hover:shadow-2xl transition-all duration-300">
              {/* Map */}
              {embedSrc && (
                <div className="relative w-full h-[450px] md:h-[550px] bg-gradient-to-br from-gray-50 to-gray-100">
                  <iframe
                    src={embedSrc}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Google Maps Location"
                    className="w-full h-full"
                  />
                </div>
              )}

              {/* Map Footer */}
              <div className="px-6 py-5 bg-gradient-to-r from-slate-50 via-white to-slate-50 border-t border-gray-200/80">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  {showCoordinates && latitude && longitude && (
                    <div className="flex items-center gap-2 text-sm">
                      <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center">
                        <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div>
                        <span className="text-gray-500 font-medium text-xs block">พิกัดที่ตั้ง</span>
                        <span className="text-gray-800 font-semibold text-sm">{latitude}, {longitude}</span>
                      </div>
                    </div>
                  )}
                  {googleMapsUrl && (
                    <a
                      href={googleMapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2.5 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-200 font-semibold text-sm shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40 hover:-translate-y-0.5 group"
                    >
                      <svg className="w-5 h-5 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      เปิดใน Google Maps
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Directions */}
          {directions && directions.length > 0 && (
            <div className="mt-16">
              <div className="text-center mb-12">
                <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3 tracking-tight">คำแนะนำการเดินทาง</h3>
                <p className="text-gray-600 text-lg">เลือกวิธีการเดินทางที่เหมาะกับคุณ</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {directions.map((direction, index) => (
                  <div
                    key={index}
                    className="group relative bg-gradient-to-br from-white via-white to-gray-50/50 rounded-2xl shadow-lg p-7 border border-gray-200/60 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 overflow-hidden"
                  >
                    {/* Background Decoration */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-500/5 to-purple-500/5 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500"></div>
                    
                    <div className="relative z-10">
                      <div className="flex items-start gap-4 mb-5">
                        <div className="flex-shrink-0 w-14 h-14 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-indigo-500/30 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                          {getMethodIcon(direction.method || 'other')}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-xl font-bold text-gray-900 mb-1 group-hover:text-indigo-600 transition-colors">
                            {typeof direction.title === 'string' ? direction.title : ''}
                          </h4>
                          <div className="w-12 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"></div>
                        </div>
                      </div>
                      <div className="text-gray-600 prose prose-sm max-w-none leading-relaxed [&>p]:mb-2 [&>ul]:mt-2 [&>ul]:space-y-1">
                        {direction.description && <RichText data={direction.description} enableGutter={false} />}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
