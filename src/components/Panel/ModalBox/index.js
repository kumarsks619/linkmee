import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Modal, Button } from '@material-ui/core'
import CancelIcon from '@material-ui/icons/Cancel'
import LinkForm from './LinkForm'
import FileForm from './FileForm'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import LinkIcon from '@material-ui/icons/Link'
import DescriptionIcon from '@material-ui/icons/Description'
import Paper from '@material-ui/core/Paper'

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


function ModalBox(props) {

    const { isOpen, setIsOpen, inputLink, setInputLink, inputDesc, 
        setInputDesc, handleSubmit, headerText, btnText, progress, file, setFile, editModal } = props

    const classes = useStyles()
    const [modalStyle] = useState(getModalStyle)

        
    const [tab, setTab] = useState(0)


    return (
        <Modal
            open={isOpen}
            onClose={() => { setIsOpen(false); setFile(null) }}
        >
            <div style={modalStyle} className={`${classes.paper} modalBox`}>
                <div className="modalBox__header">
                    <h2>{headerText}</h2>
                    <Button
                        variant="contained"
                        color="secondary"
                        className="modalBox__closeBtn"
                        onClick={() => { setIsOpen(false); setFile(null) }}
                    >
                        <CancelIcon />
                    </Button>
                </div>

                {
                    !editModal && (
                        <Paper square style={{marginBottom: '15px'}}>
                            <Tabs
                                value={tab}
                                onChange={(e, newTab) => { setTab(newTab); setFile(null) }}
                                variant="fullWidth"
                                indicatorColor="secondary"
                                textColor="secondary"
                            >
                                <Tab icon={<LinkIcon />} label="Link" />
                                <Tab icon={<DescriptionIcon />} label="File" />
                            </Tabs>
                        </Paper>
                    )
                }


                {
                    !tab ? (
                        <LinkForm 
                            inputLink={inputLink}
                            setInputLink={setInputLink}
                            inputDesc={inputDesc}
                            setInputDesc={setInputDesc}
                            handleSubmit={handleSubmit}
                            btnText={btnText}
                        />
                    ) : (
                        <FileForm 
                            inputDesc={inputDesc}
                            setInputDesc={setInputDesc}
                            handleSubmit={handleSubmit}
                            btnText={btnText}
                            progress={progress}
                            file={file}
                            setFile={setFile}
                        />
                    )
                }

                
            </div>
      </Modal>
    )
}

export default ModalBox
