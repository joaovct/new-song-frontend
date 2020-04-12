import {useState, useEffect} from 'react'

function usePlayerDevice(){
    const [playerDevice, setPlayerDevice] = useState()

    useEffect(()=>{
        console.log(playerDevice)
        if(playerDevice){
            playerDevice.addListener('player_state_changed', state => { console.log(state) })
        }
    },[playerDevice])

    return [playerDevice, setPlayerDevice]
}

export default usePlayerDevice