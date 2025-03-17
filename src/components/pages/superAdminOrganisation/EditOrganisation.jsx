import { Button, InputLabel, MenuItem, Select, Stack, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import AdverticeNetwork from "../../../Network";

export default function EditFormModal({ handleClose, fetchOrganisationList, auth, stateList, editTableData }) {


    const [address, setAddress] = useState("");
    const [owner, setOwner] = useState("");
    const [email, setEmail] = useState("");
    const [contact, setContact] = useState();
    const [cityList, setCityList] = useState([]);
    const [selectedState, setSelectedState] = useState({});
    const [selectedCity, setSelectedCity] = useState({});
    const [title, setTitle] = useState('');

    useEffect(() => {
        if (editTableData) {
            const cityLists = []
            for (let statename of stateList) {
                if (statename.id === editTableData.stateId) {

                    setCityList(statename?.city)
                    cityLists.push(...statename?.city)
                    setSelectedState(statename);

                }
            };
            if (cityLists?.length > 0) {
                for (let cityId of cityLists) {
                    if (cityId.id === editTableData.cityId) {
                        setSelectedCity(cityId);

                    }
                }
            };
            setAddress(editTableData?.address);
            setOwner(editTableData?.owner);
            setEmail(editTableData?.email);
            setContact(editTableData?.contact);
            setTitle(editTableData?.title);
        }
    }, [editTableData])

    function handleStateChange(event) {
        setCityList(event.target.value.city);
        setSelectedState(event.target.value);
    };

    function handleCityChange(event) {
        setSelectedCity(event.target.value);
    };

    async function handleSubmit() {
        try {
            if (address && email && contact) {
                const body = {
                    "address": address,
                    "cityId": selectedCity?.id,
                    "owner": owner,
                    "email": email,
                    "contact": contact,
                    "title": title
                }
                const response = await AdverticeNetwork.editOrganisationApi(body, auth, editTableData.id);
                if (response.errorCode === 0) {
                    console.log('response', response);
                    fetchOrganisationList();
                    handleClose();
                }
            }

        } catch (error) {

        }
    };

    return (
        <React.Fragment>
            <Typography variant="h6" sx={{
                mt: "2rem", textAlign: "center", fontWeight: "500", fontFamily: `"Poppins", sans-serif`,
                fontSize: '20px'
            }}>Edit Organisation</Typography>
            <form
                style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    // alignItems: "center",
                    padding: "2rem",
                }}
            >
                <TextField
                    variant="outlined"
                    type="text"
                    label="Title"
                    name="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    sx={{
                        gridColumn: "span 12",
                        marginTop: "10px",
                        width: "100%",
                        maxWidth: '390px'
                    }}
                />
                <TextField
                    variant="outlined"
                    type="text"
                    label="Address"
                    name="sddress"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    sx={{
                        gridColumn: "span 12",
                        marginTop: "10px",
                        width: "100%",
                        maxWidth: '390px'
                    }}
                />

                <TextField
                    variant="outlined"
                    type="text"
                    label="Owner"
                    name="owner"
                    value={owner}
                    onChange={(e) => setOwner(e.target.value)}
                    sx={{
                        gridColumn: "span 12",
                        marginTop: "10px",
                        width: "100%",
                        maxWidth: '390px'
                    }}
                />
                <TextField
                    variant="outlined"
                    type="email"
                    label="Email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    sx={{
                        gridColumn: "span 12",
                        marginTop: "10px",
                        width: "100%",
                        maxWidth: '390px'
                    }}
                />
                <TextField
                    variant="outlined"
                    type="tel"
                    label="Contact"
                    name="contact"
                    value={contact}
                    onChange={(e) => setContact(e.target.value)}
                    sx={{
                        gridColumn: "span 12",
                        marginTop: "10px",
                        width: "100%",
                        maxWidth: '390px'
                    }}
                />
                <InputLabel id="state-label" sx={{ left: '0px', marginTop: "5px", }}>State</InputLabel>
                <Select
                    value={selectedState}
                    label="state"
                    labelId='state-label'
                    onChange={handleStateChange}
                    sx={{
                        gridColumn: "span 12",
                        marginTop: "10px",
                        width: "100%",
                        maxWidth: '390px'
                    }}
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
                {selectedState?.id !== undefined &&
                    <>
                        <InputLabel id="city-label" sx={{ left: '0px', marginTop: "5px", }}>City</InputLabel>
                        <Select
                            value={selectedCity}
                            label="city"
                            labelId='city-label'
                            onChange={handleCityChange}
                            sx={{
                                gridColumn: "span 12",
                                marginTop: "10px",
                                width: "100%",
                                maxWidth: '390px'
                            }}
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
                            fontFamily: `"Poppins", sans-serif`,
                            textTransform: 'none'
                        }}
                        onClick={handleClose}
                    // color="error"
                    >
                        Cancel
                    </Button>
                    <Button
                        disabled={!address || !email || !contact ? true : false}
                        variant="contained"
                        onClick={handleSubmit}
                        color="success"
                        sx={{
                            padding: "1rem",
                            borderRadius: "0.8rem",
                            fontFamily: `"Poppins", sans-serif`,
                            textTransform: 'none'
                        }}
                    >
                        Save
                    </Button>
                </Stack>
            </form>
        </React.Fragment>
    );
}
