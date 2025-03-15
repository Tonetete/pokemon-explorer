import React from 'react'
import { FaRegStar, FaStar } from 'react-icons/fa'

interface FavoriteStarProps {
  data: unknown
  isFavorite: boolean
  onToggle: ({ data, isFavorite }: { data: unknown; isFavorite: boolean }) => void
  children: ({ favoriteButton }: { favoriteButton: React.ReactNode }) => React.ReactNode
}

export default function FavoriteStar({ data, isFavorite, onToggle, children }: FavoriteStarProps) {
  return (
    <div>
      {children({
        favoriteButton: (
          <button className="cursor-pointer" onClick={() => onToggle({ data, isFavorite })}>
            {isFavorite ? (
              <FaStar className="text-yellow-500 text-xl transition-all transform scale-100" />
            ) : (
              <div className="flex items-center gap-1 opacity-75 transition-all">
                <FaRegStar className="text-yellow-500 text-xl opacity-50" />
              </div>
            )}
          </button>
        ),
      })}
    </div>
  )
}
