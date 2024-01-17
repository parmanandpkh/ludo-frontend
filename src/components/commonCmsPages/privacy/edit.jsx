import { Icon } from '@iconify/react'
import { Button, Card, CardContent, CardHeader, Container, Grid, Stack, TextField } from '@mui/material'
import { ErrorMessage, Form, FormikProvider, useFormik } from 'formik'
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import cmsService from 'src/api/cmsService'
import EdiorJodit from 'src/components/editor/editor'
import errorHandler from 'src/utils/errorHandler'
import * as Yup from "yup"

const CommonEditPage = ({ navigateUrl, title, slugname }) => {
    const REMOVEHTML = /(<([^>]+)>)/gi;
    const REMOVENBSP = /&nbsp;/g
    const navigate = useNavigate()

    const formik = useFormik({
        initialValues: {
            slug: slugname,
            id: "",
            title: "",
            description: ""
        },
        validationSchema: Yup.object().shape({
            title: Yup.string().required("Please enter title"),
            description: Yup.string().required("Please enter description")
        }),
        onSubmit: (values) => {
            updateData(values)
        }
    })
    const { errors, touched, isSubmitting, handleSubmit, getFieldProps } = formik;

    const updateData = async (values) => {
        try {
            const { data } = await cmsService.updatecms(values)
            toast.success(data?.message)
            navigate(navigateUrl)
        } catch (error) {
            errorHandler(error);
        }
    };


    useEffect(() => {
        const getData = async () => {
            try {
                let data = { "slug": slugname }
                const res = await cmsService.getCMS(data)

                formik.setFieldValue("title", res.data.data?.title)
                formik.setFieldValue("description", res.data.data?.description)
                formik.setFieldValue("id", res.data.data?._id)
            } catch (error) {
                errorHandler(error)
            }
        }
        getData()
    }, [])


    return (
        <>
            <Container>

                <Card>
                    <CardHeader title={title} />
                    <CardContent>
                        <FormikProvider value={formik}>
                            <Form onSubmit={formik.handleSubmit}>
                                <Grid container spacing={3} direction={"column"} xs={12} >
                                    <Grid item xs={12}>
                                        <TextField
                                            name="title"
                                            fullWidth
                                            label="Title"
                                            {...getFieldProps("title")}
                                            error={Boolean(touched.title && errors.title)}
                                            helperText={touched.title && errors.title}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <EdiorJodit
                                            onChange={(html) => {
                                                formik.setFieldTouched("decription", true)
                                                let withoutHtml = html.replace(REMOVEHTML, "")
                                                withoutHtml = withoutHtml?.replace(REMOVENBSP, '')
                                                if (withoutHtml?.trim()?.length > 0) {
                                                    formik.setFieldValue("description", html)
                                                    formik.setFieldTouched("description", true)
                                                } else {
                                                    formik.setFieldValue("description", "")
                                                    formik.setFieldTouched("description", true)
                                                }
                                            }}
                                            data={formik.values.description}
                                            placeholder="Privacy Policy"
                                        />
                                        <ErrorMessage
                                            className="errorMessage"
                                            name={`description`}
                                            component="div" />

                                    </Grid>

                                </Grid>
                                <Stack
                                    spacing={2}
                                    mt={5}
                                    direction="row"
                                    alignItems="center"
                                    justifyContent="flex-end"
                                >
                                    <Button
                                        type="submit"
                                        variant="contained"
                                        startIcon={<Icon icon="fa-solid:save" />}

                                    >
                                        Save
                                    </Button>
                                </Stack>
                            </Form>
                        </FormikProvider>

                    </CardContent>


                </Card>
            </Container>
        </>
    )
}

export default CommonEditPage