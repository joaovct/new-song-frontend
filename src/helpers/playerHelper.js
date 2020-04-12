import api from '../services/api'
import qs from 'query-string'

export function formatTiming(value){
    const formatZeros = value => {return value === 0 ? '00' : value < 10 ? `0${value}` : value}
    let str 
    value = (value / 1000).toFixed(0)
    
    if(value === 0) str = '0:00'
    else if(value > 3600){
        let hour = Math.floor(value / 3600)
        let min = ((value % 3600) / 60).toFixed(0)
        let sec = value % 60
        min = formatZeros(min)
        sec = formatZeros(sec)
        str = `${hour}:${min}:${sec}`
    }else{
        let min = Math.floor(value / 60)
        let sec = value % 60
        sec = formatZeros(sec)
        str = `${min}:${sec}`
    }
    return str
}

export async function getUserPlaylists(configs){
    let {accessToken, userId} = configs
    const body = qs.stringify({limit: 50})
    const headers = {headers: {'Content-Type': 'application/json','Authorization': `Bearer ${accessToken}`}}
    
    let {data: {items, next}} = await api.use.get(`/me/playlists?${body}`, headers)

    if(next) items = items.concat(await getRestPlaylists(accessToken, next))

    items = items.filter(item => isUserOwnerPlaylist(item, userId))

    return items
}

async function getRestPlaylists(accessToken, next){
    let body = next.split('?')[1]
    const headers = {headers: {'Content-Type': 'application/json','Authorization': `Bearer ${accessToken}`}}

    let {data, data: {items}} = await api.use.get(`/me/playlists?${body}`, headers)
    next = data.next
    
    while(next){
        let {data: {items: Items, next: Next}} = await api.use.get(`/me/playlists?${body}`, headers)
        items.concat(Items)
        next = Next
        if(next) body = next.split('?')[1]
    }

    return items
}

function isUserOwnerPlaylist({ owner: {id} }, userId){
    return id === userId
}

export async function addTrackToPlaylist(configs){
    let {accessToken, playlist_id, track_id} = configs

    const body = qs.stringify({uris: `spotify:track:${track_id}`})
    const headers = {headers: {'Content-Type': 'application/json','Authorization': `Bearer ${accessToken}`}}
    
    try{
        await api.use.post(`/playlists/${playlist_id}/tracks?${body}`, {}, headers)
        return true
    }catch{
        return false
    }
}

export async function createPlaylist(configs){
    let {name_playlist, accessToken, user_id} = configs
    
    if(!name_playlist) name_playlist = 'Nova playlist'

    const body = {name: name_playlist}
    const headers = {headers: {'Content-Type': 'application/json','Authorization': `Bearer ${accessToken}`}}
    
    const res = await api.use.post(`/users/${user_id}/playlists`, body, headers)
    return res
}

export async function getRandomSong(configs){ 
    let {type, explicit, accessToken} = configs 
    let song = await doRequestGetRandomSong(type, accessToken)
    if((type === 'music' || type === '') && !explicit){
        if(song.explicit){
            let doLoop = true
            do{
                doLoop = false
                song = await doRequestGetRandomSong(type, accessToken)
                if(song.explicit) doLoop = true
            }while(doLoop)
        }
    }
    return song
}

async function doRequestGetRandomSong(type, accessToken){
    const markets = ["AD","AR","AT","AU","BE","BG","BO","BR","CH","CL","CO","CR","CY","CZ","DE","DK","DO","EC","EE","ES","FI","FR","GB","GR","GT","HK","HN","HU","ID","IE","IS","IT","LI","LT","LU","LV","MC","MT","MY","NI","NL","NO","NZ","PA","PE","PH","PL","PT","PY","SE","SG","SK","SV","TR","TW","UY"]
    const market = markets[getRandomNumber(0, markets.length)]
    
    if(type==='music' || type==='') type = 'track'
    else type = 'episode'

    let res, length

    do{
        let c1 = getRandomCharacter()
        let c2 = getRandomCharacter()
        let c3 = getRandomCharacter()

        const body = qs.stringify({q:`${c1}${c2}${c3}`,type, market, limit: 50,})
        const headers = {headers: {'Content-Type': 'application/json','Authorization': `Bearer ${accessToken}`}}
        
        res = await api.use.get(`/search?${body}`,headers)
        if(res !== undefined) type === 'track' ? length = res.data.tracks.items.length : length = res.data.episodes.items.length
    }while(!length)
    

    if(type === 'track'){
        let {data: {tracks: {items}}} = res
        return items[getRandomNumber(0, items.length)]
    }else{
        let {data: {episodes: {items}}} = res
        return items[getRandomNumber(0, items.length)]
    }
}

function getRandomNumber(min, max){
    return Math.floor(Math.random() * (max - min) + min)
}

function getRandomCharacter(){
    return String.fromCharCode(getRandomNumber(97, 122))
}

export const playerMediaQuery = `
    @media(min-width: 1441px){
        width: 400px;
    }

    @media(max-width: 1440px){
        width: 400px;
    }

    @media(max-width: 768px){
        width: 350px;
    }

    @media(max-width: 576px){
        width: 300px;
    }

    @media(max-width: 360px){
        width: 250px;
    }
    ` 

export const playerImageMediaQuery = `
    @media(min-width: 1441px){
        height: 400px;
        width: 400px;
    }

    @media(max-width: 1440px){
        height: 275px;
        width: 275px;
    }

    @media(max-width: 768px){
        height: 275px;
        width: 275px;
    }

    @media(max-width: 576px){
        height: 300px;
        width: 300px;
    }

    @media(max-width: 360px){
        height: 250px;
        width: 250px;
    }
`