import {disconnectSDK} from './webPlaybackSDKHelper'

function logout(history){
    sessionStorage.removeItem('access_token')
    sessionStorage.removeItem('expires_time')
    disconnectSDK()
    history.push('/')
}

export default logout