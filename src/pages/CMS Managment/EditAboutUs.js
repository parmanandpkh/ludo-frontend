import React, { useState, useEffect, useRef } from "react";
import { Card } from "react-bootstrap";
import { Formik, Form, Field, ErrorMessage, useFormik, FormikProvider } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useHistory, useLocation, useNavigate } from "react-router-dom";
import { Avatar } from "@material-ui/core";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import { uploadAdapterPlugin } from "./Uploadadapter";
import cmsService from "src/api/cmsService";
import { Button } from "@mui/material";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import './CKEditorStyle.css' 
import JoditEditor from "jodit-react";

// import { uploadAdapterPlugin } from '../Template/Uploadadapter';
// import {tostE, tostS} from "../Toast"
function EditAboutUs() {
  const navigate = useNavigate();
  const editor = useRef(null);
  const [detail, setDetail] = useState("");
  const aboutusData = async () => {
    const value = { contentType: "about-us" };
    const response = await cmsService.contenttype(value);
    setDetail(response.data.data);
    console.log(response.data.data.aboutUsText);
  };
  console.log(detail.aboutUsText);
  useEffect(() => {
    aboutusData();
  }, []);
  // const initialValues = {
  //   aboutUsText: detail?.aboutUsText ,
  //   contentType: "about-us",
  // };
// console.log(initialValues)
  const validationSchema = Yup.object().shape({
    aboutUsText: Yup.string()
      .strict()
      .min(3, "Content must be at least 3 characters long")
      // .max(1000, "Content must be less than 1000 characters ")
      .required("Content is required"),
  });
  const formik = useFormik({
    enableReinitialize:true,
    initialValues: {  aboutUsText: detail?.aboutUsText ,
      contentType: "about-us", },
    validationSchema,
     onSubmit : async(values ) => {
  
      const body = {
        aboutUsText: values?.aboutUsText,
      contentType: "about-us",
    };
        
        const response = await cmsService.updatecms(body);
         if(response.data.status){
          toast.success(response.data.message)
          aboutusData();    
          navigate('/dashboard/about-us')
         }else{
          toast.error(response.data.message)
         }
   
      }
    
});
  
    const { errors, touched, isSubmitting, handleSubmit, getFieldProps } = formik;
  
  return (
    <Card className="p-0">
      <Card.Header>
        <Card.Title as="h2"> Edit About us </Card.Title>
      </Card.Header>
      <Card.Body className="pt-2">
        <FormikProvider  value={formik}  >
     
          <Form  autoComplete="off" noValidate onSubmit={handleSubmit} >
            <br />
            <label className="form-label mt-2">
              Content <span className="text-danger"> *</span>
            </label>
            <br />
          
          
            <Field required name="aboutUsText">
              {(data) => {
                console.log(data);
                return (
                  <>
                    <JoditEditor
			ref={editor}
			value={data.form.values.aboutUsText}
			
			tabIndex={1} // tabIndex of textarea
			
      onChange={(newContent) => {
        console.log(newContent)
         formik.setFieldValue("aboutUsText", newContent);
         }}
		/>
                    
                  </>
                  
                );
                
              }}
              
            </Field>
            <span style={{color:'red'}}>
              <ErrorMessage name="aboutUsText" />
            </span>
            <Button  size="large" type="submit" variant="contained"  sx={{ my: 2,float:'right',ml:3 }}  >
                   Update
                </Button>
                <Button  size="large" type="button" variant="contained"  sx={{ my: 2,float:'right' }} onClick={()=>{navigate('/dashboard/about-us')} }>
                   Back
                </Button>
          </Form>
        </FormikProvider>
      
      </Card.Body>
    </Card>
  );
}

export default EditAboutUs;
