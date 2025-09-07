import React, { useState, useEffect } from 'react'

const NotificationModal = ({ 
    title = "Welcome to OGEA!", 
    message = "Explore the latest achievements and activities from Darul Huda Islamic University's Office of Guidance and External Activities.",
    duration = 10000, // 10 seconds
    autoShow = true,
    onClose,
    actionLink = null,
    actionText = "Learn More"
}) => {
    const [isVisible, setIsVisible] = useState(false)
    const [isAnimating, setIsAnimating] = useState(false)
    const [progress, setProgress] = useState(100)

    // Debug logging
    console.log('NotificationModal rendered:', { isVisible, isAnimating, autoShow })

    useEffect(() => {
        if (autoShow) {
            // Always show the modal on every visit
            const showTimer = setTimeout(() => {
                setIsVisible(true)
                setIsAnimating(true)
            }, 500)

            return () => clearTimeout(showTimer)
        }
    }, [autoShow])

    useEffect(() => {
        if (isAnimating) {
            // Progress bar animation
            const progressInterval = setInterval(() => {
                setProgress(prev => {
                    if (prev <= 0) {
                        clearInterval(progressInterval)
                        handleClose()
                        return 0
                    }
                    return prev - (100 / (duration / 100))
                })
            }, 100)

            return () => clearInterval(progressInterval)
        }
    }, [isAnimating, duration])

    const handleClose = () => {
        setIsAnimating(false)
        setTimeout(() => {
            setIsVisible(false)
            if (onClose) onClose()
        }, 300) // Animation duration
    }

    if (!isVisible) return null

    return (
        <>
            {/* Backdrop */}
            <div 
                className={`fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300 ${
                    isAnimating ? 'opacity-100' : 'opacity-0'
                }`}
                onClick={handleClose}
            />
            
            {/* Modal - Centered Position */}
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                <div 
                    className={`bg-white rounded-lg shadow-2xl max-w-md w-full mx-4 transform transition-all duration-300 ${
                        isAnimating 
                            ? 'translate-y-0 opacity-100 scale-100' 
                            : 'translate-y-8 opacity-0 scale-95'
                    }`}
                    role="dialog"
                    aria-labelledby="modal-title"
                    aria-describedby="modal-description"
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* Header */}
                    <div className="flex items-center justify-between p-6 border-b border-gray-200">
                        <div className="flex items-center gap-3">
                            {/* Icon */}
                            <div className="w-8 h-8 bg-[#123575] rounded-full flex items-center justify-center flex-shrink-0">
                                <svg 
                                    className="w-5 h-5 text-white" 
                                    fill="none" 
                                    stroke="currentColor" 
                                    viewBox="0 0 24 24"
                                >
                                    <path 
                                        strokeLinecap="round" 
                                        strokeLinejoin="round" 
                                        strokeWidth={2} 
                                        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
                                    />
                                </svg>
                            </div>
                            <h2 
                                id="modal-title" 
                                className="text-xl font-semibold text-gray-900 font-poppins"
                            >
                                {title}
                            </h2>
                        </div>
                        <button
                            onClick={handleClose}
                            className="text-gray-400 hover:text-gray-600 transition-colors duration-200 p-1 rounded-full hover:bg-gray-100 flex-shrink-0"
                            aria-label="Close notification"
                        >
                            <svg 
                                className="w-5 h-5" 
                                fill="none" 
                                stroke="currentColor" 
                                viewBox="0 0 24 24"
                            >
                                <path 
                                    strokeLinecap="round" 
                                    strokeLinejoin="round" 
                                    strokeWidth={2} 
                                    d="M6 18L18 6M6 6l12 12" 
                                />
                            </svg>
                        </button>
                    </div>
                    
                    {/* Body */}
                    <div className="p-6">
                        <p 
                            id="modal-description" 
                            className="text-gray-600 leading-relaxed text-sm"
                        >
                            {message}
                        </p>
                    </div>
                    
                    {/* Footer with progress bar */}
                    <div className="px-6 pb-6">
                        <div className="flex items-center justify-between mb-3">
                            <span className="text-xs text-gray-500">
                                Auto-close in {Math.ceil(progress / 10)}s
                            </span>
                            <div className="flex gap-2">
                                {actionLink && (
                                    <a
                                        href={actionLink}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="bg-[#123575] text-white px-4 py-2 rounded-md hover:bg-[#0f2a5f] transition-colors duration-200 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#123575] focus:ring-offset-2"
                                    >
                                        {actionText}
                                    </a>
                                )}
                                <button
                                    onClick={handleClose}
                                    className="bg-gray-100 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-200 transition-colors duration-200 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2"
                                >
                                    Got it
                                </button>
                            </div>
                        </div>
                        
                        {/* Progress bar */}
                        <div className="w-full bg-gray-200 rounded-full h-1.5 overflow-hidden">
                            <div 
                                className="bg-[#123575] h-full rounded-full transition-all ease-linear"
                                style={{
                                    width: `${progress}%`,
                                    transition: isAnimating ? 'width 0.1s linear' : 'none'
                                }}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default NotificationModal