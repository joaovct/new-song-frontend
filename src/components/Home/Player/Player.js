import React,{useState} from 'react'

import styled from 'styled-components'
import {Title as title, Subtitle as subtitle, boxShadow, bgElement} from '../../../style'

import {playerImageMediaQuery, playerMediaQuery} from '../../../helpers/playerHelper'
import useActionsPlayer from '../../../hooks/useActionsPlayer'
import usePlayer from '../../../hooks/usePlayer'

import PlayerButtons from './PlayerButtons'
import PlayerFooter from './PlayerFooter'

function Player({typeListen}){
    const [explicitContent, setExplicitContent] = useState(false)
    const [track, setTrack, toggleSong] = usePlayer({typeListen, explicitContent})
    const [, setPointer] = useActionsPlayer({typeListen, explicitContent, track, setTrack})

    const nextSong = () => setPointer(p => p + 1)
    const previousSong = () => setPointer(p => p > 0 ? p - 1 : p)  

    function actionPlayer(action){
        if(action === 'next') nextSong()
        else if(action === 'previous') previousSong()
        else if(action === 'toggle') toggleSong()
    }

    return(
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
                <PlayerFooter typeListen={typeListen} explicitContent={explicitContent} setExplicitContent={setExplicitContent} track_id={track ? track.id : ''}/>
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
                    <FakeBar/>
                </PlayingWaiting>
                </>
            }
            </Wrapper>
        </Component>
    )
}

export default Player

const FakeBar = styled.div`
    margin-top: 30px;
    height: 1rem;
    width: 100%;
    border-radius: 4px;
    background: ${bgElement};
`

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
    padding-bottom: 30px;

    figure{
        background: ${bgElement};
        border-radius: 7px;
        box-shadow: ${boxShadow};
        ${playerImageMediaQuery}
    }
`

const Title = styled(title)`
    font-size: 2rem;
    margin-top: 15px;
`

const Subtitle = styled(subtitle)`
    font-size: 1.25rem;
    color: #999;
`

const Playing = styled.div`
    display: flex;
    flex-flow: column nowrap;   
    align-items: center;
    text-align: center;
    width: 100%;

    img{
        width: 100%;
        object-fit: cover;
        border-radius: 5px;
        box-shadow: 0 10px 25px 0px rgba(0,0,0,.5);

        @media(min-width: 1441px){
        height: 400px;
        width: 400px;
        }

        @media(max-width: 1440px){
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

` 

const Component = styled.div`
    height: 100%;
    width: 100%;
    padding-top: 15px;
    display: flex;
    justify-content: center;
    align-items: center;
`