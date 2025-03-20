import {
    Box,
    Button,
    FormLabel,
    Stack,
    Typography,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import Papa from 'papaparse'
import { useSnackbar } from "notistack";
import AdverticeNetwork from "../../../Network";
import AttachFileIcon from '@mui/icons-material/AttachFile';

export default function ImportCampaignCsv({ handleClose, auth, organisationId, fetchCampaignList, selectOrgnigation }) {

    const expectedColumnNames = [
        'Title',
        'Impressions',
        'Clicks',
        'Conversions',
        'Media Cost',
        'CTR',
        'eCPM',
        'CPA',
        'eCPC',
        'Date',
        'Currency',
    ];

    const [isLoading, setLoading] = useState(false);
    const { enqueueSnackbar } = useSnackbar();
    const [csvFile, setCsvFile] = useState('');
    const [importQuestions, setImportQuestions] = useState([]);

    const handleDownload = () => {
        const link = document.createElement("a");
        link.href = sampleFile;
        link.setAttribute("download", "samplefile.csv"); // File name when downloaded
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    async function handleSubmit() {
        for (let listItem of importQuestions) {
            // console.log('Raw listItem:', listItem);

            const ordId = selectOrgnigation?.id;

            // Normalize and clean up keys (handles uppercase/lowercase and trims spaces)
            const normalizedItem = Object.keys(listItem).reduce((acc, key) => {
                const cleanKey = key.trim().toLowerCase().replace(/\s+/g, ""); // Normalize key names
                acc[cleanKey] = typeof listItem[key] === "string" ? listItem[key].trim() : listItem[key]; // Trim string values
                return acc;
            }, {});

            // Function to clean numbers by removing ₹, %, and commas
            const cleanNumber = (value) => {
                if (!value) return 0;
                return Number(value.toString().replace(/[₹,%]/g, "").replace(/,/g, "").trim()) || 0;
            };

            try {
                const body = {
                    "date": normalizedItem?.date, // Ensure correct date format
                    "title": normalizedItem?.title,
                    "impressions": cleanNumber(normalizedItem?.impressions),
                    "clicks": cleanNumber(normalizedItem?.clicks),
                    "conversions": Number(normalizedItem?.conversions), // Keeping as string
                    "mediaCost": cleanNumber(normalizedItem?.mediacost || normalizedItem?.mediacost), // Trims and normalizes "Media Cost"
                    "ctr": cleanNumber(normalizedItem?.ctr),
                    "cpm": cleanNumber(normalizedItem?.ecpm),
                    "cpc": cleanNumber(normalizedItem?.ecpc),
                    "cpa": cleanNumber(normalizedItem?.cpa),
                    "organizationId": ordId,
                    "currency": normalizedItem?.currency
                };
                const response = await AdverticeNetwork.createCampaignApi(body, auth);
                if (response.errorCode === 0) {
                    fetchCampaignList();
                }
                if (response.errorCode !== 0) {
                    enqueueSnackbar(`${response.errorDescription}`, { variant: 'error', autoHideDuration: 3000 });
                } else if (response.errorCode === 0) {
                    enqueueSnackbar(`${response.message !== undefined ? response.message : ""}`, { variant: 'success', autoHideDuration: 3000 });
                }
            } catch (error) {
                console.error("Error submitting campaign:", error);
            }
        }
        handleClose();
    };

    const handleFileUploadCsv = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const csvData = e.target.result;
                Papa.parse(csvData, {
                    complete: (result) => {
                        const validationError = validateHeader(result.meta.fields);
                        if (validationError) {
                            enqueueSnackbar(`Invalid header: ${validationError}`, { variant: 'error', autoHideDuration: 3000 });
                            return;
                        }

                        setCsvFile(file);

                        // Filter out empty rows
                        const questions = result.data.filter(row => {
                            return Object.values(row).some(value => value !== null && value !== undefined && value.toString().trim() !== '');
                        });

                        setImportQuestions(questions);
                    },
                    header: true,
                    skipEmptyLines: true // Ensures empty rows are skipped
                });
            };
            reader.readAsText(file);
        }
    };


    const validateHeader = (actualColumnNames) => {
        const formattedActualColumns = actualColumnNames.map(column => column.trim().toLowerCase());
        const formattedExpectedColumns = expectedColumnNames.map(column => column.toLowerCase());

        const missingColumns = formattedExpectedColumns.filter(column => !formattedActualColumns.includes(column));

        // console.log('missingColumns', missingColumns);
        if (missingColumns.length > 0) {
            return `Missing columns: ${missingColumns.join(', ')}`;
        }

        return null;
    };

    return (
        <Box sx={{ padding: "25px" }}>
            <form>
                <Stack marginBottom={'0.2rem'} display={'flex'} justifyContent={'flex-start'} alignItems={'center'} gap={'1rem'} textAlign={'start'} fontFamily={`"Poppins", sans-serif`}>
                    <a href="/samplefile.csv" download><p>Download Sample File from here <AttachFileIcon onClick={handleDownload}
                        sx={{ cursor: "pointer", color: "blue" }} /></p></a>
                </Stack>
                <Stack marginBottom={'1rem'} textAlign={'start'} fontFamily={`"Poppins", sans-serif`}>
                    <h3>Import Campaign Form</h3>
                </Stack>
                {/* <Stack marginBottom={'1rem'} textAlign={'center'}>
                    <h4>Upload only csv file</h4>
                </Stack> */}
                <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", margin: "15px" }}>
                    <button
                        onClick={() => document.querySelector(".importCampaign").click()}
                        type="button"
                        style={{
                            width: "300px",
                            minHeight: "152px",
                            height: "100px",
                            border: "2px dashed #ccc",
                            borderRadius: "1rem",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        <div
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                            }}
                        >
                            {csvFile ? <p>{csvFile.name}</p> : <Typography sx={{ fontFamily: `"Poppins", sans-serif` }}>Upload only CSV file</Typography>}
                        </div>
                        <input
                            className="importCampaign"
                            width={"100%"}
                            height={"100%"}
                            hidden
                            onChange={handleFileUploadCsv}
                            type="file" accept=".csv"
                        />
                    </button>
                </Box>
                <FormLabel sx={{ margin: "1rem", width: "100%" }}>
                    <Stack
                        justifyContent={"end"} gap={'1rem'}
                        direction={"row"}
                    >
                        <Button
                            variant="contained"
                            // color="success"
                            component="label"
                            onClick={handleSubmit}
                            style={{ marginRight: "1rem", color: '#fff', textTransform: 'none', fontFamily: `"Poppins", sans-serif` }}>
                            Save
                        </Button>
                        <Button
                            onClick={handleClose}
                            variant="contained"
                            sx={{ textTransform: 'none', fontFamily: `"Poppins", sans-serif` }}
                            // color="error" 
                            component="label">
                            Cancel
                        </Button>

                    </Stack>
                </FormLabel>
            </form>
        </Box>
    );

}