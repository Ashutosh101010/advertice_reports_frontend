import { Button, InputLabel, MenuItem, Select, Stack, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import AdverticeNetwork from "../../../Network";
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

export default function CreateCampaignFormModal({ handleClose, auth, organisationId, userType, fetchCampaignList }) {


    const [title, setTitle] = useState("");
    const [impressions, setImpressions] = useState(0);
    const [clicks, setClicks] = useState(0);
    const [conversions, setConversions] = useState(0);
    const [mediaCost, setMediaCost] = useState(0);
    const [ctr, setCtr] = useState(0);
    const [cpm, setCpm] = useState(0);
    const [cpc, setCpc] = useState(0);
    const [cpa, setCpa] = useState(0);
    const [organisationList, setOrganisationList] = useState([]);
    const [organisationSelect, setOrganisationSelect] = useState({});
    const [selectedCity, setSelectedCity] = useState({});
    const [selectedDate, setSelectedDate] = useState(null);

    useEffect(() => {
        fetchOrganisationList();
    }, [])

    const fetchOrganisationList = async () => {
        try {
            const body = {
                "page": 0,
                "pageSize": 100
            }
            const response = await AdverticeNetwork.fetchSuperAdminOrganisationApi(body, auth);
            if (response.errorCode === 0) {
                setOrganisationList(response.organisations);
            }
        } catch (error) {
            console.log(error);
        }
    }

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };


    function handleOrganisation(event) {
        setOrganisationSelect(event.target.value);
    };

    function handleCityChange(event) {
        setSelectedCity(event.target.value);
    };

    function handleDobChange(newValue) {
        setDob(newValue);
    };

    async function handleSubmit() {
        const ordId = organisationSelect?.id ? organisationSelect?.id : organisationId
        try {
            if (title) {
                const body = {
                    "date": selectedDate !== null ? selectedDate.format('YYYY-MM-DD') : '',
                    "title": title,
                    "impressions": Number(impressions),
                    "clicks": Number(clicks),
                    "conversions": Number(conversions),
                    "mediaCost": Number(mediaCost),
                    "ctr": Number(ctr),
                    "cpm": Number(cpm),
                    "cpc": Number(cpc),
                    "cpa": Number(cpa)
                }

                const response = await AdverticeNetwork.createCampaignApi(body, auth, ordId);
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
                    sx={{ gridColumn: "span 12", marginTop: "30px", width: "430px" }}
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
                    type="number"
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
                    type="number"
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
                {
                    userType === "superadmin" && (
                        <>
                            <InputLabel id="state-label" sx={{ left: '10px', marginTop: "15px", }}>Organisation</InputLabel>
                            <Select
                                value={organisationSelect}
                                label="state"
                                labelId='state-label'
                                onChange={handleOrganisation}
                                sx={{ minWidth: 430, }}
                                disableUnderline
                            >
                                {organisationList.map((org, i) => {
                                    return (
                                        <MenuItem value={org} key={i}>
                                            {org.email}
                                        </MenuItem>
                                    );
                                })}
                            </Select>
                        </>
                    )
                }

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
