import api from '../services/api'

let player

export const togglePlayback = () => {if(player) player.togglePlay()}

export const seekPositionPlayback = position => {if(player) player.seek(position)}

export async function updatePlayerState({setPlayerDuration, setPlayerPosition}){
  if(player){
    let playerState, durationSec
    await player.getCurrentState().then(state => playerState = state)    
    durationSec = playerState.duration / 1000
    setPlayerDuration(playerState.duration)

    for(let i = 0; i <= durationSec; i++){
      delay(i)
    }
    
    function delay(i){
      setTimeout( async () => {
        await player.getCurrentState().then(state => {
          if(state) setPlayerPosition(state.position)})
      }, 1000 * i)
    }
  }
}

export async function setTrackPlayback({type, track_id, accessToken}){
  if(player){
    const {_options: {id: device_id}} = player
    const body = {"uris": [`spotify:${type}:${track_id}`]}
    const headers = {headers: {'Content-Type': 'application/json','Authorization': `Bearer ${accessToken}`}}
    await api.use.put(`/me/player/play?device_id=${device_id}`, body, headers)
    return true
  }else return false
}

export async function initializeWebPlayer(accessToken, handleSetPlayerDevice){
  if(window['Spotify']){
    player = new window.Spotify.Player({name: 'New song', getOAuthToken: cb => { cb(accessToken); }});
      
    // Error
    // player.addListener('initialization_error', ({ message }) => { console.error(message) })
    // player.addListener('authentication_error', ({ message }) => { console.error(message) })
    // player.addListener('account_error', ({ message }) => { console.error(message);})
    // player.addListener('playback_error', ({ message }) => { console.error(message) })

    // Playback status updates
    // let state
    // player.addListener('player_state_changed', state => { state = state; console.log(state) })

    // Ready
    player.addListener('ready', () => { 
      handleSetPlayerDevice(player)
    })

    // Not Ready
    // player.addListener('not_ready', () => { console.log('Device has gone offline') })

    player.connect()

    return player
  }
}

export function disconnectSDK(){
  if(player) player.disconnect()
}