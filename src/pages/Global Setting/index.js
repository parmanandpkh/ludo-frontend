import React, { useState } from "react";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button, Card, CardContent, Paper, Stack, TextField, Typography } from "@mui/material";
import { useFormik, Form, FormikProvider } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { NOSPACE_REGEX, PASSWORDS_REGEX } from "../../utils/constants";
import { MESSAGE } from "../../utils/validationMessage";
import { complexEmailRegex } from "src/utils/emailCheck";
import errorHandler from "src/utils/errorHandler";
import apiUsers from "src/api/usersService";
function GlobalSetting() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const[data,setData] = useState()
  
   
  const settingData = async () => {
    const response = await apiUsers.getSetting();
    const entries = Object.entries(response?.data?.data);
    setData(response.data.data);
    console.log(response.data.data)
    
  };
  console.log(data)
  useEffect(()=>{
    settingData()
  },[])
  const  initialValues = { instaLink:data?.instaLink ??"",
  fbLink:data?.fbLink ?? "",
   contactUsEmail:data?.contactUsEmail ?? "",
    // pageSize:data?.pageSize ??""
  }
 
  const validationSchema = Yup.object().shape({
    instaLink: Yup.string().url("Instagram link must be a valid url").trim().max(100, "Instagram link must be at most 100 characters").required("Instagram Link is required"),
    fbLink: Yup.string().url("Fb link must be a valid url").trim().max(100, "Fb link must be at most 100 characters").required("Facebook Link is required"),
    contactUsEmail: Yup.string()
    .required('Contact Us Email is required')
    .matches(NOSPACE_REGEX, MESSAGE.NO_SPACE)
    .test("is-email", MESSAGE.EMAIL, (val) => complexEmailRegex(val))
    .max(255),
    // pageSize: Yup.string()
    //   .nullable()
    //   .min(1, "Enter a valid Page Size")
    //   .max(2, "Enter a valid Page Size")
    //   .matches(/^[1-9]\d*(,\d+)?$/, "Please enter the valid Page Size")
    //   // .matches(PAGE, "Please enter the valid Page Size")
    //   .required("Page Size is required"),
  });
  
 
  const formik = useFormik({
    enableReinitialize:true,
    initialValues: initialValues,
    validationSchema,
    onSubmit: (values, { setSubmitting }) => {
      console.log(values)
      apiUsers
          .updateSetting(values)
          .then((res) => {
            console.log(res)
            toast.success(res.data.message,{
              toastId: 'success1',
          })
            settingData()
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
          <FormikProvider value={formik} style={{ padding: "34px 30px" }}>
            <Typography variant="h4" sx={{ mb: 2 }} align="start">
              Settings
            </Typography>
            <Form >
              <Stack spacing={3}>
                
                <TextField
                  name="instaLink"
                  label="Instagram Link *"
                  fullWidth
                  // value={formik.values.instaLink}
                  {...getFieldProps("instaLink")}
                  error={Boolean(touched.instaLink && errors.instaLink)}
                  helperText={touched.instaLink && errors.instaLink}
                />
              
             
                <TextField name="fbLink" label="Facebook Link *" {...getFieldProps("fbLink")} error={Boolean(touched.fbLink && errors.fbLink)} helperText={touched.fbLink && errors.fbLink} />
                <TextField
                  name="contactUsEmail"
                  label="Contact Us Email *"
                  {...getFieldProps("contactUsEmail")}
                  error={Boolean(touched.contactUsEmail && errors.contactUsEmail)}
                  helperText={touched.contactUsEmail && errors.contactUsEmail}
                />
                {/* <TextField name="pageSize" label="Page Size *" type="number" {...getFieldProps("pageSize")} error={Boolean(touched.pageSize && errors.pageSize)} helperText={touched.pageSize && errors.pageSize} /> */}
              </Stack>

              <Button size="large" type="submit" variant="contained" loading={isSubmitting} sx={{ my: 2 }}>
                Update
              </Button>
            </Form>
          </FormikProvider>
        </CardContent>
      </Card>
    </>
  );
}

export default GlobalSetting;
