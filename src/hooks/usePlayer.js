import {useState, useEffect, useContext} from 'react'

import {setTrackPlayback, togglePlayback} from '../helpers/webPlaybackSDKHelper'
import {getRandomSong} from '../helpers/playerHelper'
import AppContext from '../AppContext'

function usePlayer(props){
    const {accessToken, playerDevice} = useContext(AppContext)
    const {typeListen: type, explicitContent: explicit, languages} = props
    const [track, setTrack] = useState()
    const [isPlaying, setIsPlaying] = useState(true)

    useEffect(()=>{
        togglePlayback()
    },[isPlaying, accessToken])

    useEffect(()=>{
        if(!track && accessToken){
            async function fetchData(){
                setTrack(await getRandomSong({type, explicit, languages, accessToken}))
            }
            fetchData()
        }
    },[accessToken, track, explicit, languages, type])

    useEffect(()=>{
        if(track && playerDevice){
            let typeForRequest = type === 'music' || type === '' ? 'track' : 'episode'
            setTrackPlayback({type: typeForRequest, track_id: track.id, accessToken}) 
        }
    },[playerDevice, accessToken, type, track])

    const toggleSong = () => setIsPlaying(old => !old)

    return [track, setTrack, toggleSong]
}

export default usePlayer