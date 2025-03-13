export interface ChipParams {
  name: string
  customClass?: string
}

export default function Chip({ customClass, name }: ChipParams) {
  return (
    <div
      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium mr-2 mb-2 ${customClass || 'bg-gray-100 text-gray-800'}`}
    >
      {name}
    </div>
  )
}
