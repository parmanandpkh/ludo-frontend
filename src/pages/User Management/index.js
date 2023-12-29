import { Construction, EditOutlined, Search } from "@mui/icons-material";
import { Box, Button, Card, CardContent, CardHeader, FormControlLabel, FormGroup, IconButton, Switch, TextField, Tooltip } from "@mui/material";
import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import apiUsers from "src/api/usersService";
import HistoryIcon from '@mui/icons-material/History';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ViewUserDetail from "./ViewUser";
import { useNavigate } from "react-router-dom";
import errorHandler from '../../utils/errorHandler';
import Moment from 'react-moment';
import { toast } from "react-toastify";
import DeleteIcon from '@mui/icons-material/Delete';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

function UserManagement() {
  const [data, setData] = useState();
  const navigate = useNavigate()
  const[check,setCheck] = useState(false)
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const[modalShow,setModalShow] = useState(false);
  const[currentStatus , setCurrentStatus] = useState('')
  const[statusId,setStatusId] = useState('')
  const[viewId,setViewId] = useState('')
  const[editId,setEditId] = useState('')
  const[searchItem,setSearchItem] = useState('');
  const[filteredData,setFilteredData] = useState('');
  const [warning, setWarning] = useState("");
  const [action, setAction] = useState("");
  const [pagination, setPagination] = useState({
    page: 1,
    perPage: 5, // Initial page size
  });
  const userData = async () => {
    const body ={
        searchItem: searchItem?searchItem:'',
        pageNumber: currentPage,
        pageSize: pageSize,
        status: ""
    }
    await apiUsers.getAllUser(body)
    .then((res) => {
      setData(res.data.data.result);
      setTotalPages(res.data.data.totalRecords);
    }).catch(err => {
     setData('')
     setTotalPages('');
    })
    
  };
  console.log(filteredData);
  console.log(data)
 

  console.log(pageSize,currentPage)
  const handlePageChange = (page) => {
    console.log(page)
    setCurrentPage(page);
  };
  
  const toggleChecked = async (id, statusChange) => {
    
  setShow(false);
  const res = await apiUsers.changeStatus({ id, status: statusChange == 1 ? 0 : 1 });

  // Handle API response
  setCurrentStatus('');
  setCheck(!check);

  if (res?.data?.message) {
    const updatedData = data.map((row) =>
    row._id === id ? { ...row, status: !row.status } : row
  );
  setData(updatedData);

    toast.success(res?.data?.message);
  } else {
    // Revert local state in case of API error
    setData(data);
    toast.error(res?.data?.message);
  } 
  };
console.log(editId)
useEffect(() => {
  userData()
},[searchItem ,currentPage, pageSize]);
function capitalizeFirstLetter(string){
	const firstChar = string.charAt(0).toUpperCase();
	const remainingChars = string.slice(1).toLowerCase();
	return `${firstChar}${remainingChars}`;
}
const [show, setShow] = useState(false);


const handleClose = () => setShow(false);
  const columns = [
    {
      name: "Name",
      selector: (row) => capitalizeFirstLetter(row.fullName),
    },
    {
      name: "Email",
      selector: (row) => capitalizeFirstLetter(row.email),
    },
    {
      name: "Phone Number",
      selector: (row) => row.phoneNumber,
    },
    {
      name: "Created Date & Time",
      selector: (row) =>   <Moment format="DD/MM/YYYY  HH:MM A" >{row.createdAt}</Moment>,
    },
    {
      name: "Status",
      cell: (row) => (
        <>
          <FormGroup>
            <FormControlLabel
              control={
                <Switch
                  checked={row.status}
                  onClick={() => {                   
                    setShow(true)
                    setCurrentStatus(row.status)
                    setStatusId(row._id)
                    setAction("status");
                    setWarning("Are you sure want to change the status? ");
                  }}

                  inputProps={{ "aria-label": "controlled" }}
                />
              }
            />
          </FormGroup>
        </>
      ),
    },
    {
      name:<div style={{textAlign:'center',marginLeft:'40px'}}>Action</div>,
      cell: (row) => (
        <>
          <Tooltip title="Edit" placement="top">
            <IconButton color="info" onClick={()=>{setEditId(row._id);
              navigate('/user-management/edit-user',{state:{id:row._id}})}}>
              <EditOutlined  />
            </IconButton>
          </Tooltip>
        
          <Tooltip title="View" placement="top">
            <IconButton color="info"   onClick={()=>{
                setModalShow(true);
                setViewId(row._id)}}>
              <VisibilityIcon />
            </IconButton>
          </Tooltip>
          {/* <Tooltip title="Delete" placement="top">
            <IconButton
              color="info"
              onClick={() => {
                setShow(true);
                setAction("delete");
                setWarning("Are you sure want to delete the user?");
              }}
            >
              <DeleteIcon />
            </IconButton>
          </Tooltip> */}
        </>
      ),
    },
  ];
 
  return (
   <Card>
      <CardHeader titleTypographyProps={{variant:'h4' }} title="User Management" >
        
        </CardHeader>
      <Box sx={{ display: "flex", alignItems:'center',justifyContent:'flex-end' }}>
              
              <TextField label="Search"  variant="standard" onChange={(e)=>setSearchItem(e.target.value)}  />
              <Button  size="large" type="submit" variant="contained" sx={{ml:3,mr:3}}   onClick={()=>navigate('/user-management/add-user')}>
                   Add
                </Button>
            </Box>
      
      <CardContent>
        <DataTable columns={columns} data={filteredData?filteredData:data}  pagination   
        paginationServer
           paginationTotalRows={totalPages}
          onChangePage={handlePageChange}
          paginationPerPage={pageSize}
          // paginationTotalRows={data ? data.length : 0} 
          paginationRowsPerPageOptions={[5, 10, 20, 50]}
          onChangeRowsPerPage={(currentRowsPerPage, currentPage) => {
            setPageSize(currentRowsPerPage);
            setCurrentPage(currentPage);
          }}
          />
          
      </CardContent>
     
     
      {modalShow?<ViewUserDetail show={modalShow} onHide={() => setModalShow(false)} id={viewId} />:''}
      <Dialog open={show} keepMounted onClose={handleClose} aria-describedby="alert-dialog-slide-description">
        <DialogTitle as="h2">{warning}</DialogTitle>
        <DialogActions>
          <Button
            variant="outlined"
            style={{ backgroundColor: "white" }}
            onClick={() => {
              if (action == "status") {
                toggleChecked(statusId, currentStatus);
              } else {
              }
            }}
          >
            Yes
          </Button>
          <Button variant="outlined" style={{ backgroundColor: "white" }} onClick={handleClose}>
            No
          </Button>
        </DialogActions>
      </Dialog>
    </Card>
  
   
  );
}

export default UserManagement;
