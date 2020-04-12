import {useState, useEffect} from 'react'

import logout from '../helpers/logout'
import api from '../services/api'
import qs from 'query-string'

function useGetAccessToken(history, location){
    const [accessToken, setAccessToken] = useState()

    useEffect(()=>{
        let searchStr = location.search.substring(0).split('&').map(word => {return word.split('=')[1]})
        let [code] = searchStr
    
        let ssExpires = sessionStorage.getItem('expires_time')
        ssExpires ? ssExpires = new Date(ssExpires) : ssExpires = null
        let ssToken = sessionStorage.getItem('access_token')
    
        if((new Date() >= ssExpires && ssExpires) || (!ssToken && !code)){
          logout(history)
        }
    
        getToken(code)
        .then(({data}) => {
          let {access_token, expires_in} = data
          let expires = new Date()
          expires.setSeconds(expires.getSeconds() + expires_in)
          
          setAccessToken(access_token)
          sessionStorage.setItem('access_token', access_token)
          sessionStorage.setItem('expires_time', expires)
        })
        .catch(()=>{
          ssToken = sessionStorage.getItem('access_token')
          ssExpires = sessionStorage.getItem('expires_time')
          ssExpires ? ssExpires = new Date(ssExpires) : ssExpires = null
          
          if(ssToken && new Date() < ssExpires){
            setAccessToken(ssToken)
          }else{
            logout(history)
          }
        }) 
    
        async function getToken(code){
          const body = qs.stringify({
            grant_type: 'authorization_code',
            code: code,
            redirect_uri: api.redirect_uri,
            client_id: api.client_id,
            client_secret: api.client_secret,
          })
          const configs = {
            headers: { 
              "Content-type": "application/x-www-form-urlencoded;charset=utf-8"
            },
            baseURL: 'https://accounts.spotify.com/api/',
          }
    
          try{
            let {data} = await api.use.post('/token',body, configs)
            return {data}
          }catch{
            throw new Error()
          }
        }
    //eslint-disable-next-line
    },[])

    return [accessToken, setAccessToken]
}

export default useGetAccessToken