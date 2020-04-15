import React, {useState} from 'react'

import styled from 'styled-components'
import {Title as title, Button as button, secondaryColor} from '../../style'

function Choose({handleSetTypeListen, typeListen}){
    const [radioChoose, setRadioChoose] = useState(typeListen)
    function handleSubmit(){
        if(radioChoose === "podcast" || radioChoose === "music"){
            handleSetTypeListen(radioChoose)
        }
    }

    return(
        <Component className="switch-wrapper-component">
            <Title>O que você irá escutar hoje?</Title>
            <Wrapper>
                <input
                    type="radio"
                    name="radio-choose"
                    id="radio-choose-music"
                    value="podcast"
                    checked={radioChoose === 'podcast' ? true : false}
                    onChange={(e)=>{setRadioChoose(e.target.value)}}
                />
                <BoxChoose htmlFor="radio-choose-music">
                    <i className="fas fa-microphone"></i>
                    <span>Podcast</span>
                </BoxChoose>
                <input 
                    type="radio"
                    name="radio-choose"
                    id="radio-choose-podcast"
                    value="music"
                    checked={radioChoose === 'music' ? true : false}
                    onChange={(e)=>{setRadioChoose(e.target.value)}}
                />
                <BoxChoose htmlFor="radio-choose-podcast">
                    <i className="fas fa-headphones-alt"></i>
                    <span>Música</span>
                </BoxChoose>
            </Wrapper>
            <Button 
            onClick={()=>{handleSubmit()}}
            className="filled arrow-right"
            disabled={radioChoose === 'podcast' || radioChoose === 'music' ? false : true}
            >
                Prosseguir
                <figure className="button-arrow">
                    <i className="fas fa-arrow-right"></i>
                    <i className="fas fa-arrow-right"></i>
                </figure>
            </Button>
        </Component>
    )
}

export default Choose

const Button = styled(button)`
    margin-top: 60px;
    font-weight: 700;
    color: black;
    &.filled{
        @media(max-width: 768px){
            background: ${secondaryColor};
            color: black;
        }
    }
`

const BoxChoose = styled.label`
    height: 250px;
    width: 200px;
    padding: 20px;
    border: 4px solid #fff;
    border-radius: 4px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-flow: column nowrap;
    cursor: pointer;
    opacity: 0.4;
    transition: .25s;
    
    i{
        user-select: none;
        font-size: 5rem;
        color: white;
    }
    span{
        user-select: none;
        margin-top: 20px;
        font-size: 2rem;
        color: white;
        cursor: pointer;
    }

    &:hover{
        border-color: white;
        opacity: 1;
    }

    @media(max-width: 768px){
        height: 200px;
        width: 150px;
        i{
            font-size: 4rem;
        }
        span{
            font-size: 1.5rem;
        }
    }

    @media(max-width: 350px){
        height: 175px;
        width: 134px;
        
    }
`

const Title = styled(title)`
    text-align: center;
    font-size: 3.5rem;
    
    @media(max-width: 576px){
        font-size: 1.75rem;
    }
`

const Wrapper = styled.div`
    margin-top: 60px;
    display: grid;
    grid-template-columns: 1fr 1fr;
    column-gap: 60px;

    input[type="radio"]{
        display: none;
        &:checked + ${BoxChoose}{
            opacity: 1;
        }
    }

    @media(max-width: 768px){
        column-gap: 30px;
        row-gap: 30px;
        margin-top: 60px;
    }
` 

const Component = styled.div`
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-flow: column nowrap;
`
