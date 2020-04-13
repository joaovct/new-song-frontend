import React, { useState, useEffect } from 'react'

import styled from 'styled-components'
import {bgElement, boxShadow} from '../../../style'

function Alert({message, type, timing}){
    const [fadeOut, setFadeOut] = useState(false)

    useEffect(()=>{
        if(!fadeOut) setTimeout(()=>setFadeOut(true),[timing || 5000])
    },[fadeOut,timing])

    return(
        <>
            {
                message ?
                
                <WrapperComponent className={`alert-type-${type} ${fadeOut ? 'alert-fadeOut' : 'alert-fadeIn'}`}>
                    <p>{message}</p>
                </WrapperComponent>
                
                : <> </>
            }
        </>    
    )
}

const WrapperComponent = styled.div`
    background: ${bgElement};
    box-shadow: ${boxShadow};
    padding: 15px 20px;
    position: fixed;
    bottom: 15px;
    right: 15px;
    transition: .25s;
    border-radius: 7px;
    text-align: left;
    max-width: 500px;

    @media(max-width: 575px){
        max-width: 90vw;
    }
    
    p{
        color: white;
    }

    &.alert-type-light{
        background: white;
        p{
            color: black;
            font-weight: 500;
        }
    }

    &.alert-type-error{
        background: red;
        p{
            color: white;
            font-weight: 500;
        }
    }

    &.alert-fadeIn{
        opacity: 0;
        animation: fadeIn .5s;
        animation-fill-mode: forwards;
        @keyframes fadeIn{
            to {opacity: 1;}
        }
    }

    &.alert-fadeOut{
        opacity: 1;
        animation: fadeOut .25s;
        animation-fill-mode: forwards;
        @keyframes fadeOut{
            to {opacity: 0;}
        }
    }
`

export default Alert