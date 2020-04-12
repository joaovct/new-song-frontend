import React, {useEffect} from 'react'
import styled from 'styled-components'

import {Section as section, Title, Button} from '../style.js'
import logo_white from '../assets/logo_white.png'

const backend_login = 'https://new-song-backend.herokuapp.com/login'

function Login({history}){

    useEffect(()=>{
        let token = sessionStorage.getItem('access_token')
        let expires = sessionStorage.getItem('expires_time')
        expires ? expires = new Date(expires) : expires = null
        if(new Date() < expires && token){
            return history.push('/callback')
        }
        sessionStorage.removeItem('access_token')
        return sessionStorage.removeItem('expires_time') 
        // eslint-disable-next-line
    },[])

    return(
        <Section className="home justify-center align-center">
            <Logo src={logo_white} alt="Logo New Song"/>
            <Content>
                <Title>Ache um novo som.</Title>
                <p>Escute músicas ou podcasts de genêros totalmente aleatórios.</p>
                <a href={backend_login}><Button>Continuar com Spotify</Button></a>
            </Content>
        </Section>
    )
}

const Content = styled.div`
    margin: auto;
    display: flex;
    flex-flow: column nowrap;
    align-items: center;

    ${Title}{
        text-align: center;

        @media(max-width: 768px){
            font-size: 3rem;
        }
    }

    p{
        text-align: center;
        color: white;
        font-size: 1.5rem;
        margin-top: 10px;

        @media(max-width: 768px){
            font-size: 1.2rem;
        }
    }

    ${Button}{
        margin-top: 40px;
    }
`

const Logo = styled.img`
    height: 50px;
    width: auto;
`

const gradient =
`
background-color: #0093E9;
background-image: linear-gradient(180deg, #0093E9 0%, #80D0C7 100%);
background-image: linear-gradient(to top, #48c6ef 0%, #6f86d6 100%);
background-image: linear-gradient(320deg, #00c6fb 0%, #005bea 100%);
`



const Section = styled(section)`
    flex-flow: column nowrap;
    ${gradient}

    @media(max-width: 768px){
        padding: 30px;
    }
`

export default Login