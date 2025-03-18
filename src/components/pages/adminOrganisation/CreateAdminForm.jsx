import { Button, InputLabel, MenuItem, Select, Stack, TextField, Typography, IconButton, InputAdornment, } from "@mui/material";
import React, { useState } from "react";
import AdverticeNetwork from "../../../Network";
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useSnackbar } from "notistack";

export default function CreateAdminFormModal({ handleClose, fetchOrganisationList, auth, stateList, organisationId, onOpenDialog }) {


    const { enqueueSnackbar } = useSnackbar();
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
    const [showPassword, setShowPassword] = useState(false);

    const handleChangeUserName = (e) =>{
        setUserName(e.target.value)
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
                };
                if (response.errorCode !== 0) {
                    enqueueSnackbar(`${response.errorDescription}`, { variant: 'error', autoHideDuration: 3000 })
                  } else if (response.errorCode === 0) {
                    enqueueSnackbar(`${response.message !== undefined ? response.message : ""}`, { variant: 'success', autoHideDuration: 3000 })
                  };
            }

        } catch (error) {

        }
    };


    const handleTogglePassword = () => {
        setShowPassword((prev) => !prev);
    };

    return (
        <React.Fragment>
            <Typography variant="h6" sx={{
                mt: "2rem", textAlign: "center", fontWeight: "500", fontFamily: `"Roboto Condensed", sans-serif`,
                fontSize: '20px'
            }}>Create Admin</Typography>
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
                    type={showPassword ? "text" : "password"}
                    label="Password"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    sx={{ gridColumn: "span 12", marginTop: "30px", width: "430px" }}
                    autoComplete="new-password"
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton onClick={handleTogglePassword} edge="end">
                                    {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
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
                    label="User Name"
                    name="User Name"
                    value={userName}
                    onChange={(e) => handleChangeUserName(e)}
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
