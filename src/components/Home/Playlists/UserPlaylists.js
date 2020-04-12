import React,{useContext, useState, useEffect} from 'react'

import styled, {createGlobalStyle} from 'styled-components'
import {Title as title, blackColor, Button as button} from '../../../style'
import emptyImg from '../../../assets/empty.png'

import AppContext from '../../../AppContext'
import {addTrackToPlaylist} from '../../../helpers/playerHelper'

import NewPlaylist from './NewPlaylist'

function UserPlaylists({playlists, setShowPlaylists, track_id}){
    const {accessToken} = useContext(AppContext)
    const [fadeOut, setFadeOut] = useState(false)
    const [showAddPlaylist, setShowAddPlaylist] = useState(false)
    
    useEffect(()=>{
        if(fadeOut) setTimeout(()=>{
            setShowPlaylists(false)
        }, 250)
    },[fadeOut, setShowPlaylists])

    return(
        accessToken ? 
        <>
        <GlobalStyle/>
        <WrapperComponent className={fadeOut ? 'playlists-fadeOut' : 'playlists-fadeIn'}>
            
            {
                showAddPlaylist ? 
                <NewPlaylist 
                    track_id={track_id}
                    setFadeOutParent={setFadeOut}
                    setShowAddPlaylist={setShowAddPlaylist}/> : <></>
            }
            
            <CloseButton onClick={()=>{setFadeOut(true)}} className="material-icons">close</CloseButton>
            <Title>Adicionar à playlist</Title>
            <Button onClick={()=>{setShowAddPlaylist(true)}}>Nova playlist</Button>
            <Wrapper>
                {
                    playlists.map((item, i) => {
                    let {name, images, id: playlist_id} = item
                    return(
                        <Playlist
                        onClick={() => {addTrackToPlaylist({playlist_id, track_id, accessToken}); setFadeOut(true)}}
                        key={`${name} ${i}`}>
                            <figure>
                                <span className="material-icons">playlist_add</span> 
                                <img src={ images.length ? images[0].url : emptyImg } alt={`${name}`}/>
                            </figure>
                            <h4>{name}</h4>
                        </Playlist>
                    )
                    })
                }
            </Wrapper>
        </WrapperComponent>
        </>
        : <></>
    )
}

const Playlist = styled.div`
    height: auto;
    width: 100%;
    padding: 0 15px 30px; 
    cursor: pointer;

    figure{
        height: auto;
        width: 100%;
        position: relative;

        span{
            width: 100%;
            height: 100%;
            position: absolute;
            background: rgba(0,0,0,0.5);
            font-size: 6rem;
            display: flex;
            justify-content: center;
            align-items: center;
            transition: .25s;
            opacity: 0;
        }

        img{
            width: 100%;
            object-fit: cover;
        }

        &:hover{
            span{
                opacity: 1;
            }
        }
    }

    h4{
        margin-top: 10px;
        font-size: 2rem;
        text-align: center;
    }
`

const Wrapper = styled.div`
    height: 100%;
    width: 100%;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
    margin-top: 60px;

    @media(max-width: 1080px){
        grid-template-columns: 1fr 1fr 1fr 1fr;
    }

    @media(max-width: 930px){
        grid-template-columns: 1fr 1fr 1fr;
    }

    @media(max-width: 715px){
        grid-template-columns: 1fr 1fr;
    }

    @media(max-width: 495px){
        grid-template-columns: 1fr;
    }
`

const Button = styled(button)`
    margin-top: 15px;
`

const Title = styled(title)`
    margin-top: 30px;
    text-align: center;

    @media(max-width: 768px){
        font-size: 3rem;
    }
`

const CloseButton = styled.div`
    font-size: 4rem;
    color: white;
    cursor: pointer;
`

const WrapperComponent = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    z-index: 997;
    height: 100%;
    width: 100%;
    overflow-y: scroll;
    padding: 30px;
    display: flex;
    flex-flow: column nowrap;
    align-items: center;
    background: ${blackColor};
    opacity: 0;

    &.playlists-fadeIn{
        opacity: 0;
        animation: fadeIn .5s;
        animation-fill-mode: forwards;
        @keyframes fadeIn{
            to {opacity: 1;}
        }
    }

    &.playlists-fadeOut{
        opacity: 1;
        animation: fadeOut .25s;
        animation-fill-mode: forwards;
        @keyframes fadeOut{
            to {opacity: 0;}
        }
    }
    
`

const GlobalStyle = createGlobalStyle`
    body{
        overflow-y: hidden;
    }
`

export default UserPlaylists