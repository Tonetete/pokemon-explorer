export interface CardParams {
  children: React.ReactNode
  dimensions?: string
}

export default function Card({ children, dimensions = 'w-48 h-52' }: CardParams) {
  return (
    <div className={`${dimensions} max-w-md mx-auto bg-white rounded-xl shadow-md p-6 w-full`}>
      {children}
    </div>
  )
}
