import React from 'react'
import TextField from '@material-ui/core/TextField'
import { Button } from '@material-ui/core'


import './LinkForm.css'


function LinkForm({ handleSubmit, inputLink, setInputLink, inputDesc, setInputDesc, btnText }) {
    return (
        <form 
            className="linkForm" 
            autoComplete="off"
            onSubmit={handleSubmit}
        >
            <TextField 
                label="Link" 
                variant="outlined"
                className="linkForm__inputField"
                value={inputLink}
                onChange={(e) => setInputLink(e.target.value)} 
            />

            <TextField 
                label="Description" 
                variant="outlined"
                className="linkForm__inputField"
                value={inputDesc}
                onChange={(e) => setInputDesc(e.target.value)} 
            />
            <Button
                type="submit"
                variant="contained"
                color="primary"
                className="linkForm__addNewBtn"
                disabled={!inputLink}
            >
                {btnText}
            </Button>
        </form>
    )
}

export default LinkForm
