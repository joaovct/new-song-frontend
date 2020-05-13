import React,{useState, useEffect} from 'react'

import styled from 'styled-components'
import {Title as title, Subtitle as subtitle, boxShadow, bgElement} from '../../../style'

import {playerImageMediaQuery, playerMediaQuery} from '../../../helpers/playerHelper'
import useActionsPlayer from '../../../hooks/useActionsPlayer'
import usePlayer from '../../../hooks/usePlayer'
import {getWebPlayer, isTrackEnded} from '../../../helpers/webPlaybackSDKHelper'

import PlayerButtons from './PlayerButtons'
import PlayerFooter from './PlayerFooter'

function Player({typeListen}){
    const [explicitContent, setExplicitContent] = useState(false)
    const [languages, setLanguages] = useState([])
    const [track, setTrack, toggleSong] = usePlayer({typeListen, explicitContent, languages})
    const [, setPointer, Alert] = useActionsPlayer({typeListen, explicitContent, languages, track, setTrack})
    const [isMounted, setIsMounted] = useState(false)
    const player = getWebPlayer()

    useEffect(()=>{
        setIsMounted(true)
    },[setIsMounted])

    if(player){
        player.addListener('player_state_changed', state => {
            isTrackEnded(state, isEnded => {
                if(isEnded) nextTrack()
            })
        })
    }

    const nextTrack = () => {
        if(isMounted) setPointer(p => p + 1)
    }
    const previousTrack = () => {
        if(isMounted) setPointer(p => p > 0 ? p - 1 : p) 
    }

    const handleSetLanguages = value => setLanguages(value)  
    const handleSetExplicitContent = value => setExplicitContent(value)

    function actionPlayer(action){
        if(action === 'next') nextTrack()
        else if(action === 'previous') previousTrack()
        else if(action === 'toggle') toggleSong()
    }


    return(
        <>
            {
                Alert ?
                Alert
                : <></>
            }
            <Component className="switch-wrapper-component">
                <Wrapper>
                {
                    track ?
                    <>
                    <Playing>
                        <img alt={`${track.name} album`} src={typeListen === 'music' || typeListen === '' ? track.album.images[0].url : track.images[0].url}/>
                        <Title> {track.name} </Title>
                        <Subtitle>{typeListen === 'music' || typeListen === '' ? track.artists[0].name : ''}</Subtitle>
                    </Playing>
                    <PlayerButtons actionPlayer={actionPlayer}/>
                    <PlayerFooter typeListen={typeListen} explicitContent={explicitContent} handleSetExplicitContent={handleSetExplicitContent} languages={languages} handleSetLanguages={handleSetLanguages} track_id={track ? track.id : ''}/>
                    </> 
                    : 
                    <>
                    <PlayingWaiting>
                        <figure></figure>
                        <FakeTitle/>
                        <FakeButtons>
                            <i className="fas fa-step-backward"></i>
                            <i className="fas fa-play-circle"></i>
                            <i className="fas fa-step-forward"></i>
                        </FakeButtons>
                    </PlayingWaiting>
                    </>
                }
                </Wrapper>
            </Component>
        </>
    )
}

export default Player

const FakeButtons = styled.ul`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 3.5rem;
    width: 100%;
    margin-top: 30px;

    i{
        font-size: 1.75rem;
        color: ${bgElement};

        &:nth-child(2){
            font-size: 3rem;
            margin: 0 30px;
        }
    }

`

const FakeTitle = styled.div`
    height: 4rem;
    width: 100%;
    border-radius: 7px;
    margin-top: 30px;
    background: ${bgElement};

    ${playerMediaQuery}
`

const PlayingWaiting = styled.div`
    display: flex;
    flex-flow: column nowrap;
    align-items: center;
    opacity: .8;
    
    figure{
        background: ${bgElement};
        border-radius: 7px;
        box-shadow: ${boxShadow};
        ${playerImageMediaQuery}
    }
`

const Subtitle = styled(subtitle)`
    width: 100%;
    font-size: 1.2rem;
    color: #999;

    @media(max-width: 576px){
        text-align: left;
    }
`

const Title = styled(title)`
    width: 100%;
    font-size: 1.8rem;
    margin-top: 30px;

    @media(max-width: 576px){
        text-align: left;
    }
`

const Playing = styled.div`
    display: flex;
    flex-flow: column nowrap;   
    align-items: center;
    text-align: center;
    width: 100%;

    img{
        height: 250px;
        width: 250px;
        object-fit: cover;
        box-shadow: 0 10px 25px 0px rgba(0,0,0,.5);

        @media(max-width: 576px){
            height: 300px;
            width: 300px;
        }

        @media(max-width: 350px){
            height: 250px;
            width: 250px;
        }
    }
` 

const Wrapper = styled.div`
    height: 100%;
    width: 400px;
    display: flex;
    flex-flow: column nowrap;
    justify-content: center;
    align-items: center;

    @media(max-width: 576px){
        width: 300px;
    }

    @media(max-width: 350px){
        width: 250px;
    }
` 

const Component = styled.div`
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`