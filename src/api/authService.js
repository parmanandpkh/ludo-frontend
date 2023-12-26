import axios from 'axios';
import { API_BASE } from '../utils/constants';
import AxiosInterceptor from "../utils/AxiosInterceptor";
import { useParams } from 'react-router-dom';
const API_URL = API_BASE + 'access/';
const token = localStorage.getItem("token");

const apiAuth = {
  login: (value) => axios.post(API_URL + 'login', value),

  forgot: (value) => axios.post(API_URL + 'forgotPassword', value),
 
   reset: (value) => axios.post(API_URL + `resetPassword?token=${value.token}`, value.body),

  // verifyOtp: (value) => axios.post(API_URL + 'verify-otp', value),

  // resendOtp: (value) => axios.post(API_URL + 'resend-otp', value),


  // changePassword: (value) => axios.post(API_URL + 'changePassword', value),
};

export default apiAuth;
