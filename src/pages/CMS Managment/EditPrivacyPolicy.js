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
function EditPrivacyPolicy() {
  const navigate = useNavigate();

  const [detail, setDetail] = useState("");
  const privacypolicyData = async () => {
    const value = { contentType: "privacy-policy" };
    const response = await cmsService.contenttype(value);
    setDetail(response.data.data);
    console.log(response.data.data.privacyText);
  };
  console.log(detail.privacyText);
  useEffect(() => {
    privacypolicyData();
  }, []);
  const initialValues = {
    privacyText: detail?.privacyText ,
    contentType: "privacy-policy",
  };
console.log(initialValues)
  const validationSchema = Yup.object().shape({
    privacyText: Yup.string()
      .strict()
      .min(3, "Content must be at least 3 characters long")
      // .max(1000, "Content must be less than 1000 characters ")
      .required("Content is required"),
  });

  const onSubmit = async(values ) => {
  
    const body = {
        privacyText: values?.privacyText,
    contentType: "privacy-policy",
  };
      
      const response = await cmsService.updatecms(body);
     
      if(response.data.status){
        toast.success(response.data.message)
        privacypolicyData(); 
        navigate('/dashboard/privacy-policy')
       }else{
        toast.error(response.data.message)
       }
    }
  
 
 
  return (
    <Card className="p-0">
      <Card.Header>
        <Card.Title as="h2"> Edit Privacy Policy </Card.Title>
      </Card.Header>
      <Card.Body className="pt-2">
        <Formik  autoComplete="off"initialValues={initialValues}  validationSchema={validationSchema} onSubmit={onSubmit} enableReinitialize  >
        {(formik) => (
          <Form  >
            <br />
            <label className="form-label mt-2">
              Content <span className="text-danger"> *</span>
            </label>
            <br />
          
            <Field required name="privacyText"  >
              {(data) => {
                console.log(data);
                return (
                  <>
                    <CKEditor
                      editor={ClassicEditor}
                      data={data.form.values.privacyText}
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
                        formik.setFieldValue("privacyText", data);
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
              <ErrorMessage name="privacyText" />
            </span>
            <Button  size="large" type="submit" variant="contained"  sx={{ my: 2,float:'right',ml:3 }}  >
                   Update
                </Button>
                <Button  size="large" type="button" variant="contained"  sx={{ my: 2,float:'right' }} onClick={()=>{navigate('/dashboard/privacy-policy')} }>
                   Back
                </Button>
          </Form>)}
        </Formik>
      
      </Card.Body>
    </Card>
  );
}

export default EditPrivacyPolicy;
