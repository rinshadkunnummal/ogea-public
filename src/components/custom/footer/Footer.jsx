import React from 'react'
import details from '../../../lib/details'
import logoImg from '/logo.svg'
import { Twitter, Instagram, Linkedin, Github } from 'lucide-react'

const Footer = () => {
    return (
        <footer className="bg-white border-t border-gray-200">
            <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16 py-12">
                {/* Top Section */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
                    {/* Brand Section */}
                    <div className="md:col-span-1">
                        <img src={logoImg} alt="Ogea Logo" className="h-35 w-35" />
                        <p className="text-sm text-gray-600 mb-4">
                            Ogea empowers teams to transform raw data into clear, compelling visuals — making insights easier to share, understand, and act on.
                        </p>
                        <div className="flex gap-3">
                            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-gray-900 transition-colors">
                                <Twitter className="w-5 h-5" />
                            </a>
                            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-gray-900 transition-colors">
                                <Instagram className="w-5 h-5" />
                            </a>
                            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-gray-900 transition-colors">
                                <Linkedin className="w-5 h-5" />
                            </a>
                            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-gray-900 transition-colors">
                                <Github className="w-5 h-5" />
                            </a>
                        </div>
                    </div>
                    <div>
                        <h3 className="text-sm font-semibold text-gray-900 mb-4">Links</h3>
                        <ul className="space-y-3">
                            <li><a href="https://drive.google.com/drive/folders/1z-Q5CfkDy-2D0T9tDwXYXL6Uv1jrkkSk" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">Drive</a></li>
                            <li><a href="https://drive.google.com/drive/folders/1z-Q5CfkDy-2D0T9tDwXYXL6Uv1jrkkSk" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">Programs</a></li>
                            <li><a href="mailto:chsoutreachboard@gmail.com" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">Mail Us</a></li>
                            <li><a href="https://chsoutreach.live" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">Website</a></li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Section */}
                <div className="pt-8 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-sm text-gray-600">
                        © 2025 Ogea. All rights reserved.
                    </p>
                    <div className="flex gap-6">
                        <a href="#privacy" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">Privacy Policy</a>
                        <a href="#terms" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">Terms of Service</a>
                        <a href="#cookies" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">Cookies Settings</a>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer