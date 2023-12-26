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
function UserManagement() {
  const [data, setData] = useState();
  const navigate = useNavigate()
  const[check,setCheck] = useState()
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const[modalShow,setModalShow] = useState(false)
  const[viewId,setViewId] = useState('')
  const[editId,setEditId] = useState('')
  const[searchItem,setSearchItem] = useState('');
  const[filteredData,setFilteredData] = useState('');
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
  useEffect(() => {
    userData();
  }, [searchItem ,currentPage, pageSize]);

  console.log(pageSize,currentPage)
  const handlePageChange = (page) => {
    console.log(page)
    setCurrentPage(page);
  };
  const toggleChecked = async (id, status) => {
    const changeStatus = status == 1?0 :1
    setCheck()
    const res = await apiUsers.changeStatus({ id, status:changeStatus });
    if(res?.data?.message)
    {  
      toast.success(res?.data?.message)
    }else{
      toast.error(res?.data?.message)
    }
    setCheck(changeStatus)
    console.log(res);
    userData()
  };
console.log(editId)

function capitalizeFirstLetter(string){
	const firstChar = string.charAt(0).toUpperCase();
	const remainingChars = string.slice(1).toLowerCase();
	return `${firstChar}${remainingChars}`;
}
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
      selector: (row) => row.status,
      
      cell: (row) => (
        <>
          <FormGroup>
            <FormControlLabel
              control={
                <Switch
                  checked={row.status == 1}
                  onChange={() => {
                    toggleChecked(row._id, row.status);
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
      name: "Action",
      cell: (row) => (
        <>
          <Tooltip title="Edit" placement="top">
            <IconButton color="info" onClick={()=>{setEditId(row._id);
              navigate('/dashboard/edit-user',{state:{id:row._id}})}}>
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
              <Button  size="large" type="submit" variant="contained" sx={{ml:3,mr:3}}   onClick={()=>navigate('/dashboard/add-user')}>
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
    </Card>
  );
}

export default UserManagement;
