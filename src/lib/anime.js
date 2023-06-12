import api from "../functions/api"

export const getAnimes = async ({ pageParam = 0 }) => {
  const response = await api(`/anime?page%5Blimit%5D=10&page%5Boffset%5D=${pageParam}`, {})
    .then(({ data }) => {
      return data
    })
    .catch((data) => {
      return console.log(data)
    })

  return response
}

export const getAnime = async (id) => {
  const response = await api(`/anime/${id}`, {})
    .then(({ data }) => {
      return data.data
    })
    .catch((data) => {
      return console.log(data)
    })

  return response
}
