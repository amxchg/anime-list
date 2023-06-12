import api from "../functions/api"

export const getEpisodes = async (id) => {
  const response = await api(`/anime/${id}/relationships/episodes`, {})
    .then(({ data }) => {
      return data.data
    })
    .catch((data) => {
      return console.log(data)
    })

  return response
}

export const getEpisode = async (id) => {
  const response = await api(`/episodes/${id}`, {})
    .then(({ data }) => {
      return data.data
    })
    .catch((data) => {
      return console.log(data)
    })

  return response
}
