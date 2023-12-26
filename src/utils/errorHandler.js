import { toast } from "react-toastify";

const errorHandler = (err) => {
    console.log("errorHandler", err)
    if (err.response?.data) {
        const { message, status, error } = err.response?.data;
        if (status === 0 && Array.isArray(error) && error.length > 0) {
            error.map((err) => toast.error(err.msg))
            return
        }
        if (message) {
            toast.error(message)
            return
        }

        toast.error("Something went wrong!")
    } else {
        toast.error('An error occurred')
    }
}

export default errorHandler