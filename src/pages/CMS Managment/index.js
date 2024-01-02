import { Construction, EditOutlined, Search } from "@mui/icons-material";
import { Box, Button, Card, CardContent, CardHeader, FormControlLabel, FormGroup, IconButton, InputAdornment, Switch, TextField, Tooltip } from "@mui/material";
import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import apiUsers from "src/api/usersService";
import HistoryIcon from "@mui/icons-material/History";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";
import errorHandler from "../../utils/errorHandler";
import Moment from "react-moment";
import { toast } from "react-toastify";
import CloseIcon from "@mui/icons-material/Close";
import cmsService from "src/api/cmsService";


function CMSManagement() {
  const [data, setData] = useState();
  const navigate = useNavigate();
  const [check, setCheck] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [description, setDescription] = useState("");
  const [editId, setEditId] = useState("");
  const [searchItem, setSearchItem] = useState("");
  const [filteredData, setFilteredData] = useState("");
  const [pagination, setPagination] = useState({
    page: 1,
    perPage: 5, // Initial page size
  });
  const cmsData = async () => {

    await cmsService
      .getCMS()
      .then((res) => {
        console.log(res.data.data.result)
        setData(res.data.data.result);
        setTotalPages(res.data.data.totalRecords);
      })
      .catch((err) => {
        setData("");
        setTotalPages("");
      });
  };
  console.log(filteredData);
  console.log(data);

  console.log(pageSize, currentPage);
  const handlePageChange = (page) => {
    console.log(page);
    setCurrentPage(page);
  };
  const handleClearSearch = () => {
    setSearchItem("");
    setFilteredData('')
  };

  console.log(editId);
  useEffect(() => {
    cmsData();

  }, [ currentPage, pageSize]);

  function capitalizeFirstLetter(string) {
    const firstChar = string.charAt(0).toUpperCase();
    const remainingChars = string.slice(1).toLowerCase();
    return `${firstChar}${remainingChars}`;
  }
  const columns = [
    {
      name: "Title",
      selector: (row) => capitalizeFirstLetter(row.title),
    },
    {
      name: "Description",
        cell: (row) => (
        <div>
          {row.description && (
            <p>{row.description.replace(/<[^>]*>/g, '').split(' ').slice(0, 4).join(' ')}....</p>
          )}
        </div>
      ),
    },

    {
      name: "Status",
      selector: (row) => row.status?'Active':'Deactive',

    },
    {
      name: <div style={{ textAlign: "center", marginLeft: "40px" }}>Action</div>,
      cell: (row) => (
        <>
          <Tooltip title="Edit" placement="top">
            <IconButton
              color="info"
              onClick={() => {
                setEditId(row._id);
                navigate("/cms-management/edit-cms", { state: { data: row } });
              }}
            >
              <EditOutlined />
            </IconButton>
          </Tooltip>
          <Tooltip title="View" placement="top">
            <IconButton
              color="info"
              onClick={() => {
                navigate("/cms-management/view-cms", { state: { data: row} });
              }}
            >
              <VisibilityIcon />
            </IconButton>
          </Tooltip>

        </>
      ),
    },
  ];
const handleSearchClick = (e)=>  {
  const value = e.target.value
setSearchItem(value)
console.log(e.target.value)
    const filterBySearch = data.filter((item) => {
        if (item.title.toLowerCase()
            .includes(value.toLowerCase())) { return item; }
    })
    console.log(filterBySearch)
    setFilteredData(filterBySearch);
}

  return (
    <Card>
      <CardHeader titleTypographyProps={{ variant: "h4" }} title="CMS Management" />
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "flex-end" }}>
        <Box sx={{ display: "flex", width: "300px", marginRight: "10px" }}>
          <TextField
            label="Search CMS"
            value={searchItem}
            fullWidth
            size="large"
            variant="standard"
            onChange={(e) => handleSearchClick(e)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleClearSearch} edge="end">
                    <CloseIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Box>
      </Box>
      <CardContent>
        <DataTable
          columns={columns}
          data={filteredData?filteredData:data}
          // pagination
          // paginationServer
          // paginationTotalRows={totalPages}
          // onChangePage={handlePageChange}
          // paginationPerPage={pageSize}
          // // paginationTotalRows={data ? data.length : 0}
          // paginationRowsPerPageOptions={[5, 10, 20, 50]}
          // onChangeRowsPerPage={(currentRowsPerPage, currentPage) => {
          //   setPageSize(currentRowsPerPage);
          //   setCurrentPage(currentPage);
          // }}
        />
      </CardContent>

    </Card>
  );
}

export default CMSManagement;
