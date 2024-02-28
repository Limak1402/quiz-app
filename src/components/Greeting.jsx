import React from 'react'

const Greeting = ({ user }) => {
  return (
    <h1 className='greet'>Witaj, {user.email}!</h1>
  )
}

export default Greeting