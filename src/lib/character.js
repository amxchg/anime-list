import api from "../functions/api"

export const getAnimeCharacters = async (id) => {
  const response = await api(`/anime/${id}/relationships/anime-characters`, {})
    .then(({ data }) => {
      return data.data
    })
    .catch((data) => {
      return console.log(data)
    })

  return response
}

export const getAnimeCharacter = async (id) => {
  const response = await api(`/anime-characters/${id}/character`, {})
    .then(({ data }) => {
      return data.data
    })
    .catch((data) => {
      return console.log(data)
    })

  return response
}

