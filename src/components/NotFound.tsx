import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Reveal from './Reveal'

const NotFound: React.FC = () => {
  const navigate = useNavigate()
  const [seconds, setSeconds] = useState(5)

  useEffect(() => {
    if (seconds <= 0) {
      navigate('/')
      return
    }

    const timer = setTimeout(() => setSeconds(s => s - 1), 1000)
    return () => clearTimeout(timer)
  }, [seconds, navigate])

  return (
  <main className="ka-container py-12 md:py-16">
      <Reveal>
        <h1 className="text-3xl font-extrabold tracking-tight md:text-4xl ka-text-roxo-escuro">404</h1>
      </Reveal>
      <Reveal delay={100}>
        <p className="mt-3 max-w-prose text-neutral-700">Página não encontrada.</p>
      </Reveal>
      <Reveal delay={180}>
        <p className="mt-4 text-neutral-600">Redirecionando para a página inicial em {seconds} segundo{seconds !== 1 ? 's' : ''}...</p>
      </Reveal>
    </main>
  )
}

export default NotFound
