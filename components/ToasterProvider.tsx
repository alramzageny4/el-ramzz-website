'use client'

import { Toaster } from 'react-hot-toast'

export default function ToasterProvider() {
  return (
    <Toaster
      position="top-center"
      reverseOrder={false}
      gutter={8}
      containerClassName=""
      containerStyle={{}}
      toastOptions={{
        // Default options
        className: '',
        duration: 4000,
        style: {
          background: '#1E1B4B',
          color: '#fff',
          border: '1px solid rgba(168, 85, 247, 0.3)',
          borderRadius: '8px',
          padding: '16px',
        },
        // Success toast
        success: {
          duration: 3000,
          iconTheme: {
            primary: '#10B981',
            secondary: '#fff',
          },
          style: {
            background: '#1E1B4B',
            border: '1px solid rgba(16, 185, 129, 0.3)',
          },
        },
        // Error toast
        error: {
          duration: 4000,
          iconTheme: {
            primary: '#EF4444',
            secondary: '#fff',
          },
          style: {
            background: '#1E1B4B',
            border: '1px solid rgba(239, 68, 68, 0.3)',
          },
        },
      }}
    />
  )
}

