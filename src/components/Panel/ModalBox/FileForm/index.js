import React from 'react'
import TextField from '@material-ui/core/TextField'
import { Button, Input, LinearProgress, Typography } from '@material-ui/core'
import Box from '@material-ui/core/Box'

import './FileForm.css'


function LinearProgressWithLabel(props) {
    return (
      <Box display="flex" alignItems="center">
        <Box width="100%" mr={1}>
          <LinearProgress variant="determinate" {...props} />
        </Box>
        <Box minWidth={35}>
          <Typography variant="body2" color="textSecondary">{`${Math.round(
            props.value,
          )}%`}</Typography>
        </Box>
      </Box>
    )
}

function FileForm({ handleSubmit, inputDesc, setInputDesc, btnText, progress, setFile, file }) {

    const handleFileSelect = (e) => {
        if(e.target.files[0]) {
            setFile(e.target.files[0])
        }
    }

    return (
        <form 
            className="fileForm" 
            autoComplete="off"
            onSubmit={handleSubmit}
        >
            <div style={{width: '100%'}}>
                <LinearProgressWithLabel value={progress} />
            </div>
            <Input type="file" onChange={handleFileSelect} style={{marginBottom: '15px'}} />

            <TextField 
                label="Description" 
                variant="outlined"
                className="fileForm__inputField"
                value={inputDesc}
                onChange={(e) => setInputDesc(e.target.value)} 
            />
            <Button
                type="submit"
                variant="contained"
                color="primary"
                className="fileForm__addNewBtn"
                disabled={!file}
            >
                {btnText}
            </Button>
        </form>
    )
}

export default FileForm
