import React from 'react'

const About = () => {
  return (
    <div className="about-page">
      <h1 className="text-3xl font-bold mb-4">About Page</h1>
      <p className="text-lg mb-6">Learn more about our application and our mission.</p>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-3">Our Mission</h2>
        <p className="mb-4">
          We are dedicated to providing the best resources and tools for our community.
          Our goal is to create an inclusive and supportive environment for everyone.
        </p>
        <h2 className="text-xl font-semibold mb-3">Our Team</h2>
        <p>
          Our team consists of dedicated professionals with expertise in various fields,
          working together to deliver exceptional results.
        </p>
      </div>
    </div>
  )
}

export default About
