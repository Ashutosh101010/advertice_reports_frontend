import React, { useContext, useEffect, useMemo, useState } from "react";
import { Card, Box, IconButton, Switch, styled, useTheme, FormControlLabel, Grid, Button, Dialog, Avatar, Stack, useMediaQuery, MenuItem, Select } from '@mui/material';
import { DataGrid } from "@mui/x-data-grid";
import Label from "../label/Label";
import { sentenceCase } from "change-case";
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';
import EditIcon from '@mui/icons-material/Edit';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { Link, useNavigate } from "react-router-dom";
import CircularProgress from '@mui/material/CircularProgress';
import AdverticeNetwork from "../../../Network";
import AuthContext from "../authContext/AuthContext";
import CreateFormModal from "./CreateOrganisationForm";
import EditFormModal from "./EditOrganisation";
import { Table, Row, Cell } from "react-sticky-table";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import moment from "moment";

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

const SuperAdminOrgnisationList = () => {

    const isMobile = useMediaQuery("(min-width:600px)");
    const theme = useTheme();
    const navigate = useNavigate();
    const [page, setPage] = useState(0);
    const [pageSize, setPageSize] = useState(25);
    const [rowCount, setRowCount] = useState(0);
    // const [switchChecked, setSwitchChecked] = useState(false);
    const [organisationList, setOrganisationList] = useState([]);
    const { auth, stateList } = useContext(AuthContext);
    const [createFormModal, setCreateFormModal] = useState(false);
    const [editFormModal, setEditFormModal] = useState(false);
    const [editTableData, setEditTableData] = useState({});

    useEffect(() => {
        fetchOrganisationList();
    }, [page, pageSize])

    const fetchOrganisationList = async () => {
        try {
            const body = {
                "page": page,
                "pageSize": pageSize
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

    const handleClick = async (e, data) => {
        e.stopPropagation();
        e.preventDefault();
        const response = await AdverticeNetwork.changeStatusApi(auth, data?.id);
        if (response?.errorCode === 0) {
            fetchOrganisationList();
        }
        // setSwitchChecked(e.target.checked);
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

    const handleEditTable = (e, data) => {
        e.stopPropagation();
        e.preventDefault();
        setEditTableData(data);
        setEditFormModal(true);
    }

    function handleSectionClick(e, value) {
        // e.preventDefault();
        // e.stopPropagation();
        navigate("/admin-organisation", { state: { orgId: e?.row?.id } });
    };

    const data = useMemo(() => organisationList, [organisationList]);


    const columns = useMemo(() => [
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
            field: "organisation",
            headerName: <p className={theme.palette.mode === "dark" ? "globalTableCss" : ""}>Organisation</p>,
            headerClassName: 'super-app-theme--header',
            sortable: false,
            renderCell: (params) => {
                return <p style={{ margin: "0px" }}><Link>{params.row.organisation}</Link></p>
            },
            flex: 1.5,
        },
        // {
        //     field: "domain",
        //     headerName: <p className={theme.palette.mode === "dark" ? "globalTableCss" : ""}>Domain</p>,
        //     headerClassName: 'super-app-theme--header',
        //     sortable: false,
        //     flex: 1.5,
        // },
        {
            field: "email",
            sortable: false,
            headerName: <p className={theme.palette.mode === "dark" ? "globalTableCss" : ""}>E-mail</p>,
            headerClassName: 'super-app-theme--header',
            flex: 1.5
        },
        {
            field: "address",
            sortable: false,
            headerName: <p className={theme.palette.mode === "dark" ? "globalTableCss" : ""}>Address</p>,
            headerClassName: 'super-app-theme--header',
            flex: 1
        },
        {
            field: "contact",
            headerName: <p style={{ marginLeft: isMobile ? 40 : 0 }}>Contact</p>,
            headerClassName: 'super-app-theme--header',
            sortable: false,
            flex: 1,
            renderCell: (params) => {
                return (
                    <p style={{ textAlign: 'center', margin: "0px 10px 10px 10px", }}>{params?.row?.contact ? params?.row?.contact : "N/A"}</p>
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
            renderCell: (params) => {
                return (
                    <p style={{ textAlign: 'center', margin: "0px 10px 10px 10px", }}>{params?.row?.createdAt ?
                        new Intl.DateTimeFormat("en-US", {
                            year: "numeric",
                            month: "2-digit",
                            day: "2-digit",
                            hour: "2-digit",
                            minute: "2-digit",
                        }).format(params.row?.createdAt)
                        : "N/A"}</p>
                )
            }
        },
        {
            field: "status",
            sortable: false,
            headerName: <p className={theme.palette.mode === "dark" ? "globalTableCss" : ""}>Status</p>,
            headerClassName: 'super-app-theme--header',
            renderCell: (params) => {
                return (
                    <Label
                        onClick={(e) => {
                            e.stopPropagation();
                            handleClick(e, params.row)
                        }}
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
                    <Stack direction={'row'} justifyContent={'flex-start'} alignItems={'center'}>
                        {/* <IconButton
                            aria-label="more"
                            id={params.row.id}
                            aria-controls={open ? "long-menu" : undefined}
                            aria-expanded={open ? "true" : undefined}
                            aria-haspopup="true"
                            style={{ color: 'black' }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <FormControlLabel
                                checked={params.row.status}
                                value={params.row.status}
                                control={<IOSSwitch />}
                                label=""
                                onChange={(e) => {
                                    e.stopPropagation();
                                    handleClick(e, params.row);
                                }}
                            />
                        </IconButton> */}
                        <IconButton
                            aria-label="more"
                            onClick={(e) => {
                                e.stopPropagation();
                                handleEditTable(e, params.row)
                            }}
                        >
                            <EditIcon />
                        </IconButton>
                    </Stack>
                );
            },
        }
    ], []);

    const startIndex = page * pageSize; // Page starts from 0

    // const totalRow = {
    //     date: "Total",
    //     title: "",
    //     impressions: "totalImpressions",
    //     clicks: 'totalClicks',
    //     ctr: "0",
    //     currency: "",
    //     mediaCost: 'totalMediaCost',
    //     cpm: "",
    //     cpc: "",
    // };

    return (
        <React.Fragment>
            <Card className="card">
                <Grid container>
                    <Grid item xs={12} sm={12} md={12} lg={12} sx={{ textAlign: "end" }}>
                        <Button
                            className='hearder-right-btn create-organisation'
                            onClick={createForm}
                            sx={{
                                fontFamily: `"Poppins", sans-serif`,
                                fontSize: '16px',
                            }}
                        >
                            Create Organisation
                        </Button>
                    </Grid>
                </Grid>
                <div style={{ height: "70vh", display: "flex", flexDirection: "column", position: "relative" }}>
                    {/* Table with Scrollable Rows */}
                    <div style={{ flex: 1, overflowY: "auto", border: "1px solid #ddd", marginBottom: "0px" }}>
                        <Table style={{ width: '100%', borderCollapse: "collapse" }}>
                            {/* Header Row */}
                            <Row className="table-header" style={{
                                background: "#ffb6b2",
                                // fontWeight: "bold",
                                position: "sticky",
                                top: 0,
                                zIndex: 10,
                                borderBottom: "2px solid #ddd", // Border for header,
                                // textAlign: "center",
                            }}>
                                <Cell></Cell>
                                {/* <Cell>Title</Cell>
                                <Cell style={{ textAlign: 'center' }}>Impressions</Cell> */}
                                <Cell style={{ textAlign: 'start' }}>Organisation</Cell>
                                <Cell style={{ textAlign: 'start' }}>E-Mail</Cell>
                                <Cell style={{ textAlign: 'start' }}>Address</Cell>
                                <Cell style={{ textAlign: 'center' }}>Contact</Cell>
                                <Cell style={{ textAlign: 'center' }}>CreatedAt</Cell>
                                <Cell style={{ textAlign: 'center' }}>Status</Cell>
                                <Cell style={{ textAlign: 'center' }}>Action</Cell>
                            </Row>

                            {/* Paginated Rows */}
                            {organisationList.map((row, index) => (
                                <Row key={index} className="table-row" style={{
                                    borderBottom: "1px solid #ddd", color: "#637381", padding: "12px 8px",
                                }}>
                                    <Cell><PriorityHighIcon sx={{ background: "orange", padding: "1px", borderRadius: "4px", color: "#fff", mt: 1.5 }} /></Cell>
                                    {/* <Cell style={{ color: "#0061ff" }}>{row?.title}</Cell>
                                    <Cell style={{ textAlign: 'center' }}>{row?.impressions?.toLocaleString("en-IN")}</Cell> */}
                                    <Cell style={{ textAlign: 'start' }}>{row?.organisation ? row?.organisation : "N/A"}</Cell>
                                    <Cell style={{ textAlign: 'start' }}>{row?.email ? row?.email : "N/A"}</Cell>
                                    <Cell style={{ textAlign: 'start' }}>{row?.address ? row?.address : "N/A"}</Cell>
                                    <Cell style={{ textAlign: 'center' }}>{row?.contact ? row?.contact : "N/A"}</Cell>
                                    <Cell style={{ textAlign: 'center' }}>
                                        {row?.createdAt ?
                                            new Intl.DateTimeFormat("en-US", {
                                                year: "numeric",
                                                month: "2-digit",
                                                day: "2-digit",
                                                hour: "2-digit",
                                                minute: "2-digit",
                                            }).format(row?.createdAt)
                                            : "N/A"}
                                    </Cell>
                                    <Cell style={{ textAlign: 'center' }}>
                                        <Label
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleClick(e, row)
                                            }}
                                            color={
                                                (row.status === true &&
                                                    "success") ||
                                                "error"
                                            }
                                        >
                                            {sentenceCase(
                                                row.status === true
                                                    ? "Active"
                                                    : "Paused"
                                            )}
                                        </Label>
                                    </Cell>
                                    <Cell style={{ textAlign: 'center' }}>
                                        <Stack direction={'row'} justifyContent={'center'} alignItems={'center'}>
                                            {/* <IconButton
                            aria-label="more"
                            id={params.row.id}
                            aria-controls={open ? "long-menu" : undefined}
                            aria-expanded={open ? "true" : undefined}
                            aria-haspopup="true"
                            style={{ color: 'black' }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <FormControlLabel
                                checked={params.row.status}
                                value={params.row.status}
                                control={<IOSSwitch />}
                                label=""
                                onChange={(e) => {
                                    e.stopPropagation();
                                    handleClick(e, params.row);
                                }}
                            />
                        </IconButton> */}
                                            <IconButton
                                                aria-label="more"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleEditTable(e, row)
                                                }}
                                            >
                                                <EditIcon />
                                            </IconButton>
                                        </Stack>
                                    </Cell>
                                </Row>
                            ))}
                            {/* <Row className="sticky-row" style={{
                                background: "#ffb6b2",
                                // fontWeight: "bold",
                                position: "sticky",
                                bottom: "10px",
                                zIndex: 10,
                                borderTop: "2px solid #ddd",
                            }}>
                                <Cell style={{ textAlign: 'start' }}>{totalRow.date}</Cell>
                                <Cell style={{ textAlign: 'center' }}>{totalRow.title}</Cell>
                                <Cell style={{ textAlign: 'center' }}>{totalRow.impressions.toLocaleString("en-IN")}</Cell>
                                <Cell style={{ textAlign: 'center' }}>{totalRow.clicks.toLocaleString("en-IN")}</Cell>
                                <Cell style={{ textAlign: 'center' }}>{parseFloat(totalRow.ctr).toFixed(2)}%</Cell>
                                <Cell style={{ textAlign: 'center' }}>{totalRow.currency}</Cell>
                                <Cell style={{ textAlign: 'center' }}>{totalRow.mediaCost.toLocaleString("en-IN")}</Cell>
                                <Cell style={{ textAlign: 'center' }}>{totalRow.cpm}</Cell>
                                <Cell style={{ textAlign: 'center' }}>{totalRow.cpc}</Cell>
                            </Row> */}
                        </Table>
                    </div>
                    <div style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "end",
                        padding: "10px",
                        // position: "absolute",
                        // bottom: 0,
                        // left: 0,
                        // right: 0,
                        background: "#fff",
                    }}>
                        <Select
                            sx={{ fontSize: "10px" }}
                            value={pageSize}
                            onChange={(e) => setPageSize(e.target.value)}
                            size="small"
                        >
                            <MenuItem value={10}>10</MenuItem>
                            <MenuItem value={15}>15</MenuItem>
                            <MenuItem value={25}>25</MenuItem>
                            <MenuItem value={50}>50</MenuItem>
                        </Select>
                        <span style={{ color: "#000", marginLeft: "15px", marginRight: "15px", fontSize: "12px" }}>
                            {startIndex + 1} - {Math.min(startIndex + pageSize, rowCount)} of {rowCount}
                        </span>
                        <div>
                            <IconButton
                                onClick={() => setPage(page - 1)}
                                disabled={page === 0}
                                style={{ color: page === 0 ? "#aaa" : "#000" }}
                            >
                                <ArrowBackIosIcon fontSize={'small'} sx={{ fontSize: "15px" }} />
                            </IconButton>

                            <IconButton
                                onClick={() => setPage(page + 1)}
                                disabled={startIndex + pageSize >= rowCount}
                                style={{ color: startIndex + pageSize >= rowCount ? "#aaa" : "#000" }}
                            >
                                <ArrowForwardIosIcon fontSize={'small'} sx={{ fontSize: "15px" }} />
                            </IconButton>
                        </div>
                    </div>
                </div>
                {/* <Box
                    // m="10px 0 0 0"
                    // height="75vh"
                    sx={{
                        // '.MuiDataGrid-root .MuiDataGrid-cell:focus-within': {
                        //     outline: 'none !important'
                        // },
                        // '& > .MuiDataGrid-columnSeparator': {
                        //     visibility: 'hidden',
                        // },
                        height: "calc(100vh - 100px)", // Adjust based on your layout
                        width: "100%",
                        overflow: "hidden", // No outer scrollbars
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
                            overflowX: "hidden !important", // Prevent horizontal flicker
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
                            backgroundColor: '#b2c3ff',
                            color: 'black',
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
                        disableVirtualization
                        // rowHeight={52} // or whatever your average height is
                        // headerHeight={56}
                        columnBuffer={2}
                        rowBuffer={5}
                        rows={data}
                        getRowId={(row) => row?.id}
                        columns={columns}
                        rowCount={rowCount}
                        paginationMode="server"
                        page={page}
                        onPageChange={handlePageChange}
                        pageSize={pageSize}
                        onPageSizeChange={handlePageSizeChange}
                        rowsPerPageOptions={[25, 50, 100]}
                        pagination
                        onCellClick={handleSectionClick}
                        disableColumnMenu
                        disableColumnFilter
                        disableColumnSelector
                        autoHeight={false}
                        sx={{
                            "& .MuiDataGrid-columnHeader .MuiDataGrid-columnSeparator": {
                                display: "none",
                            },
                        }}
                    />
                </Box> */}
                <Dialog open={createFormModal} onClose={handleCloseModal}
                    sx={{
                        "& .MuiDialog-paper": {
                            width: "100%",
                            maxWidth: "450px",
                        },
                    }}
                >
                    <CreateFormModal handleClose={handleCloseModal} fetchOrganisationList={fetchOrganisationList} auth={auth} stateList={stateList} />
                </Dialog>
                <Dialog open={editFormModal} onClose={handleCloseModal}
                    sx={{
                        "& .MuiDialog-paper": {
                            width: "100%",
                            maxWidth: "450px",
                        },
                    }}
                >
                    <EditFormModal handleClose={handleCloseModal} fetchOrganisationList={fetchOrganisationList} auth={auth} stateList={stateList} editTableData={editTableData} />
                </Dialog>

            </Card>
        </React.Fragment>
    )
};

export default SuperAdminOrgnisationList;