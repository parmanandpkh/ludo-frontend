import { Construction, EditOutlined, Search } from "@mui/icons-material";
import {
    Box,
    Button,
    Card,
    CardContent,
    CardHeader,
    FormControlLabel,
    FormGroup,
    IconButton,
    Switch,
    TextField,
    Tooltip,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import apiUsers from "src/api/usersService";
import HistoryIcon from "@mui/icons-material/History";
import VisibilityIcon from "@mui/icons-material/Visibility";
// import ViewUserDetail from "../ViewUser";
import { useNavigate } from "react-router-dom";
import Moment from "react-moment";
import { toast } from "react-toastify";
import DeleteIcon from "@mui/icons-material/Delete";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Stack } from "react-bootstrap";
import styled from "styled-components";
import { makeStyles } from "@material-ui/core";
import errorHandler from "src/utils/errorHandler";
import cmsService from "src/api/cmsService";
import ViewModal from "./ViewModal";
import ConfirmModal from "src/components/confirmModal";

const useStyle = makeStyles((theme) => ({
    h2: {
        [theme.breakpoints.down("xs")]: {
            padding: "0px",
            fontSize: "16px",
        },
        button: {

            "&:hover": {
                color: "white !important",
            },
        },
    },
}));

function FaqList() {
    const [data, setData] = useState([]);
    const navigate = useNavigate();
    const [open, setOpen] = useState(false)
    const [propData, setPropData] = useState({})
    const [check, setCheck] = useState(false);
    const [openConfirmModal, setConfirmModal] = useState(false)
    const [totalPages, setTotalPages] = useState(0);
    const [deleteId, setDeleteId] = useState("")
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(5);
    const [modalShow, setModalShow] = useState(false);
    const [currentStatus, setCurrentStatus] = useState("");
    const [statusId, setStatusId] = useState("");
    const [viewId, setViewId] = useState("");
    const [editId, setEditId] = useState("");
    const [searchItem, setSearchItem] = useState("");
    const [filteredData, setFilteredData] = useState("");
    const [warning, setWarning] = useState("");
    const [action, setAction] = useState("");
    const [pagination, setPagination] = useState({
        page: 1,
        perPage: 5, // Initial page size
    });
    const userData = async () => {
        const body = {
            searchItem: searchItem ? searchItem : "",
            pageNumber: currentPage,
            pageSize: pageSize,
            status: "",
        };
        await cmsService
            .getFaq(body)
            .then((res) => {
                setData(res.data.data.result);
                setTotalPages(res.data.data.totalRecords);
            })
            .catch((err) => {
                setData([]);
                setTotalPages("");
                errorHandler(err)
            });
    };
    const customStyles = {
        headCells: {
            style: {
                fontSize: "16px",
                fontWeight: "bold",
            },
        },
        cells: {
            style: {
                padding: "16px",
            },
        },
    };

    const handlePageChange = (page) => {
        console.log(page);
        setCurrentPage(page);
    };

    const toggleChecked = async (id, statusChange) => {
        setShow(false);
        const res = await apiUsers.changeStatus({
            id,
            status: statusChange == 1 ? 0 : 1,
        });

        // Handle API response
        setCurrentStatus("");
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
    console.log(editId);
    useEffect(() => {
        userData();
    }, [searchItem, currentPage, pageSize]);

    function capitalizeFirstLetter(string) {
        if (string != "undefined " && string) {
            const firstChar = string.charAt(0).toUpperCase();
            const remainingChars = string.slice(1).toLowerCase();
            return `${firstChar}${remainingChars}`;
        } else {
            return "";
        }
    }

    const [show, setShow] = useState(false);

    const columns = [
        {
            name: "Question",
            selector: (row) => capitalizeFirstLetter(row?.title),
        },


        {
            name: (
                <div style={{ textAlign: "center", marginLeft: "40px" }}>Action</div>
            ),
            cell: (row) => (
                <>

                    <Tooltip title="View" placement="top">
                        <IconButton
                            color="primary"
                            onClick={() => {
                                setOpen(true)
                                setPropData(row)
                            }}
                        >
                            <VisibilityIcon />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Edit" placement="top">
                        <IconButton
                            color="primary"
                            onClick={() => {
                                navigate(`/cms/faq/edit/${row._id}`)
                            }}
                        >
                            <EditOutlined />
                        </IconButton>
                    </Tooltip>


                    <Tooltip title="Delete" placement="top">
                        <IconButton
                            color="primary"
                            onClick={() => {
                                setConfirmModal(true)
                                setDeleteId(row?._id)
                            }}
                        >
                            <DeleteIcon />
                        </IconButton>
                    </Tooltip>
                </>
            ),
        },
    ];


    const handleDelete = async () => {
        try {
            const { data } = await cmsService.deleteFaq(deleteId)
            toast.success(data?.message)
            userData()
        } catch (error) {
            errorHandler(error)
        }
    }
    return (
        <Card>
            <CardHeader
                titleTypographyProps={{ variant: "h4" }}
                title="FAQ Management"
            ></CardHeader>
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-end",
                }}
            >
                <TextField
                    label="Search"
                    variant="standard"
                    onChange={(e) => setSearchItem(e.target.value)}
                />
                <Button
                    size="large"
                    type="submit"
                    variant="contained"
                    sx={{ ml: 3, mr: 3 }}
                    onClick={() => navigate("/cms/faq/add")}
                >
                    Add
                </Button>
            </Box>

            <CardContent>
                <DataTable
                    customStyles={customStyles}
                    columns={columns}
                    data={filteredData ? filteredData : data}
                    pagination
                    paginationServer
                    style={{ padding: "16px" }}
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
            <ViewModal open={open} setOpen={setOpen} data={propData} />
            <ConfirmModal
                warning={"Are you sure want to delete the faq?"}
                show={openConfirmModal}
                setShow={setConfirmModal}
                handleDelete={handleDelete}

            />
        </Card>

    );
}

export default FaqList;
