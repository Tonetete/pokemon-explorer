import { useEffect, useState } from 'react'

export default function PokeballLoader({ splash = true }: { splash?: boolean }) {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setIsOpen(prev => !prev)
    }, 500)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className={`flex items-center justify-center ${splash ? 'h-screen' : 'mt-6 mb-6'}`}>
      <div className="relative w-24 h-24 animate-spin-slow">
        <div className="w-24 h-24 rounded-full border-4 border-black overflow-hidden shadow-lg relative flex items-center justify-center">
          <div
            className={`absolute top-0 left-0 w-full h-1/2 bg-red-600 transition-all duration-500 ${
              isOpen ? 'h-1/3' : 'h-1/2'
            } rounded-t-full`}
          ></div>
          <div className="absolute bottom-0 left-0 w-full h-1/2 bg-white rounded-b-full"></div>
          <div className="absolute top-1/2 left-0 w-full h-1 bg-black"></div>
        </div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-white border-4 border-black rounded-full flex items-center justify-center shadow-inner">
          <div className="w-4 h-4 bg-black rounded-full"></div>
        </div>
      </div>
    </div>
  )
}
