'use client'
import React from 'react'
import { Button } from 'antd'
import { useRouter } from 'next/navigation'

const LandingPage = () => {
  const router = useRouter()

  const goToDashboard = () => {
    router.push('/main/dashboard')
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-6">🚀 Welcome to My App</h1>
      <p className="text-lg mb-8">This is the landing page. Click below to continue.</p>

      <Button type="primary" size="large" className="!bg-indigo-600" onClick={goToDashboard}>
        Go to Dashboard
      </Button>
    </div>
  )
}

export default LandingPage
