import React, { useEffect, useState } from 'react'

import {iso_languages} from '../../../../helpers/playerHelper'

import styled, {createGlobalStyle} from 'styled-components'
import {blackColor, mainColor, Button} from '../../../../style' 

function ChooseLanguage({setShowChooseLanguage, languages: Languages, handleSetLanguages}){
    const [fadeOut, setFadeOut] = useState(false)
    const [languages, setLanguages] = useState(Languages)
    const [searchLanguage, setSearchLanguage] = useState('')

    useEffect(()=>{
        if(fadeOut) setTimeout( ()=> setShowChooseLanguage(false), 250)
        if(fadeOut === 1) {
            handleSetLanguages(languages)
        }
    },[fadeOut, setShowChooseLanguage, languages, handleSetLanguages])

    function handleChangeLanguages(code){
        let apply = true
        let newArray = languages.filter(arrayCode => {
            if(arrayCode === code) apply = false
            return arrayCode !== code
        })

        setLanguages( apply ? [...newArray, code] : [...newArray] )
    }

    function filterLanguage(item, search){
        if(search !== ''){
            let code = item
            let {name, nativeName} = iso_languages[item]

            code = code.toLowerCase()
            name = name.toLowerCase()
            nativeName = nativeName.toLowerCase()
            search = search.toLowerCase()

            if( code.search(search) > -1 || name.search(search) > -1 || nativeName.search(search) > -1 ) return true
            else return false
        }
        else return true
    }


    return(
        <>
            <GlobalStyle/>
            <WrapperComponent className={ fadeOut ? 'chooseLanguage-fadeOut' : 'chooseLanguage-fadeIn' }>
                <CloseButton onClick={()=>{setFadeOut(true)}} className="material-icons">close</CloseButton>
                <SearchLanguage type="text" placeholder="Pesquisar idioma" value={searchLanguage} onChange={e=>setSearchLanguage(e.target.value)}/>
                
                <FieldButtons>
                    <Button onClick={()=>setFadeOut(1)}>Salvar</Button>
                </FieldButtons>

                <List>
                    {
                        Object.keys(iso_languages)
                        .filter(item => filterLanguage(item, searchLanguage))
                        .map((item,i) => {
                            let {name, nativeName} = iso_languages[item]
                            let isChecked = false

                            languages.forEach( Item => {
                                if(Item === item) isChecked = true
                            } )

                            return (
                                <li key={item + "" + i}>
                                    <input type="checkbox" value={item} id={item + "" + i} onChange={e=>handleChangeLanguages(e.target.value)} checked={isChecked}/>
                                    <label htmlFor={item + "" + i}>
                                        <p>{name}</p>
                                        <h4>{nativeName}</h4>
                                    </label> 
                                </li>
                            )
                        })
                    }

                </List>
                
            </WrapperComponent>
        </>       
    )
}

export default ChooseLanguage

const FieldButtons = styled.div`
    display: flex;
    justify-content: center;
    width: 100%;
    margin-top: 30px;

    ${Button}{
        padding-top: 12px;
        padding-bottom: 12px;
    }
`


const List = styled.ul`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 10px;
    width: 100%;
    margin-top: 30px;

    li{
        input{
            display: none;
            &:checked + label{
                border-color: ${mainColor};
            }
        }

        label{
            height: 100%;
            display: flex;
            flex-flow: column nowrap;
            justify-content: center;
            padding: 15px;
            border: 2px solid #999;
            border-radius: 3px;
            transition: .25s;
            cursor: pointer;

            p{
                color: #999;
                font-size: .8rem;
            }

            h4{
                color: white;
                font-size: 1.2rem;
                margin-top: 5px;
            }
        }
    }
`

const SearchLanguage = styled.input`
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

    &.chooseLanguage-fadeIn{
        opacity: 0;
        animation: fadeIn .5s;
        animation-fill-mode: forwards;
        @keyframes fadeIn{
            to {opacity: 1;}
        }
    }

    &.chooseLanguage-fadeOut{
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