import {useState, useEffect, useContext} from 'react'

import AppContext from '../AppContext'
import {getUserPlaylists} from '../helpers/playerHelper'

function useGetUserPlaylists(){
    const {accessToken, userProfile: {id: userId}} = useContext(AppContext)
    const [playlists, setPlaylists] = useState()
    
    useEffect(()=>{
        if(accessToken && userId){
            async function fetchData(){
                setPlaylists(await getUserPlaylists({accessToken, userId}))
            }
            fetchData()
        }
    },[accessToken, userId])

    return playlists
}

export default useGetUserPlaylists