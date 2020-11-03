import React, { useState, useEffect } from 'react'
import LinkBox from './LinkBox'
import { Button, Avatar } from '@material-ui/core'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'
import AddCircleIcon from '@material-ui/icons/AddCircle'
import Crop75Icon from '@material-ui/icons/Crop75'
import Modal from './ModalBox'
import store from '../../redux/store'
import { setUser, setLinks } from '../../redux/actionCreators'
import { auth, db, storage } from '../../config/firebase'
import firebase from 'firebase'

import './Panel.css'


function Panel() {

    const [isOpen, setIsOpen] = useState(false)
    const [inputLink, setInputLink] = useState('')
    const [inputDesc, setInputDesc] = useState('')
    const [file, setFile] = useState(null)
    const [progress, setProgress] = useState(0)


    useEffect(() => {
        const unsubscribe = db.collection("users")
            .doc(store.getState().user.email)
            .collection("links")
            .orderBy('timestamp', 'desc')
            .onSnapshot(snapshot => {
                store.dispatch(setLinks(snapshot.docs.map(doc => (
                    {
                        id: doc.id,
                        isFile: doc.data().isFile,
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


    function create_UUID(){
        var dt = new Date().getTime();
        var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = (dt + Math.random()*16)%16 | 0;
            dt = Math.floor(dt/16);
            return (c=='x' ? r :(r&0x3|0x8)).toString(16);
        });
        return uuid;
    }


    const handleAddNew = (e) => {
        e.preventDefault()

        if(file) {
            let fileName = file.name + create_UUID()

            const uploadTask = storage.ref(`files/${fileName}`).put(file)
            uploadTask.on('state_changed', (snapshot) => {
                //progress bar function
                const progressBarVal = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                )
                setProgress(progressBarVal)
            }, (error) => {
                alert(error.message)
            }, () => {
                //adding entry to the database
                storage
                    .ref("files")
                    .child(fileName)
                    .getDownloadURL()
                    .then((url) => {
                        db.collection("users")
                            .doc(store.getState().user.email)
                            .collection("links")
                            .add({
                                isFile: true,
                                link: url,
                                desc: inputDesc,
                                timestamp: firebase.firestore.FieldValue.serverTimestamp()
                            })
                    })

                setProgress(0)
                setFile(null)
                setInputDesc('')
                setIsOpen(false)
            })
        }else {
            db.collection("users")
                .doc(store.getState().user.email)
                .collection("links")
                .add({
                    isFile: false,
                    link: inputLink,
                    desc: inputDesc,
                    timestamp: firebase.firestore.FieldValue.serverTimestamp()
                })
                .catch((error) => alert(error.message))

            setInputLink('')
            setInputDesc('')
            setIsOpen(false)
        }
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
                                    setFile={setFile} 
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
                progress={progress}
                file={file}
                setFile={setFile}
                editModal={false}
            />
        </>
    )
}

export default Panel
