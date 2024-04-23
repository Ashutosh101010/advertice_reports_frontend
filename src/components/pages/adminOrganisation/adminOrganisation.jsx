import React, { useContext, useEffect, useState } from "react";
import { Card, Box, IconButton, Switch, styled, useTheme, FormControlLabel, Grid, Button, Dialog, Avatar } from '@mui/material';
import { DataGrid } from "@mui/x-data-grid";
import Label from "../label/Label";
import { sentenceCase } from "change-case";
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';
import EditIcon from '@mui/icons-material/Edit';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { Link } from "react-router-dom";
import CircularProgress from '@mui/material/CircularProgress';
import AdverticeNetwork from "../../../Network";
import AuthContext from "../authContext/AuthContext";
import CreateFormModal from "../superAdminOrganisation/CreateOrganisationForm";
import EditFormModal from "../superAdminOrganisation/EditOrganisation";

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

    const theme = useTheme();
    const [page, setPage] = useState(0);
    const [pageSize, setPageSize] = useState(25);
    const [rowCount, setRowCount] = useState(OrganisationList.length);
    const [switchChecked, setSwitchChecked] = useState(false);
    const [organisationList, setOrganisationList] = useState(OrganisationList);
    const { auth, stateList } = useContext(AuthContext)
    const [createFormModal, setCreateFormModal] = useState(false);
    const [editFormModal, setEditFormModal] = useState(false);
    const [editTableData, setEditTableData] = useState({});

    console.log('organisationList', organisationList);

    useEffect(() => {
        fetchOrganisationList();
    }, [])

    const fetchOrganisationList = async () => {
        const orgId = 0
        try {
            const body = {
                "page": 0,
                "pageSize": 0
            }
            const response = await AdverticeNetwork.fetchAdminOrganisationApi(body, auth, orgId);

            console.log('response', response);
        } catch (error) {
            console.log(error);
        }
    }

    const handleClick = async (event, data) => {
        console.log('data===', data);
        event.stopPropagation();
        const response = await AdverticeNetwork.changeStatusApi(auth, data?.id);
        console.log('response===', response);
        if (response?.errorCode === 0) {
            fetchOrganisationList();
        }
        setSwitchChecked(event.target.checked)
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
        {
            field: 'logo',
            sortable: false,
            headerClassName: 'super-app-theme--header',
            headerName: <p className={theme.palette.mode === "dark" ? "globalTableCss" : ""}>Logo</p>,
            flex: 0.5,
            renderCell: (params) => {
                return (
                    <Avatar
                        src={`${params.row.logo}`}
                    />
                );
            },
        },
        {
            field: "organisation",
            headerName: <p className={theme.palette.mode === "dark" ? "globalTableCss" : ""}>organisation</p>,
            headerClassName: 'super-app-theme--header',
            sortable: false,
            renderCell: (params) => {
                return <p style={{ margin: "0px" }}><Link>{params.row.organisation}</Link></p>
            },
            flex: 1,
        },
        {
            field: "domain",
            headerName: <p className={theme.palette.mode === "dark" ? "globalTableCss" : ""}>domain</p>,
            headerClassName: 'super-app-theme--header',
            sortable: false,
            flex: 1.5,
        },
        {
            field: "email",
            sortable: false,
            headerName: <p className={theme.palette.mode === "dark" ? "globalTableCss" : ""}>email</p>,
            headerClassName: 'super-app-theme--header',
            flex: 1.5
        },
        {
            field: "address",
            sortable: false,
            headerName: <p className={theme.palette.mode === "dark" ? "globalTableCss" : ""}>address</p>,
            headerClassName: 'super-app-theme--header',
            flex: 1
        },
        {
            field: "contact",
            headerName: <p className={theme.palette.mode === "dark" ? "globalTableCss" : ""}>contact</p>,
            headerClassName: 'super-app-theme--header',
            sortable: false,
            flex: 1,
        },
        {
            field: "stateName",
            sortable: false,
            headerName: <p className={theme.palette.mode === "dark" ? "globalTableCss" : ""}>stateName</p>,
            headerClassName: 'super-app-theme--header',
            flex: 1
        },
        {
            field: "cityName",
            sortable: false,
            headerName: <p className={theme.palette.mode === "dark" ? "globalTableCss" : ""}>cityName</p>,
            headerClassName: 'super-app-theme--header',
            flex: 1
        },
        {
            field: "createdAt",
            sortable: false,
            headerName: <p className={theme.palette.mode === "dark" ? "globalTableCss" : ""}>createdAt</p>,
            headerClassName: 'super-app-theme--header',
            flex: 1.5,
            renderCell: (params) => (
                new Intl.DateTimeFormat("en-US", {
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit",
                    hour: "2-digit",
                    minute: "2-digit",
                }).format(params.row.createdAt)
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
            flex: 1.5,
            sortable: false,
            headerName: <p className={theme.palette.mode === "dark" ? "globalTableCss" : ""}>Action</p>,
            headerClassName: 'super-app-theme--header',
            renderCell: (params) => {
                return (
                    <>
                        <IconButton
                            aria-label="more"
                            id={params.row.id}
                            aria-controls={open ? "long-menu" : undefined}
                            aria-expanded={open ? "true" : undefined}
                            aria-haspopup="true"
                            style={{ color: 'black' }}

                        >
                            <FormControlLabel
                                checked={params.row.status}
                                value={params.row.status}
                                onChange={(e) => {
                                    handleClick(e, params.row);
                                }}
                                control={<IOSSwitch />}
                                label=""
                            />
                        </IconButton>
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
                        <Button className='hearder-right-btn create-organisation' onClick={createForm}>
                            Create Organisation
                        </Button>
                    </Grid>
                </Grid>
                <Box
                    m="40px 0 0 0"
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
                            color: "#ffb6b2",
                        },
                        "& .MuiDataGrid-columnHeaders": {
                            backgroundColor: "#ffb6b2",
                            fontWeight: "600",
                        },
                        "& .MuiDataGrid-virtualScroller": {
                            backgroundColor: "#fff",
                        },
                        "& .MuiCheckbox-root": {
                            color: `#ffb6b2 !important`,
                        },
                        "& .MuiDataGrid-row:hover": {
                            backgroundColor: "#f5f5f5 !important",
                            borderColor: "#d64a43",
                            // color: "red"
                        },
                        '& .super-app-theme--header': {
                            backgroundColor: '#ffb6b2',
                            color: 'black',
                        },
                        "& .MuiDataGrid-virtualScroller": {
                            backgroundColor: "#fff",
                        },
                        "& .MuiDataGrid-columnHeaderTitle": {
                            fontWeight: "600",
                        },
                        "& .MuiDataGrid-row": {
                            border: "1px solid #ffb6b2",
                            borderRadius: "5px",
                            backgroundColor: "#fff !important",
                            boxShadow: "0 0 10px 4px hsla(0,0%,96.1%,.3333333333333333) !important",
                            borderColor: "#ffb6b2",
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
                    <CreateFormModal handleClose={handleCloseModal} fetchOrganisationList={fetchOrganisationList} auth={auth} stateList={stateList} />
                </Dialog>
                <Dialog open={editFormModal} onClose={handleCloseModal}>
                    <EditFormModal handleClose={handleCloseModal} fetchOrganisationList={fetchOrganisationList} auth={auth} stateList={stateList} editTableData={editTableData} />
                </Dialog>
            </Card>
        </React.Fragment>
    )
};

export default AdminOrgnisationList;