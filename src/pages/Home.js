import React, {useState, useEffect} from "react";

import {Route} from 'react-router-dom'
import styled from "styled-components";
import Script from 'react-load-script'

import useGetAccessToken from '../hooks/useGetAccessToken'
import useGetUserProfile from '../hooks/useGetUserProfile'
import useAlert from '../hooks/useAlert'
import {Section as section} from '../style'

import Header from '../components/Header'
import Choose from '../components/Home/Choose'
import Player from '../components/Home/Player/Player'
import { initializeWebPlayer } from "../helpers/webPlaybackSDKHelper";

function Home({handleSetAccessToken, handleSetUserProfile, handleSetPlayerDevice, history, match, location}) {
  const [accessToken] = useGetAccessToken(history, location)
  const [userProfile] = useGetUserProfile()
  const [typeListen, setTypeListen] = useState('')
  const [Alert, setAlert] = useAlert()
  const {path} = match

  useEffect(()=>{
    if(accessToken) {
      handleSetAccessToken(accessToken)
      window.onSpotifyWebPlaybackSDKReady = async () => initializeWebPlayer(accessToken, handleSetPlayerDevice)
    }
  },[handleSetAccessToken, accessToken, handleSetPlayerDevice])

  useEffect(()=>{
    if(userProfile) handleSetUserProfile(userProfile)
  },[handleSetUserProfile, userProfile])

  const handleSetTypeListen = radioChoose => {setTypeListen(radioChoose); history.push(`${path}/player`)}
  const handleScriptError = () => setAlert({type:"error", message: "Aconteceu um erro desconhecido 😵"})

  return (
    <>
    {
      Alert ?
      Alert
      : <></>
    }
    {
      accessToken ? 
      <Script 
          url="https://sdk.scdn.co/spotify-player.js"
          onError={handleScriptError}
        />
      : <></>
    }
      <Section className="justify-center align-center">
        <Header/>
        <Content id="home-content">
            <Route path={`${path}`} exact render={()=> <Choose handleSetTypeListen={handleSetTypeListen} typeListen={typeListen}/>}/>
            <Route path={`${path}/player`} render={()=> <Player typeListen={typeListen}/>}/>
        </Content>
      </Section>
    </>
  )
}

export default Home;

const Content = styled.div`
  width: 100%;
  margin: auto;
  padding-top: 30px;
`

const Section = styled(section)`
  flex-flow: column nowrap;
  color: white;
`
