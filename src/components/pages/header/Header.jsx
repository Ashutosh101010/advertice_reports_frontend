import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import { useNavigate } from 'react-router-dom';
import loginLogo from "../../../assets/advertice-logo.png";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import SearchIcon from "@mui/icons-material/Search";
import { Box, Dialog, DialogContent, IconButton, InputBase, Stack } from '@mui/material';
import { styled, alpha } from '@mui/material/styles';
import { useSnackbar } from 'notistack';

const pages = ['Campaigns', 'Basic', 'Advance', 'Organisation'];
const settings = ['Profile', 'Dashboard', 'Logout'];

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: "10rem",
    backgroundColor: "transparent",
    border: "1px solid #e69c47",
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
        marginRight: '10px'
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#bebebe'
}));
const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'black',
    width: '100%',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        [theme.breakpoints.up('sm')]: {
            width: '12ch',
            '&:focus': {
                width: '20ch',
            },
        },
    },
}));


function TopHeader() {

    const userType = localStorage.getItem("userType");
    const [anchorElNav, setAnchorElNav] = useState(null);
    const [anchorElUser, setAnchorElUser] = useState(null);
    const [active, setActive] = useState('Dashboard');
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();
    const [anchorEl, setAnchorEl] = useState(null);
    const [openProfile, setOpenProfile] = useState(false);

    const handleOpenProfile = () => {
        setOpenProfile(true);
    };

    const handleCloseProfile = () => {
        setOpenProfile(false);
    };

    function handleClick(event) {
        if (anchorEl !== event.currentTarget) {
            // setAnchorEl(event.currentTarget);
            navigate('/reports/advance')
        }
    }

    function handleClose(e) {
        if (e.target.outerText === 'Basic') {
            navigate('/reports/basic')
        }
        if (e.target.outerText === 'Advance') {
            navigate('/reports/advance')
        }
        setAnchorEl(null);
    }

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = (value) => {
        setAnchorElNav(null);

        if (userType === "superadmin" && value === "Organisation") {
            value = "superadminorganisation"
        }
        if (userType === "admin" && value === "Organisation") {
            value = 'adminorganisation'
        }
        // console.log('value', value);
        handleHeaderMenu(value)
    };

    const handleCloseUserMenu = (e) => {

        if (e.target.outerText === "Logout") {
            if (userType === "superadmin") {
                navigate('/super-admin-login')
            } else {
                navigate('/advertice-login')
            }
            enqueueSnackbar(`${'Log Out Successfully'}`, { variant: 'success', autoHideDuration: 3000, anchorOrigin: { vertical: "top", horizontal: "right" } })
        } else if (e.target.outerText === "Dashboard") {
            navigate('/')
        } 
        // else if (e.target.outerText === "Profile") {
        //     handleOpenProfile();
        // }
        // localStorage.clear();
        setAnchorElUser(null);
    };

    const handleHeaderMenu = (values) => {
        if (values === "Dashboard") {
            navigate('/');
        } else if (values === "Campaigns") {
            navigate('/campaigns');
        } else if (values === "Pixel") {
            navigate('/campaigns');
        } else if (values === "superadminorganisation") {
            navigate('/super-admin-organisation');
        } else if (values === "adminorganisation") {
            navigate('/admin-organisation');
        } else if (values === 'Reports') {
            navigate('/reports/advance')
        } else if (values === 'Reports') {
            navigate('/reports/advance')
        }
        setActive(values);
    }

    const handleHome = () => {
        navigate('/');
    };

    return (
        <>
            <AppBar position="static" className='top-header'>
                <Toolbar disableGutters sx={{ margin: "0px 25px" }}>
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        href="#app-bar-with-responsive-menu"
                        sx={{
                            mr: 2,
                            display: { xs: 'none', md: 'flex' },
                            fontFamily: 'monospace',
                            fontWeight: 500,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        <img onClick={handleHome} src={loginLogo} className='header-logo' />
                    </Typography>

                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon color='action' />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={() => handleCloseNavMenu()}
                            sx={{
                                display: { xs: 'block', md: 'none' },
                            }}
                        >
                            {pages.map((page) => (
                                <MenuItem key={page} onClick={() => handleCloseNavMenu(page)}>
                                    <Typography textAlign="center" fontFamily={`"Arial", sans-serif`} fontSize={'16px'}>{page}</Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                    <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
                    <Typography
                        onClick={handleHome}
                        variant="h5"
                        noWrap
                        component="a"
                        href="#app-bar-with-responsive-menu"
                        sx={{
                            mr: 2,
                            display: { xs: 'flex', md: 'none' },
                            flexGrow: 1,
                            fontFamily: 'monospace',
                            fontWeight: 500,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        <img src={loginLogo} className='header-logo' />
                    </Typography>
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, color: "white !important" }}>
                        {/* <Button
                        className={active === "Dashboard" ? "hearder-left-btn-active" : 'hearder-btn'}
                        onClick={() => handleHeaderMenu("Dashboard")}
                    >
                        Dashboard
                    </Button> */}
                        <Button
                            sx={{
                                fontFamily: `"Poppins", sans-serif`,
                                fontSize: '16px'
                            }}
                            className={active === "Campaigns" ? "hearder-left-btn-active" : 'hearder-btn'}
                            onClick={() => handleHeaderMenu("Campaigns")}
                        >
                            Campaigns
                        </Button>
                        <Button
                            // className='hearder-btn'
                            className={active === "Reports" ? "hearder-left-btn-menu-active" : 'hearder-btn'}
                            sx={{
                                fontFamily: `"Poppins", sans-serif`,
                                cursor: 'pointer',
                                fontSize: '16px'
                            }}
                            aria-owns={anchorEl ? "simple-menu" : undefined}
                            aria-haspopup="true"
                            onClick={() => handleHeaderMenu("Reports")}
                        // onMouseOver={handleClick}
                        >
                            Reports
                        </Button>
                        {
                            userType === "superadmin" ?
                                <Button
                                    sx={{
                                        fontFamily: `"Poppins", sans-serif`,
                                        fontSize: '16px'
                                    }}
                                    className={active === "superadminorganisation" ? "hearder-left-btn-active" : 'hearder-btn'}
                                    onClick={() => handleHeaderMenu("superadminorganisation")}
                                >
                                    Organisation
                                </Button>
                                : userType === "admin" ? ""
                                    // <Button className={active === "adminorganisation" ? "hearder-left-btn-active" : 'hearder-btn'} onClick={() => handleHeaderMenu("adminorganisation")}>
                                    //     Organisation
                                    // </Button> 
                                    : ""
                        }

                        <Menu
                            position="relative"
                            slotProps={{
                                paper: {
                                    sx: {
                                        width: '100%',
                                        maxWidth: '200px',
                                    },
                                }
                            }}
                            id="simple-menu"
                            anchorEl={anchorEl}
                            open={Boolean(anchorEl)}
                            onClose={handleClose}
                            MenuListProps={{ onMouseLeave: handleClose }}
                        >
                            <MenuItem
                                className={active === "Basic" ? "hearder-left-btn-menu-active" : 'hearder-btn'}
                                onClick={(e) => {
                                    handleClose(e);
                                    handleHeaderMenu("Basic");
                                }}
                                sx={{
                                    fontFamily: `"Poppins", sans-serif`,
                                    fontSize: '16px'
                                }}
                            >Basic
                            </MenuItem>
                            {/* <MenuItem
                            className={active === "Billing" ? "hearder-left-btn-menu-active" : 'hearder-btn'}
                            onClick={(e) => {
                                handleClose(e);
                                handleHeaderMenu("Billing");
                            }}>Billing
                        </MenuItem> */}
                            <MenuItem
                                className={active === "Advance" ? "hearder-left-btn-menu-active" : 'hearder-btn'}
                                onClick={(e) => {
                                    handleClose(e);
                                    handleHeaderMenu("Advance");
                                }}
                                sx={{
                                    fontFamily: `"Poppins", sans-serif`,
                                    fontSize: '16px'
                                }}
                            >
                                Advance
                            </MenuItem>
                            {/* <MenuItem
                            className={active === "Video" ? "hearder-left-btn-menu-active" : 'hearder-btn'}
                            onClick={(e) => {
                                handleClose(e);
                                handleHeaderMenu("Video");
                            }}>Video Stats
                        </MenuItem> */}
                        </Menu>
                    </Box>

                    <Box sx={{ flexGrow: 0, display: { xs: 'none', md: 'flex' } }}>

                        {/* <Search>
                        <SearchIconWrapper>
                            <SearchIcon />
                        </SearchIconWrapper>
                        <StyledInputBase
                            placeholder="Search Campaign"
                            inputProps={{ 'aria-label': 'search' }}
                        />
                    </Search> */}
                        {/* <Button className='hearder-right-btn'>
                        Create Campaign
                    </Button>
                    <Button className='hearder-right-btn'>
                        Add Funds
                    </Button> */}
                        <Tooltip title="Open settings">
                            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                <Avatar alt="Hemlata Rajpoot" src="/static/images/avatar/2.jpg" />
                            </IconButton>
                        </Tooltip>
                        <Menu
                            sx={{ mt: '45px' }}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                        >
                            {settings.map((setting) => (
                                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                                    <Typography textAlign="center" fontFamily={`"Roboto Condensed", sans-serif`} fontSize={'16px'}>{setting}</Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                </Toolbar>
            </AppBar>
            {/* <Dialog
                open={openProfile}
                onClose={handleCloseProfile}
                sx={{
                    "& .MuiDialog-container": {
                        "& .MuiPaper-root": {
                            width: "100%",
                            maxWidth: "500px",
                            borderRadius: '10px',
                            background: '#F5F5F5',
                        },
                    },
                }}
            >
                <DialogContent>
                    <Stack direction={'column'} spacing={2}>
                        <Typography
                            sx={{
                                fontSize: '20px',
                                fontWeight: '500',
                                fontFamily: `"Poppins", sans-serif`,
                                textAlign: 'center'
                            }}
                        >
                            Admin Profile
                        </Typography>
                        <Avatar alt="Hemlata Rajpoot" src="/static/images/avatar/2.jpg" />
                    </Stack>
                </DialogContent>
            </Dialog> */}
        </>
    );
}
export default TopHeader;