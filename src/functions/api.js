import Axios from 'axios'

export const baseURL = 'https://kitsu.io/api/edge'

const axios = Axios.create({
  baseURL,
  headers: {
    Accept: "application/vnd.api+json",
    "Content-Type": "application/vnd.api+json"
  },
})

const baseConfig = {
  method: "get",
}

const api = (url, options = {}, config = {}) => {
  const mergedConfig = { ...baseConfig, ...config }

  return axios({
    ...mergedConfig,
    params: options,
    url,
  })
}

export default api