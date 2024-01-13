import { makeStyles } from '@material-ui/core';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Typography } from '@mui/material';
import React, { useState } from 'react'


const useStyle = makeStyles((theme) => ({
    content: {
        minWidth: "600px",
        [theme.breakpoints.down("xs")]: {
            minWidth: "100%"
        },

    },
}));

const ViewModal = ({ open, setOpen, data }) => {

    const classes = useStyle();
    const handleClose = () => {
        setOpen(false)
    }
    return (
        <>

            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"

            >

                <DialogContent className={classes.content}>

                    <Typography variant='h4'>Details</Typography>
                    <hr />
                    <br />

                    <Typography sx={{ fontWeight: "bold" }}>Question</Typography>
                    <DialogContentText id="alert-dialog-description">
                        {data.title}
                    </DialogContentText>
                    <br />
                    <Typography sx={{ fontWeight: "bold" }}>Answer</Typography>
                    <DialogContentText id="alert-dialog-description">
                        {data.description}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button variant="contained" onClick={handleClose} autoFocus>
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default ViewModal