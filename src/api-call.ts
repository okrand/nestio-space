import axios, {AxiosError} from 'axios'

export const getApiCall = (baseUrl: string, params?: any) => {
    const apiClient = axios.create({
      baseURL: baseUrl,
      responseType: "json",
      headers: {
        "Content-Type": "application/json"
      }
    })
    return apiClient
      .get("", { params })
      .then(response => {
        return response.data
      })
      .catch(err => {
        if (err && err.response) {
          const axiosError = err as AxiosError
          console.log("ERROR", axiosError)
        }
      })
  }