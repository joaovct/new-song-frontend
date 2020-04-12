import {useState, useEffect, useContext, useRef} from 'react'

import {getRandomSong} from '../helpers/playerHelper'
import AppContext from '../AppContext'

function useActionsPlayer({setTrack, track, explicitContent, typeListen}){
    const {accessToken} = useContext(AppContext)
    const renders = useRef(0)
    const [tracks, setTracks] = useState([])
    const [pointer, setPointer] = useState(0)

    useEffect(()=>{
        renders.current++
    })

    useEffect(()=>{
        if(track && pointer >= tracks.length) setTracks(t => [...t, track])
    // eslint-disable-next-line
    },[track])

    useEffect(()=>{
        if(tracks.length > 1) setPointer(tracks.length - 1)
    },[tracks])

    useEffect(()=>{
        if(pointer > tracks.length - 1 && pointer >= 0 && renders.current > 1){
            getNewRandomSong()
            async function getNewRandomSong(){
                setTrack(await getRandomSong({type: typeListen, explicit: explicitContent, accessToken}))
            }
        }else if(pointer <= tracks.length - 1 && pointer >= 0 && renders.current > 1){
            setTrack(tracks[pointer])
        }
    // eslint-disable-next-line
    },[pointer])

    return [pointer, setPointer]
}

export default useActionsPlayer