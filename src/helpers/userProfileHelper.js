import api from '../services/api'

export async function getUserProfile(accessToken){
    const headers = {headers: {'Content-Type': 'application/json','Authorization': `Bearer ${accessToken}`}}

    let {data} = await api.use.get(`/me`, headers)
    return data
}