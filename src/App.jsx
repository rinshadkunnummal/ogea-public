import React from 'react'
import { RouterProvider } from 'react-router-dom'
import router from './routes/routes'
import WelcomeAlert from './components/custom/welcomealert/WelcomeAlert'

const App = () => {
  return (
    <>
      <WelcomeAlert />
      <RouterProvider router={router} />
    </>
  )
}

export default App