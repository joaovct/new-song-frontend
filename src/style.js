import styled, {createGlobalStyle} from 'styled-components'

export const mainColor = '#1db954'
export const secondaryColor = '#1ed760'
export const whiteColor = '#fff'
export const blackColor = '#191414'

export const bgElement = '#333'

export const boxShadow = '0 10px 10px 0 rgba(0,0,0,.1)'

export const GlobalStyle = createGlobalStyle`
    @import url('https://fonts.googleapis.com/css?family=Montserrat:300,300i,400,400i,600,600i,700,700i&display=swap');

    html, body{
        height: 100%;
        width: 100%;
        margin: 0;
        padding: 0;
    }
    *{
        margin: 0;
        padding: 0;
        outline: 0;
        border: none;
        box-sizing: border-box;
        list-style: none;
        text-decoration: none;
        font-family: Montserrat, Roboto, 'Open Sans', 'Helvetica Neue', sans-serif;
    }
    
    button, input{
        font-family: Montserrat, Roboto, 'Open Sans', 'Helvetica Neue', sans-serif;
    }

    #root{
        width: 100%;
    }
`

export const Title = styled.h1`
    font-size: 4rem;
    color: white;
`

export const Subtitle = styled.h3`
    font-size: 3rem;
    color: white;
`

export const FieldInputToggle = styled.label`
    box-sizing: content-box;
    position: relative;
    width: 55px;
    height: 25px;
    display: flex;
    align-items: center;
    /* padding: 0 3px; */
    border-radius: 24px;
    background: #222;
    transition: .25s;
    cursor: pointer;

    input[type="radio"],input[type="checkbox"]{
        display: none;
    }

    span{
        height: 27px;
        width: 27px;
        border-radius: 100%;
        position: absolute;
        left: 0px;
        background: white;
        transition: .25s;
    }

    &.checked{
        background: ${mainColor};
    }

    input:checked + span{
        left: calc(100% - 28px);
    }
` 

export const Button = styled.button`
    background: ${mainColor};
    transition: .25s background, .5s opacity;
    font-size: .95rem;
    font-weight: 500;
    letter-spacing: 1px;
    color: ${whiteColor};
    text-transform: uppercase;
    padding: 16px 40px;
    border-radius: 24px;
    cursor: pointer;

    &:enabled:hover{
        background: ${secondaryColor}
    }

    &.filled{
        border: 2px solid ${secondaryColor};
        color: ${mainColor};
        background: transparent;
        transition: .25s background, .5s opacity, .25s color;

        &:enabled:hover{
            background: ${secondaryColor};
            color: black;
        }
    }

    &.arrow-left, &.arrow-right{
        padding-left: 56px;
        padding-right: 56px;
        position: relative;
        display: flex;
        align-items: center;
        .button-arrow{
            display: flex;
            align-items: center;
            justify-content: flex-end;
            position: absolute;
            i{
                position: absolute;
                &:nth-child(2){
                    opacity: 0;
                    color: black;
                }
            }
        }
        &:enabled:hover .button-arrow i{
            &:first-child{
                opacity: 0;
            }
            &:nth-child(2){
                opacity: 1;
            }
        }
    }
    &.arrow-left{
        .button-arrow{
            left: 16px;

            i{
                left: 0;
                transition: opacity .25s, left .25s;
            }
        }
        &:enabled:hover .button-arrow i{
            left: -8px;
        }
    }
    &.arrow-right{
        .button-arrow{
            right: 16px;

            i{
                right: 0;
                transition: opacity .25s, right .25s;
            }
        }
        &:enabled:hover .button-arrow i{
            right: -8px;
        }
    }
    &:disabled{
        opacity: 0.2;
        user-select: none;
        cursor: default;
    }
`

export const Section = styled.section`
    min-height: 100vh;
    width: 100%;
    padding: 30px;
    background: #222;

    &.justify-center{
        display: flex;
        justify-content: center;
    }
    &.align-center{
        display: flex;
        align-items: center;
    }
    &.flex-column{
        flex-flow: column nowrap;
    }

    @media(min-width: 1441px){
        padding: 30px 30px;
    }

    @media(max-width: 1440px){
        padding: 30px 30px;
    }
`