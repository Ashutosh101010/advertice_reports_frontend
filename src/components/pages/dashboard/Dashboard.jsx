import React, { useContext, useEffect, useState } from "react";
import Chart from 'react-apexcharts';
import AdverticeNetwork from "../../../Network";
import { Button, Card, Dialog, FormControl, Grid, InputLabel, MenuItem, Select, TextField, useMediaQuery } from "@mui/material";
import AuthContext from "../authContext/AuthContext";
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import ImportDashboardCsv from "./ImportCsv";


const Dashboard = () => {

    const isMobile = useMediaQuery("(min-width:600px)");
    const organisationId = localStorage.getItem("organizationId");
    const userType = localStorage.getItem("userType");
    // const { auth } = useContext(AuthContext);
    const auth = localStorage.getItem("accessToken");
    const [page, setPage] = useState(0);
    const [pageSize, setPageSize] = useState(500);
    const [campaignData, setCampaignData] = useState([]);
    const [selectedDate, setSelectedDate] = useState(null);
    const [toDate, setToDate] = useState(null);
    const [importModal, setImportModal] = useState(false);
    const [organisationList, setOrganisationList] = useState([]);
    const [selectOrgnigation, setSelectOrgnigation] = useState('');
    const [campiagnNameList, setCampiagnNameList] = useState([]);
    const [selectCampaign, setSelectCampaign] = useState('');

    useEffect(() => {
        if (userType === "superadmin") {
            if (selectOrgnigation?.id || selectCampaign?.id) {
                fetchCampaignList();
            }
        } else if (userType === "admin") {
            fetchCampaignList();
        }
    }, [selectedDate, toDate, selectOrgnigation, userType, selectCampaign])

    useEffect(() => {
        if (auth) {
            fetchOrganisationList();
        }
    }, [auth])


    const fetchOrganisationList = async () => {
        try {
            const body = {
                "page": page,
                "pageSize": pageSize
            }
            // console.log('auth', auth);
            const response = await AdverticeNetwork.fetchSuperAdminOrganisationApi(body, auth);
            // console.log('response', response);

            if (response.errorCode === 0) {
                setOrganisationList(response.organisations);
                setSelectOrgnigation(response.organisations[0])
            }
        } catch (error) {
            console.log(error);
        }
    }
    const handleDateChange = (date) => {
        setSelectedDate(date);
    };
    const handleToDateDateChange = (date) => {
        setToDate(date);
    };

    const fetchCampaignList = async () => {
        try {
            const body = {
                "page": page,
                "pageSize": pageSize,
                "from": selectedDate !== null ? selectedDate.format('DD-MM-YYYY') : null,
                "to": toDate !== null ? toDate.format('DD-MM-YYYY') : null,
                // "organizationId": selectOrgnigation?.id
            }
            if (selectOrgnigation?.id && userType === "superadmin") {
                body.organizationId = selectOrgnigation?.id
            }
            if (selectCampaign && userType === "superadmin") {
                body.campaignName = selectCampaign
            }
            const response = await AdverticeNetwork.fetchCampaignApi(body, auth);
            if (response.errorCode === 0) {
                setCampaignData(response.campaigns);
                setCampiagnNameList(response?.campaignNames)
            }
        } catch (error) {
            console.log(error);
        }
    }

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
    };

    const formattedDates = campaignData.map(campaign => formatDate(campaign.date));
    const impressions = campaignData.map(campaign => campaign.impressions);

    const chartOptions = {
        chart: {
            type: 'area',
            height: 350,
            zoom: {
                enabled: false
            }
        },
        dataLabels: {
            enabled: false
        },
        // stroke: {
        //     curve: 'straight'
        // },
        xaxis: {
            categories: formattedDates
        },
        fill: {
            colors: ['#45679F']
        },
        stroke: {
            width: 2,
            colors: ['#45679F']
        },
        markers: {
            size: 4,
            colors: ['#45679F'],
            strokeWidth: 1,
            strokeColors: ['#45679F'],
            shape: 'circle',
            dataLabels: {
                enabled: true,
                style: {
                    colors: ['#ffffff']
                }
            }
        },
        tooltip: {
            enabled: true,
            intersect: false,
            shared: false,
        }
    };

    const chartSeries = [
        {
            name: 'Impressions',
            data: impressions
        }
    ];

    function handleSelectOrgnigation(event) {
        setSelectOrgnigation(event.target.value);
    };

    const handleCloseModal = () => {
        setImportModal(false)
    }

    const ImportCampaign = () => {
        setImportModal(true)
    }

    const handleSlectCampaign = (e) => {
        setSelectCampaign(e.target.value);
    };

    // console.log('organisationList', organisationList)

    return (
        <React.Fragment>
            <Card className="card">
                <Grid container>
                    <Grid item xs={12} sm={12} md={12} lg={12} sx={{ textAlign: "end", display: !isMobile ? 'grid' : "" }}>
                        {/* <Button className=''
                            sx={{
                                height: "100%",
                                background: "#45679F ",
                                color: "#fff",
                                textTransform: "capitalize",
                                mr: 2,
                                mb: !isMobile ? 2 : "",
                                fontFamily: `"Poppins", sans-serif`,
                                fontSize: '16px',
                                px: 2,
                                ":hover": {
                                    background: "#45679F ",
                                }
                            }}
                            onClick={ImportCampaign}
                        >
                            Import Campaign
                        </Button> */}
                        {
                            userType === "superadmin" && (
                                <>
                                    <FormControl sx={{ textAlign: "start", mt: !isMobile ? 2 : "" }}>
                                        <InputLabel id="state-label"
                                            sx={{
                                                fontFamily: `"Poppins", sans-serif`,
                                                fontSize: '16px'
                                            }}
                                        >Organisation</InputLabel>
                                        <Select
                                            value={selectOrgnigation}
                                            label="Organisation"
                                            labelId='state-label'
                                            onChange={handleSelectOrgnigation}
                                            sx={{ minWidth: 250, mr: isMobile ? 2 : '' }}
                                            disableUnderline
                                        >
                                            {organisationList.map((item) => {
                                                return (
                                                    <MenuItem value={item} key={item.id}
                                                        sx={{
                                                            fontFamily: `"Poppins", sans-serif`
                                                        }}
                                                    >
                                                        {item.organisation}
                                                    </MenuItem>
                                                );
                                            })}
                                        </Select>
                                    </FormControl>
                                    <FormControl>
                                        <InputLabel id="demo-simple-select-label" sx={{
                                            fontFamily: `"Poppins", sans-serif`,
                                            fontSize: '16px'
                                        }}>Campaign</InputLabel>
                                        <Select
                                            sx={{ width: isMobile ? "250px" : "360px", mr: isMobile ? 2 : '' }}
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
                                </>
                            )
                        }

                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker
                                label="Select From Date"
                                value={selectedDate}
                                onChange={handleDateChange}
                                renderInput={(params) => <TextField sx={{ mr: isMobile ? 2 : '', mt: !isMobile ? 2 : "", minWidth: 250, fontFamily: `"Poppins", sans-serif` }} {...params} />}
                            />
                        </LocalizationProvider>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker
                                label="Select To Date"
                                value={toDate}
                                onChange={handleToDateDateChange}
                                renderInput={(params) => <TextField {...params} sx={{ mt: !isMobile ? 2 : "", minWidth: 250, fontFamily: `"Poppins", sans-serif` }} />}
                            />
                        </LocalizationProvider>
                    </Grid>
                </Grid>
                <Grid container>
                    <Grid item xs={12} sm={12} md={12} lg={12} >
                        <Chart options={chartOptions} series={chartSeries} type="area" height={350} />
                    </Grid>
                </Grid>

            </Card>
            <Dialog open={importModal} onClose={handleCloseModal}>
                <ImportDashboardCsv organisationId={organisationId} handleClose={handleCloseModal} fetchCampaignList={fetchCampaignList} auth={auth} />
            </Dialog>
        </React.Fragment>
    )
};

export default Dashboard;