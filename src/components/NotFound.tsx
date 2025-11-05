import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

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
    <main className="mx-auto max-w-6xl px-4 py-12 md:px-6 md:py-16">
      <h1 className="text-3xl font-extrabold tracking-tight md:text-4xl ka-text-roxo-escuro">404</h1>
      <p className="mt-3 max-w-prose text-neutral-700">Página não encontrada.</p>
      <p className="mt-4 text-neutral-600">Redirecionando para a página inicial em {seconds} segundo{seconds !== 1 ? 's' : ''}...</p>
    </main>
  )
}

export default NotFound
