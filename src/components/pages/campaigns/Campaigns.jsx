import React, { useContext, useEffect, useRef, useState } from "react";
import { Card, Box, IconButton, Switch, styled, useTheme, FormControlLabel, Dialog, Grid, Button, FormControl, InputLabel, Select, MenuItem, useMediaQuery } from '@mui/material';
import { DataGrid } from "@mui/x-data-grid";
import Label from "../label/Label";
import { sentenceCase } from "change-case";
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';
import EditIcon from '@mui/icons-material/Edit';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { Link } from "react-router-dom";
import CircularProgress from '@mui/material/CircularProgress';
import CreateCampaignFormModal from "./CreateCampaignForm";
import AuthContext from "../authContext/AuthContext";
import AdverticeNetwork from "../../../Network";
import EditCampaignFormModal from "./EditCampaign";
import ImportCampaignCsv from "./ImportCampaign";
import Papa from "papaparse"

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

const Campaigns = () => {

    const theme = useTheme();
    const isMobile = useMediaQuery("(min-width:600px)");
    const organisationId = localStorage.getItem("organizationId");
    const userType = localStorage.getItem("userType");
    const [page, setPage] = useState(0);
    const [pageSize, setPageSize] = useState(25);
    const [rowCount, setRowCount] = useState(0);
    const [switchChecked, setSwitchChecked] = useState(true);
    const [createFormModal, setCreateFormModal] = useState(false);
    const [editFormModal, setEditFormModal] = useState(false);
    const { auth } = useContext(AuthContext);
    const [editTableData, setEditTableData] = useState({});
    const [campaignList, setCampaignList] = useState([]);
    const [importModal, setImportModal] = useState(false);
    const [organisationList, setOrganisationList] = useState([]);
    const [selectOrgnigation, setSelectOrgnigation] = useState('');

    // console.log('organisationList', organisationList, selectOrgnigation);

    useEffect(() => {
        if (userType === "superadmin") {
            fetchOrganisationList();
        }
    }, [userType])
    useEffect(() => {
        const body = {
            "page": page,
            "pageSize": pageSize,
            "organizationId": selectOrgnigation?.id,
        }
        if (organisationList?.length > 0) {
            setSelectOrgnigation(organisationList[0])
            fetchCampaignList(body, false);
        } else {
            fetchCampaignList(body, false);
        }
    }, [organisationList])

    const fetchCampaignList = async (body, isExport = false) => {
        try {
            if (isExport) {
                body.export = true; // Add export flag only for export
            }

            const response = await AdverticeNetwork.fetchCampaignApi(body, auth);
            if (response.errorCode === 0) {
                setCampaignList(response.campaigns);
                setRowCount(response.count);
                if (isExport) {
                    generateCSV(response.campaigns); // Call CSV generation function
                }
            }
        } catch (error) {
            console.log(error);
        }
    }

    const fetchOrganisationList = async () => {
        try {
            const body = {
                "allActive": true,
                "page": 1,
                "pageSize": 1
            }
            const response = await AdverticeNetwork.fetchSuperAdminOrganisationApi(body, auth);
            if (response.errorCode === 0) {
                setOrganisationList(response.organisations);
                setRowCount(response.count)
            }
        } catch (error) {
            console.log(error);
        }
    }

    const handleClick = (event) => {
        event.stopPropagation();
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
        setImportModal(false)
    }
    const handleEditTable = (data) => {
        setEditTableData(data);
        setEditFormModal(true);
    }

    const ImportCampaign = () => {
        setImportModal(true)
    }

    const generateCSV = (data) => {
        if (!data || data.length === 0) {
            console.warn("No data available for export.");
            return;
        }

        // Format data for CSV
        const csvData = data.map(item => ({
            Date: new Date(item.date).toLocaleDateString("en-GB"), // Convert date to DD-MM-YYYY
            Title: item.title,
            Clicks: item.clicks,
            Conversions: item.conversions,
            CPA: item.cpa,
            CPC: item.cpc,
            CPM: item.cpm,
            CTR: item.ctr,
            Impressions: item.impressions,
            MediaCost: `${item.currency}${item.mediaCost.toFixed(2)}`, // Format currency
        }));

        // Convert to CSV using PapaParse
        const csv = Papa.unparse(csvData);

        // Create a Blob and trigger download
        const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "Campaign_Report.csv");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const handleExport = async() => {
      const body = {
            page: page,
            pageSize: pageSize,
            organizationId: selectOrgnigation?.id,
        };

        await fetchCampaignList(body, true);
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, "0");
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const year = date.getFullYear();
        return `${day}-${month}-${year}`;
    };

    function handleSelectOrgnigation(event) {
        setSelectOrgnigation(event.target.value);
    };

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
            field: "title",
            headerName: <p className={theme.palette.mode === "dark" ? "globalTableCss" : ""}>Campaign</p>,
            headerClassName: 'super-app-theme--header',
            sortable: false,
            renderCell: (params) => {
                return <p style={{ margin: "0px" }}><Link>{params.row.title}</Link></p>
            },
            flex: 2,
        },
        {
            field: "impressions",
            headerName: <p className={theme.palette.mode === "dark" ? "globalTableCss" : ""}>Impressions</p>,
            headerClassName: 'super-app-theme--header',
            sortable: false,
            flex: 1,
        },
        {
            field: "clicks",
            sortable: false,
            headerName: <p className={theme.palette.mode === "dark" ? "globalTableCss" : ""}>Clicks</p>,
            headerClassName: 'super-app-theme--header',
            flex: 1
        },
        {
            field: "ctr",
            sortable: false,
            headerName: <p className={theme.palette.mode === "dark" ? "globalTableCss" : ""}>CTR</p>,
            headerClassName: 'super-app-theme--header',
            flex: 1
        },
        // {
        //     field: "dailyCap",
        //     headerName: <p className={theme.palette.mode === "dark" ? "globalTableCss" : ""}>Daily Cap</p>,
        //     headerClassName: 'super-app-theme--header',
        //     sortable: false,
        //     flex: 1,
        // },
        // {
        //     field: "todayCost",
        //     sortable: false,
        //     headerName: <p className={theme.palette.mode === "dark" ? "globalTableCss" : ""}>Today's Cost</p>,
        //     headerClassName: 'super-app-theme--header',
        //     flex: 1
        // },
        {
            field: "currency",
            sortable: false,
            headerName: <p className={theme.palette.mode === "dark" ? "globalTableCss" : ""}>Currency</p>,
            headerClassName: 'super-app-theme--header',
            flex: 1
        },
        {
            field: "mediaCost",
            sortable: false,
            headerName: <p className={theme.palette.mode === "dark" ? "globalTableCss" : ""}>Media Cost</p>,
            headerClassName: 'super-app-theme--header',
            flex: 1
        },
        {
            field: "cpm",
            sortable: false,
            headerName: <p className={theme.palette.mode === "dark" ? "globalTableCss" : ""}>eCPM</p>,
            headerClassName: 'super-app-theme--header',
            flex: 1
        },
        {
            field: "cpc",
            sortable: false,
            headerName: <p className={theme.palette.mode === "dark" ? "globalTableCss" : ""}>eCPC</p>,
            headerClassName: 'super-app-theme--header',
            flex: 1
        },
        // {
        //     field: "progress",
        //     sortable: false,
        //     headerName: <p className={theme.palette.mode === "dark" ? "globalTableCss" : ""}>Progress</p>,
        //     headerClassName: 'super-app-theme--header',
        //     flex: 1,
        //     renderCell: (params) => {
        //         return <CircularProgress variant="determinate" value={params.row.progress} sx={{ mt: 0.8 }} />
        //     },

        // },
        // {
        //     field: "status",
        //     sortable: false,
        //     headerName: <p className={theme.palette.mode === "dark" ? "globalTableCss" : ""}>Status</p>,
        //     headerClassName: 'super-app-theme--header',
        //     renderCell: (params) => {
        //         return (
        //             <Label
        //                 color={
        //                     (params.row.status === true &&
        //                         "success") ||
        //                     "error"
        //                 }
        //             >
        //                 {sentenceCase(
        //                     params.row.status === true
        //                         ? "Active"
        //                         : "Paused"
        //                 )}
        //             </Label>
        //         );
        //     },
        //     flex: 1
        // },
        // {
        //     field: "adminStatus",
        //     sortable: false,
        //     headerName: <p className={theme.palette.mode === "dark" ? "globalTableCss" : ""}>Admin Status</p>,
        //     headerClassName: 'super-app-theme--header',
        //     renderCell: (params) => {
        //         return (
        //             <Label
        //                 color={
        //                     (params.row.adminStatus === true &&
        //                         "success") ||
        //                     "error"
        //                 }
        //             >
        //                 {sentenceCase(
        //                     params.row.adminStatus === true
        //                         ? "Active"
        //                         : "Pending"
        //                 )}
        //             </Label>
        //         );
        //     },
        //     flex: 1
        // },
        // {
        //     field: "action",
        //     flex: 1,
        //     sortable: false,
        //     headerName: <p className={theme.palette.mode === "dark" ? "globalTableCss" : ""}>Action</p>,
        //     headerClassName: 'super-app-theme--header',
        //     renderCell: (params) => {
        //         return (
        //             <>
        //                 {/* <IconButton
        //                     aria-label="more"
        //                     id={params.row.id}
        //                     aria-controls={open ? "long-menu" : undefined}
        //                     aria-expanded={open ? "true" : undefined}
        //                     aria-haspopup="true"
        //                     style={{ color: 'black' }}

        //                 >
        //                     <FormControlLabel
        //                         sx={{ marginRight: 0 }}
        //                         checked={switchChecked}
        //                         value={switchChecked}
        //                         onChange={(e) => {
        //                             handleClick(e);
        //                         }}
        //                         control={<IOSSwitch />}
        //                         label=""
        //                     />
        //                 </IconButton> */}
        //                 <IconButton
        //                     aria-label="more"
        //                     onClick={() => handleEditTable(params.row)}
        //                 >
        //                     <EditIcon />
        //                 </IconButton>
        //                 {/* <IconButton
        //                     aria-label="more"
        //                 >
        //                     <ContentCopyIcon />
        //                 </IconButton> */}
        //             </>
        //         );
        //     },
        // }
    ];


    return (
        <React.Fragment>
            <Card className="card">
                <Grid container>
                    <Grid item xs={12} sm={4} md={4} lg={4} sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
                        {
                            userType === "superadmin" && (
                                <FormControl sx={{ textAlign: "start", width: '100%' }}>
                                    <InputLabel id="state-label" sx={{ fontFamily: `"Poppins", sans-serif` }}>Organisation</InputLabel>
                                    <Select
                                        value={selectOrgnigation}
                                        label="Organisation"
                                        labelId='state-label'
                                        onChange={handleSelectOrgnigation}
                                        sx={{ width: '100%' }}
                                        disableUnderline
                                    >
                                        {organisationList.map((item) => {
                                            return (
                                                <MenuItem value={item} key={item.id}>
                                                    {item.organisation}
                                                </MenuItem>
                                            );
                                        })}
                                    </Select>
                                </FormControl>
                            )
                        }
                    </Grid>
                    <Grid item xs={12} sm={8} md={8} lg={8} sx={{ display: "flex", justifyContent: 'flex-end' }}>
                        {
                            userType === "superadmin" ? <Button
                                sx={{
                                    width: '100%',
                                    maxWidth: '200px',
                                    fontFamily: `"Poppins", sans-serif`,
                                    fontSize: '16px',
                                }}
                                className='hearder-right-btn create-organisation'
                                onClick={ImportCampaign}>
                                Import Campaign
                            </Button>
                                : <Button
                                    sx={{
                                        width: '100%',
                                        maxWidth: '200px',
                                        fontFamily: `"Poppins", sans-serif`,
                                        fontSize: '16px',
                                    }}
                                    className='hearder-right-btn create-organisation'
                                    onClick={handleExport}>
                                    Export Campaign
                                </Button>
                        }

                        {/* <Button
                            sx={{
                                width: '100%',
                                maxWidth: '300px',
                                fontFamily: `"Poppins", sans-serif`,
                                fontSize: '16px',
                            }}
                            className='hearder-right-btn create-organisation'
                            onClick={createForm}>
                            Create Campaign
                        </Button> */}
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
                            color: "#ffb6b2",
                        },
                        "& .MuiDataGrid-columnHeaders": {
                            backgroundColor: "#ffb6b2",
                            fontWeight: "500",
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
                        "& .MuiDataGrid-columnHeaderTitle": {
                            fontWeight: "500",
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
                        rows={campaignList}
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
                <Dialog open={createFormModal} onClose={handleCloseModal}
                    sx={{
                        "& .MuiDialog-paper": {
                            width: "100%",
                            maxWidth: "500px",
                        },
                    }}
                >
                    <CreateCampaignFormModal handleClose={handleCloseModal} fetchCampaignList={fetchCampaignList} auth={auth} organisationId={organisationId} userType={userType} organisationList={organisationList} />
                </Dialog>
                <Dialog open={editFormModal} onClose={handleCloseModal}
                    sx={{
                        "& .MuiDialog-paper": {
                            width: "100%",
                            maxWidth: "500px",
                        },
                    }}
                >
                    <EditCampaignFormModal handleClose={handleCloseModal} fetchCampaignList={fetchCampaignList} auth={auth} editTableData={editTableData} />
                </Dialog>
                <Dialog open={importModal} onClose={handleCloseModal}>
                    <ImportCampaignCsv organisationId={organisationId} handleClose={handleCloseModal} fetchCampaignList={fetchCampaignList} auth={auth} selectOrgnigation={selectOrgnigation} />
                </Dialog>
            </Card>
        </React.Fragment>
    )
};

export default Campaigns;