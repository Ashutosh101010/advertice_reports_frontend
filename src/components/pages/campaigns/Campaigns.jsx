import React, { useEffect, useState } from "react";
import { Card, Box, useTheme, Dialog, Grid, Button, FormControl, InputLabel, Select, MenuItem, useMediaQuery, Tooltip, IconButton, Menu, Stack, Checkbox, ListItemText } from '@mui/material';
import { DataGrid } from "@mui/x-data-grid";
// import Label from "../label/Label";
// import { sentenceCase } from "change-case";
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';
// import EditIcon from '@mui/icons-material/Edit';
// import ContentCopyIcon from '@mui/icons-material/ContentCopy';
// import { Link } from "react-router-dom";
// import CircularProgress from '@mui/material/CircularProgress';
import CreateCampaignFormModal from "./CreateCampaignForm";
// import AuthContext from "../authContext/AuthContext";
import AdverticeNetwork from "../../../Network";
import EditCampaignFormModal from "./EditCampaign";
import ImportCampaignCsv from "./ImportCampaign";
import Papa from "papaparse"
import '../../../index.css'
import moment from "moment";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Table, Row, Cell } from "react-sticky-table";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const options = ["Edit",];

const ITEM_HEIGHT = 48;

const Campaigns = () => {

    const theme = useTheme();
    const isMobile = useMediaQuery("(min-width:600px)");
    const organisationId = localStorage.getItem("organizationId");
    const userType = localStorage.getItem("userType");
    const [page, setPage] = useState(0);
    const [pageSize, setPageSize] = useState(25);
    const [rowCount, setRowCount] = useState(0);
    // const [switchChecked, setSwitchChecked] = useState(true);
    const [createFormModal, setCreateFormModal] = useState(false);
    const [editFormModal, setEditFormModal] = useState(false);
    // const { auth } = useContext(AuthContext);
    const auth = localStorage.getItem("accessToken");
    const [editTableData, setEditTableData] = useState({});
    const [campaignList, setCampaignList] = useState([]);
    const [importModal, setImportModal] = useState(false);
    const [organisationList, setOrganisationList] = useState([]);
    const [selectOrgnigation, setSelectOrgnigation] = useState('');
    const [anchorEl, setAnchorEl] = useState(null);
    // const open = Boolean(anchorEl);
    const startIndex = page * pageSize; // Page starts from 0
    // const displayedData = campaignList.slice(startIndex, startIndex + pageSize);
    // const [platformList, setPlatformList] = useState([]);
    // const [selectPlatform, setSelectPlatform] = useState([]);
    // const [countryList, setCountryList] = useState([]);
    // const [selectCountry, setSelectCountry] = useState([]);
    const [selectCampaign, setSelectCampaign] = useState('');
    // const [campiagnNameList, setCampiagnNameList] = useState([]);

    // const handleSlectCampaign = (e) => {
    //     setSelectCampaign(e.target.value);
    // };

    // const handleSelectPlatfrom = (event) => {
    //     const {
    //         target: { value },
    //     } = event;

    //     // On autofill we get a stringified value, so handle that:
    //     setSelectPlatform(typeof value === 'string' ? value.split(',') : value);
    // };

    // const handleSelectCountry = (event) => {
    //     const {
    //         target: { value },
    //     } = event;

    //     // On autofill we get a stringified value, so handle that:
    //     setSelectCountry(typeof value === 'string' ? value.split(',') : value);
    // };


    // console.log('organisationList', organisationList, selectOrgnigation);

    // const handleClose = (option) => {
    //     setAnchorEl(null);
    //     if (option === 'Edit') {
    //         setEditFormModal(true);
    //     } else if (option === 'Delete') {
    //         // handleDelete(editAdmitCard?.id);
    //     };
    // };

    // const handleDelete = async (id) => {
    //     try {
    //         const response = await AdverticeNetwork.deleteCampaignAPI(auth, id);
    //         if (response.errorCode === 0) {
    //             fetchCampaignList();
    //             // handleClose();
    //         }
    //     } catch (error) {
    //         console.log(error);
    //     };
    // }

    // const handleClick = (event, row) => {
    //     setAnchorEl(event.currentTarget);
    //     setEditTableData(row);
    // };

    useEffect(() => {
        if (userType === "superadmin") {
            fetchOrganisationList();
        }
    }, [userType])

    useEffect(() => {
        if (userType === "admin") {
            fetchCampaignList();
        }
    }, [userType]);

    function handleOrganisation(event) {
        setSelectOrgnigation(event.target.value);
    };

    useEffect(() => {
        if (organisationList?.length > 0) {
            setSelectOrgnigation(organisationList[0])
        }
    }, [organisationList])

    useEffect(() => {
        if (userType === "superadmin" && selectOrgnigation?.id) {

            fetchCampaignList();
        }
    }, [selectOrgnigation, userType, page, pageSize, selectCampaign])

    const fetchCampaignList = async (isExport = false) => {

        const body = {
            "page": page,
            "pageSize": pageSize,
            "group": true,
            // "platform": selectPlatform,
            // "country": selectCountry,
            // "organizationId": selectOrgnigation?.id,
            "campaignName": selectCampaign
        }
        if (userType === "superadmin") {
            body.organizationId = selectOrgnigation?.id
        }
        try {
            if (isExport) {
                body.export = true; // Add export flag only for export
            }

            const response = await AdverticeNetwork.fetchCampaignApi(body, auth);
            if (response.errorCode === 0) {
                setCampaignList(response.campaigns);
                setRowCount(response.count === 0 ? response?.campaigns.length : response.count);
                // setPlatformList(response.platformNames);
                // setCountryList(response.countryNames);
                // setCampiagnNameList(response.campaignNames);
                if (isExport) {
                    generateCSV(response.campaigns);
                }
            }
        } catch (error) {
            console.log(error);
        }
    };

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
        };
    };

    // const handleClick = (event) => {
    //     event.stopPropagation();
    //     setSwitchChecked(event.target.checked)
    // };

    // function handlePageChange(newPage) {
    //     setPage(newPage);
    // };

    // function handlePageSizeChange(newPageSize) {
    //     setPageSize(newPageSize);
    // };

    // const createForm = () => {
    //     setCreateFormModal(true);
    // }

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

        const csvData = data.map(item => ({
            Date: new Date(item.date).toLocaleDateString("en-GB"),
            Title: item.title,
            Clicks: item.clicks,
            Conversions: item.conversions,
            CPA: item.cpa,
            CPC: item.cpc,
            CPM: item.cpm,
            "CTR%": item.ctr,
            Currency: item?.currency,
            Impressions: item.impressions,
            MediaCost: `${item.mediaCost.toFixed(2)}`,
            "StartDate": new Date(item?.startDate).toLocaleDateString("en-GB"),
            "EndDate": new Date(item?.endDate).toLocaleDateString("en-GB"),
            "countryNames": item?.countryNames,
            "platformNames": item?.platformNames,
            "lead": item?.leads,
            "reach": item?.reach
        }));

        // Start Date , End Date , PLatform, Country, Lead , Reach

        const csv = Papa.unparse(csvData);

        const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "Campaign_Report.csv");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    // const handleExport = async () => {
    //     const body = {
    //         page: page,
    //         pageSize: pageSize,
    //         organizationId: selectOrgnigation?.id,
    //     };

    //     await fetchCampaignList(body, true);
    // };

    // const formatDate = (dateString) => {
    //     const date = new Date(dateString);
    //     const day = String(date.getDate()).padStart(2, "0");
    //     const month = String(date.getMonth() + 1).padStart(2, "0");
    //     const year = date.getFullYear();
    //     return `${day}-${month}-${year}`;
    // };

    // function handleSelectOrgnigation(event) {
    //     setSelectOrgnigation(event.target.value);
    // };

    // const daysBetween = (start, end) => {
    //     const startDate = new Date(start);
    //     const endDate = new Date(end);
    //     const diffTime = endDate.getTime() - startDate.getTime();
    //     const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    //     return diffDays;
    // };

    // const columns = [
    //     // {
    //     //     field: "date",
    //     //     sortable: false,
    //     //     headerName: <p className={theme.palette.mode === "dark" ? "globalTableCss" : ""}>Date</p>,
    //     //     headerClassName: 'super-app-theme--header',
    //     //     flex: 1,
    //     //     renderCell: (params) => {
    //     //         return <p style={{ margin: "0px 10px 10px 0px" }}>{params?.row?.date === null ? "-" : moment(params?.row?.date).format('YYYY-MM-DD')}</p>
    //     //     },
    //     // },
    //     {
    //         field: "title",
    //         headerName: <p className={theme.palette.mode === "dark" ? "globalTableCss" : ""} style={{ textAlign: 'center', fontSize: '12px' }}>Campaign Name</p>,
    //         headerClassName: 'super-app-theme--header',
    //         sortable: false,
    //         renderCell: (params) => {
    //             return <Tooltip title={params.row.title} placement="top" arrow>
    //                 <p style={{ margin: "0px", color: "#00f" }}>{params.row.title}</p>
    //             </Tooltip>
    //         },
    //         flex: 1,
    //     },
    //     {
    //         field: "buyType",
    //         sortable: false,
    //         headerName: <p className={theme.palette.mode === "dark" ? "globalTableCss" : ""} style={{ fontSize: '12px' }}>Buy Type</p>,
    //         headerClassName: 'super-app-theme--header',
    //         flex: 0.7,
    //         renderCell: (params) => {
    //             return <p style={{ margin: "0px 10px 10px 0px" }}>{params?.row?.buyType === null ? "-" : params?.row?.buyType}</p>
    //         },
    //     },
    //     {
    //         field: "impressions",
    //         headerName: <p style={{ marginLeft: isMobile ? 10 : 0, fontSize: '12px' }}>Impressions</p>,
    //         headerClassName: 'super-app-theme--header',
    //         sortable: false,
    //         flex: 1,
    //         renderCell: (params) => {
    //             return <p style={{ margin: "0px 10px 10px 10px", textAlign: "center" }}>{params.row.impressions.toLocaleString("en-IN")}</p>
    //         },
    //     },
    //     {
    //         field: "clicks",
    //         sortable: false,
    //         headerName: <p style={{ marginLeft: isMobile ? 5 : 0, fontSize: '12px' }}>Clicks</p>,
    //         headerClassName: 'super-app-theme--header',
    //         flex: 0.8,
    //         renderCell: (params) => {
    //             return <p style={{ margin: "0px 10px 10px 10px" }}>{params.row.clicks.toLocaleString("en-IN")}</p>
    //         },
    //     },
    //     {
    //         field: "ctr",
    //         sortable: false,
    //         headerName: <p style={{ marginLeft: isMobile ? 5 : 0, fontSize: '12px' }}>CTR %</p>,
    //         headerClassName: 'super-app-theme--header',
    //         flex: 0.7,
    //         renderCell: (params) => {
    //             return <p style={{ margin: "0px 10px 10px 10px", }}>{((params.row?.clicks / params.row?.impressions) * 100)?.toFixed(2)}</p>
    //         },
    //     },
    //     {
    //         field: "reach",
    //         sortable: false,
    //         headerName: <p className={theme.palette.mode === "dark" ? "globalTableCss" : ""} style={{ fontSize: '12px' }}>Reach</p>,
    //         headerClassName: 'super-app-theme--header',
    //         flex: 0.6
    //     },
    //     {
    //         field: "leads",
    //         headerName: <p className={theme.palette.mode === "dark" ? "globalTableCss" : ""} style={{ fontSize: '12px' }}>Leads</p>,
    //         headerClassName: 'super-app-theme--header',
    //         sortable: false,
    //         flex: 0.6,
    //     },
    //     {
    //         field: "country",
    //         sortable: false,
    //         headerName: <p className={theme.palette.mode === "dark" ? "globalTableCss" : ""} style={{ fontSize: '12px' }}>Country Name</p>,
    //         headerClassName: 'super-app-theme--header',
    //         flex: 1,
    //         renderCell: (params) => {
    //             return <p style={{ margin: "0px 10px 10px 0px" }}>{params?.row?.country === null ? "-" : params?.row?.country}</p>
    //         },
    //     },
    //     {
    //         field: "platform",
    //         sortable: false,
    //         headerName: <p className={theme.palette.mode === "dark" ? "globalTableCss" : ""} style={{ fontSize: '12px' }}>Platform Name</p>,
    //         headerClassName: 'super-app-theme--header',
    //         flex: 0.9,
    //         renderCell: (params) => {
    //             return <p style={{ margin: "0px 10px 10px 0px" }}>{params?.row?.platform === null ? "-" : params?.row?.platform}</p>
    //         },
    //     },

    //     // {
    //     //     field: "mediaCost",
    //     //     sortable: false,
    //     //     headerName: <p style={{ marginLeft: isMobile ? 10 : 0 }}>Media Cost</p>,
    //     //     headerClassName: 'super-app-theme--header',
    //     //     flex: 1,
    //     //     renderCell: (params) => {
    //     //         return <p style={{ margin: "0px 10px 10px 10px", textAlign: "center" }}>{params.row.mediaCost.toLocaleString("en-IN")}</p>
    //     //     },
    //     // },

    //     // {
    //     //     field: "cpm",
    //     //     sortable: false,
    //     //     headerName: <p className={theme.palette.mode === "dark" ? "globalTableCss" : ""}>eCPM</p>,
    //     //     headerClassName: 'super-app-theme--header',
    //     //     flex: 1,
    //     //     renderCell: (params) => {
    //     //         return <p style={{ margin: "0px 10px 10px 0px" }}>{params.row.cpm.toLocaleString("en-IN")}</p>
    //     //     },
    //     // },
    //     // {
    //     //     field: "cpc",
    //     //     sortable: false,
    //     //     headerName: <p className={theme.palette.mode === "dark" ? "globalTableCss" : ""}>eCPC</p>,
    //     //     headerClassName: 'super-app-theme--header',
    //     //     flex: 1,
    //     //     renderCell: (params) => {
    //     //         return <p style={{ margin: "0px 10px 10px 10px" }}>{params.row.cpc.toLocaleString("en-IN")}</p>
    //     //     },
    //     // },
    //     {
    //         field: "currency",
    //         sortable: false,
    //         headerName: <p className={theme.palette.mode === "dark" ? "globalTableCss" : ""} style={{ fontSize: '12px' }}>Currency</p>,
    //         headerClassName: 'super-app-theme--header',
    //         flex: 0.6,
    //         renderCell: (params) => {
    //             return <p style={{ margin: "0px 10px 10px 20px", }}>{params.row.currency}</p>
    //         },
    //     },
    //     {
    //         field: "plannedMediaSpends",
    //         sortable: false,
    //         headerName: <p style={{ textAlign: 'center', lineHeight: "0.5", fontSize: '12px' }}>
    //             <p>Planned Media</p>
    //             <p>Cost</p>
    //         </p>,
    //         headerClassName: 'super-app-theme--header',
    //         flex: 1,
    //         renderCell: (params) => {
    //             return <p style={{ margin: "0px 30px 10px 0px", textAlign: "center" }}>{params.row?.plannedMediaCost === null ? '-' : params.row?.plannedMediaCost}</p>
    //         },
    //     },
    //     {
    //         field: "plannedClicks",
    //         sortable: false,
    //         headerName: <p style={{ textAlign: 'center', lineHeight: "0.3", fontSize: '12px' }}>
    //             <p>Planned</p>
    //             <p>Delivery </p>
    //         </p>,
    //         headerClassName: 'super-app-theme--header',
    //         flex: 0.6,
    //         renderCell: (params) => {
    //             return <p style={{ margin: "0px 10px 10px 10px" }}>{params?.row?.plannedClicks === null ? '-' : params?.row?.plannedClicks}</p>
    //         },
    //     },
    //     {
    //         field: "startDate",
    //         sortable: false,
    //         headerName: <p className={theme.palette.mode === "dark" ? "globalTableCss" : ""} style={{ fontSize: '12px' }}>Start Date</p>,
    //         headerClassName: 'super-app-theme--header',
    //         flex: 0.7,
    //         renderCell: (params) => {
    //             return <p style={{ margin: "0px 10px 10px 0px" }}>{params?.row?.startDate === null ? "-" : moment(params?.row?.startDate).format('YYYY-MM-DD')}</p>
    //         },
    //     },
    //     {
    //         field: "endDate",
    //         sortable: false,
    //         headerName: <p className={theme.palette.mode === "dark" ? "globalTableCss" : ""} style={{ fontSize: '12px' }}>End Date</p>,
    //         headerClassName: 'super-app-theme--header',
    //         flex: 0.7,
    //         renderCell: (params) => {
    //             return <p style={{ margin: "0px 10px 10px 0px" }}>{params?.row?.endDate === null ? "-" : moment(params?.row?.endDate).format('YYYY-MM-DD')}</p>
    //         },
    //     },
    //     {
    //         field: "daysRemaining",
    //         sortable: false,
    //         headerName: (
    //             <p className={theme.palette.mode === "dark" ? "globalTableCss" : ""} style={{ fontSize: '12px' }}>
    //                 Days Remaining
    //             </p>
    //         ),
    //         headerClassName: "super-app-theme--header",
    //         flex: 1,
    //         renderCell: (params) => {
    //             const { date, endDate } = params.row;

    //             if (!date || !endDate) {
    //                 return <p style={{ margin: "0px 10px 10px 10px" }}>-</p>;
    //             }

    //             const remainingDays = daysBetween(date, endDate);

    //             return (
    //                 <p style={{ margin: "0px 10px 10px 10px" }}>
    //                     {remainingDays > 0 ? `${remainingDays} days` : "Ended"}
    //                 </p>
    //             );
    //         },
    //     },
    //     {
    //         field: "menu",
    //         headerName: <p className={theme.palette.mode === "dark" ? "globalTableCss" : ""} style={{ textAlign: 'center', fontSize: '12px' }}>Menu</p>,
    //         headerClassName: 'super-app-theme--header',
    //         flex: 0.2,
    //         sortable: false,
    //         renderCell: (params) => {
    //             // console.log(params.row, "params");
    //             return (
    //                 <>
    //                     <IconButton
    //                         aria-label="more"
    //                         id={params.row.id}
    //                         aria-controls={open ? "long-menu" : undefined}
    //                         aria-expanded={open ? "true" : undefined}
    //                         aria-haspopup="true"
    //                         onClick={(e) => handleClick(e, params)}
    //                     >
    //                         <MoreVertIcon />
    //                     </IconButton>
    //                     <Menu
    //                         MenuListProps={{
    //                             "aria-labelledby": "long-button",
    //                         }}
    //                         anchorEl={anchorEl}
    //                         open={open}
    //                         onClose={() => setAnchorEl(null)}
    //                         onClick={handleClose}
    //                         PaperProps={{
    //                             style: {
    //                                 maxHeight: ITEM_HEIGHT * 4.5,
    //                                 width: "20ch",
    //                                 boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
    //                             },
    //                         }}
    //                     >
    //                         {options.map((option) => {
    //                             return <MenuItem
    //                                 key={option}
    //                                 selected={option === "Pyxis"}
    //                                 value={option}
    //                                 onClick={() => {
    //                                     handleClose(option);
    //                                 }}
    //                             >
    //                                 {option}
    //                             </MenuItem>
    //                         }
    //                         )}
    //                     </Menu>
    //                 </>
    //             );
    //         },
    //     },
    // ];

    return (
        <React.Fragment>
            <Card className="card">
                <Grid container>
                    {/* <Grid item xs={12} sm={12} md={12} lg={12} sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', gap: 15 }}> */}
                    <Stack direction={isMobile ? 'row' : 'column'} spacing={2} display={'flex'} justifyContent={'space-between'} width={'100%'} alignItems={'center'}
                    m={1}
                    >
                        {
                            userType === "superadmin" && (
                                <FormControl sx={{ textAlign: "start", width: '100%' }}>
                                    <InputLabel id="state-label" sx={{ fontFamily: `"Poppins", sans-serif` }}>Organisation</InputLabel>
                                    <Select
                                        value={selectOrgnigation}
                                        label="Organisation"
                                        labelId='state-label'
                                        onChange={handleOrganisation}
                                        sx={{ width: '200px' }}
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
                                : ""
                        }
                        {/* <FormControl>
                                <InputLabel id="demo-simple-select-label" sx={{
                                    fontFamily: `"Poppins", sans-serif`,
                                    fontSize: '16px'
                                }}>Campaign</InputLabel>
                                <Select
                                    sx={{ width: isMobile ? "250px" : "360px" }}
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={selectCampaign}
                                    label="Headers"
                                    onChange={handleSlectCampaign}
                                >

                                    {campiagnNameList.map((item) => {
                                        return (
                                            <MenuItem value={item} key={item}>
                                                {item}
                                            </MenuItem>
                                        );
                                    })}
                                </Select>
                            </FormControl> */}
                    </Stack>
                    {/* <Stack direction={isMobile ? 'row' : 'column'} spacing={2} display={'flex'} justifyContent={'center'} alignItems={'center'}>
                            <FormControl>
                                <InputLabel
                                    id="state-label"
                                    sx={{
                                        fontFamily: `"Poppins", sans-serif`,
                                        fontSize: '16px'
                                    }}
                                >
                                    Platform
                                </InputLabel>
                                <Select
                                    multiple
                                    value={selectPlatform}
                                    label="Platform"
                                    labelId="state-label"
                                    onChange={handleSelectPlatfrom}
                                    sx={{ width: isMobile ? '250px' : '360px' }}
                                    renderValue={(selected) => selected.join(', ')}
                                >
                                    {platformList.map((item) => (
                                        <MenuItem key={item} value={item}>
                                            <Checkbox checked={selectPlatform.indexOf(item) > -1} />
                                            <ListItemText primary={item} />
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            <FormControl>
                                <InputLabel
                                    id="demo-simple-select-label"
                                    sx={{
                                        fontFamily: `"Poppins", sans-serif`,
                                        fontSize: '16px'
                                    }}>
                                    Country
                                </InputLabel>
                                <Select
                                    multiple
                                    value={selectCountry}
                                    onChange={handleSelectCountry}
                                    renderValue={(selected) => selected.join(', ')}
                                    sx={{ width: isMobile ? "250px" : "360px" }}
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                >
                                    {countryList.map((item) => (
                                        <MenuItem key={item} value={item}>
                                            <Checkbox checked={selectCountry.indexOf(item) > -1} />
                                            <ListItemText primary={item} />
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Stack> */}
                    {/* </Grid> */}
                    <Grid item xs={12} sm={12} md={12} lg={12} sx={{ display: "flex", justifyContent: 'flex-end' }}>


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
                <div style={{ height: "70vh", display: "flex", flexDirection: "column", position: "relative" }}>
                    <div style={{ flex: 1, overflowY: "auto", border: "1px solid #ddd", marginBottom: "40px" }}>
                        <Table style={{ width: '100%', borderCollapse: "collapse" }}>
                            <Row className="table-header" style={{
                                background: "#b2c3ff",
                                position: "sticky",
                                top: 0,
                                zIndex: 10,
                                borderBottom: "2px solid #ddd",
                            }}>
                                <Cell>Campaign Name</Cell>
                                <Cell>Buy Type</Cell>
                                <Cell style={{ textAlign: 'center' }}>Impressions</Cell>
                                <Cell style={{ textAlign: 'center' }}>Clicks</Cell>
                                <Cell style={{ textAlign: 'center' }}>CTR (%)</Cell>
                                <Cell style={{ textAlign: 'center' }}>Reach</Cell>
                                {/* <Cell style={{ textAlign: 'center' }}>Leads</Cell> */}
                                {/* <Cell style={{ textAlign: 'center' }}>Country Name</Cell>
                                <Cell style={{ textAlign: 'center' }}>Platform Name</Cell> */}
                                <Cell style={{ textAlign: 'center' }}>Currency</Cell>
                                <Cell style={{ textAlign: 'center' }}>Unit Cost</Cell>
                                <Cell style={{ textAlign: 'center' }}>Media Cost</Cell>
                                {/* <Cell style={{ textAlign: 'center' }}>Start Date</Cell>
                                <Cell style={{ textAlign: 'center' }}>End Date</Cell> */}
                                {/* <Cell>Leads</Cell> */}
                                {/* <Cell style={{ textAlign: 'center' }}>Media Cost</Cell> */}
                                {/* <Cell style={{ textAlign: 'center' }}>eCPM</Cell> */}
                                {/* <Cell style={{ textAlign: 'center' }}>eCPC</Cell> */}
                                {/* <Cell style={{ textAlign: 'center' }}>Days Remaining</Cell> */}
                                {/* <Cell style={{ textAlign: 'center' }}>Menu</Cell> */}
                            </Row>
                            {campaignList.map((row, index) => {

                                // function daysBetween(start, end) {
                                //     const startDate = new Date(start);
                                //     const endDate = new Date(end);
                                //     const diffTime = endDate.getTime() - startDate.getTime();
                                //     const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                                //     return diffDays;
                                // }

                                // const today = new Date(row?.date);
                                // const endDate = new Date(row?.endDate);
                                // const daysRemaining = daysBetween(today, endDate);

                                return (
                                    <Row key={index} className="table-row" style={{
                                        borderBottom: "1px solid #ddd", color: "#637381", padding: "12px 8px",
                                    }}>
                                        <Cell style={{
                                            color: "#45679F", wordBreak: "break-word",
                                            whiteSpace: "normal",
                                            maxWidth: "150px"
                                        }}>{row.title}</Cell>
                                        <Cell>{row?.buyType === null ? '-' : row?.buyType}</Cell>
                                        <Cell style={{ textAlign: 'center' }}>{row.impressions.toLocaleString("en-IN")}</Cell>
                                        <Cell style={{ textAlign: 'center' }}>{row?.clicks === null ? "-" : row.clicks.toLocaleString("en-IN")}</Cell>
                                        <Cell style={{ textAlign: 'center' }}>{(row.ctr).toFixed(2)}</Cell>
                                        <Cell style={{ textAlign: 'center' }}>{row.reach}</Cell>
                                        {/* <Cell style={{ textAlign: 'center' }}>{row.leads}</Cell> */}
                                        {/* <Cell style={{ textAlign: 'center' }}>{row?.country === null ? "-" : row?.country}</Cell>
                                        <Cell style={{ textAlign: 'center' }}>{row?.platform === null ? "-" : row?.platform}</Cell> */}
                                        <Cell style={{ textAlign: 'center' }}>{row.currency}</Cell>
                                        <Cell style={{ textAlign: 'center' }}>{row?.unitCost === null ? "-" : row?.unitCost}</Cell>
                                        <Cell style={{ textAlign: 'center' }}>{row?.mediaCost === null ? "-" : row?.mediaCost}</Cell>
                                        {/* <Cell style={{ textAlign: 'center' }}>{row?.startDate === null ? "-" : moment(row?.startDate).format('DD-MM-YYYY')}</Cell>
                                        <Cell style={{ textAlign: 'center' }}>{row?.endDate === null ? "-" : moment(row?.endDate).format('DD-MM-YYYY')}</Cell> */}
                                        {/* <Cell style={{ textAlign: 'center' }}>{row?.leads === null ? "-" : row.leads}</Cell> */}
                                        {/* <Cell style={{ textAlign: 'center' }}>{row.mediaCost.toLocaleString("en-IN")}</Cell> */}
                                        {/* <Cell style={{ textAlign: 'center' }}>{row.cpm.toLocaleString("en-IN")}</Cell>
                                                        <Cell style={{ textAlign: 'center' }}>{row.cpc.toLocaleString("en-IN")}</Cell> */}
                                        {/* <Cell style={{ textAlign: 'center' }}>{row?.date === null ? "-" : daysRemaining > 0 ? `${daysRemaining} days` : "Ended"}</Cell> */}
                                        {/* <Cell style={{ textAlign: 'center' }}>
                                            <>
                                                <IconButton
                                                    aria-label="more"
                                                    id={row.id}
                                                    aria-controls={open ? "long-menu" : undefined}
                                                    aria-expanded={open ? "true" : undefined}
                                                    aria-haspopup="true"
                                                    onClick={(e) => handleClick(e, row)}
                                                >
                                                    <MoreVertIcon />
                                                </IconButton>
                                                <Menu
                                                    MenuListProps={{
                                                        "aria-labelledby": "long-button",
                                                    }}
                                                    anchorEl={anchorEl}
                                                    open={open}
                                                    onClose={() => setAnchorEl(null)}
                                                    onClick={handleClose}
                                                    PaperProps={{
                                                        style: {
                                                            maxHeight: ITEM_HEIGHT * 4.5,
                                                            width: "20ch",
                                                            boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
                                                        },
                                                    }}
                                                >
                                                    {options.map((option) => {
                                                        return <MenuItem
                                                            key={option}
                                                            selected={option === "Pyxis"}
                                                            value={option}
                                                            onClick={() => {
                                                                handleClose(option);
                                                            }}
                                                        >
                                                            {option}
                                                        </MenuItem>
                                                    }
                                                    )}
                                                </Menu>
                                            </>
                                        </Cell> */}
                                    </Row>
                                )
                            })
                            }
                        </Table>
                    </div>
                    <div style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "end",
                        padding: "10px",
                        position: "absolute",
                        bottom: 0,
                        left: 0,
                        right: 0,
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

                </Box> */}
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
                    <EditCampaignFormModal handleClose={handleCloseModal} fetchCampaignList={fetchCampaignList} auth={auth} editTableData={editTableData} organisationId={selectOrgnigation?.id} />
                </Dialog>
                <Dialog open={importModal} onClose={handleCloseModal}>
                    <ImportCampaignCsv organisationId={organisationId} handleClose={handleCloseModal} fetchCampaignList={fetchCampaignList} auth={auth} selectOrgnigation={selectOrgnigation} />
                </Dialog>
            </Card>
        </React.Fragment>
    )
};

export default Campaigns;