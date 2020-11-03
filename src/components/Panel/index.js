import React, { useState, useEffect } from 'react'
import LinkBox from './LinkBox'
import { Button, Avatar } from '@material-ui/core'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'
import AddCircleIcon from '@material-ui/icons/AddCircle'
import Crop75Icon from '@material-ui/icons/Crop75'
import Modal from './ModalBox'
import store from '../../redux/store'
import { setUser, setLinks } from '../../redux/actionCreators'
import { auth, db } from '../../config/firebase'
import firebase from 'firebase'

import './Panel.css'


function Panel() {

    const [isOpen, setIsOpen] = useState(false)
    const [inputLink, setInputLink] = useState('')
    const [inputDesc, setInputDesc] = useState('')


    useEffect(() => {
        const unsubscribe = db.collection("users")
            .doc(store.getState().user.email)
            .collection("links")
            .orderBy('timestamp', 'desc')
            .onSnapshot(snapshot => {
                store.dispatch(setLinks(snapshot.docs.map(doc => (
                    {
                        id: doc.id,
                        link: doc.data().link,
                        desc: doc.data().desc,
                        timestamp: doc.data().timestamp
                    }
                ))))
            })
        
        return () => {
            unsubscribe()
        }
    }, [])


    const handleLogout = () => {
        auth.signOut()
        
        store.dispatch(setUser(null))
    }


    const handleAddNew = (e) => {
        e.preventDefault()

        db.collection("users")
            .doc(store.getState().user.email)
            .collection("links")
            .add({
                link: inputLink,
                desc: inputDesc,
                timestamp: firebase.firestore.FieldValue.serverTimestamp()
            })
            .catch((error) => alert(error.message))


        setInputLink('')
        setInputDesc('')
        setIsOpen(false)
    }

    const scrollToTop = () => {
        let element = document.getElementById("panel__linksConatiner")
        element.scrollTop = 0
    }


    return (
        <>
            <div className="panel">
                <div className="panel__header">
                    <h1>Linkmee</h1>
                    <Avatar className="panel__avatar" src={store.getState().user?.photoURL} />
                </div>

                <div className="panel__responsiveWrapper">
                    <div className="panel__linksConatiner" id="panel__linksConatiner">
                        {
                            store.getState().links.map((link) => (
                                <LinkBox 
                                    key={link.id} 
                                    {...link} 
                                />
                            ))
                        }
                    </div>

                    <div className="panel__footer">
                        <Button
                            color="primary"
                            variant="contained"
                            className="panel__openModalBtn"
                            onClick={() => setIsOpen(true)}
                        >
                            <AddCircleIcon />
                        </Button>

                        <Button
                            variant="contained"
                            className="panel__homeBtn"
                            onClick={scrollToTop}
                        >
                            <Crop75Icon />
                        </Button> 

                        <Button
                            color="secondary"
                            variant="contained"
                            className="panel__logoutBtn"
                            onClick={handleLogout}
                        >
                            <ExitToAppIcon />
                        </Button>
                    </div>
                </div>      
            </div>

            <Modal 
                isOpen={isOpen} 
                setIsOpen={setIsOpen}
                inputLink={inputLink}
                setInputLink={setInputLink}
                inputDesc={inputDesc}
                setInputDesc={setInputDesc}
                handleSubmit={handleAddNew}
                headerText="Add New"
                btnText="Add"
            />
        </>
    )
}

export default Panel
