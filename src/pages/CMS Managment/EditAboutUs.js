import React, { useState, useEffect } from "react";
import { Card } from "react-bootstrap";
import { Formik, Form, Field, ErrorMessage, useFormik, FormikProvider } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useHistory, useLocation, useNavigate } from "react-router-dom";
import { Avatar } from "@material-ui/core";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import { uploadAdapterPlugin } from "./Uploadadapter";
import cmsService from "src/api/cmsService";
import { Button } from "@mui/material";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
// import { uploadAdapterPlugin } from '../Template/Uploadadapter';
// import {tostE, tostS} from "../Toast"
function EditAboutUs() {
  const navigate = useNavigate();

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
                    <CKEditor
                      editor={ClassicEditor}
                      data={data.form.values.aboutUsText}
                      onReady={(editor) => {
                        console.log("abc______", editor)
                       editor.editing.view.change((writer) => {
                        writer.setStyle(
                           "height",
                           "250px",
                       editor.editing.view.document.getRoot()
                      );
                       })
                      }}
                      onChange={(event,editor) => {
                        const data = editor?.getData()
                        formik.setFieldValue("aboutUsText", data);
                         }}
                      //  config={{                          
                      //   extraPlugins: "indentblock, divarea,justify",   
                      //   filebrowserUploadUrl :("https://ckeditor.com/apps/ckfinder/3.4.5/core/connector/php/connector.php?command=QuickUpload&type=Files"),                     
                      //   customToolbar:
                      //   [
                      //   { name: 'tools', items : [ 'Maximize', 'ShowBlocks','-', 'Attachments' ] },
                      //   { name: 'paragraph', groups: [ 'list', 'indent', 'blocks', 'align', 'bidi' ], items: [ 'NumberedList', 'BulletedList', '-', 'Outdent', 'Indent', '-', 'Blockquote', 'CreateDiv', '-', 'JustifyLeft', 'JustifyCenter', 'JustifyRight', 'JustifyBlock', '-', 'BidiLtr', 'BidiRtl', 'Language' ] }, 
                      //   ]
                      // }}

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
