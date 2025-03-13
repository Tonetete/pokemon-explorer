export interface CardParams {
  children: React.ReactNode
}

export default function Card({ children }: CardParams) {
  return (
    <div className="flex flex-col justify-center items-center h-48 w-48 max-w-md mx-auto bg-white rounded-xl shadow-md p-6">
      {children}
    </div>
  )
}
