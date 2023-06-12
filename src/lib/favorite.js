export const addFavorite = (animeId, favorites) => {
  const updated = [...favorites, animeId]
  localStorage.setItem('favorites', JSON.stringify(updated))

  return animeId
}

export const deleteFavorite = (animeId, favorites) => {
  const updated = favorites.filter(x => x !== animeId)
  localStorage.setItem('favorites', JSON.stringify(updated))

  return animeId
}
