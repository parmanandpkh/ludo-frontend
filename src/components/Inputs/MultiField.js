
import { Box, TextField, Grid, Button } from "@mui/material"
import { FieldArray } from "formik"
import { useState } from "react"

const MultiField = ({
    name,
    values,
    label,
    errors,
    touched,
    valKey,
    getFieldProps,
    refFunc,
    removeBranchHandler
}) => {
    return (
        <>
            <FieldArray name={name} >
                {
                    ({ push, remove }) => {
                        refFunc.current = push
                        return (
                            <Grid container spacing={3} mt={2}>
                                {values[name].map((val, i) => {
                                    return (
                                        <>
                                            <Grid item sm={12} md={6} >

                                                <Box sx={{ display: 'flex' }}>
                                                    <TextField
                                                        InputLabelProps={{ shrink: true }}
                                                        name={`${name}[${i}].${valKey}`}
                                                        label={`${label} ${i + 1}`}
                                                        fullWidth {...getFieldProps(`${name}[${i}].${valKey}`)}
                                                        error={Boolean(errors?.[name]?.length && errors?.[name][i]?.[valKey])}
                                                        helperText={errors?.[name]?.length && errors?.[name][i]?.[valKey]}
                                                    />
                                                    {values?.[name]?.length !== 1 &&
                                                        <Button onClick={() => {
                                                            remove(i)
                                                            if (removeBranchHandler && val?._id !== undefined) {
                                                                console.log(val._id)
                                                                removeBranchHandler(val._id)
                                                            }
                                                        }} sx={{ color: 'error.main', ml: 2, height: 55 }} variant="outlined" color="error" className="btn btn-danger mr-2">
                                                            Delete
                                                        </Button>
                                                    }
                                                </Box>
                                            </Grid>



                                        </>
                                    )
                                })}

                            </Grid>
                        )
                    }}

            </FieldArray >
        </>
    )
}


export default MultiField



/*
 && touched?.[name]?.length && touched?.[name][i]?.[valKey]
 && touched?.[name]?.length && touched?.[name][i]?.[valKey]
 */