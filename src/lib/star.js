export const addStar = (animeId, stars) => {
  const updated = [...stars, animeId]
  localStorage.setItem('stars', JSON.stringify(updated))

  return animeId
}

export const deleteStar = (animeId, stars) => {
  const updated = stars.filter(x => x !== animeId)
  localStorage.setItem('stars', JSON.stringify(updated))

  return animeId
}
  