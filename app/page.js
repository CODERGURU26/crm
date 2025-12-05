'use client'
import React from 'react'
import { Button } from 'antd'
import { useRouter } from 'next/navigation'
import { 
  UserCircle, 
  BarChart3, 
  Users, 
  MessageSquare, 
  Calendar, 
  TrendingUp,
  CheckCircle,
  Zap
} from 'lucide-react'

const LandingPage = () => {
  const router = useRouter()

  const goToDashboard = () => {
    router.push('/main/dashboard')
  }

  const features = [
    {
      icon: <Users className="w-6 h-6" />,
      title: "Contact Management",
      description: "Organize and track all your customer relationships in one place"
    },
    {
      icon: <BarChart3 className="w-6 h-6" />,
      title: "Sales Analytics",
      description: "Get real-time insights into your sales pipeline and performance"
    },
    {
      icon: <MessageSquare className="w-6 h-6" />,
      title: "Communication Hub",
      description: "Track all customer interactions and communication history"
    },
    {
      icon: <Calendar className="w-6 h-6" />,
      title: "Task Automation",
      description: "Automate follow-ups and never miss an important deadline"
    }
  ]

  const stats = [
    { value: "10K+", label: "Active Users" },
    { value: "95%", label: "Customer Satisfaction" },
    { value: "50M+", label: "Contacts Managed" },
    { value: "24/7", label: "Support Available" }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-indigo-100 text-indigo-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Zap className="w-4 h-4" />
            <span>Powerful CRM Solution</span>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Manage Customer Relationships
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
              Like Never Before
            </span>
          </h1>
          
          <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
            Streamline your sales process, boost productivity, and grow your business with our comprehensive CRM platform
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              type="primary" 
              size="large" 
              className="!bg-indigo-600 !h-12 !px-8 !text-base font-semibold shadow-lg hover:shadow-xl transition-all"
              onClick={goToDashboard}
            >
              Go to Dashboard →
            </Button>
            
          </div>

          
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-20 max-w-5xl mx-auto">
          {stats.map((stat, idx) => (
            <div key={idx} className="text-center p-6 bg-white rounded-xl shadow-sm border border-gray-100">
              <div className="text-3xl font-bold text-indigo-600 mb-2">{stat.value}</div>
              <div className="text-sm text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Features Section */}
        <div className="mt-24">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Everything You Need to Succeed
            </h2>
            <p className="text-lg text-gray-600">
              Powerful features designed to help you close more deals
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {features.map((feature, idx) => (
              <div 
                key={idx} 
                className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all hover:-translate-y-1"
              >
                <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center text-indigo-600 mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-sm">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-24 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-12 text-center text-white shadow-xl">
          <TrendingUp className="w-16 h-16 mx-auto mb-6 opacity-90" />
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Transform Your Sales?
          </h2>
          <p className="text-lg mb-8 opacity-90 max-w-2xl mx-auto">
            Join thousands of businesses already growing with our CRM platform
          </p>
          <Button 
            size="large" 
            className="!bg-white !text-indigo-600 !h-12 !px-8 !text-base font-semibold hover:!bg-gray-50"
            onClick={goToDashboard}
          >
            Get Started Now
          </Button>
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-gray-200 mt-16">
        <div className="container mx-auto px-4 py-8 text-center text-gray-600 text-sm">
          <p>© 2024 CRM App. All rights reserved.</p>
        </div>
      </div>
    </div>
  )
}

export default LandingPage