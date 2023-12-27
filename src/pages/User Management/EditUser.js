import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button, Card, CardContent, Paper, Stack, TextField, Typography } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { useFormik, Form, FormikProvider } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { MESSAGE } from "../../utils/validationMessage";
import apiAuth from "../../api/authService";
import { MOBILE_REGEX, NOSPACE_REGEX, NOSPACE_REGEX_EMAIL, PASSWORDS_REGEX } from "../../utils/constants";
import errorHandler from "../../utils/errorHandler";
import SimpleLayout from "src/layouts/simple/SimpleLayout";
import apiUsers from "src/api/usersService";
import { complexEmailRegex } from "src/utils/emailCheck";

const validationSchema = Yup.object().shape({
  firstName: Yup.string().required('FirstName is required').matches(NOSPACE_REGEX).min(2, 'Please enter atleast 2 characters').max(30, 'FirstName character not more 30'),
  lastName: Yup.string().required('LastName is required').matches(NOSPACE_REGEX).min(2, 'Please enter atleast 2 characters').max(30, 'LastName character not more 30'),
  phoneNumber: Yup.string().required('Phone Number is required').matches(MOBILE_REGEX, MESSAGE.PHONE),
  email: Yup.string().email('Invalid email address').
    required('Email is required').test("is-email", MESSAGE.EMAIL, (val) => complexEmailRegex(val))
    .max(255).matches(
      /^(([^<>()[\]\\.,;:\!£~$%^&*<,>?/%s@+-_`= |\{}'"]+(\.[^<>()[\]\\.,;:\!£~$%^&*<,>?/%s@+-_`= |{}'\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    ,'Invalid email address'),
});

export default function EditUser() {
  const [data, setData] = useState("");
  const navigate = useNavigate();
  const { state } = useLocation();
  console.log(state);
  const userData = async () => {
    const response = await apiUsers.getOneUser(state.id);
    setData(response.data.data);
    console.log(response.data.data.email);
  };
  useEffect(() => {
    userData();
  }, []);

  const formik = useFormik({
    enableReinitialize:true,
    initialValues: { firstName: data.firstName ? data.firstName : "", 
    lastName: data.lastName ? data.lastName : "",
     phoneNumber: data.phoneNumber ? data.phoneNumber : "",
      email: data.email? data.email:''},
    validationSchema,
    onSubmit: (values, { setSubmitting }) => {
      apiUsers
        .editUser({ id:state.id,firstName: values.firstName, lastName: values.lastName, phoneNumber: values?.phoneNumber, email: values?.email })
        .then((res) => {
          navigate("/dashboard/user-management");
          toast.success(res?.data?.message);
          
        })
        .catch((err) => {
          errorHandler(err);
          setSubmitting(false);
        });
    },
  });

  const { errors, touched, isSubmitting, handleSubmit, getFieldProps } = formik;

  return (
    <>
      <Card>
        <CardContent>
          <FormikProvider value={formik} style={{ padding: "34px 30px" }}>
            <Typography variant="h4" sx={{ mb: 2 }} align="start">
              Edit User
            </Typography>
            <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
              <Stack spacing={3}>
                <TextField
                  name="firstName"
                  label="First Name"
                  {...getFieldProps("firstName")}
                  error={Boolean(touched.firstName && errors.firstName)}
                  helperText={touched.firstName && errors.firstName}
                />
                <TextField name="lastName" label="Last Name" {...getFieldProps("lastName")} error={Boolean(touched.lastName && errors.lastName)} helperText={touched.lastName && errors.lastName} />
                <TextField
                  name="phoneNumber"
                  label="Phone Number"
                  {...getFieldProps("phoneNumber")}
                  error={Boolean(touched.phoneNumber && errors.phoneNumber)}
                  helperText={touched.phoneNumber && errors.phoneNumber}
                />
                <TextField name="email" label="Email" {...getFieldProps("email")} error={Boolean(touched.email && errors.email)} helperText={touched.email && errors.email} />
              </Stack>

              <Button size="large" type="submit" variant="contained" loading={isSubmitting} sx={{ my: 2 }}>
                Update
              </Button>
              <Button size="large" type="button" variant="contained" onClick={()=>{navigate('/dashboard/user-management')}} sx={{ my: 2 ,ml:4}}>
                Cancel
              </Button>
            </Form>
          </FormikProvider>
        </CardContent>
      </Card>
    </>
  );
}
