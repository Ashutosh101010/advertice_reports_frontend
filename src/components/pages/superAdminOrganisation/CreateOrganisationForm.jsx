import { Button, InputLabel, MenuItem, Select, Stack, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import AdverticeNetwork from "../../../Network";

export default function CreateFormModal({ handleClose, fetchOrganisationList, auth, stateList }) {


    const [address, setAddress] = useState("");
    const [owner, setOwner] = useState("");
    const [email, setEmail] = useState("");
    const [contact, setContact] = useState();
    const [cityList, setCityList] = useState([]);
    const [selectedState, setSelectedState] = useState({});
    const [selectedCity, setSelectedCity] = useState({});
    const [title, setTitle] = useState('');

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
                const response = await AdverticeNetwork.createOrganisationApi(body, auth);
                if (response.errorCode === 0) {
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
            }}>Create Organisation</Typography>
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
                    name="address"
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
                {selectedState.id !== undefined &&
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
                    width={'100%'}
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
                        disabled={!owner || !address || !email || !contact ? true : false}
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
