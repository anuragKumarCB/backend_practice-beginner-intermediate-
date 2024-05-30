import { useEffect, useState } from 'react'
import axios from 'axios'

function App() {
  const [jokes, setJokes] = useState([])

  useEffect(() => {
    axios.get('/api/jokes')
      .then((response) => {
        setJokes(response.data)
      })
  })

  return (
    <>
      <div className='flex flex-col min-h-screen justify-center items-center bg-black'>
        <div className='shadow-sm shadow-gray-600 rounded-lg w-1/3 p-10 bg-gray-900'>
          <h1 className='text-pink-600 text-5xl font-bold'>Chai aur Full-stack</h1>
          <p className='text-white mt-2 text-xl mb-4'>Jokes Count : <span className='text-pink-500'>{jokes.length}</span></p>
          {
            jokes.map((joke) => (
              <div key={joke.id} className='flex flex-col w-full bg-gray-800 p-2 mb-4'>
                <h2 className='text-2xl text-orange-600'>{joke.title}</h2>
                <p className='text-gray-400 text-xl'>{joke.content}</p>
              </div>
            ))
          }
        </div>

      </div >
    </>
  )
}

export default App
