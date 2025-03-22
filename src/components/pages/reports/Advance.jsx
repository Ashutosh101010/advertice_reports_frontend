import React, { useContext, useEffect, useMemo, useState } from "react";
import { Card, Box, IconButton, Switch, styled, useTheme, FormControlLabel, Grid, Typography, TextField, InputLabel, FormLabel, RadioGroup, Radio, FormControl, Checkbox, FormGroup, Select, MenuItem, Divider, Button, Stack, useMediaQuery } from '@mui/material';
import { DataGrid } from "@mui/x-data-grid";
import Label from "../label/Label";
import { sentenceCase } from "change-case";
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';
import EditIcon from '@mui/icons-material/Edit';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { Link } from "react-router-dom";
import { DesktopDatePicker, LocalizationProvider, DateTimePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import AdverticeNetwork from "../../../Network";
import AuthContext from "../authContext/AuthContext";
import moment from "moment";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

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

// const CampaignData = [
//     {
//         id: 1,
//         date: "2024-02-29",
//         campaigns: "(7953) new test",
//         impression: "121338",
//         clicks: "1529",
//         conversions: '0',
//         ctr: '1.26%',
//         mediaCost: "397.54",
//         cpm: "3.28",
//         cpc: "0.26",
//         cpa: '0.00',
//     },
//     {
//         id: 2,
//         date: "2024-02-29",
//         campaigns: "(7953) new test",
//         impression: "121338",
//         clicks: "1529",
//         conversions: '0',
//         ctr: '1.26%',
//         mediaCost: "397.54",
//         cpm: "3.28",
//         cpc: "0.26",
//         cpa: '0.00',
//     },
//     {
//         id: 3,
//         date: "2024-02-29",
//         campaigns: "(7953) new test",
//         impression: "121338",
//         clicks: "1529",
//         conversions: '0',
//         ctr: '1.26%',
//         mediaCost: "397.54",
//         cpm: "3.28",
//         cpc: "0.26",
//         cpa: '0.00',
//     },
// ]

const AdvanceComponent = () => {

    const theme = useTheme();
    const isMobile = useMediaQuery("(min-width:600px)");
    const userType = localStorage.getItem("userType");
    // const { auth } = useContext(AuthContext);
    const auth = localStorage.getItem("accessToken");
    const [page, setPage] = useState(0);
    const [pageSize, setPageSize] = useState(25);
    const [rowCount, setRowCount] = useState(0);
    const [switchChecked, setSwitchChecked] = useState(true);
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [domainCheck, setDomainCheck] = useState(null);
    const [siteIdCheck, setSiteIdCheck] = useState(null);
    const [countryCheck, setCountryCheck] = useState(null);
    const [osCheck, setOsCheck] = useState(null);
    const [selectCampaign, setSelectCampaign] = useState('');
    const [intervalSelect, setIntervalSelect] = useState('none');
    const [checked, setChecked] = React.useState(true);
    const [reportList, setReportList] = useState([]);
    const [organisationList, setOrganisationList] = useState([]);
    const [selectOrgnigation, setSelectOrgnigation] = useState('');
    const [campaignList, setCampaignList] = useState([]);
    const [campiagnNameList, setCampiagnNameList] = useState([]);
    const [totalImpressions, setTotalImpressions] = useState(0);
    const [totalClicks, setTotalClicks] = useState(0);
    const [totalCount, setTotalCount] = useState(0);

    useEffect(() => {
        // fetchReportList();
        fetchOrganisationList();
    }, [])

    useEffect(() => {
        // if (organisationList?.length > 0) {
        //     setSelectOrgnigation(organisationList[0])
            fetchCampaignList();
        // }
    }, [selectOrgnigation, startDate, endDate, selectCampaign, page, pageSize]);

    useEffect(() => {
        if (organisationList?.length > 0) {
            setSelectOrgnigation(organisationList[0]);
            fetchCampaignList();
        }
    }, [organisationList]);
    

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

    const fetchCampaignList = async () => {
        try {
            const body = {
                "page": page,
                "pageSize": pageSize,
                "organizationId": selectOrgnigation?.id,
                "from": startDate !== null ? startDate.format('DD-MM-YYYY') : null,
                "to": endDate !== null ? endDate.format('DD-MM-YYYY') : null,
                "campaignName": selectCampaign
            }
            const response = await AdverticeNetwork.fetchCampaignApi(body, auth);
            if (response.errorCode === 0) {
                setCampaignList(response.campaigns);
                setCampiagnNameList(response?.campaignNames)
                setRowCount(response.count);
                setTotalImpressions(response?.impressions);
                setTotalClicks(response?.clicks);
                setTotalCount(response?.count);
            }
            // exportCsv(response.campaigns);
        } catch (error) {
            console.log(error);
        }
    }

    const fetchReportList = async () => {
        try {
            const body = {
                "page": page,
                "pageSize": pageSize
            }
            // console.log('body', body);
            const response = await AdverticeNetwork.fetchReportListApi(auth);
            if (response.errorCode === 0) {
                setReportList(response.organisations);
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

    function handleStartDate(newValue) {
        setStartDate(newValue);
    };

    function handleEndDate(newValue) {
        setEndDate(newValue);
    };

    const handleDomain = (event) => {
        setDomainCheck(event.target.checked);
    };
    const handleSiteId = (event) => {
        setSiteIdCheck(event.target.checked);
    };
    const handleCountry = (event) => {
        setCountryCheck(event.target.checked);
    };
    const handleOs = (event) => {
        setOsCheck(event.target.checked);
    };

    const handleSlectCampaign = (e) => {
        setSelectCampaign(e.target.value);
    };

    const handleInterval = (event) => {
        setIntervalSelect(event.target.value)
    }

    function handleSelectOrgnigation(event) {
        setSelectOrgnigation(event.target.value);
    };

    const columns = [
        {
            field: "date",
            headerName: <p className={theme.palette.mode === "dark" ? "globalTableCss" : ""}>Date</p>,
            headerClassName: 'super-app-theme--header',
            sortable: false,
            flex: 1,
            renderCell: (params) => {
                return (
                    <>
                        {moment(params?.row?.date).format('YYYY-MM-DD')}
                    </>
                )
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
            flex: 1,
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
    ];

    const CustomFooter = ({ rowCount, page, pageSize, onPageChange, onPageSizeChange, totalImpressions, totalClicks, totalCount }) => {
        return (
            <Stack direction={isMobile ? 'row' : 'column'} justifyContent="space-between" alignItems="center" py={1} sx={{ borderTop: '2px solid #0000000f', background: '#ffb6b2' }}>
                {/* Left: Total Impressions & Clicks */}
                <Stack direction={isMobile ? 'row' : 'column'} spacing={2} justifyContent={'flex-start'} width={['100%', '70%']} marginLeft={[2, 1]} gap={[0, 10]} flexGrow={1}>
                    <Typography sx={{ fontWeight: "500", fontFamily: `"Poppins", sans-serif`, fontSize: '16px', color: '#000' }}>
                        Total
                    </Typography>
                    <Typography sx={{ fontWeight: "500", fontFamily: `"Poppins", sans-serif`, fontSize: '16px', color: '#000', visibility: "hidden" }}>
                        Total
                    </Typography>
                    
                    <Typography sx={{ fontWeight: "500", fontFamily: `"Poppins", sans-serif`, fontSize: '16px', color: '#000'}}>
                        Impressions: {totalImpressions}
                    </Typography>
                    <Typography sx={{ fontWeight: "500", fontFamily: `"Poppins", sans-serif`, fontSize: '16px', color: '#000', marginLeft: "34px" }}>
                        Clicks: {totalClicks ? ((totalClicks / totalImpressions) * 100).toFixed(2) + "0" : "0"}
                    </Typography>
                    <Typography sx={{ fontWeight: "500", fontFamily: `"Poppins", sans-serif`, fontSize: '16px', color: '#000' }}>
                        CTR: {totalClicks ? ((totalClicks / totalImpressions) * 100).toFixed(2) + "0" : "0"}
                    </Typography>
                    <Typography sx={{ fontWeight: "500", fontFamily: `"Poppins", sans-serif`, fontSize: '16px', color: '#000' }}>
                        Count: {totalCount}
                    </Typography>
                    
                </Stack>
                <Stack direction="row" justifyContent={'center'} alignItems={'center'} spacing={2} py={[1, 0]}>
                    <Typography variant="body2" color={'#000'}>Rows per page:</Typography>
                    <Select value={pageSize} onChange={(e) => onPageSizeChange(e.target.value)} size="small">
                        <MenuItem value={25}>25</MenuItem>
                        <MenuItem value={50}>50</MenuItem>
                        <MenuItem value={100}>100</MenuItem>
                    </Select>
                    <Typography variant="body2" color={'#000'} fontFamily={`"Poppins",sans-serif`}>
                        {page * pageSize + 1} - {Math.min((page + 1) * pageSize, rowCount)} of {rowCount}
                    </Typography>
                    <IconButton onClick={() => onPageChange(page - 1)} disabled={page === 0}>
                        <ArrowBackIosIcon />
                    </IconButton>
                    <IconButton onClick={() => onPageChange(page + 1)} disabled={(page + 1) * pageSize >= rowCount}>
                        <ArrowForwardIosIcon />
                    </IconButton>
                </Stack>
            </Stack>
        );
    };

    // const exportCsv = (allData) => {
    //     // Define CSV headers
    //     const headers = [
    //         "Date",
    //         "Campaign",
    //         "Imporessions",
    //         "Click",
    //         "CTR",
    //         "Currency",
    //         "Media Cost",
    //         "eCPM",
    //         "eCPC",
    //     ];

    //     // Map transactionsData to rows
    //     const rows = allData.map((data) => [
    //         data.date,
    //         data.title,
    //         data.impressions,
    //         data.clicks,
    //         data.ctr,
    //         data?.currency,
    //         data.mediaCost,
    //         data.cpm,
    //         data.cpc,
    //     ]);

    //     // Combine headers and rows
    //     const csvContent = [
    //         headers.join(","), // Convert headers to CSV
    //         ...rows.map((row) => row.map((field) => `"${field}"`).join(",")), // Convert each row to CSV
    //     ].join("\n"); // Join rows with newline

    //     // Create a Blob from the CSV content
    //     const blob = new Blob([csvContent], { type: "text/csv" });

    //     // Create a link element
    //     const link = document.createElement("a");

    //     // Set the download attribute with a filename
    //     link.download = "report.csv";

    //     // Create a URL for the Blob and set it as the href
    //     link.href = URL.createObjectURL(blob);

    //     // Append link to the body
    //     document.body.appendChild(link);

    //     // Simulate a click to download the file
    //     link.click();

    //     // Remove the link after downloading
    //     document.body.removeChild(link);
    // }

    // const handleExport = () => {
    //     fetchCampaignList();
    // };

    return (
        <React.Fragment>
            <Card className="card">
                <Box>
                    {/* <Typography variant="h6" sx={{
                        mb: 2, fontWeight: "500", fontFamily: `"Poppins", sans-serif`, fontSize: '18px'
                    }}
                    >
                        Advance Report Filters
                    </Typography> */}
                    <Grid container>
                        <Grid item xs={12} sm={12} md={12} lg={12}>
                            <Grid container>
                                <Grid item xs={12} sm={6} md={6} lg={6} display={['grid', 'flex']} justifyContent={'flex-start'} alignItems={'end'} gap={2}>
                                    {
                                        userType === "superadmin" && (
                                            <FormControl sx={{ textAlign: "start", mt: 0 }}>
                                                <InputLabel id="state-label" sx={{
                                                    fontFamily: `"Poppins", sans-serif`,
                                                    fontSize: '16px'
                                                }}>Organisation</InputLabel>
                                                <Select
                                                    value={selectOrgnigation}
                                                    label="Organisation"
                                                    labelId='state-label'
                                                    onChange={handleSelectOrgnigation}
                                                    sx={{ width: isMobile ? "250px" : "360px" }}
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
                                    <FormControl>
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
                                    </FormControl>

                                    {/* <Box>
                                        <FormControl sx={{ mt: 2 }}>
                                            <FormLabel id="demo-row-radio-buttons-group-label">Interval</FormLabel>
                                            <RadioGroup
                                            value={intervalSelect}
                                            onChange={handleInterval}
                                                defaultValue="none"
                                                row
                                                aria-labelledby="demo-row-radio-buttons-group-label"
                                                name="row-radio-buttons-group"
                                            >
                                                <FormControlLabel value="none" control={<Radio />} label="None" />
                                                <FormControlLabel value="daily" control={<Radio />} label="Daily" />

                                            </RadioGroup>
                                        </FormControl>
                                    </Box>

                                    <Box><FormControl sx={{ mt: 2 }} component="fieldset" variant="standard">
                                        <FormLabel component="legend">Additional Dimensions</FormLabel>
                                        <FormGroup aria-label="position" row>
                                            <FormControlLabel
                                                control={
                                                    <Checkbox checked={domainCheck} onChange={handleDomain} name="gilad" />
                                                }
                                                label="Domain"
                                            />
                                            <FormControlLabel
                                                control={
                                                    <Checkbox checked={siteIdCheck} onChange={handleSiteId} name="jason" />
                                                }
                                                label="Site Id"
                                            />
                                            <FormControlLabel
                                                control={
                                                    <Checkbox checked={countryCheck} onChange={handleCountry} name="antoine" />
                                                }
                                                label="Country"
                                            />
                                            <FormControlLabel
                                                control={
                                                    <Checkbox checked={osCheck} onChange={handleOs} name="antoine" />
                                                }
                                                label="Os"
                                            />
                                        </FormGroup>
                                    </FormControl></Box> */}
                                </Grid>
                                <Grid item xs={12} sm={6} md={6} lg={6} display={['grid', 'flex']} justifyContent={'flex-start'} alignItems={'center'} gap={2}>
                                    <Stack direction={'column'} spacing={1}>
                                        <InputLabel sx={{
                                            fontWeight: "500", fontFamily: `"Poppins", sans-serif`, fontSize: '18px'
                                        }}>Start Date</InputLabel>
                                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                                            <DesktopDatePicker
                                                // label="Start Date"
                                                inputFormat="YYYY-MM-DD"
                                                value={startDate ? startDate : null}
                                                variant="outlined"
                                                id="startDate"
                                                onChange={handleStartDate}
                                                renderInput={(params) => <TextField sx={{ width: isMobile ? "250px" : "360px" }} variant="outlined" {...params} />}
                                            />
                                        </LocalizationProvider>
                                    </Stack>
                                    <Stack direction={'column'} spacing={1} mt={[2, 0]}>
                                        <InputLabel sx={{
                                            fontWeight: "500", fontFamily: `"Poppins", sans-serif`, fontSize: '18px'
                                        }}>End Date</InputLabel>
                                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                                            <DesktopDatePicker
                                                // label="End Date"
                                                inputFormat="YYYY-MM-DD"
                                                value={endDate ? endDate : null}
                                                variant="outlined"
                                                id="endDate"
                                                onChange={handleEndDate}
                                                renderInput={(params) => <TextField sx={{ width: isMobile ? "250px" : "360px" }} variant="outlined" {...params} />}
                                            />
                                        </LocalizationProvider>
                                    </Stack>
                                    {/* <Stack direction={'column'} spacing={1} mt={[2, 4]}>
                                        <Button
                                            onClick={handleExport}
                                            sx={{
                                                width: '100%',
                                                maxWidth: '300px',
                                                fontFamily: `"Poppins", sans-serif`,
                                                fontSize: '16px',
                                            }}
                                            className='hearder-right-btn create-organisation'
                                        >
                                            Export Table
                                        </Button>
                                    </Stack> */}
                                    {/* <Box>
                                        <FormControl sx={{ mt: 2 }} component="fieldset" variant="standard">
                                        <FormLabel component="legend">Date By</FormLabel>
                                        <FormGroup aria-label="position" row>
                                            <FormControlLabel
                                                control={
                                                    <Checkbox checked={domainCheck} onChange={handleDomain} name="gilad" />
                                                }
                                                label="Campaign"
                                            />
                                            <FormControlLabel
                                                control={
                                                    <Checkbox checked={siteIdCheck} onChange={handleSiteId} name="jason" />
                                                }
                                                label="Source"
                                            />
                                            <FormControlLabel
                                                control={
                                                    <Checkbox checked={countryCheck} onChange={handleCountry} name="antoine" />
                                                }
                                                label="Creative"
                                            />
                                        </FormGroup>
                                    </FormControl></Box> */}
                                    {/* <Box sx={{position: "absolute", bottom: 0}}>
                                        <FormControl sx={{ mt: 2 }}>
                                            <InputLabel id="demo-simple-select-label">Source</InputLabel>
                                            <Select
                                                sx={{ minWidth: "230px" }}
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                value={selectCampaign}
                                                label="Headers"
                                                onChange={handleSlectCampaign}
                                            >
                                                <MenuItem value={"test1"}>Test 1</MenuItem>
                                                <MenuItem value={"test2"}>Test 2</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </Box> */}

                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Divider sx={{ mt: 2.5 }} />
                    {/* <Box>
                        <Button sx={{ mt: 2, background: "#4f46e5", color: "#fff" }}>Get Rreport</Button>
                    </Box> */}
                </Box>
                <Box
                    m="40px 0 0 0"
                    height="70vh"
                    sx={{
                        '.MuiDataGrid-root .MuiDataGrid-cell:focus-within': {
                            outline: 'none !important'
                        },
                        '& > .MuiDataGrid-columnSeparator': {
                            visibility: 'hidden',
                        },
                        "& .MuiDataGrid-root": {
                            border: "1px solid #ffb6b2",
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
                        // "& .MuiDataGrid-row": {
                        //     border: "1px solid #ffb6b2",
                        //     borderRadius: "5px",
                        //     backgroundColor: "#fff !important",
                        //     boxShadow : "0 0 10px 4px hsla(0,0%,96.1%,.3333333333333333) !important",
                        //     borderColor: "#ffb6b2",
                        //     marginTop:1,
                        //   },
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
                        slots={{
                            footer: () => (
                                <CustomFooter
                                    rowCount={rowCount}
                                    page={page}
                                    pageSize={pageSize}
                                    onPageChange={setPage}
                                    onPageSizeChange={setPageSize}
                                    totalImpressions={totalImpressions}
                                    totalClicks={totalClicks}
                                    totalCount={totalCount}
                                />
                            ),
                        }}
                    />
                </Box>
            </Card>
        </React.Fragment>
    )
};

export default AdvanceComponent;