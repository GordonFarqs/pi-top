import { useState, useEffect, useRef } from 'react'

const useMediaQuery = query => {
  const [isQueryTrue, setIsQueryTrue] = useState(window.matchMedia(query).matches)
  const media = useRef<MediaQueryList>(null)

  //@ts-ignore
  const onResize = ({ matches }) => setIsQueryTrue(matches)

  useEffect(() => {
    //@ts-ignore
    media.current = window.matchMedia(query)
    media.current.addListener(onResize)

    return () => {
      if (media.current) {
        media.current.removeListener(onResize)
      }
    }
  }, [query])

  return isQueryTrue
}

export default useMediaQuery
