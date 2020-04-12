import React, {useState} from 'react'
import { BrowserRouter, Switch, Route} from 'react-router-dom'

import Login from './pages/Login'
import Home from './pages/Home'
import NotFound from './pages/NotFound'
import AppContext from './AppContext'

export default function Routes(){
    const [accessToken, setAccessToken] = useState('')
    const [userProfile, setUserProfile] = useState()
    const [playerDevice, setPlayerDevice] = useState()

    const handleSetAccessToken = value => setAccessToken(value)
    const handleSetUserProfile = value => setUserProfile(value)
    const handleSetPlayerDevice = value => setPlayerDevice(value)

    return(
        <AppContext.Provider value={{accessToken, userProfile, playerDevice}}>
            <BrowserRouter>
                <Switch>
                    <Route path="/" exact component={Login}/>
                    <Route path="/callback" 
                        render={ (props)=> 
                            <Home {...props} 
                                handleSetUserProfile={handleSetUserProfile}
                                handleSetAccessToken={handleSetAccessToken}
                                handleSetPlayerDevice={handleSetPlayerDevice}/>
                            }
                    />
                    <Route path="*" component={NotFound}/>
                </Switch>
            </BrowserRouter>
        </AppContext.Provider>
    )
}