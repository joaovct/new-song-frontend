import {useContext, useEffect, useState} from 'react'

import AppContext from '../AppContext'
import {updatePlayerState} from '../helpers/webPlaybackSDKHelper'

function usePlayerProgress(){
    const {playerDevice} = useContext(AppContext)
    const [playerState, setPlayerState] = useState()
    const [playerPosition, setPlayerPosition] = useState(0)
    const [playerDuration, setPlayerDuration] = useState(0)

    const seekPositionPlayback = position => {if(position) playerDevice.seek(position)}

    useEffect(()=>{
        if(playerDevice){
            playerDevice.addListener('player_state_changed', state => {
                if(state){
                    setPlayerState(state)
                    setPlayerPosition(state.position)
                    setPlayerDuration(state.duration)
                    updatePlayerState({setPlayerPosition, setPlayerDuration})
                }
            })
        }
    },[playerDevice])

    if(playerState) return [playerPosition, seekPositionPlayback, playerDuration]
    else return [0, seekPositionPlayback, 0] 
}

export default usePlayerProgress