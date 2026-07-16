import { useState } from 'react'

export function useFavourites() {
  const [favourites, setFavourites] = useState(() => {
    try {
      const stored = localStorage.getItem('selah_favourites')
      return stored ? JSON.parse(stored) : []
    } catch {
      return []
    }
  })

  const removeFavourite = (item) => {
    const updated = favourites.filter(f => {
      if (item.type === 'verse') return f.reference !== item.reference
      return !(f.saint === item.saint && f.quote === item.quote)
    })
    setFavourites(updated)
    localStorage.setItem('selah_favourites', JSON.stringify(updated))
  }

  return { favourites, removeFavourite }
}