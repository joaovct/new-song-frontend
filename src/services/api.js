import axios from 'axios'

const {REACT_APP_CLIENT_ID: client_id, REACT_APP_CLIENT_SECRET: client_secret, REACT_APP_REDIRECT_URI: redirect_uri} = process.env

const api = {
    use: axios.create({
        baseURL: 'https://api.spotify.com/v1'
    }),
    client_id,
    client_secret,
    redirect_uri
}

export default api
