import React, { useState, useEffect } from 'react'
import { IconButton } from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete'
import store from '../../../redux/store'
import { editLink, deleteLink } from '../../../redux/actionCreators'
import { db } from '../../../config/firebase'
import ModalBox from '../ModalBox'
import EditIcon from '@material-ui/icons/Edit'
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn'
import { CopyToClipboard } from 'react-copy-to-clipboard'

import './LinkBox.css'



function LinkBox({ id, link, desc, timestamp }) {

    const [isOpen, setIsOpen] = useState(false)
    const [inputLink, setInputLink] = useState(link)
    const [inputDesc, setInputDesc] = useState(desc)
    const [timestampString, setTimestampString] = useState('')


    const handleDelete = (id) => {
        store.dispatch(deleteLink(id))

        db.collection("users")
            .doc(store.getState().user.email)
            .collection("links")
            .doc(id)
            .delete()
            .catch(error => error.message)
    }


    const handleEdit = (e) => {
        e.preventDefault()

        store.dispatch(editLink(id))

        db.collection("users")
            .doc(store.getState().user.email)
            .collection("links")
            .doc(id)
            .set({
                link: inputLink,
                desc: inputDesc
            }, { merge: true })
            .catch(error => alert(error.message))

        setIsOpen(false)
    }

    const generateTimestamp = (timestamp) => {
        let dateObj = new Date(timestamp.toDate())

        const weekNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
        const monthNames = ["Jan", "Feb", "Mar", "April", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

        let timestampString = `added on ${weekNames[dateObj.getDay()]}, ${dateObj.getDate()} ${monthNames[dateObj.getMonth()]}`

        return timestampString
    }

    useEffect(() => {
        if(timestamp) {
            setTimestampString(generateTimestamp(timestamp))
        }
    }, [timestamp])

 

    return (
        <>
            <div className="linkBox">
                <div className="linkBox__textWrapper">
                    <a href={link} target="_blank" rel="noreferrer" style={{wordWrap: "break-word"}}>
                        {
                            link.length > 40 ? `${link.slice(0, 50)}...` : link
                        }
                    </a>
                    <p className="linkBox__desc">{desc}</p>
                    <p className="linkBox__timestamp">
                        <i>{timestampString}</i>
                    </p>
                </div>
                
                <div className="linkBox__btnWrapper">
                    <IconButton
                        color="primary"
                        onClick={() => setIsOpen(true)}
                    >
                        <EditIcon />
                    </IconButton>

                    <IconButton
                        color="secondary"
                        onClick={() => handleDelete(id)}
                    >
                        <DeleteIcon />
                    </IconButton>

                    <CopyToClipboard text={link} onCopy={() => alert("Link copied to clipboard!")}>
                        <IconButton className="linkBox__copyBtn">
                            <AssignmentTurnedInIcon style={{fontSize: 40}} />
                        </IconButton>
                    </CopyToClipboard>
                </div>
            </div>

            <ModalBox 
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                inputLink={inputLink}
                setInputLink={setInputLink}
                inputDesc={inputDesc}
                setInputDesc={setInputDesc}
                handleSubmit={handleEdit}
                headerText="Edit"
                btnText="Update"
            />
        </>
        
    )
}

export default LinkBox
