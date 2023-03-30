import axios from "axios";

const HTTP = axios.create({
    baseURL: '/api'
})

const initBackendApiClient = (store) => {
    HTTP.interceptors.request.use(config => {

        const jwt = store.getState().user?.jwt

        if (jwt) {
            config.headers.Authorization = "Bearer " + jwt
        }

        return config
    })
}

export default HTTP
export { initBackendApiClient }