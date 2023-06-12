export const addLog = (animeId, logs) => {
  const updated = [...logs, animeId]
  localStorage.setItem('logs', JSON.stringify(updated))

  return animeId
}

export const deleteLog = (animeId, logs) => {
  const updated = logs.filter(x => x !== animeId)
  localStorage.setItem('logs', JSON.stringify(updated))

  return animeId
}
