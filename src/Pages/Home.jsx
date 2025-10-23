import Hero from '../components/custom/hero/Hero'
import About from '../components/custom/about/About'
import Contact from './Contact'
import WelcomeAlert from '@/components/custom/welcomealert/WelcomeAlert'
import Stats from '@/components/custom/stats/Stats'

const Home = () => {
  return (
    <>
      <WelcomeAlert />
      <Hero />
      <Stats />
      <About />
      <Contact />
    </>
  )
}

export default Home