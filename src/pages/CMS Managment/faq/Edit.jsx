import React, { useEffect, useState } from 'react'
import {
    Box,
    CardHeader,
    CardContent,
    Grid,
    TextField,
    FormHelperText,
    Button,
    Stack,
    Select,
    MenuItem,
} from "@mui/material";
import { useNavigate, useParams } from 'react-router-dom';
import cmsService from 'src/api/cmsService';
import { Form, FormikProvider, useFormik } from 'formik';
import * as Yup from "yup";
import { Icon } from "@iconify/react";
import errorHandler from 'src/utils/errorHandler';
import CardLayout from 'src/layouts/CardLayout';
import { toast } from 'react-toastify';





const FaqEdit = () => {
    const [cmsData, setCmsData] = useState([])
    const navigate = useNavigate();
    const { id } = useParams()


    useEffect(() => {
        const getFaq = async () => {
            try {
                const { data } = await cmsService.getOneFaq(id)
                setCmsData(data?.data)
            }
            catch (error) {
                console.log("error")
                errorHandler(error)
            }
        }

        if (id) {
            getFaq()
        }
    }, [id])

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            title: cmsData?.title || "",
            description: cmsData?.description || "",

        },
        validationSchema: Yup.object({
            title: Yup.string().required("Question is required"),
            description: Yup.string().required("Answer is required"),
        }),
        onSubmit: (values) => {
            handleSumbit(values)
        }
    });

    const handleSumbit = async (values) => {
        try {
            if(id){
                values.slug = "faqs"
                values.id = id
            }
            const response = id ? await cmsService.EditFaq(values) : await cmsService.addFaq(values)
            toast.success(response.data?.message)
            navigate("/cms/faq")
            console.log("response", response)
        } catch (error) {
            errorHandler(error)
        }
    }

    const { errors, touched, values, getFieldProps, setFieldValue } = formik;

    return (
        <Box>
            <CardLayout>
                <CardHeader title={id ? "Edit FAQ" : "Add FAQ"} />
                <CardContent>
                    <FormikProvider value={formik}>
                        <Form autoComplete="off" noValidate onSubmit={formik.handleSubmit}>
                            <Grid container spacing={3} direction={"column"} xs={12} md={6}>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        label="Question"
                                        required
                                        error={Boolean(touched.title && errors.title)}
                                        helperText={touched.title && errors.title}
                                        {...getFieldProps("title")}
                                    />
                                </Grid>
                                <Grid item sx={12}>
                                    <TextField
                                        fullWidth
                                        label="Answer"
                                        multiline
                                        rows={5}
                                        required
                                        error={Boolean(touched.description && errors.description)}
                                        helperText={touched.description && errors.description}
                                        {...getFieldProps("description")}
                                    />
                                </Grid>



                            </Grid>
                            <Stack
                                spacing={2}
                                mt={3}
                                direction="row"
                                alignItems="center"
                                justifyContent="flex-end"
                            >
                                <Button
                                    type="submit"
                                    variant="contained"
                                    startIcon={<Icon icon="fa-solid:save" />}
                                >
                                    {id ? "Edit" : "Add"}
                                </Button>
                                <Button
                                    type="button"
                                    variant="outlined"
                                    onClick={() => navigate(-1)}
                                    className='hoverWhite'
                                >
                                    Cancel
                                </Button>
                            </Stack>
                        </Form>
                    </FormikProvider>
                </CardContent>
            </CardLayout>
        </Box>
    )
}

export default FaqEdit