import { memo } from 'react'
import logoImg from '/logo.svg'
import { Twitter, Instagram, Linkedin } from 'lucide-react'

const SOCIAL_LINKS = [
  { icon: Twitter, href: '#', label: 'Twitter' },
  { icon: Instagram, href: '#', label: 'Instagram' },
  { icon: Linkedin, href: '#', label: 'LinkedIn' },
]

const FOOTER_LINKS = [
  { name: 'Drive', href: 'https://drive.google.com/drive/folders/1z-Q5CfkDy-2D0T9tDwXYXL6Uv1jrkkSk' },
  { name: 'Programs', href: 'https://drive.google.com/drive/folders/1z-Q5CfkDy-2D0T9tDwXYXL6Uv1jrkkSk' },
  { name: 'Mail Us', href: 'mailto:chsoutreachboard@gmail.com' },
  { name: 'Website', href: 'https://chsoutreach.live' },
]

const POLICY_LINKS = [
  { name: 'Privacy Policy', href: '#' },
  { name: 'Terms of Service', href: '#' },
  { name: 'Cookies Settings', href: '#' },
]

const Footer = memo(() => {
    return (
        <footer className="bg-white border-t border-gray-200">
            <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16 py-12">
                {/* Top Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8 ">
                    {/* Brand Section */}
                    <div className="md:col-span-1">
                        <img src={logoImg} alt="Ogea Logo" className="h-35 w-35" />
                        <p className="text-sm text-gray-600 mb-4">
                            OGEA empowers teams to transform raw data into clear, compelling visuals — making insights easier to share, understand, and act on.
                        </p>
                        <div className="flex gap-3">
                            {SOCIAL_LINKS.map(({ icon: Icon, href, label }) => (
                                <a 
                                    key={label}
                                    href={href} 
                                    rel="noopener noreferrer" 
                                    className="text-gray-600 hover:text-gray-900 transition-colors"
                                    aria-label={label}
                                >
                                    <Icon className="w-5 h-5" />
                                </a>
                            ))}
                        </div>
                    </div>
                    <div className="text-left md:text-right">
                        <h3 className="text-sm font-semibold text-gray-900 mb-4">Links</h3>
                        <ul className="space-y-3">
                            {FOOTER_LINKS.map(({ name, href }) => (
                                <li key={name}>
                                    <a 
                                        href={href} 
                                        className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
                                    >
                                        {name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Bottom Section */}
                <div className="pt-8 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-sm text-gray-600">
                        © 2025 OGEA . All rights reserved.
                    </p>
                    <div className="flex gap-6">
                        {POLICY_LINKS.map(({ name, href }) => (
                            <a 
                                key={name}
                                href={href} 
                                className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
                            >
                                {name}
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    )
})

Footer.displayName = 'Footer'

export default Footer