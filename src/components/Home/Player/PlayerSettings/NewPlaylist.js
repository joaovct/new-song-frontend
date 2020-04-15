import React,{ useState, useEffect, useContext } from 'react'

import styled from 'styled-components'
import {Title as title, bgElement, mainColor, Button} from '../../../../style'

import AppContext from '../../../../AppContext'
import {addTrackToPlaylist, createPlaylist} from '../../../../helpers/playerHelper'

function NewPlaylist({track_id, setFadeOutParent, setAlert, setShowAddPlaylist}){
    const {accessToken, userProfile: {id: user_id}} = useContext(AppContext)
    const [fadeOut, setFadeOut] = useState(0)
    const [namePlaylist, setNamePlaylist] = useState('')
    
    useEffect(()=>{
        if(fadeOut === 1) setTimeout(()=>{setShowAddPlaylist(false)}, 250)
        else if(fadeOut === 2){
            setTimeout(()=>{setFadeOutParent(true); setShowAddPlaylist(false)}, 250)

            async function fetchData(){
                let {data} = await createPlaylist({accessToken, name_playlist: namePlaylist, user_id})
                if(data){
                    let {id: playlist_id} = data
                    setAlert({type: "light", message: "Música adicionada a playlist 🎉"})
                    await addTrackToPlaylist({accessToken, track_id, playlist_id})
                }
            }   
            
            fetchData()
        }
    },[fadeOut, user_id, track_id, namePlaylist, accessToken, setAlert, setFadeOutParent, setShowAddPlaylist])

    return(
        <WrapperComponent className={fadeOut ? 'newPlaylist-fadeOut' : 'newPlaylist-fadeIn'}>
            <CloseButton onClick={()=>{setFadeOut(1)}} className="material-icons">close</CloseButton>
            <Title>Criar nova playlist</Title>
            <Form>
                <label>Nome da playlist</label> 
                <input type="text" placeholder="Nova playlist" value={namePlaylist} onChange={e=>setNamePlaylist(e.target.value)}/>    
            </Form>
            <FieldButtons>
                <Button className="filled" onClick={()=>{setFadeOut(1)}}>Cancelar</Button>
                <Button onClick={()=>{setFadeOut(2)}}>Criar</Button>
            </FieldButtons>
        </WrapperComponent>
    )
}

export default NewPlaylist

const FieldButtons = styled.div`
    display: flex;
    justify-content: center;
    width: 100%;
    margin-top: 30px;

    ${Button}{
        padding-top: 12px;
        padding-bottom: 12px;

        &:first-child{
            border-color: white;
            color: white;
            &:hover{
                color: black;
                background: white;
            }
        }
        &:last-child{
            margin-left: 15px;
        }

        @media(max-width: 768px){
            font-size: .7rem;
        }
    }
`

const Form = styled.div`
    width: 100%;
    padding: 30px 20vw;
    margin-top: 15px;
    background: ${bgElement};
    display: flex;
    align-items: flex-start;
    flex-flow: column nowrap;
    
    label{
        color: white;
        font-size: 1rem;
    }

    input[type=text]{
        width: 100%;
        margin-top: 10px;
        font-size: 3rem;
        font-weight: 500;
        color: white;
        caret-color: ${mainColor};
        background: transparent;
        &::placeholder{
            color: white;
            opacity: .3;
        }
    }

    @media(max-width: 768px){
        padding: 30px;

        input[type=text]{
            font-size: 2rem;
        }
    }
`

const CloseButton = styled.div`
    font-size: 4rem;
    color: white;
    cursor: pointer;
`

const Title = styled(title)`
    font-size: 3rem;
    margin-top: 30px;

    @media(max-width: 768px){
        font-size: 2rem;
    }
`

const WrapperComponent = styled.div`
    height: 100%;
    width: 100%;
    display: flex;
    flex-flow: column nowrap;
    justify-content: center;
    align-items: center;
    text-align: center;
    padding: 30px 0;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 999;
    background: rgba(0,0,0,.7);

    &.newPlaylist-fadeIn{
        opacity: 0;
        animation: fadeIn .5s;
        animation-fill-mode: forwards;
        @keyframes fadeIn{
            to {opacity: 1;}
        }
    }

    &.newPlaylist-fadeOut{
        opacity: 1;
        animation: fadeOut .25s;
        animation-fill-mode: forwards;
        @keyframes fadeOut{
            to {opacity: 0;}
        }
    }
`