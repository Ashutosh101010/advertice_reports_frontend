import { Avatar, Box, Grid, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import Endpoints from "../../../baseurl/EndPoint";
import ChangeCircleIcon from "@mui/icons-material/ChangeCircle";

const UserProfile = ({ profileDetails }) => {

    const [name, setName] = useState('');
    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [contact, setContact] = useState('');
    const [bio, setBio] = useState('');
    const [address, setAddress] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        if (profileDetails?.id) {
            setName(profileDetails?.name);
            setUserName(profileDetails?.username);
            setEmail(profileDetails?.email);
            setContact(profileDetails?.contact);
            setBio(profileDetails?.bio);
            setAddress(profileDetails?.address);
            setPassword(profileDetails?.password)
        }
    }, [profileDetails])


    return (
        <React.Fragment>
            <Box>
                <Grid container>
                    <Grid xs={12} sm={12} md={12} lg={12} sx={{ pr: 2 }}>
                        <label htmlFor={profileDetails.id}>
                            <Avatar
                                sx={{
                                    marginBottom: "15px !important",
                                    width: "120px",
                                    height: "120px",
                                    margin: "0 auto",
                                    // display: "block",
                                }}
                                src={`${Endpoints.baseURL}${profileDetails.profile}`}
                            ></Avatar>
                        </label>
                        {/* <ChangeCircleIcon
                    onClick={() =>
                      document.querySelector(".logoUploadInput").click()
                    }
                    sx={{
                      fontSize: "20px",
                      position: "relative",
                      left: "50px",
                      bottom: "20px",
                    }}
                  /> */}
                        <input
                        disabled
                            className="logoUploadInput"
                            type="file"
                            name="profile"
                            id={profileDetails.id}
                            hidden
                            // onChange={(e) => {
                            //   handleAddImage(e.target.files[0], profileData.id);
                            // }}
                            accept="image/*"
                        />
                        <TextField
                            disabled
                            sx={{ mb: 2 }}
                            fullWidth
                            name="name"
                            label="Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            InputLabelProps={{
                                shrink: true, // or shrink: false
                            }}
                        />
                        <TextField
                            disabled
                            sx={{ mb: 2 }}
                            fullWidth
                            name="userName"
                            label="User Name"
                            value={userName}
                            onChange={(e) => setUserName(e.target.value)}
                            InputLabelProps={{
                                shrink: true, // or shrink: false
                            }}
                        />
                        <TextField
                            disabled
                            sx={{ mb: 2 }}
                            fullWidth
                            name="email"
                            label="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            InputLabelProps={{
                                shrink: true, // or shrink: false
                            }}
                        />
                        {/* <TextField
                            sx={{ mb: 2 }}
                            fullWidth
                            name="password"
                            label="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            InputLabelProps={{
                                shrink: true, // or shrink: false
                            }}
                        /> */}
                        <TextField
                            disabled
                            sx={{ mb: 2 }}
                            fullWidth
                            name="contact"
                            label="Contact"
                            value={contact}
                            onChange={(e) => setContact(e.target.value)}
                            InputLabelProps={{
                                shrink: true, // or shrink: false
                            }}
                        />
                        {/* <TextField
                            sx={{ mb: 2 }}
                            fullWidth
                            name="bio"
                            label="Bio"
                            value={bio}
                            onChange={(e) => setBio(e.target.value)}
                            InputLabelProps={{
                                shrink: true, // or shrink: false
                            }}
                        />
                         <TextField
                            sx={{ mb: 2 }}
                            fullWidth
                            name="address"
                            label="Address"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            InputLabelProps={{
                                shrink: true, // or shrink: false
                            }}
                        /> */}
                    </Grid>
                </Grid>
            </Box>
        </React.Fragment>
    )
};

export default UserProfile;