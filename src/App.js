import React, { useEffect, useState } from 'react'
import store from './redux/store'
import Login from './components/Login'
import Panel from './components/Panel'
import { setUser } from './redux/actionCreators'
import { auth } from './config/firebase'

import './App.css'


function App() {

  const [state, setState] = useState(store.getState())

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(authUser => {
        if(authUser) {
            store.dispatch(setUser(authUser))
        }else {
            store.dispatch(setUser(null))
        }
    })

    return () => {
        unsubscribe()
    }
  }, [])


  useEffect(() => {
    const unsubscribe = store.subscribe(() => {
      setState(store.getState())
    })

    return () => {
      unsubscribe()
    }
  }, [])

  
  return (
    <div className="app">
      {
        state.user ? <Panel /> : <Login />
      }
    </div>
  )
}


export default App


