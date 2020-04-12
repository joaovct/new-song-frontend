import React, {useState, useContext} from 'react'

import {useHistory} from 'react-router-dom'
import styled from 'styled-components'
import logout from '../helpers/logout'
import AppContext from '../AppContext'

import {bgElement, boxShadow} from '../style'
import logo from '../assets/logo_white.png'
import emptyImg from '../assets/empty.png'


function Header(){
    const {userProfile} = useContext(AppContext)
    const history = useHistory()
    const [showOptions, setShowOptions] = useState(false)

    return (
        <Wrapper>
            <Logo onClick={()=>{history.push('/')}} src={logo}/>
            <WrapperOptions>
                <Photo 
                    onClick={()=>{setShowOptions(!showOptions)}}
                    src={userProfile ? userProfile.images[0].url : emptyImg}
                    alt="Your profile"
                />
                <Options className={showOptions ? 'showUserOptions' : 'hideUserOptions'}>
                    <a href="http://github.com/joaodjtr" target="_blank" rel="noopener noreferrer"><li>Quem fez isto?</li></a>
                    <li onClick={()=>{logout(history)}}>Sair</li>
                </Options>
            </WrapperOptions>
        </Wrapper>
    )
}

export default Header

const Options = styled.ul`
    height: auto;
    width: auto;
    margin: 15px 0 0 0;
    background: ${bgElement};
    color: white;
    border-radius: 7px;
    box-shadow: ${boxShadow};
    position: relative;
    right: 0;

    li{
        font-size: .9rem;
        color: #ccc;
        padding: 7px 14px;
        margin: 7px 0;
        width: 100%;
        cursor: pointer;
        transition: .25s;
        &:hover{
            color: white;
        }
    }
    
    &.showUserOptions{
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

    &.hideUserOptions{
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

    @media(max-width: 768px){
        position: absolute;
        top: 100%;
        width: 150px;
    }

`

const Photo = styled.img`
    height: 65px;
    width: 65px;
    object-fit: cover;
    cursor: pointer;
    box-shadow: 0 10px 10px 0px rgba(0,0,0,0.1);
    border-radius: 100%;

    @media(max-width: 390px){
        height: 50px;
        width: 50px;
    }
`

const WrapperOptions = styled.div`
    position: absolute;
    right: 0;
    display: flex;
    flex-flow: column nowrap;
    align-items: flex-end;

    @media(max-width: 768px){
        position: relative;
        right: inherit;
        margin-left: 30px;
    }
`

const Logo = styled.img`
    height: 50px;
    width: auto;
    cursor: pointer;

    @media(max-width: 390px){
        height: 40px;
    }
`

const Wrapper = styled.header`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    position: relative;

    @media(max-width: 768px){
        justify-content: space-between;
    }

    @media(max-width: 390px){
        align-items: center;
    }
` 

