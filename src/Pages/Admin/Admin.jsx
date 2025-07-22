import React, { useState, useEffect } from 'react'
import axios from 'axios'
import StatsCard from '../../Components/StatsCard/StatsCard'
import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp"
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp"
import AdminSideBar from '@/Components/AdminSideBar/AdminSideBar'



const Admin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [passkey, setPasskey] = useState('')
  const [error, setError] = useState('')
  const [showAddForm, setShowAddForm] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [stats, setStats] = useState({
    totalArticles: 0,
    stories: 0,
    poems: 0,
    essays: 0,
    seminars: 0,
    reviews: 0,
    loading: true
  })

  // Form state
  const [formData, setFormData] = useState({
    title: '',
    writer: '',
    content: '',
    category: 'article'
  })

  // Check authentication on component mount
  useEffect(() => {
    const authStatus = sessionStorage.getItem('adminAuthenticated')
    if (authStatus === 'true') {
      setIsAuthenticated(true)
      fetchStats() // Fetch stats when authenticated
    }
  }, [])

  // Fetch statistics for different categories
  const fetchStats = async () => {
    try {
      setStats(prev => ({ ...prev, loading: true }))

      // Fetch all categories in parallel
      const [totalRes, storiesRes, poemsRes, essaysRes, seminarsRes, reviewsRes] = await Promise.all([
        axios.get("https://ogea-api.onrender.com/api/v1/articles"),
        axios.get("https://ogea-api.onrender.com/api/v1/articles?category=story"),
        axios.get("https://ogea-api.onrender.com/api/v1/articles?category=poem"),
        axios.get("https://ogea-api.onrender.com/api/v1/articles?category=essay"),
        axios.get("https://ogea-api.onrender.com/api/v1/articles?category=seminar"),
        axios.get("https://ogea-api.onrender.com/api/v1/articles?category=review")
      ])

      setStats({
        totalArticles: totalRes.data.results || totalRes.data.data?.articles?.length || 0,
        stories: storiesRes.data.results || storiesRes.data.data?.articles?.length || 0,
        poems: poemsRes.data.results || poemsRes.data.data?.articles?.length || 0,
        essays: essaysRes.data.results || essaysRes.data.data?.articles?.length || 0,
        seminars: seminarsRes.data.results || seminarsRes.data.data?.articles?.length || 0,
        reviews: reviewsRes.data.results || reviewsRes.data.data?.articles?.length || 0,
        loading: false
      })
    } catch (err) {
      console.error("Stats fetch error:", err)
      setStats(prev => ({ ...prev, loading: false }))
    }
  }

  const handlePasskeySubmit = (e) => {
    e.preventDefault()

    // Replace 'ADMIN1' with your desired 6-character passkey
    const correctPasskey = 'ogea25'

    if (passkey === correctPasskey) {
      setIsAuthenticated(true)
      setError('')
      sessionStorage.setItem('adminAuthenticated', 'true')
    } else {
      setError('Incorrect passkey. Access denied.')
      setPasskey('')
    }
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    sessionStorage.removeItem('adminAuthenticated')
    setPasskey('')
    setError('')
  }

  // Fetch existing articles
  const fetchArticles = async () => {
    try {
      const response = await axios.get("https://ogea-api.onrender.com/api/v1/articles")
      console.log("Data from backend:", response.data)
      // Refresh stats after fetching articles
      fetchStats()
    } catch (err) {
      console.error("Fetch error:", err)
    }
  }

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!formData.title || !formData.writer || !formData.content) {
      alert('Please fill in all required fields')
      return
    }

    try {
      setSubmitting(true)
      const response = await axios.post("https://ogea-api.onrender.com/api/v1/articles", formData)
      console.log("Article created:", response.data)

      // Reset form
      setFormData({
        title: '',
        writer: '',
        content: '',
        category: 'article'
      })

      // Hide form and refresh articles
      setShowAddForm(false)
      fetchArticles()

      alert('Article added successfully!')
    } catch (err) {
      console.error("Submit error:", err)
      alert('Failed to add article. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  // Cancel form
  const handleCancel = () => {
    setFormData({
      title: '',
      writer: '',
      content: '',
      category: 'article'
    })
    setShowAddForm(false)
  }

  // If not authenticated, show passkey form
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-6">
          <div className="text-center mb-6">
            <div className="mx-auto w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center mb-4">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-800">Admin Access Required</h2>
            <p className="text-gray-600 mt-2">Enter your passkey to access the admin panel</p>
          </div>

          <form onSubmit={handlePasskeySubmit}>
            <div className="mb-4">
              <div className="flex justify-center">
                <InputOTP
                  maxLength={6}
                  pattern={REGEXP_ONLY_DIGITS_AND_CHARS}
                  value={passkey}
                  onChange={(value) => setPasskey(value)}
                >
                  <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                  </InputOTPGroup>
                </InputOTP>
              </div>
              <p className="text-xs text-gray-500 text-center mt-2">Enter 6-character admin code</p>
            </div>

            {error && (
              <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg text-sm">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={passkey.length !== 6}
              className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Access Admin Panel
            </button>
          </form>
        </div>
      </div>
    )
  }
  return (
    <div className="admin-page">
      <div className="sideBar"> <AdminSideBar handleLogout={handleLogout} /> </div>
      <div className="right">

        {/* Header with Logout */}
        <div className="flex justify-center items-center mb-6 flex-col gap-3 lg:gap-10">
          <div>
            <h1 className="text-xl sm:text-3xl text-center sm:text-left text-black font-bold font-nunito">Admin Dashboard</h1>
            <p className="text-[#6B7280] sm:text-lg text-[10px] text-center sm:text-left">Manage articles and content for the CHS Outreach Board.</p>
          </div>
          <nav className="stats grid grid-cols-2 sm:grid-cols-3 gap-4">
            <StatsCard
              title={"Total Articles"}
              value={stats.loading ? "..." : stats.totalArticles.toString()}
            />
            <StatsCard
              title={"Stories"}
              value={stats.loading ? "..." : stats.stories.toString()}
            />
            <StatsCard
              title={"Poems"}
              value={stats.loading ? "..." : stats.poems.toString()}
            />
            <StatsCard
              title={"Essays"}
              value={stats.loading ? "..." : stats.essays.toString()}
            />
            <StatsCard
              title={"Seminars"}
              value={stats.loading ? "..." : stats.seminars.toString()}
            />
            <StatsCard
              title={"Reviews"}
              value={stats.loading ? "..." : stats.reviews.toString()}
            />
          </nav>
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="w-48 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            {showAddForm ? 'Cancel' : 'Add New Content'}
          </button>
        </div>

        {/* Add Article Form */}
        {showAddForm && (
          <div className="bg-white rounded-lg p-6 shadow-lg mb-6 border border-gray-200">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Add New Content</h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Title */}
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                  Article Title *
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter article title"
                  required
                />
              </div>

              {/* Writer */}
              <div>
                <label htmlFor="writer" className="block text-sm font-medium text-gray-700 mb-1">
                  Author/Writer *
                </label>
                <input
                  type="text"
                  id="writer"
                  name="writer"
                  value={formData.writer}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter author name"
                  required
                />
              </div>

              {/* Category */}
              <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                  Category
                </label>
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="essay">Essay / Article</option>
                  <option value="story">Short Story</option>
                  <option value="poem">Poem</option>
                  <option value="seminar">Seminar Paper</option>
                  <option value="review">Letter</option>
                  <option value="review">Review</option>
                </select>
              </div>

              {/* Content */}
              <div>
                <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">
                  Article Content *
                </label>
                <textarea
                  id="content"
                  name="content"
                  value={formData.content}
                  onChange={handleInputChange}
                  rows="8"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter the full article content"
                  required
                />
              </div>

              {/* Form Buttons */}
              <div className="flex gap-4 pt-4">
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium disabled:opacity-50"
                >
                  {submitting ? 'Adding...' : 'Add Content'}
                </button>

                <button
                  type="button"
                  onClick={handleCancel}
                  className="px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors font-medium"
                >
                  Cancel
                </button>
              </div>
            </form>

          </div>
        )}
        {/* Logout button moved to sidebar */}
      </div>
    </div>
  )
}

export default Admin
