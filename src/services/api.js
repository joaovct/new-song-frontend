import axios from 'axios'

const api = {
    use: axios.create({
        baseURL: 'https://api.spotify.com/v1'
    }),
    client_id: 'd517f32ca0f242078eecd6a1969a20a2',
    client_secret: '88909b20807140e9b9b3ab56591e682f',
    redirect_uri: 'http://localhost:3000/callback'
}

export default api
