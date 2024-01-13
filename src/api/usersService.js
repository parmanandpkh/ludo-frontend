import AxiosInterceptor from "../utils/AxiosInterceptor";

const apiUsers = {
   
    changePassword: (values) => AxiosInterceptor().post(`access/changePassword`, values),
    getSetting:(params) =>AxiosInterceptor().get(`access/getSetting`, {params}),
    updateSetting:(values) =>AxiosInterceptor().post(`access/updateSetting`, values),
    getAllUser:(values)=>AxiosInterceptor().post(`user/getAllUser`, values),
    changeStatus:(values)=>AxiosInterceptor().post(`user/changeStatus`, values),
    getOneUser:(values) =>AxiosInterceptor().get(`user/getOneUser/${values}`,),
    addUser:(values)=>AxiosInterceptor().post(`user/addUser`, values),
    editUser:(values)=>AxiosInterceptor().post(`user/updateUser`, values)
};

export default apiUsers;
