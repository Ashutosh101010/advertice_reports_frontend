import React, { useContext, useEffect, useState } from "react";
import Chart from 'react-apexcharts';
import AdverticeNetwork from "../../../Network";
import { Card, Grid, TextField } from "@mui/material";
import AuthContext from "../authContext/AuthContext";
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";


const Dashboard = () => {

    const { auth } = useContext(AuthContext);
    const [campaignData, setCampaignData] = useState([]);
    const [selectedDate, setSelectedDate] = useState(null);
    const [toDate, setToDate] = useState(null);

    useEffect(() => {
        fetchCampaignList();
    }, [selectedDate, toDate])


    const handleDateChange = (date) => {
        setSelectedDate(date);
    };
    const handleToDateDateChange = (date) => {
        setToDate(date);
    };

    const fetchCampaignList = async () => {
        try {
            const body = {
                "page": 0,
                "pageSize": 100,
                "from": selectedDate === null ? null : selectedDate.toDate().getTime(),
                "to": toDate === null ? null : toDate.toDate().getTime()
            }
            const response = await AdverticeNetwork.fetchCampaignApi(body, auth);
            if (response.errorCode === 0) {
                setCampaignData(response.campaigns);
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
        stroke: {
            curve: 'straight'
        },
        xaxis: {
            categories: formattedDates
        },
        fill: {
            colors: ['#ee4036']
        },
        stroke: {
            width: 2,
            colors: ['#ee4036']
        },
        markers: {
            size: 4,
            colors: ['#ee4036'],
            strokeWidth: 1,
            strokeColors: ['#ee4036'],
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

    return (
        <React.Fragment>
            <Card className="card">
                <Grid container>
                    <Grid item xs={12} sm={12} md={12} lg={12} sx={{ textAlign: "end" }}>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker
                                label="Select From Date"
                                value={selectedDate}
                                onChange={handleDateChange}
                                renderInput={(params) => <TextField sx={{ mr: 2 }} {...params} />}
                            />
                        </LocalizationProvider>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker
                                label="Select To Date"
                                value={toDate}
                                onChange={handleToDateDateChange}
                                renderInput={(params) => <TextField {...params} />}
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
        </React.Fragment>
    )
};

export default Dashboard;