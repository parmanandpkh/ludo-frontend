import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Button, IconButton, MenuItem, Popover, Tab, Table, TableBody, TableCell, TableContainer, TableRow, Tabs, Box, Typography, TablePagination, Paper } from "@mui/material";
import { toast } from "react-toastify"

import Scrollbar from "../../components/scrollbar/Scrollbar";
import { UserListHead } from "../@dashboard/user";
import Iconify from "../../components/iconify";


// !utils
import routeConfig from "../../utils/routeConfig";
import errorHandler from "../../utils/errorHandler";


// !state
import restroApi from "../../api/restrosService";
import { getRestroStaffData, deleteRestroStaffMember, changeStaffMemberStatus } from "../../features/RestrosSlice";



function CustomTabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            // aria-labelledby={`simple-tab-${index}`}
            {...other}
            style={{ width: "100%" }}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography component={'span'}>{children}</Typography>
                </Box>
            )}
        </div>
    );
}



function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        // 'aria-controls': `simple-tabpanel-${index}`,
    };
}


const WAITER_HEAD = [
    // { id: 'name', label: <div style={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}><span>Name</span><span>Email/Phone</span></div>, alignRight: "center" },
    { id: 'name', label: 'Name', alignRight: false },
    { id: 'email', label: 'Email', alignRight: false },
    { id: 'phone', label: 'Phone', alignRight: false },
    { id: 'shift', label: 'Shift', alignRight: false },
    { id: 'assignedTable', label: 'Assigned Table', alignRight: false },
    { id: '', label: 'Actions', },
];

const WAITER_DATA = [
    { name: '', email: "", phone: "", shift: "", assignedTable: "" },
    { name: '', email: "", phone: "", shift: "", assignedTable: "" },
    { name: '', email: "", phone: "", shift: "", assignedTable: "" },
];

const KITCHEN_HEAD = [
    // { id: 'name', label: <div style={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}><span>Name</span><span>Email/Phone</span></div>, alignRight: "center" },
    { id: 'name', label: 'Name', alignRight: false },
    { id: 'email', label: 'Email', alignRight: false },
    { id: 'phone', label: 'Phone', alignRight: false },
    { id: 'shift', label: 'Shift', alignRight: false },
    { id: '', label: 'Actions', },
];

const CASHIER_HEAD = [
    // { id: 'name', label: <div style={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}><span>Name</span><span>Email/Phone</span></div>, alignRight: "center" },
    { id: 'name', label: 'Name', alignRight: false },
    { id: 'email', label: 'Email', alignRight: false },
    { id: 'phone', label: 'Phone', alignRight: false },
    { id: 'shift', label: 'Shift', alignRight: false },
    { id: '', label: 'Actions', },
];


function StaffTabs() {
    const { state } = useLocation();
    const [value, setValue] = useState(state?.value ?? 0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };


    return (
        <Box sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderTop: 1, borderColor: 'divider' }}>
                <Tabs value={value} onChange={handleChange}>
                    <Tab label="Waiter" {...a11yProps(0)} />
                    <Tab label="Kitchen Worker" {...a11yProps(1)} />
                    <Tab label="Cashier" {...a11yProps(2)} />
                </Tabs>
            </Box>
            <CustomTabPanel value={value} index={0}>
                <TableData label="Waiter" role={5} TABLE_HEAD={WAITER_HEAD} value={value} />
            </CustomTabPanel>
            <CustomTabPanel value={value} index={1}>
                <TableData label="Kitchen Worker" role={7} TABLE_HEAD={KITCHEN_HEAD} value={value} />
            </CustomTabPanel>
            <CustomTabPanel value={value} index={2}>
                <TableData label="Cashier" role={8} TABLE_HEAD={CASHIER_HEAD} value={value} />
            </CustomTabPanel>
        </Box>
    );
}

export default StaffTabs



