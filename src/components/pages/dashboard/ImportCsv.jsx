import {
    Box,
    Button,
    FormLabel,
    Stack,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import Papa from 'papaparse'
import { useSnackbar } from "notistack";
import AdverticeNetwork from "../../../Network";

export default function ImportDashboardCsv({ handleClose, auth, fetchCampaignList }) {

    const expectedColumnNames = [
        'title',
        'impression',
        'clicks',
        'conversions',
        'mediacost',
        'ctr',
        'cpm',
        'cpa',
        'cpc'
    ];


    const [isLoading, setLoading] = useState(false);
    const { enqueueSnackbar } = useSnackbar();
    const [csvFile, setCsvFile] = useState('');
    const [importQuestions, setImportQuestions] = useState([]);

    async function handleSubmit() {
        for (let listItem of importQuestions) {
            try {
                const body = {
                    "date": listItem?.date,
                    "title": listItem?.title,
                    "impressions": Number(listItem?.impression),
                    "clicks": Number(listItem?.clicks),
                    "conversions": Number(listItem?.conversions),
                    "mediaCost": Number(listItem?.mediacost),
                    "ctr": Number(listItem?.ctr),
                    "cpm": Number(listItem?.cpm),
                    "cpc": Number(listItem?.cpc),
                    "cpa": Number(listItem?.cpa)
                }


                const response = await AdverticeNetwork.importCsvDashboard(body, auth);

                if (response.errorCode === 0) {
                    fetchCampaignList();

                }


            } catch (error) {

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
                            enqueueSnackbar(`Invalid header: ${validationError}`, { variant: 'error', autoHideDuration: 3000 })
                            return;
                        }
                        setCsvFile(file)
                        const questions = [];

                        result.data.forEach((row) => {
                            questions.push(row);
                        });

                        setImportQuestions(questions);
                    },
                    header: true,
                });
            };

            reader.readAsText(file);
        }
    };

    const validateHeader = (actualColumnNames) => {
        const missingColumns = expectedColumnNames.filter(column => !actualColumnNames.includes(column));

        if (missingColumns.length > 0) {
            return `Missing columns: ${missingColumns.join(', ')}`;
        }

        return null;
    };


    return (
        <Box sx={{ padding: "25px" }}>
            <form>
                <Stack marginBottom={'1rem'} textAlign={'center'}>
                    <h4>Upload only csv file</h4>
                </Stack>
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
                            {csvFile ? <p>{csvFile.name}</p> : ""}
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
                            style={{ marginRight: "1rem", color: '#fff' }}>
                            Save
                        </Button>
                        <Button
                            onClick={handleClose}
                            variant="contained"
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