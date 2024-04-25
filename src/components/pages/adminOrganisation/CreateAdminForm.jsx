import { Button, InputLabel, MenuItem, Select, Stack, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import AdverticeNetwork from "../../../Network";

export default function CreateAdminFormModal({ handleClose, fetchOrganisationList, auth, stateList, organisationId }) {


    const [address, setAddress] = useState("");
    const [userName, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [contact, setContact] = useState();
    const [bio, setBio] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [cityList, setCityList] = useState([]);
    const [selectedState, setSelectedState] = useState({});
    const [selectedCity, setSelectedCity] = useState({});

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
                    "bio": bio,
                    "contact": contact,
                    "email": email,
                    "name": name,
                    "password": password,
                    "userName": userName,
                    "cityId": selectedCity?.id,
                    "organisationId": organisationId
                }
                const response = await AdverticeNetwork.createAdminOrganisationApi(body, auth);
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
            <Typography variant="h6" sx={{ mt: "2rem", textAlign: "center", fontWeight: "bold" }}>Create Admin</Typography>
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
                    label="Name"
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    sx={{ gridColumn: "span 12", width: "430px" }}
                />
                <TextField
                    variant="outlined"
                    type="password"
                    label="Password"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    sx={{ gridColumn: "span 12", marginTop: "30px", width: "430px" }}
                />
                <TextField
                    variant="outlined"
                    type="text"
                    label="Bio"
                    name="bio"
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    sx={{ gridColumn: "span 12", marginTop: "30px", width: "430px" }}
                />
                <TextField
                    variant="outlined"
                    type="text"
                    label="UserName"
                    name="UserName"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    sx={{
                        gridColumn: "span 12",
                        marginTop: "30px",
                        width: "430px",
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
                        marginTop: "30px",
                        width: "430px",
                    }}
                />
                <TextField
                    variant="outlined"
                    type="text"
                    label="Address"
                    name="sddress"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    sx={{ gridColumn: "span 12", marginTop: "30px", width: "430px" }}
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
                        marginTop: "30px",
                        width: "430px",
                    }}
                />
                <InputLabel id="state-label" sx={{ left: '10px', marginTop: "15px", }}>State</InputLabel>
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
                        disabled={!address || !email || !contact ? true : false}
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
