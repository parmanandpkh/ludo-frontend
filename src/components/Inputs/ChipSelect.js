import React, { useState } from 'react';

import { Button, Chip, Box, FormControlLabel, FormHelperText, FormControl } from '@mui/material';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

import { format } from "date-fns"
import { ErrorMessage } from 'formik';


const options = [
    { value: 'apple', label: 'Apple' },
    { value: 'banana', label: 'Banana' },
    { value: 'cherry', label: 'Cherry' },
    { value: 'date', label: 'Date' },
    { value: 'fig', label: 'Fig' },
    { value: 'grape', label: 'Grape' },
    { value: 'kiwi', label: 'Kiwi' },
    { value: 'lemon', label: 'Lemon' },
    { value: 'mango', label: 'Mango' },
    { value: 'orange', label: 'Orange' },
]

function ChipSelect({ selectedDates, handleDelete, setOpen, errors, touched }) {
    const [selectedOptions, setSelectedOptions] = useState([]);

    const handleOptionSelect = (event, newValue) => {
        setSelectedOptions(newValue);
    };


    return (
        <>
            <div>
                <FormControl fullWidth error={Boolean(touched.assignedDate && errors.assignedDate)} >
                    <Box sx={{
                        border: errors?.assignedDate?.length ? "1px solid red" : "1px solid #ccc",
                        borderRadius: "6px",
                        minHeight: "1.4375em",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        position: "relative",
                        cursor: "pointer"
                    }}
                        onClick={() => setOpen(true)}
                    >
                        <span style={{
                            position: "absolute",
                            top: "-10px",
                            left: "10px",
                            fontSize: 13,
                            color: errors?.assignedDate?.length ? "red" : "#757575",
                            background: "#fff",
                            padding: "0px 3px"
                        }}>Assign Date</span>
                        <Box sx={{ p: 1.2 }}>
                            {
                                selectedDates.map((d, idx) => (
                                    <Chip sx={{ mx: 0.4, mb: 0.2, fontSize: 13 }} key={"s"} label={format(d, 'dd/MM/yyyy')} onDelete={() => handleDelete(idx)} />
                                ))
                            }
                        </Box>
                        <Button >
                            <CalendarMonthIcon onClick={() => setOpen(true)} sx={{ my: 0.8 }} />
                        </Button>
                    </Box>
                    <FormHelperText>  <ErrorMessage name="assignedDate" /></FormHelperText>
                </FormControl>
            </div>
        </>
    );
}

export default ChipSelect;
