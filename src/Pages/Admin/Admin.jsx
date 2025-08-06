import React, { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import StatsSection from './StatsSection'
import ManageSection from './ManageSection'
import AddSection from './AddSection'
import ManagePosters from './ManagePosters'
import { articlesAPI, config } from '../../services/apiService'
import AdminSideBar from '@/Components/AdminSideBar/AdminSideBar'

const Admin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
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

  const { username: correctUsername, password: correctPassword } = config.adminCredentials

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

  const handleLoginSubmit = (e) => {
    e.preventDefault()
    if (username === correctUsername && password === correctPassword) {
      setIsAuthenticated(true)
      setError('')
      sessionStorage.setItem('adminAuthenticated', 'true')
    } else {
      setError('Incorrect username or password. Access denied.')
      setPassword('')
    }
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    sessionStorage.removeItem('adminAuthenticated')
    setUsername('')
    setPassword('')
    setError('')
  }

  const fetchArticles = async () => {
    try {
      const response = await articlesAPI.getAll()
      const fetched = response.data?.articles || response.articles || []
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
      await articlesAPI.delete(id)
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
      const response = await articlesAPI.create(formData)
      console.log("Article created:", response)

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
            <p className="text-gray-600 mt-2">Enter your credentials to access the admin panel</p>
          </div>

          <form onSubmit={handleLoginSubmit}>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter username"
                required
              />
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 pr-10"
                  placeholder="Enter password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {error && (
              <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg text-sm">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={!username || !password}
              className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Login to Admin Panel
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
          <Route path="posters" element={<ManagePosters />} />
        </Routes>
      </div>
    </div>
  )
}

export default Admin
