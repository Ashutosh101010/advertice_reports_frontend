import React, { useState } from "react";
import { Card, Box, IconButton, Switch, styled, useTheme, FormControlLabel, Grid, Typography, TextField, InputLabel, FormLabel, RadioGroup, Radio, FormControl, Checkbox, FormGroup, Select, MenuItem, Divider, Button } from '@mui/material';
import { DataGrid } from "@mui/x-data-grid";
import Label from "../label/Label";
import { sentenceCase } from "change-case";
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';
import EditIcon from '@mui/icons-material/Edit';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { Link } from "react-router-dom";
import { DesktopDatePicker, LocalizationProvider, DateTimePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

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
        date: "2024-02-29",
        campaigns: "(7953) new test",
        impression: "121338",
        clicks: "1529",
        conversions: '0',
        ctr: '1.26%',
        mediaCost: "397.54",
        cpm: "3.28",
        cpc: "0.26",
        cpa: '0.00',
    },
    {
        id: 2,
        date: "2024-02-29",
        campaigns: "(7953) new test",
        impression: "121338",
        clicks: "1529",
        conversions: '0',
        ctr: '1.26%',
        mediaCost: "397.54",
        cpm: "3.28",
        cpc: "0.26",
        cpa: '0.00',
    },
    {
        id: 3,
        date: "2024-02-29",
        campaigns: "(7953) new test",
        impression: "121338",
        clicks: "1529",
        conversions: '0',
        ctr: '1.26%',
        mediaCost: "397.54",
        cpm: "3.28",
        cpc: "0.26",
        cpa: '0.00',
    },
]

const AdvanceComponent = () => {

    const theme = useTheme();
    const [page, setPage] = useState(0);
    const [pageSize, setPageSize] = useState(25);
    const [rowCount, setRowCount] = useState(CampaignData.length);
    const [switchChecked, setSwitchChecked] = useState(true);
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [domainCheck, setDomainCheck] = useState(null);
    const [siteIdCheck, setSiteIdCheck] = useState(null);
    const [countryCheck, setCountryCheck] = useState(null);
    const [osCheck, setOsCheck] = useState(null);
    const [selectCampaign, setSelectCampaign] = useState('');
    const [intervalSelect, setIntervalSelect] = useState('none');    

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

    const [checked, setChecked] = React.useState(true);

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

    const handleInterval = (event) =>{
        setIntervalSelect(event.target.value)
    }

    const columns = [
        {
            field: "date",
            headerName: <p className={theme.palette.mode === "dark" ? "globalTableCss" : ""}>Date</p>,
            headerClassName: 'super-app-theme--header',
            sortable: false,
            flex: 1,
        },
        {
            field: "campaigns",
            headerName: <p className={theme.palette.mode === "dark" ? "globalTableCss" : ""}>Campaign</p>,
            headerClassName: 'super-app-theme--header',
            sortable: false,
            flex: 1,
        },
        {
            field: "impression",
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
            field: "conversions",
            sortable: false,
            headerName: <p className={theme.palette.mode === "dark" ? "globalTableCss" : ""}>Conversions</p>,
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
            headerName: <p className={theme.palette.mode === "dark" ? "globalTableCss" : ""}>CPM</p>,
            headerClassName: 'super-app-theme--header',
            flex: 1
        },
        {
            field: "cpc",
            sortable: false,
            headerName: <p className={theme.palette.mode === "dark" ? "globalTableCss" : ""}>CPC</p>,
            headerClassName: 'super-app-theme--header',
            flex: 1
        },
        {
            field: "cpa",
            sortable: false,
            headerName: <p className={theme.palette.mode === "dark" ? "globalTableCss" : ""}>CPA</p>,
            headerClassName: 'super-app-theme--header',
            flex: 1
        },
    ];

    return (
        <React.Fragment>
            <Card className="card">
                <Box>
                    <Typography variant="h6" sx={{ mb: 2, fontWeight: "bold" }}>Advance Report Filters</Typography>
                    <Grid container>
                        <Grid item xs={6} sm={6} md={6} lg={6}>
                            <Grid container>

                                <Grid item xs={6} sm={6} md={6} lg={6}>
                                    <InputLabel sx={{ fontWeight: "bold" }}>Start Date</InputLabel>
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <DesktopDatePicker
                                            // label="Start Date"
                                            inputFormat="YYYY-MM-DD"
                                            value={startDate ? startDate : null}
                                            variant="outlined"
                                            id="startDate"
                                            onChange={handleStartDate}
                                            renderInput={(params) => <TextField sx={{ minWidth: "230px" }} variant="outlined" {...params} />}
                                        />
                                    </LocalizationProvider>
                                    <Box>
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
                                    </FormControl></Box>
                                    <Box>
                                        <FormControl sx={{ mt: 2 }}>
                                            <InputLabel id="demo-simple-select-label">Campaign</InputLabel>
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
                                    </Box>
                                </Grid>
                                <Grid item xs={6} sm={6} md={6} lg={6} sx={{position: "relative"}}>
                                    <InputLabel sx={{ fontWeight: "bold" }}>End Date</InputLabel>
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <DesktopDatePicker
                                            // label="End Date"
                                            inputFormat="YYYY-MM-DD"
                                            value={endDate ? endDate : null}
                                            variant="outlined"
                                            id="endDate"
                                            onChange={handleEndDate}
                                            renderInput={(params) => <TextField sx={{ minWidth: "230px" }} variant="outlined" {...params} />}
                                        />
                                    </LocalizationProvider>

                                    <Box>
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
                                    </FormControl></Box>
                                    <Box sx={{position: "absolute", bottom: 0}}>
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
                                    </Box>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Divider sx={{mt: 2.5}} />
                    <Box>
                        <Button sx={{mt:2, background: "#4f46e5", color: "#fff"}}>Get Rreport</Button>
                    </Box>
                </Box>
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
                        rows={CampaignData}
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
            </Card>
        </React.Fragment>
    )
};

export default AdvanceComponent;