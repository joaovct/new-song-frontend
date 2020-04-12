import {useState, useContext, useEffect} from 'react'

import AppContext from '../AppContext'
import {getUserProfile} from '../helpers/userProfileHelper'

function useGetUserProfile(){
    const {accessToken} = useContext(AppContext)
    const [userProfile, setUserProfile] = useState()

    useEffect(()=>{
        if(accessToken){
            async function fetchData(){
                setUserProfile(await getUserProfile(accessToken))
            }
            fetchData()
        }
    },[accessToken])

    return [userProfile, setUserProfile]
}

export default useGetUserProfile