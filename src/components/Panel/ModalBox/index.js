import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Modal, Button } from '@material-ui/core'
import TextField from '@material-ui/core/TextField'
import CancelIcon from '@material-ui/icons/Cancel'

import './ModalBox.css'


function getModalStyle() {
    return {
      top: "50%",
      left: "50%",
      transform: `translate(-50%, -50%)`,
    };
}

const useStyles = makeStyles((theme) => ({
    paper: {
      position: 'absolute',
      width: 300,
      backgroundColor: theme.palette.background.paper,
      border: 'none',
      boxShadow: theme.shadows[5],
      padding: '20px 30px',
      borderRadius: '20px'
    },
}))



function ModalBox({ isOpen, setIsOpen, inputLink, setInputLink, inputDesc, setInputDesc , handleSubmit, headerText, btnText }) {

    const classes = useStyles()
    const [modalStyle] = useState(getModalStyle)


    return (
        <Modal
            open={isOpen}
            onClose={() => setIsOpen(false)}
        >
            <div style={modalStyle} className={`${classes.paper} modalBox`}>
                <div className="modalBox__header">
                    <h2>{headerText}</h2>
                    <Button
                        variant="contained"
                        color="secondary"
                        className="modalBox__closeBtn"
                        onClick={() => setIsOpen(false)}
                    >
                        <CancelIcon />
                    </Button>
                </div>
                <form 
                    className="modalBox__form" 
                    autoComplete="off"
                    onSubmit={handleSubmit}
                >
                    <TextField 
                        label="Link" 
                        variant="outlined"
                        className="modalBox__inputField"
                        value={inputLink}
                        onChange={(e) => setInputLink(e.target.value)} 
                    />

                    <TextField 
                        label="Description" 
                        variant="outlined"
                        className="modalBox__inputField"
                        value={inputDesc}
                        onChange={(e) => setInputDesc(e.target.value)} 
                    />
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        className="modalBox__addNewBtn"
                        disabled={!inputLink}
                    >
                        {btnText}
                    </Button>
                </form>
            </div>
      </Modal>
    )
}

export default ModalBox
