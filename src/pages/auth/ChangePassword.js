import { useEffect } from 'react';
// components
import { useLocation, useNavigate } from 'react-router-dom';

// @mui
import { Button, Card, CardContent, Paper, Stack, TextField, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';

import { useFormik, Form, FormikProvider } from 'formik';
import * as Yup from 'yup';

import { toast } from "react-toastify";

// utils
import { MESSAGE } from '../../utils/validationMessage';




// components
import apiAuth from '../../api/authService';
import { PASSWORDS_REGEX } from '../../utils/constants';
import errorHandler from '../../utils/errorHandler';
import SimpleLayout from 'src/layouts/simple/SimpleLayout';
import apiUsers from 'src/api/usersService';


const validationSchema = Yup.object().shape({
    oldPassword: Yup.string().required('Old Password is required'),
    newPassword: Yup.string().notOneOf(
        [Yup.ref('oldPassword'), null],
        'New Password must be different'
      ).required('New Password is required').matches(PASSWORDS_REGEX, MESSAGE.PASSWORD),
    confirmPassword: Yup.string().oneOf([Yup.ref('newPassword'), null], 'Passwords must match').required('Confirm Password is required'),
});


export default function ChangePassword() {
    const navigate = useNavigate();
    const { state } = useLocation();

    // useEffect(() => {
    //     if (!state?.email) {
    //         toast.error("Please enter a email")
    //         navigate("/login");
    //     }
    // }, [navigate, state?.email])

    const formik = useFormik({
        initialValues: { oldPassword: '', newPassword: '',confirmPassword:'' },
        validationSchema,
        onSubmit: (values, { setSubmitting }) => {
            apiUsers
                .changePassword({ oldPassword:values?.oldPassword , newPassword: values?.newPassword ,confirmPassword:values?.confirmPassword })
                .then((res) => {
                    toast.success(res?.data?.message)
                    navigate('/dashboard/app');
                })
                .catch((err) => {
                    errorHandler(err)
                    setSubmitting(false)
                });

        },
    });

    const { errors, touched, isSubmitting, handleSubmit, getFieldProps } = formik;

    return (
        <>
        <Card>
        <CardContent>
        
        <FormikProvider value={formik} style={{padding: '34px 30px'}}>
            <Typography variant="h4" sx={{ mb: 2 }} align="start">Change Password</Typography>
            <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
                <Stack spacing={3}>
                <TextField name="oldPassword" label="Old Password *" type='password' {...getFieldProps('oldPassword')} error={Boolean(touched.oldPassword && errors.oldPassword)} helperText={touched.oldPassword && errors.oldPassword} />
                    <TextField name="newPassword" label="New Password *" type='password' {...getFieldProps('newPassword')} error={Boolean(touched.newPassword && errors.newPassword)} helperText={touched.newPassword && errors.newPassword} />
                    <TextField name="confirmPassword" label="Confirm Password *" type='password' {...getFieldProps('confirmPassword')} error={Boolean(touched.confirmPassword && errors.confirmPassword)} helperText={touched.confirmPassword && errors.confirmPassword} />
                </Stack>

                <Button  size="large" type="submit" variant="contained" loading={isSubmitting} sx={{ my: 2 }}>
                    Change Password
                </Button>
            </Form>
        </FormikProvider>
        </CardContent>
        </Card>
      
        </>
       
    )
}
