import AxiosInterceptor from "../utils/AxiosInterceptor";

const cmsService = {
  getCMS: (values) => AxiosInterceptor().post(`cms/getOneCms`, values),
  updatecms: (values) => AxiosInterceptor().post(`cms/updateCms`, values),
  getFaq: (values) => AxiosInterceptor().post(`cms/getAllFaqs`, values),
  getOneFaq: (id) => AxiosInterceptor().get(`cms/getOneFaq/${id}`),
  addFaq: (values) => AxiosInterceptor().post("/cms/addFaq", values),
  EditFaq: (values) => AxiosInterceptor().post(`/cms/updateCms`, values),
  deleteFaq: (id) => AxiosInterceptor().get(`cms/deleteFaq/${id}`),
};

export default cmsService;
