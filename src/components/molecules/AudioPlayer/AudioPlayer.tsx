import { useRef } from 'react'

interface AudioPlayerParams {
  src: string
}

export default function AudioPlayer({ src }: AudioPlayerParams) {
  const audioRef = useRef<HTMLAudioElement>(null)

  const handlePlay = () => {
    if (audioRef.current) {
      audioRef.current.play()
    }
  }

  return (
    <div>
      <audio ref={audioRef}>
        <source src={src} type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
      <button
        onClick={handlePlay}
        className="bg-blue-500 hover:bg-blue-600 text-white text-sm px-2 py-2 rounded-lg cursor-pointer"
      >
        {'\u25B6'} Play cry
      </button>
    </div>
  )
}