const TableData = ({ label, role, TABLE_HEAD, WAITER_DATA, value }) => {
    const navigate = useNavigate()
    const { restroId, managerId } = useParams()
    const [selectedId, setSelectedId] = useState()
    const [index, setIndex] = useState()
    const [statusType, setStatusType] = useState('Inactive')
    const dispatch = useDispatch()
    const { restroStaff } = useSelector(state => state.restros)
    useEffect(() => {
        dispatch(getRestroStaffData({
            owner_id: restroId,
            manager_id: managerId,
            role
        }))
    }, [])

    const [open, setOpen] = useState(null);


    // const [] = useState()

    const handleOpenMenu = (event, staffMemberId, idx) => {
        setOpen(event.currentTarget);
        setSelectedId(staffMemberId)
        setIndex(idx)
        setStatusType(restroStaff[idx]?.user_detail.status === 1 ? 'Inactive' : 'Active')
    };

    const handleCloseMenu = () => {
        setOpen(null);
    };


    const deleteHandler = async (e) => {
        await restroApi.deleteStaffMember({ owner_id: restroId, manager_id: managerId, id: selectedId })
            .then((res) => {
                dispatch(deleteRestroStaffMember(selectedId))
                toast.error(res?.data?.message)
            }).catch(err => {
                errorHandler(err)
            })
        setOpen(null);
    }


    const statusHandler = async () => {
        const status = restroStaff[index]?.user_detail?.status === 1 ? 0 : 1;
        console.log(status);
        await restroApi.changeStaffStatus({
            owner_id: restroId,
            manager_id: managerId,
            id: selectedId,
            status,
        }).then((res) => {
            dispatch(changeStaffMemberStatus({
                index,
                status,
            }))
            toast.success(res?.data?.message)
        }).catch(err => errorHandler(err))
        setOpen(null);
    }

    const editHandler = () => {
        console.log(selectedId)

        navigate(routeConfig.restro.manager.editStaffMember(restroId, managerId, selectedId), { state: { value } })
    }
    return (
        <>
            <Scrollbar>
                <TableContainer sx={{ minWidth: 800 }}>
                    <Table>
                        <UserListHead
                            headLabel={TABLE_HEAD}
                        />
                        <TableBody>
                            {
                                restroStaff?.length === 0 ? (
                                    <TableRow>
                                        <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                                            <Paper
                                                sx={{
                                                    textAlign: 'center',
                                                }}
                                            >
                                                <Typography component={'span'} color="textSecondary" paragraph>
                                                    No {label} found
                                                </Typography>
                                            </Paper>
                                        </TableCell>
                                    </TableRow>
                                ) : null
                            }


                            {role === 5 ? restroStaff.map((row, idx) => {
                                const { user_detail, shift, table, restro_detail } = row
                                return (
                                    <TableRow hover key={user_detail?._id}>
                                        {/* <TableCell align="center">
                                            <Box sx={{ display: "inline-flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
                                                <span>{user_detail?.name}</span>
                                                <span>{user_detail?.email}</span>
                                                <span>{user_detail?.phone}</span>
                                            </Box>
                                        </TableCell> */}
                                        <TableCell sx={{ textTransform: "capitalize" }}>
                                            {user_detail?.name}
                                        </TableCell>
                                        <TableCell>
                                            {user_detail?.email}
                                        </TableCell>
                                        <TableCell>
                                            {user_detail?.phone}
                                        </TableCell>
                                        <TableCell>
                                            {shift}
                                        </TableCell>
                                        <TableCell>
                                            {table.length > 0 ? table?.join(',') : ""}
                                        </TableCell>
                                        <TableCell>
                                            <IconButton size="large" color="inherit" onClick={(e) => handleOpenMenu(e, user_detail?._id, idx)} >
                                                <Iconify icon={'eva:more-vertical-fill'} />
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                )
                            }) : null}


                            {role === 7 ? restroStaff.map((row, idx) => {
                                const { user_detail, shift, table } = row
                                return (
                                    <TableRow hover key={user_detail?._id}>
                                        {/* <TableCell align="center">
                                            <Box sx={{ display: "inline-flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
                                                <span>{user_detail?.name}</span>
                                                <span>{user_detail?.email}</span>
                                                <span>{user_detail?.phone}</span>
                                            </Box>
                                        </TableCell> */}
                                        <TableCell>
                                            {user_detail?.name}
                                        </TableCell>
                                        <TableCell>
                                            {user_detail?.email}
                                        </TableCell>
                                        <TableCell>
                                            {user_detail?.phone}
                                        </TableCell>
                                        <TableCell>
                                            {shift}
                                        </TableCell>

                                        <TableCell>
                                            <IconButton size="large" color="inherit" onClick={(e) => handleOpenMenu(e, user_detail?._id, idx)} >
                                                <Iconify icon={'eva:more-vertical-fill'} />
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                )
                            }) : null}


                            {role === 8 ? restroStaff.map((row, idx) => {
                                const { user_detail, shift, table } = row
                                return (
                                    <TableRow hover key={user_detail?._id}>
                                        {/* <TableCell align="center">
                                            <Box sx={{ display: "inline-flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
                                                <span>{user_detail?.name}</span>
                                                <span>{user_detail?.email}</span>
                                                <span>{user_detail?.phone}</span>
                                            </Box>
                                        </TableCell> */}
                                        <TableCell>
                                            {user_detail?.name}
                                        </TableCell>
                                        <TableCell>
                                            {user_detail?.email}
                                        </TableCell>
                                        <TableCell>
                                            {user_detail?.phone}
                                        </TableCell>
                                        <TableCell>
                                            {shift}
                                        </TableCell>
                                        <TableCell>
                                            <IconButton size="large" color="inherit" onClick={(e) => handleOpenMenu(e, user_detail?._id, idx)} >
                                                <Iconify icon={'eva:more-vertical-fill'} />
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                )
                            }) : null}
                        </TableBody>
                    </Table>
                </TableContainer>
                {/* <TablePagination
                    // rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={10}
                    rowsPerPage={1}
                    page={1}
                // onPageChange={handleChangePage}
                // onRowsPerPageChange={handleChangeRowsPerPage}
                /> */}
            </Scrollbar >

            <Popover
                open={Boolean(open)}
                anchorEl={open}
                onClose={handleCloseMenu}
                anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                PaperProps={{
                    sx: {
                        p: 1,
                        width: 140,
                        '& .MuiMenuItem-root': {
                            px: 1,
                            typography: 'body2',
                            borderRadius: 0.75,
                        },
                    },
                }}
            >
                <MenuItem onClick={editHandler} >
                    <Iconify icon={'eva:edit-fill'} sx={{ mr: 2 }} />
                    Edit
                </MenuItem>
                <MenuItem sx={{ color: statusType === "Active" ? '' : 'error.main' }} onClick={statusHandler}>
                    <Visibility status={statusType} />
                </MenuItem>
                <MenuItem sx={{ color: 'error.main' }} onClick={deleteHandler} >
                    <Iconify icon={'eva:trash-2-outline'} sx={{ mr: 2 }} />
                    Delete
                </MenuItem>
            </Popover >
        </>
    )
}



const Visibility = ({ status }) => {
    if (status === "Active") {
        return (
            <>
                <Iconify icon={'teenyicons:tick-circle-solid'} sx={{ mr: 2 }} />
                Active
            </>
        )
    }

    return (
        <>
            <Iconify icon={'carbon:close-filled'} sx={{ mr: 2 }} />
            InActive
        </>
    )

}