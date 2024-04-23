import React, { useState } from "react";
import { Card, Box, IconButton, Switch, styled, useTheme, FormControlLabel } from '@mui/material';
import { DataGrid } from "@mui/x-data-grid";
import Label from "../label/Label";
import { sentenceCase } from "change-case";
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';
import EditIcon from '@mui/icons-material/Edit';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { Link } from "react-router-dom";

const IOSSwitch = styled((props) => (
    <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(({ theme }) => ({
    width: 42,
    height: 26,
    padding: 0,
    '& .MuiSwitch-switchBase': {
        padding: 0,
        margin: 2,
        transitionDuration: '300ms',
        '&.Mui-checked': {
            transform: 'translateX(16px)',
            color: '#fff',
            '& + .MuiSwitch-track': {
                backgroundColor: theme.palette.mode === 'dark' ? '#2ECA45' : '#65C466',
                opacity: 1,
                border: 0,
            },
            '&.Mui-disabled + .MuiSwitch-track': {
                opacity: 0.5,
            },
        },
        '&.Mui-focusVisible .MuiSwitch-thumb': {
            color: '#33cf4d',
            border: '6px solid #fff',
        },
        '&.Mui-disabled .MuiSwitch-thumb': {
            color:
                theme.palette.mode === 'light'
                    ? theme.palette.grey[100]
                    : theme.palette.grey[600],
        },
        '&.Mui-disabled + .MuiSwitch-track': {
            opacity: theme.palette.mode === 'light' ? 0.7 : 0.3,
        },
    },
    '& .MuiSwitch-thumb': {
        boxSizing: 'border-box',
        width: 22,
        height: 22,
    },
    '& .MuiSwitch-track': {
        borderRadius: 26 / 2,
        backgroundColor: theme.palette.mode === 'light' ? '#E9E9EA' : '#39393D',
        opacity: 1,
        transition: theme.transitions.create(['background-color'], {
            duration: 500,
        }),
    },
}));

const CampaignData = [
    {
        id: 1,
        date: "2024-02-29",
        campaigns: "(7953) new test",
        impression: "121338",
        clicks: "1529",
        conversions: '0',
        ctr: '1.26%',
        mediaCost: "397.54",
        cpm: "3.28",
        cpc: "0.26",
        cpa: '0.00',
    },
    {
        id: 2,
        date: "2024-02-29",
        campaigns: "(7953) new test",
        impression: "121338",
        clicks: "1529",
        conversions: '0',
        ctr: '1.26%',
        mediaCost: "397.54",
        cpm: "3.28",
        cpc: "0.26",
        cpa: '0.00',
    },
    {
        id: 3,
        date: "2024-02-29",
        campaigns: "(7953) new test",
        impression: "121338",
        clicks: "1529",
        conversions: '0',
        ctr: '1.26%',
        mediaCost: "397.54",
        cpm: "3.28",
        cpc: "0.26",
        cpa: '0.00',
    },
]

const BasicComponent = () => {

    const theme = useTheme();
    const [page, setPage] = useState(0);
    const [pageSize, setPageSize] = useState(25);
    const [rowCount, setRowCount] = useState(CampaignData.length);
    const [switchChecked, setSwitchChecked] = useState(true);

    const handleClick = (event) => {
        event.stopPropagation();
        setSwitchChecked(event.target.checked)
    };

    function handlePageChange(newPage) {
        setPage(newPage);
    };

    function handlePageSizeChange(newPageSize) {
        setPageSize(newPageSize);
    };

    const columns = [
        {
            field: "date",
            headerName: <p className={theme.palette.mode === "dark" ? "globalTableCss" : ""}>Date</p>,
            headerClassName: 'super-app-theme--header',
            sortable: false,
            flex: 1,
        },
        {
            field: "campaigns",
            headerName: <p className={theme.palette.mode === "dark" ? "globalTableCss" : ""}>Campaign</p>,
            headerClassName: 'super-app-theme--header',
            sortable: false,
            flex: 1,
        },
        {
            field: "impression",
            headerName: <p className={theme.palette.mode === "dark" ? "globalTableCss" : ""}>Impressions</p>,
            headerClassName: 'super-app-theme--header',
            sortable: false,
            flex: 1,
        },
        {
            field: "clicks",
            sortable: false,
            headerName: <p className={theme.palette.mode === "dark" ? "globalTableCss" : ""}>Clicks</p>,
            headerClassName: 'super-app-theme--header',
            flex: 1
        },
        {
            field: "conversions",
            sortable: false,
            headerName: <p className={theme.palette.mode === "dark" ? "globalTableCss" : ""}>Conversions</p>,
            headerClassName: 'super-app-theme--header',
            flex: 1
        },
        {
            field: "ctr",
            sortable: false,
            headerName: <p className={theme.palette.mode === "dark" ? "globalTableCss" : ""}>CTR</p>,
            headerClassName: 'super-app-theme--header',
            flex: 1
        },
        {
            field: "mediaCost",
            sortable: false,
            headerName: <p className={theme.palette.mode === "dark" ? "globalTableCss" : ""}>Media Cost</p>,
            headerClassName: 'super-app-theme--header',
            flex: 1
        },
        {
            field: "cpm",
            sortable: false,
            headerName: <p className={theme.palette.mode === "dark" ? "globalTableCss" : ""}>CPM</p>,
            headerClassName: 'super-app-theme--header',
            flex: 1
        },
        {
            field: "cpc",
            sortable: false,
            headerName: <p className={theme.palette.mode === "dark" ? "globalTableCss" : ""}>CPC</p>,
            headerClassName: 'super-app-theme--header',
            flex: 1
        },
        {
            field: "cpa",
            sortable: false,
            headerName: <p className={theme.palette.mode === "dark" ? "globalTableCss" : ""}>CPA</p>,
            headerClassName: 'super-app-theme--header',
            flex: 1
        },
    ];

    return (
        <React.Fragment>
            <Card className="card">
                <Box
                    m="40px 0 0 0"
                    height="75vh"
                    sx={{
                        '.MuiDataGrid-root .MuiDataGrid-cell:focus-within': {
                            outline: 'none !important'
                        },
                        '& > .MuiDataGrid-columnSeparator': {
                            visibility: 'hidden',
                        },
                        "& .MuiDataGrid-root": {
                            border: "1px solid #ffb6b2",
                            boxShadow:
                                "0 0 2px 0 rgba(145, 158, 171, 0.4), 0 12px 24px -4px rgba(145, 158, 171, 0.12)",
                            color: "#637381",
                        },

                        "& .MuiDataGrid-cell": {
                            borderBottom: "1px solid rgba(241, 243, 244, 1) !important",
                        },
                        "& .name-column--cell": {
                            color: "#ffb6b2",
                        },
                        "& .MuiDataGrid-columnHeaders": {
                            backgroundColor: "#ffb6b2",
                            fontWeight: "600",
                        },
                        "& .MuiDataGrid-virtualScroller": {
                            backgroundColor: "#fff",
                        },
                        "& .MuiCheckbox-root": {
                            color: `#ffb6b2 !important`,
                        },
                        "& .MuiDataGrid-row:hover": {
                            backgroundColor: "#f5f5f5 !important",
                            borderColor: "#d64a43",
                            // color: "red"
                        },
                        '& .super-app-theme--header': {
                            backgroundColor: '#ffb6b2',
                            color: 'black',
                        },
                        "& .MuiDataGrid-virtualScroller": {
                            backgroundColor: "#fff",
                        },
                        "& .MuiDataGrid-columnHeaderTitle": {
                            fontWeight: "600",
                        },
                        // "& .MuiDataGrid-row": {
                        //     border: "1px solid #ffb6b2",
                        //     borderRadius: "5px",
                        //     backgroundColor: "#fff !important",
                        //     boxShadow : "0 0 10px 4px hsla(0,0%,96.1%,.3333333333333333) !important",
                        //     borderColor: "#ffb6b2",
                        //     marginTop:1,
                        //   },
                    }}
                >
                    <DataGrid
                        paginationMode="server"
                        rowCount={rowCount}
                        page={page}
                        onPageChange={handlePageChange}
                        pageSize={pageSize}
                        onPageSizeChange={handlePageSizeChange}
                        rowsPerPageOptions={[25, 50, 100]}
                        rows={CampaignData}
                        columns={columns}
                        pagination
                        // onCellClick={handleSectionClick}
                        disableColumnMenu
                        disableColumnFilter
                        disableColumnSelector={false}
                        sx={{
                            "& .MuiDataGrid-columnHeader .MuiDataGrid-columnSeparator": {
                                display: "none",
                            },
                        }}
                    />
                </Box>
            </Card>
        </React.Fragment>
    )
};

export default BasicComponent;