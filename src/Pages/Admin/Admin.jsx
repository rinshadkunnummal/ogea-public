import React, { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import StatsSection from './StatsSection'
import ManageSection from './ManageSection'
import AddSection from './AddSection'
import axios from 'axios'
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
  const [submitting, setSubmitting] = useState(false)
  const [stats, setStats] = useState({
    totalArticles: 0,
    articles: 0,
    stories: 0,
    poems: 0,
    essays: 0,
    seminars: 0,
    reviews: 0,
    letters: 0,
    loading: true
  })

  const [formData, setFormData] = useState({
    title: '',
    writer: '',
    content: '',
    category: 'article'
  })

  const [articles, setArticles] = useState([])

  const correctPasskey = "out" // replace this with an env var in production

  useEffect(() => {
    const storedAuth = sessionStorage.getItem('adminAuthenticated')
    if (storedAuth === 'true') {
      setIsAuthenticated(true)
    }
  }, [])

  useEffect(() => {
    if (isAuthenticated) {
      fetchArticles()
    }
  }, [isAuthenticated])

  useEffect(() => {
    if (articles.length > 0) {
      fetchStats()
    }
  }, [articles])

  const handlePasskeySubmit = (e) => {
    e.preventDefault()
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

  const fetchArticles = async () => {
    try {
      const response = await axios.get("https://ogea-api.onrender.com/api/v1/articles")
      const fetched = response.data.data?.articles || response.data.articles || []
      console.log("Fetched articles:", fetched)
      setArticles(fetched)
    } catch (err) {
      console.error("Fetch error:", err)
    }
  }

  const fetchStats = () => {
    const totalArticles = articles.length
    const articlesCount = articles.filter(article => article.category === 'article').length
    const stories = articles.filter(article => article.category === 'story').length
    const poems = articles.filter(article => article.category === 'poem').length
    const essays = articles.filter(article => article.category === 'essay').length
    const seminars = articles.filter(article => article.category === 'seminar').length
    const reviews = articles.filter(article => article.category === 'review').length
    const letters = articles.filter(article => article.category === 'letter').length

    setStats({
      totalArticles,
      articles: articlesCount,
      stories,
      poems,
      essays,
      seminars,
      reviews,
      letters,
      loading: false
    })
  }

  const handleDeleteArticle = async (id) => {
    if (!window.confirm("Are you sure you want to delete this article?")) return
    try {
      await axios.delete(`https://ogea-api.onrender.com/api/v1/articles/${id}`)
      setArticles(prev => prev.filter(article => article._id !== id))
      fetchStats()
      alert("Article deleted successfully!")
    } catch (err) {
      console.error("Delete error:", err)
      alert("Failed to delete article.")
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

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

      setFormData({
        title: '',
        writer: '',
        content: '',
        category: 'article'
      })

      fetchArticles()
      alert('Article added successfully!')
    } catch (err) {
      console.error("Submit error:", err)
      alert('Failed to add article. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  const handleCancel = () => {
    setFormData({
      title: '',
      writer: '',
      content: '',
      category: 'article'
    })
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-6">
          <div className="text-center mb-6">
            <div className="mx-auto w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center mb-4">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
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
    <div className="admin-page flex min-h-screen mt-10 sm:mt-0">
      <div className="sideBar">
        <AdminSideBar handleLogout={handleLogout} />
      </div>
      <div className="right flex-1 p-8 bg-gray-50">
        <Routes>
          <Route path="/" element={<StatsSection stats={stats} />} />
          <Route path="manage" element={<ManageSection articles={articles} handleDeleteArticle={handleDeleteArticle} onArticleUpdate={fetchArticles} />} />
          <Route path="add" element={<AddSection formData={formData} handleInputChange={handleInputChange} handleSubmit={handleSubmit} handleCancel={handleCancel} submitting={submitting} />} />
        </Routes>
      </div>
    </div>
  )
}

export default Admin
