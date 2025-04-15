import React from "react";
import { Box, Button, Grid, IconButton, InputAdornment, TextField, Typography, useMediaQuery } from "@mui/material";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import loginLogo from "../../assets/logo.png"
import AdverticeNetwork from "../../Network";
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useSnackbar } from "notistack";

const LoginForm = () => {

    const isNonMobile = useMediaQuery("(min-width:600px)");
    const { enqueueSnackbar } = useSnackbar();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    // const domain = window.location.host;
    const domain = "domain"

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (username && password) {
            const body = {
                "password": password,
                "userName": username
            }
            const response = await AdverticeNetwork.adminLoginApi(body, domain);
            if (response.errorCode === 0) {
                localStorage.setItem('accessToken', response.authToken);
                localStorage.setItem('organizationId', response.organizationId)
                localStorage.setItem('userType', "admin");
                localStorage.setItem('adminModal', JSON.stringify(response?.adminModal));

                navigate('/')
                enqueueSnackbar("Login Successful", {
                    variant: "success",
                    autoHideDuration: 3000,
                    anchorOrigin: { vertical: "top", horizontal: "right" }
                });
            } else {
                enqueueSnackbar(response.errorDescription || "Something went wrong", {
                    variant: "error",
                    autoHideDuration: 3000,
                    anchorOrigin: { vertical: "top", horizontal: "right" }
                });
            }
        } else {
            enqueueSnackbar("Please enter both username and password", {
                variant: "warning",
                autoHideDuration: 3000,
                anchorOrigin: { vertical: "top", horizontal: "right" }
            });
        }
    };

    const [showPassword, setShowPassword] = useState(false);

    const handleTogglePassword = () => {
        setShowPassword((prev) => !prev);
    };

    return (
        <React.Fragment>
            <Box className="content" sx={{
                backgroundPosition: "center top",
                backgroundRepeat: 'no-repeat',
            }}>
                <Box sx={{ height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <Grid container margin="10px" sx={{ height: "90vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <Grid item xs={12} sm={12} md={6} lg={4} sx={{ background: "rgb(255, 255, 255)", padding: "40px", boxShadow: 'rgba(0, 0, 0, 0.08) 0px 6px 30px', borderRadius: "20px", color: "rgb(17, 25, 39)", textAlign: "center" }}>
                            <Box>
                                <Box>
                                    <Grid container>
                                        <Grid item xs={12} sm={12} md={12} lg={12}>
                                            <Box>
                                                <img src={loginLogo} className="logo login-logo" />
                                            </Box>
                                            <Box justifyContent="center" alignItems="center" fontWeight={'500'}>
                                                <Typography sx={{ fontSize: '16px', fontWeight: '500', fontFamily: `"Roboto Condensed", sans-serif` }}>Login</Typography>
                                            </Box>
                                        </Grid>
                                    </Grid>
                                </Box>

                                <form onSubmit={handleSubmit}>
                                    <Box sx={{
                                        '& > div': { gridColumn: isNonMobile ? undefined : 'span 4' },
                                    }}>
                                        <TextField
                                            fullWidth
                                            variant="outlined"
                                            type="text"
                                            label={<Typography color={'#000'} fontFamily={`"Roboto Condensed", sans-serif`}>Username</Typography>}
                                            onChange={(e) => setUsername(e.target.value)}
                                            value={username}
                                            name="username"
                                            sx={{
                                                margin: "15px 0px 15px 0px",
                                                "& .MuiOutlinedInput-root": {
                                                    "&.Mui-focused fieldset": {
                                                        borderColor: "black",
                                                    },
                                                },
                                                py: 1
                                            }}
                                        />
                                        <TextField
                                            fullWidth
                                            variant="outlined"
                                            type={showPassword ? "text" : "password"}
                                            label={<Typography color={'#000'} fontFamily={`"Roboto Condensed", sans-serif`}>Password</Typography>}
                                            name="Password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            sx={{
                                                gridColumn: 'span 12',
                                                "& .MuiOutlinedInput-root": {
                                                    "&.Mui-focused fieldset": {
                                                        borderColor: "black",
                                                    },
                                                },
                                            }}
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
                                    </Box>
                                    {/* <Box sx={{ marginTop: "20px", textAlign: "end" }}>  <Link to={"#"} className="forget-password">Forgot Password ?</Link></Box> */}
                                    <Box display="flex" justifyContent="center" mt="20px">
                                        <Button
                                            disabled={!username || !password ? true : false}
                                            type="submit"
                                            fullWidth
                                            variant="contained"
                                            sx={{
                                                color: "#fff !important",
                                                mb: 1,
                                                backgroundColor: "#45679F  !important",
                                                textTransform: 'none',
                                                fontFamily: `"Roboto Condensed", sans-serif`,
                                                fontSize: '16px',
                                                fontWeight: '500'
                                            }}
                                        >
                                            Sign in
                                        </Button>
                                    </Box>
                                    {/* <Box sx={{ textAlign: "center", margin: "0px 0px 20px 0px" }}>
                                        <Grid container>
                                            <Grid item xs={12} sm={12} md={12} lg={12} sx={{
                                                textAlign: 'center',
                                            }}>
                                                <p style={{ color: "#000", fontWeight: 500, fontSize: '15px' }}>Don't have an account? &nbsp;
                                                    <Link to={"#"} className="link-color">Sign up
                                                    </Link> &nbsp;
                                                </p>

                                                <Link className="link-color"><span>FAQ's |&nbsp;</span><span>SSP List |&nbsp;</span><span>Products &nbsp;</span></Link>
                                            </Grid>
                                        </Grid>
                                    </Box> */}
                                </form>

                            </Box>
                        </Grid>
                    </Grid>
                </Box>

            </Box>
        </React.Fragment>
    );
};

export default LoginForm;
