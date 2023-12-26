import axios from "axios"


export class UploadAdapter {
    constructor(loader) {
      this.loader = loader
    }
  
    async upload() {
      return this.loader.file.then((file) => {
        const data = new FormData()
        data.append("file", file)
        const genericError = `Couldn't upload file: ${file.name}.`
  
        return axios({
          data,
          method: "POST",
          url: "https://wannaeat.devtechnosys.tech:17283/api/admin/private/template/uploadImage",
          headers: {
            "Content-Type": "multipart/form-data",
          }          
        })
          .then(({ data }) => ({ default: data.url }))
          .catch(({ error }) => Promise.reject(error?.message ?? genericError))
      })
    }
  
    abort() {
      return Promise.reject()
    }
  }
  
  // CKEditor FileRepository
  export function uploadAdapterPlugin(editor) {
    editor.plugins.get("FileRepository").createUploadAdapter = (loader) =>
      new UploadAdapter(loader)
  }