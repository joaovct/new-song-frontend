import React from 'react'

import {useHistory} from 'react-router-dom'
import styled from 'styled-components'
import Header from '../components/Header'
import {Section as section, Title as title, Button} from '../style'

function NotFound(){
    const history = useHistory()
    return(
        <Section className="justify-center align-center">
            <Header/>
            <Content>
                <Title>Não encontramos essa página...</Title>
                <Button onClick={()=>{history.push('/')}} className="filled arrow-left">
                    Voltar
                    <figure className="button-arrow">
                        <i className="fas fa-arrow-left"></i>
                        <i className="fas fa-arrow-left"></i>
                    </figure>
                </Button>
            </Content>
        </Section>
    )
}

export default NotFound

const Title = styled(title)`
    padding: 30px 30px 30px 0;

    @media(max-width: 768px){
        font-size: 3rem;
    }

    @media(max-width:395px){
        font-size: 2rem;
    }
`

const Content = styled.div`
    width: 100%;
    margin: auto;
    padding: 30px 0;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
`

const Section = styled(section)`
    flex-flow: column nowrap;
`