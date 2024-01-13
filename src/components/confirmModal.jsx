import React from 'react'
import { DialogActions, makeStyles } from "@material-ui/core";
import { Button, Dialog, DialogTitle } from '@mui/material';


const useStyle = makeStyles((theme) => ({
    h2: {
        paddingTop: "0px",
        paddingBottom: "0px",
        [theme.breakpoints.down("xs")]: {
            padding: "0px",
            fontSize: "16px",

        }
    },
}));
const ConfirmModal = ({ show, setShow, warning, handleDelete }) => {
    const classes = useStyle();

    const handleClose = () => {
        setShow(false)
    }


    return (
        <>
            <Dialog
                open={show}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
            >
                <div className="confirm_modal">
                    <DialogTitle
                        as="h2"
                        className={classes.h2}
                    >
                        {warning}
                    </DialogTitle>

                    <DialogActions style={{ justifyContent: "center", gap: "2px" }}>
                        <Button
                            variant="contained"
                            size="medium"
                            className={""}
                            onClick={() => {
                                handleDelete()
                                setShow(false)
                            }}
                        >
                            Yes
                        </Button>
                        <Button
                            size="medium"
                            variant="outlined"
                            onClick={handleClose}
                            className={"hoverWhite"}
                        >
                            No
                        </Button>
                    </DialogActions>
                </div>
            </Dialog>
        </>
    )
}

export default ConfirmModal