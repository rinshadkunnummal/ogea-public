import { Mail, Phone, MessageCircleMore } from 'lucide-react'

const details = [
  {
    method: 'Email Us',
    info: 'chsoutreachboard@gmail.com',
    links : 'mailto:chsoutreachboard@gmail.com',
    icon: Mail,         
    color: 'bg-red-500'
  },
  {
    method: 'Call Us',
    info: '+91 72936 52029',
    links : 'tel:+917293652029',
    icon: Phone,
    color: 'bg-blue-500'
  },
  {
    method: 'Contact Us via Whatsapp',
    info: '+91 9072818060',
    links : 'https://wa.me/919072818060',
    icon: MessageCircleMore,
    color: 'bg-green-500'
  },
  // {
  //   method: 'Contact Us via Message',
  //   info: '+91 9072818060',
  //   links : 'https://wa.me/919072818060',
  //   icon: MessageCircleMore,
  //   color: 'bg-yellow-500'
  // }
]

export default details