import React, {useState, useEffect} from 'react'

import Alert from '../components/Home/Alert/Alert'

function useAlert(){
    const [alert, setAlert] = useState({})
    
    useEffect(()=>{
        if(Object.keys(alert).length && alert.constructor === Object){
            setTimeout( ()=>setAlert({}), [alert.timing + 250 || 5250])
        }
    },[alert])

    useEffect(()=>{
        console.log(alert)
        console.log(Object.keys(alert))
    },[alert])

    return [ Object.keys(alert).length ? <Alert type={alert.type} message={alert.message} timing={alert.timing}/> : '', setAlert ]
}

export default useAlert