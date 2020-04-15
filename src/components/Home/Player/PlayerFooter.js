import React,{useState} from 'react'

import {useHistory} from 'react-router-dom'
import styled from 'styled-components'
import {bgElement, boxShadow, FieldInputToggle} from '../../../style'

import useGetUserPlaylists from '../../../hooks/useGetUserPlaylists'
import useAlert from '../../../hooks/useAlert'

import UserPlaylists from './PlayerSettings/UserPlaylists'
import ChooseLanguages from './PlayerSettings/ChooseLanguages'

function PlayerFooter({typeListen, explicitContent, handleSetExplicitContent, track_id, languages, handleSetLanguages}){
    const history = useHistory()
    const [showSettings, setShowSettings] = useState(false)
    const [showPlaylists, setShowPlaylists] = useState(false)
    const [showChooseLanguages, setShowChooseLanguages] = useState(false)
    const [Alert, setAlert] = useAlert()
    const playlists = useGetUserPlaylists()

    return(
    <>
        {
            showPlaylists && playlists
            ? <UserPlaylists 
                track_id={track_id}
                playlists={playlists}
                setAlert={setAlert}
                setShowPlaylists={setShowPlaylists}/>
            : <></>
        }
        {
            showChooseLanguages
            ? <ChooseLanguages
                setShowChooseLanguage={setShowChooseLanguages}
                languages={languages}
                handleSetLanguages={handleSetLanguages}/>
            : <></>
        }
        {
            Alert ?
            Alert
            : <></>
        }
        <Footer>
            <FieldBackButton onClick={()=>{history.push('/callback')}}>
                <i className="fas fa-arrow-left"></i>
                <span>Voltar</span>
            </FieldBackButton>
            <WrapperSettings>
                <i onClick={()=>{setShowSettings(!showSettings)}} className="fas fa-cog"></i>
                <Settings 
                    className={`${showSettings ? 'showListenSettings' : 'hideListenSettings'}`}>
                    { 
                        typeListen === 'music' || typeListen === '' 
                        ?
                        <>
                            <li>
                                <label htmlFor="explicit-content-toggle">Incluir conteúdo explicíto</label>
                                <FieldInputToggle htmlFor="explicit-content-toggle" className={`${explicitContent ? 'checked' : ''}`}>
                                    <input id="explicit-content-toggle" type="checkbox" checked={explicitContent ? true : false} onChange={(e)=>{handleSetExplicitContent(e.target.checked)}}/>
                                    <span></span>
                                </FieldInputToggle>
                            </li> 
                            <li>
                                <label onClick={()=>{setShowPlaylists(true)}}>
                                    Adicionar a playlist <span role="img" aria-label="Music emoji">🎵</span>
                                </label>
                            </li>
                        </>
                        :
                        <li>
                            <label onClick={()=>{setShowChooseLanguages(true)}}>
                                Preferência de idioma <span role="img" aria-label="Music emoji">🌎</span>
                            </label>
                        </li>
                    }
                </Settings>

            </WrapperSettings>
        </Footer>
    </>
    )
}

export default PlayerFooter

const Settings = styled.ul`
    margin-top: 15px;
    max-width: 100%;
    display: flex;
    flex-flow: column nowrap;
    border: 1px solid #222;
    border-radius: 7px;
    background: ${bgElement};
    box-shadow: ${boxShadow};

    &.showListenSettings{
        opacity: 0;
        animation: show .25s;
        animation-fill-mode: forwards;

        @keyframes show{
            to{
                pointer-events: auto; 
                opacity: 1;
            }
        }
    }

    &.hideListenSettings{
        opacity: 1;
        animation: out .25s;
        animation-fill-mode: forwards;

        @keyframes out{
            to{
                pointer-events: none;
                opacity: 0;
            }
        }
    }


    li{
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 7px 15px;
        label{
            font-size: 1rem;
            color: white;
            cursor: pointer;
            margin-right: 15px;
        }
        ${FieldInputToggle}{
            margin-right: 0;
        }
    }
`

const WrapperSettings = styled.div`
    width: 100%;
    position: relative;
    display: flex;
    flex-flow: column nowrap;
    align-items: flex-end;

    i{
        font-size: 1.5rem;
        color: #999;
        cursor: pointer;
        transition: .25s;

        &:hover{
            color: white;
        }
    }

    @media(max-width: 576px){
        position: relative;
        i{
            order: 2;
        }
        ${Settings}{
            position: absolute;
            bottom: calc(100% + 15px);
            order: 1;
        }
    }
`

const FieldBackButton = styled.div`
    width: 1.5rem;
    height: 1.5rem;
    display: flex;
    align-items: center;
    cursor: pointer;

    i, span{
        font-size: 1.5rem;
        color: #999;
        transition: .25s;
    }

    i{
        margin-right: 10px;
    }
    span{
        opacity: 0;
    }
    &:hover{
        i, span{
            opacity: 1;
            color: white;
        }
    }
` 

const Footer = styled.div`
    width: 100%;
    height: auto;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
` 