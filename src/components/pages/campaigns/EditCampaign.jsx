import { Button, InputLabel, MenuItem, Select, Stack, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import AdverticeNetwork from "../../../Network";
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

export default function EditCampaignFormModal({ handleClose, auth, fetchCampaignList, editTableData }) {


    const [title, setTitle] = useState("");
    const [impressions, setImpressions] = useState("");
    const [clicks, setClicks] = useState("");
    const [conversions, setConversions] = useState();
    const [mediaCost, setMediaCost] = useState(0);
    const [ctr, setCtr] = useState(0);
    const [cpm, setCpm] = useState(0);
    const [cpc, setCpc] = useState(0);
    const [cpa, setCpa] = useState(0);
    const [selectedDate, setSelectedDate] = useState(null);

    // console.log('editTableData', editTableData);

    useEffect(() => {
        if (editTableData) {
            setTitle(editTableData.title);
            setImpressions(editTableData.impressions);
            setClicks(editTableData.clicks);
            setConversions(editTableData.conversions);
            setMediaCost(editTableData.mediaCost);
            setCtr(editTableData.ctr);
            setCpm(editTableData.cpm);
            setCpc(editTableData.cpc);
            setCpa(editTableData.cpa);
            setSelectedDate(editTableData?.date)
        }
    }, [editTableData])

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    function handleStateChange(event) {
        setCityList(event.target.value.city);
        setSelectedState(event.target.value);
    };

    function handleCityChange(event) {
        setSelectedCity(event.target.value);
    };

    async function handleSubmit() {
        try {
            if (title) {
                const body = {
                    "date": "2022-03-10",
                    "title": title,
                    "impressions": impressions,
                    "clicks": clicks,
                    "conversions": conversions,
                    "mediaCost": mediaCost,
                    "ctr": ctr,
                    "cpm": cpm,
                    "cpc": cpc,
                    "cpa": cpa,
                    "campaignId": editTableData?.id
                }

                const response = await AdverticeNetwork.editCampaignApi(body, auth);
                if (response.errorCode === 0) {
                    fetchCampaignList();
                    handleClose();
                }
            }

        } catch (error) {

        }
    };

    return (
        <React.Fragment>
            <Typography variant="h6" sx={{ mt: "2rem", textAlign: "center", fontWeight: "bold" }}>Create Organisation</Typography>
            <form
                style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    // alignItems: "center",
                    padding: "2rem",
                }}
            >
                 <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                        label="Select Date"
                        value={selectedDate}
                        onChange={handleDateChange}
                        renderInput={(params) => <TextField {...params} />}
                    />
                </LocalizationProvider>
                <TextField
                    variant="outlined"
                    type="text"
                    label="Title"
                    name="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    sx={{ gridColumn: "span 12",  marginTop: "30px", width: "430px" }}
                />

                <TextField
                    variant="outlined"
                    type="number"
                    label="Impressions"
                    name="impressions"
                    value={impressions}
                    onChange={(e) => setImpressions(e.target.value)}
                    sx={{
                        gridColumn: "span 12",
                        marginTop: "30px",
                        width: "430px",
                    }}
                />
                <TextField
                    variant="outlined"
                    type="number"
                    label="Clicks"
                    name="Clicks"
                    value={clicks}
                    onChange={(e) => setClicks(e.target.value)}
                    sx={{
                        gridColumn: "span 12",
                        marginTop: "30px",
                        width: "430px",
                    }}
                />
                <TextField
                    variant="outlined"
                    type="tel"
                    label="Conversions"
                    name="conversions"
                    value={conversions}
                    onChange={(e) => setConversions(e.target.value)}
                    sx={{
                        gridColumn: "span 12",
                        marginTop: "30px",
                        width: "430px",
                    }}
                />
                <TextField
                    variant="outlined"
                    type="tel"
                    label="Media Cost"
                    name="mediaCost"
                    value={mediaCost}
                    onChange={(e) => setMediaCost(e.target.value)}
                    sx={{
                        gridColumn: "span 12",
                        marginTop: "30px",
                        width: "430px",
                    }}
                />
                <TextField
                    variant="outlined"
                    type="tel"
                    label="Ctr"
                    name="ctr"
                    value={ctr}
                    onChange={(e) => setCtr(e.target.value)}
                    sx={{
                        gridColumn: "span 12",
                        marginTop: "30px",
                        width: "430px",
                    }}
                />
                <TextField
                    variant="outlined"
                    type="tel"
                    label="Cpm"
                    name="cpm"
                    value={cpm}
                    onChange={(e) => setCpm(e.target.value)}
                    sx={{
                        gridColumn: "span 12",
                        marginTop: "30px",
                        width: "430px",
                    }}
                />
                <TextField
                    variant="outlined"
                    type="tel"
                    label="Cpc"
                    name="cpc"
                    value={cpc}
                    onChange={(e) => setCpc(e.target.value)}
                    sx={{
                        gridColumn: "span 12",
                        marginTop: "30px",
                        width: "430px",
                    }}
                />
                <TextField
                    variant="outlined"
                    type="tel"
                    label="Cpa"
                    name="cpa"
                    value={cpa}
                    onChange={(e) => setCpa(e.target.value)}
                    sx={{
                        gridColumn: "span 12",
                        marginTop: "30px",
                        width: "430px",
                    }}
                />
                {/* <InputLabel id="state-label" sx={{ left: '10px', marginTop: "15px", }}>State</InputLabel>
                <Select
                    value={selectedState}
                    label="state"
                    labelId='state-label'
                    onChange={handleStateChange}
                    sx={{ minWidth: 430, }}
                    disableUnderline
                >
                    {stateList.map((state) => {
                        return (
                            <MenuItem value={state} key={state.id}>
                                {state.name}
                            </MenuItem>
                        );
                    })}
                </Select>
                {selectedState.id !== undefined &&
                    <>
                        <InputLabel id="city-label" sx={{ left: '10px', marginTop: "15px", }}>City</InputLabel>
                        <Select
                            value={selectedCity}
                            label="city"
                            labelId='city-label'
                            onChange={handleCityChange}
                            sx={{ minWidth: 430 }}
                            disableUnderline
                        >
                            {cityList.map((city) => {
                                return (
                                    <MenuItem value={city} key={city.id}>
                                        {city.city}
                                    </MenuItem>
                                );
                            })}
                        </Select>
                    </>
                } */}
                <Stack
                    width={"100%"}
                    justifyContent={"end"}
                    gap={"1rem"}
                    direction={"row"}
                    style={{ marginTop: "1rem" }}
                >
                    <Button
                        color="error"
                        variant="contained"
                        sx={{
                            padding: "1rem",
                            borderRadius: "0.8rem",
                        }}
                        onClick={handleClose}
                    // color="error"
                    >
                        CANCEL
                    </Button>
                    <Button
                        disabled={!title ? true : false}
                        variant="contained"
                        onClick={handleSubmit}
                        color="success"
                        sx={{
                            padding: "1rem",
                            borderRadius: "0.8rem",
                        }}
                    >
                        Save
                    </Button>
                </Stack>
            </form>
        </React.Fragment>
    );
}
