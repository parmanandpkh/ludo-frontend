import AxiosInterceptor from "../utils/AxiosInterceptor";

const cmsService = {
    getCMS :(params) =>AxiosInterceptor().get(`cms/getAllCms`,  {params}),
   updatecms:(values) =>AxiosInterceptor().post(`cms/updateCms`,  values)
};

export default cmsService;
