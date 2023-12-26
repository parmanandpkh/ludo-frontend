import AxiosInterceptor from "../utils/AxiosInterceptor";

const cmsService = {
    contenttype :(values) =>AxiosInterceptor().post(`cms/getOneCms`,  values),
   updatecms:(values) =>AxiosInterceptor().post(`cms/updateCms`,  values)
};

export default cmsService;
