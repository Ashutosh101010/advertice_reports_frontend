import React, { useContext, useEffect, useState } from "react";
import { Card, Box, IconButton, Switch, styled, useTheme, FormControlLabel, Grid, Button, Dialog, Avatar, useMediaQuery } from '@mui/material';
import { DataGrid } from "@mui/x-data-grid";
import Label from "../label/Label";
import { sentenceCase } from "change-case";
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';
import EditIcon from '@mui/icons-material/Edit';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { Link, useLocation } from "react-router-dom";
import CircularProgress from '@mui/material/CircularProgress';
import AdverticeNetwork from "../../../Network";
import AuthContext from "../authContext/AuthContext";
import CreateAdminFormModal from "./CreateAdminForm";
import EditAdminFormModal from "./EditAdminForm";

const IOSSwitch = styled((props) => (
    <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(({ theme }) => ({
    width: 42,
    height: 26,
    padding: 0,
    '& .MuiSwitch-switchBase': {
        padding: 0,
        margin: 2,
        transitionDuration: '300ms',
        '&.Mui-checked': {
            transform: 'translateX(16px)',
            color: '#fff',
            '& + .MuiSwitch-track': {
                backgroundColor: theme.palette.mode === 'dark' ? '#2ECA45' : '#65C466',
                opacity: 1,
                border: 0,
            },
            '&.Mui-disabled + .MuiSwitch-track': {
                opacity: 0.5,
            },
        },
        '&.Mui-focusVisible .MuiSwitch-thumb': {
            color: '#33cf4d',
            border: '6px solid #fff',
        },
        '&.Mui-disabled .MuiSwitch-thumb': {
            color:
                theme.palette.mode === 'light'
                    ? theme.palette.grey[100]
                    : theme.palette.grey[600],
        },
        '&.Mui-disabled + .MuiSwitch-track': {
            opacity: theme.palette.mode === 'light' ? 0.7 : 0.3,
        },
    },
    '& .MuiSwitch-thumb': {
        boxSizing: 'border-box',
        width: 22,
        height: 22,
    },
    '& .MuiSwitch-track': {
        borderRadius: 26 / 2,
        backgroundColor: theme.palette.mode === 'light' ? '#E9E9EA' : '#39393D',
        opacity: 1,
        transition: theme.transitions.create(['background-color'], {
            duration: 500,
        }),
    },
}));

const CampaignData = [
    {
        id: 1,
        campaigns: "(7953) new test",
        impression: "0",
        clicks: "0",
        ctr: '0%',
        dailyCap: "111",
        todayCost: "0",
        todayBudget: "212",
        mediaCost: "0",
        eCpm: "0",
        eCpc: "0",
        progress: 0,
        status: true,
        adminStatus: true,
    },
    {
        id: 2,
        campaigns: "(7953) new test",
        impression: "0",
        clicks: "0",
        ctr: '0%',
        dailyCap: "111",
        todayCost: "0",
        todayBudget: "212",
        mediaCost: "0",
        eCpm: "0",
        eCpc: "0",
        progress: 85,
        status: true,
        adminStatus: true,
    }
]

const OrganisationList = [
    {
        "id": 1,
        "organisation": "classio",
        "address": "indore",
        "domain": "www.classio.com",
        "email": "classio@gmail.com",
        "contact": "1234567890",
        "logo": "",
        "status": true,
        "createdAt": 1713365503318,
        "updatedAt": 0,
        "cityId": 1,
        "cityName": "Indore",
        "stateName": "madhya pradesh",
        "stateId": 1
    },
    {
        "id": 2,
        "organisation": "ps academy",
        "address": "indore",
        "domain": "www.pdacademy.com",
        "email": "pdacademy@gmail.com",
        "contact": "1234567890",
        "logo": "",
        "status": false,
        "createdAt": 1713365503318,
        "updatedAt": 0,
        "cityId": 2,
        "cityName": "ujjain",
        "stateName": "madhya pradesh",
        "stateId": 1
    },
]

const AdminOrgnisationList = () => {

    const isMobile = useMediaQuery("(min-width:600px)");
    const theme = useTheme();
    const location = useLocation();
    const organisationId = location?.state?.orgId ? location?.state?.orgId : 0;
    const [page, setPage] = useState(0);
    const [pageSize, setPageSize] = useState(25);
    const [rowCount, setRowCount] = useState(0);
    const [switchChecked, setSwitchChecked] = useState(false);
    const [organisationList, setOrganisationList] = useState([]);
    const { auth, stateList, userType } = useContext(AuthContext)
    const [createFormModal, setCreateFormModal] = useState(false);
    const [editFormModal, setEditFormModal] = useState(false);
    const [editTableData, setEditTableData] = useState({});
    const [switchStates, setSwitchStates] = useState({});

    useEffect(() => {
        fetchOrganisationList();
    }, [])

    const fetchOrganisationList = async () => {
        const orgId = organisationId
        try {
            const body = {
                "page": page,
                "pageSize": pageSize
            }
            const response = await AdverticeNetwork.fetchAdminOrganisationApi(body, auth, orgId);
            if (response.errorCode === 0) {
                setOrganisationList(response.admins);
                setRowCount(response.count)
            }
        } catch (error) {
            console.log(error);
        }
    }

    const handleClick = async (e, data) => {
        e.stopPropagation();

        // Optimistically update UI before API call
        // setSwitchStates((prev) => ({
        //     ...prev,
        //     [data.id]: !prev[data.id],
        // }));

        // API call to change status
        const response = await AdverticeNetwork.changeStatusAdminApi(auth, data?.id);

        if (response?.errorCode === 0) {
            fetchOrganisationList(); // Refresh data if API succeeds
        }
        // else {
        //     // Revert UI if API fails
        //     setSwitchStates((prev) => ({
        //         ...prev,
        //         [data.id]: prev[data.id],
        //     }));
        // }
    };

    function handlePageChange(newPage) {
        setPage(newPage);
    };

    function handlePageSizeChange(newPageSize) {
        setPageSize(newPageSize);
    };

    const createForm = () => {
        setCreateFormModal(true);
    }

    const handleCloseModal = () => {
        setCreateFormModal(false);
        setEditFormModal(false);
    }

    const handleEditTable = (data) => {
        setEditTableData(data);
        setEditFormModal(true);
    }

    const columns = [
        {
            field: "id",
            headerName: <p className={theme.palette.mode === "dark" ? "globalTableCss" : ""}></p>,
            headerClassName: 'super-app-theme--header',
            sortable: false,
            flex: 0.5,
            renderCell: (params) => {
                return <PriorityHighIcon sx={{ background: "orange", padding: "1px", borderRadius: "4px", color: "#fff", mt: 1.5 }} />
            }
        },
        // {
        //     field: 'logo',
        //     sortable: false,
        //     headerClassName: 'super-app-theme--header',
        //     headerName: <p className={theme.palette.mode === "dark" ? "globalTableCss" : ""}>Logo</p>,
        //     flex: 1,
        //     renderCell: (params) => {
        //         return (
        //             <Avatar
        //                 src={`${params.row.logo}`}
        //             />
        //         );
        //     },
        // },
        {
            field: "name",
            headerName: <p className={theme.palette.mode === "dark" ? "globalTableCss" : ""}>Name</p>,
            headerClassName: 'super-app-theme--header',
            sortable: false,
            renderCell: (params) => {
                return <p style={{ margin: "0px" }}><Link>{params.row.name}</Link></p>
            },
            flex: 1.5,
        },
        {
            field: "username",
            headerName: <p className={theme.palette.mode === "dark" ? "globalTableCss" : ""}>Username</p>,
            headerClassName: 'super-app-theme--header',
            sortable: false,
            flex: 1.5,
        },
        // {
        //     field: "email",
        //     sortable: false,
        //     headerName: <p className={theme.palette.mode === "dark" ? "globalTableCss" : ""}>E-mail</p>,
        //     headerClassName: 'super-app-theme--header',
        //     flex: 1.5
        // },
        {
            field: "address",
            sortable: false,
            headerName: <p className={theme.palette.mode === "dark" ? "globalTableCss" : ""}>Address</p>,
            headerClassName: 'super-app-theme--header',
            flex: 1
        },
        {
            field: "contact",
            headerName: <p style={{ marginLeft: isMobile ? 45 : 0 }}>Contact</p>,
            headerClassName: 'super-app-theme--header',
            sortable: false,
            flex: 1,
            renderCell: (params) => {
                return (
                    <p style={{ textAlign: 'center', margin: "0px 10px 10px 10px", }}>{params?.row?.contact ? params.row?.contact : "N/A"}</p>
                )
            }
        },
        // {
        //     field: "stateName",
        //     sortable: false,
        //     headerName: <p className={theme.palette.mode === "dark" ? "globalTableCss" : ""}>State Name</p>,
        //     headerClassName: 'super-app-theme--header',
        //     flex: 1.2
        // },
        // {
        //     field: "cityName",
        //     sortable: false,
        //     headerName: <p className={theme.palette.mode === "dark" ? "globalTableCss" : ""}>City Name</p>,
        //     headerClassName: 'super-app-theme--header',
        //     flex: 1
        // },
        {
            field: "createdAt",
            sortable: false,
            headerName: <p style={{ marginLeft: isMobile ? 75 : 0 }}>CreatedAt</p>,
            headerClassName: 'super-app-theme--header',
            flex: 1.5,
            renderCell: (params) => (
                <p
                    style={{ textAlign: 'center', margin: "0px 10px 10px 10px", }}
                >
                    {new Intl.DateTimeFormat("en-US", {
                        year: "numeric",
                        month: "2-digit",
                        day: "2-digit",
                        hour: "2-digit",
                        minute: "2-digit",
                    }).format(params.row.createdAt)}
                </p>
            )
        },
        {
            field: "status",
            sortable: false,
            headerName: <p className={theme.palette.mode === "dark" ? "globalTableCss" : ""}>Status</p>,
            headerClassName: 'super-app-theme--header',
            renderCell: (params) => {
                return (
                    <Label
                        onClick={(e) => handleClick(e, params.row)}
                        color={
                            (params.row.status === true &&
                                "success") ||
                            "error"
                        }
                    >
                        {sentenceCase(
                            params.row.status === true
                                ? "Active"
                                : "Paused"
                        )}
                    </Label>
                );
            },
            flex: 1
        },
        {
            field: "action",
            flex: 1,
            sortable: false,
            headerName: <p className={theme.palette.mode === "dark" ? "globalTableCss" : ""}>Action</p>,
            headerClassName: 'super-app-theme--header',
            renderCell: (params) => {
                return (
                    <>
                        {/* <IconButton
                            aria-label="more"
                            id={params.row.id}
                            aria-controls={open ? "long-menu" : undefined}
                            aria-expanded={open ? "true" : undefined}
                            aria-haspopup="true"
                            style={{ color: 'black' }}
                        // onClick={(e) => e.stopPropagation()}
                        >
                            <FormControlLabel
                                checked={params.row.status}
                                value={params.row.status}
                                control={<IOSSwitch
                                    checked={switchStates[params.row.id] ?? params.row.status}
                                    onChange={(e) => handleClick(e, params.row)}
                                />}
                                label=""
                            />
                        </IconButton> */}
                        <IconButton
                            aria-label="more"
                            onClick={() => handleEditTable(params.row)}
                        >
                            <EditIcon />
                        </IconButton>
                    </>
                );
            },
        }
    ];

    return (
        <React.Fragment>
            <Card className="card">
                <Grid container>
                    <Grid item xs={12} sm={12} md={12} lg={12} sx={{ textAlign: "end" }}>
                        <Button className='hearder-right-btn create-organisation' onClick={createForm}
                            sx={{
                                width: '100%',
                                maxWidth: '200px',
                                fontFamily: `"Poppins", sans-serif`,
                                fontSize: '16px',
                            }}
                        >
                            Create Admins
                        </Button>
                    </Grid>
                </Grid>
                <Box
                    m="10px 0 0 0"
                    height="75vh"
                    sx={{
                        '.MuiDataGrid-root .MuiDataGrid-cell:focus-within': {
                            outline: 'none !important'
                        },
                        '& > .MuiDataGrid-columnSeparator': {
                            visibility: 'hidden',
                        },
                        "& .MuiDataGrid-root": {
                            border: "none",
                            boxShadow:
                                "0 0 2px 0 rgba(145, 158, 171, 0.4), 0 12px 24px -4px rgba(145, 158, 171, 0.12)",
                            color: "#637381",
                        },

                        "& .MuiDataGrid-cell": {
                            borderBottom: "1px solid rgba(241, 243, 244, 1) !important",
                        },
                        "& .name-column--cell": {
                            color: "#b2c3ff",
                        },
                        "& .MuiDataGrid-columnHeaders": {
                            backgroundColor: "#b2c3ff",
                            fontWeight: "500",
                        },
                        "& .MuiDataGrid-virtualScroller": {
                            backgroundColor: "#fff",
                        },
                        "& .MuiCheckbox-root": {
                            color: `#b2c3ff !important`,
                        },
                        "& .MuiDataGrid-row:hover": {
                            backgroundColor: "#f5f5f5 !important",
                            borderColor: "#45679F ",
                            // color: "red"
                        },
                        '& .super-app-theme--header': {
                            backgroundColor: 'var(--primary-color)',
                            color: 'var(--background-color)', //' 'black',
                        },
                        "& .MuiDataGrid-columnHeaderTitle": {
                            fontWeight: "500",
                        },
                        "& .MuiDataGrid-row": {
                            border: "1px solid #b2c3ff",
                            borderRadius: "5px",
                            backgroundColor: "#fff !important",
                            boxShadow: "0 0 10px 4px hsla(0,0%,96.1%,.3333333333333333) !important",
                            borderColor: "#b2c3ff",
                            marginTop: 1,
                        },
                    }}
                >
                    <DataGrid
                        paginationMode="server"
                        rowCount={rowCount}
                        page={page}
                        onPageChange={handlePageChange}
                        pageSize={pageSize}
                        onPageSizeChange={handlePageSizeChange}
                        rowsPerPageOptions={[25, 50, 100]}
                        rows={organisationList}
                        columns={columns}
                        pagination
                        // onCellClick={handleSectionClick}
                        disableColumnMenu
                        disableColumnFilter
                        disableColumnSelector={false}
                        sx={{
                            "& .MuiDataGrid-columnHeader .MuiDataGrid-columnSeparator": {
                                display: "none",
                            },
                        }}
                    />
                </Box>
                <Dialog open={createFormModal} onClose={handleCloseModal}>
                    <CreateAdminFormModal handleClose={handleCloseModal} fetchOrganisationList={fetchOrganisationList} auth={auth} stateList={stateList} organisationId={organisationId} userType={userType} />
                </Dialog>
                <Dialog open={editFormModal} onClose={handleCloseModal}>
                    <EditAdminFormModal handleClose={handleCloseModal} fetchOrganisationList={fetchOrganisationList} auth={auth} stateList={stateList} editTableData={editTableData} userType={userType} />
                </Dialog>
            </Card>
        </React.Fragment>
    )
};

export default AdminOrgnisationList;