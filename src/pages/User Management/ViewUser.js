import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import apiUsers from 'src/api/usersService';


const ViewUserDetail = ({ id, show, onHide}) => {
    const[data,setData] = useState('')
    const userData = async () => {
        const response = await apiUsers.getOneUser(id);
        setData(response.data.data);
        console.log(response.data);
      };
  
useEffect(()=>{
userData()
},[])
function capitalizeFirstLetter(string){
	const firstChar = string?string?.charAt(0).toUpperCase():'';
	const remainingChars = string?string?.slice(1).toLowerCase():'';
	return `${firstChar}${remainingChars}`;
}
    return (
        
        <Dialog maxWidth="md" fullWidth={true} open={show} onClose={onHide}>
            <DialogTitle as="h2" >Details</DialogTitle>
            <DialogContent dividers>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                        <Typography variant="subtitle1">Full Name</Typography>
                        <DialogContentText>{capitalizeFirstLetter(data?.firstName )}{" "}{capitalizeFirstLetter(data?.lastName)}</DialogContentText>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Typography variant="subtitle1">Email</Typography>
                        <DialogContentText>{capitalizeFirstLetter(data?.email)}</DialogContentText>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Typography variant="subtitle1">Mobile Number</Typography>
                        <DialogContentText>{data?.phoneNumber}</DialogContentText>
                    </Grid>
                  
                
                </Grid>
                <DialogActions>
                    <Button variant="outlined" onClick={()=>onHide()} type="submit" style={{backgroundColor:'white'}} >
                        Close
                    </Button>
                </DialogActions>
            </DialogContent>
        </Dialog>
    )
}

export default ViewUserDetail