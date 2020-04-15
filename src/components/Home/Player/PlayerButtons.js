import React, {useState, useEffect, useRef} from 'react'

import usePlayerProgress from '../../../hooks/usePlayerProgress'
import {formatTiming} from '../../../helpers/playerHelper'

import styled from 'styled-components'
import {mainColor} from '../../../style'

function PlayerButtons({actionPlayer}){
    const progressLine = useRef()
    const [isPlaying, setIsPlaying] = useState(true)
    const [percentageTime, setPercentageTime] = useState(0)
    const [position, setPosition, duration] = usePlayerProgress()

    // eslint-disable-next-line
    useEffect(()=> actionPlayer('toggle'), [isPlaying])

    useEffect(()=>{
        progressLine.current.style.width = `${(position * 100) / duration}%`
        let newValue = (position * 100) / duration
        if(isNaN(newValue)) newValue = 0
        setPercentageTime( newValue )
    },[position, duration, progressLine])

    useEffect(()=>{
        progressLine.current.style.width = `${percentageTime}%`
    },[percentageTime, duration])

    const handleUpdatePosition = value => setPosition( (value * duration) / 100 )

    return(
        <Component>
            <ProgressWrapper>
                <span>{ formatTiming(position) }</span>
                <FieldProgressBar>
                    <ProgressLine ref={progressLine} id="progressLine"/>
                    <ProgressBar type="range" value={percentageTime} onChange={e=>{setPercentageTime(e.target.value)}} onInput={e=>handleUpdatePosition(e.target.value)}  min="0" max="100"/>
                </FieldProgressBar>
                <span>{ formatTiming(duration) }</span>
            </ProgressWrapper>
            <ButtonsWrapper>
                <i onClick={()=>{actionPlayer('previous')}} className="fas fa-step-backward"></i>
                <i onClick={()=>{setIsPlaying(!isPlaying)}} className={isPlaying ? "fas fa-pause-circle" : "fas fa-play-circle"}></i>
                <i onClick={()=>{actionPlayer('next')}} className="fas fa-step-forward"></i>
            </ButtonsWrapper>
        </Component>
    )
}

export default PlayerButtons

const borderRadiusProgressBar = '7px'

const ButtonsWrapper = styled.div`
    height: 3.5rem;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 10px;
    i{
        font-size: 1.75rem;
        opacity: 0.5;
        cursor: pointer;
        transition: .25s opacity, .25s font-size;

        &:hover{
            opacity: 1;
            font-size: 2rem;
        }

        &:nth-child(2){
            font-size: 3rem;
            margin: 0 30px;

            &:hover{
                font-size: 3.5rem;
                transition: .25s opacity, .25s font-size;
            }
        }

        @media(max-width: 768px){
            opacity: 1;
            &:hover{
                font-size: 1.75rem;
                &:nth-child(2){
                    font-size: 3rem;
                }
            }
        }
    }
` 

const ProgressLine = styled.div`
    position: absolute;
    height: 100%;
    width: 50%;
    background: white;
    border-radius: ${borderRadiusProgressBar};
    transition: .25s background;
    pointer-events: none;
`

const ProgressBar = styled.input`
    -webkit-appearance: none;
    height: 100%;
    width: 100%;
    background: transparent;

    &::-webkit-slider-thumb {
        -webkit-appearance: none;
        height: 1rem;
        width: 1rem;
        margin-top: -.25rem;
        border-radius: 100%;
        cursor: pointer;
        background: white;
        position: relative;
        z-index: 2;
        opacity: 0;
        transition: .1s opacity;
    }

    &::-webkit-slider-runnable-track{
        width: 100%;
        height: 100%;
        cursor: pointer;
        background: #444;
        border-radius: ${borderRadiusProgressBar};
    }

    &::-ms-track {
        width: 100%;
        cursor: pointer;
        background: transparent; 
        border-color: transparent;
        color: transparent;
    }

    &:focus{
        outline: 0;
    }
`

const FieldProgressBar = styled.div`
    position: relative;
    height: 50%;
    width: 100%;
    display: flex;
    flex-flow: column nowrap;

    &:hover{
        ${ProgressLine}{
            background: ${mainColor};
        }
        ${ProgressBar}::-webkit-slider-thumb{
            opacity: 1;
        }
    }
`

const ProgressWrapper = styled.div`
    height: 1rem;
    width: 100%;
    display: flex;
    align-items: center;

    span{
        font-size: 1rem;
        color: #999;
        margin-right: 15px;
        &:last-child{
            margin-right: 0;
            margin-left: 15px;
        }
    }
` 

const Component = styled.div`
    width: 100%;
    display: flex;
    flex-flow: column nowrap;
    margin-top: 15px;
` 