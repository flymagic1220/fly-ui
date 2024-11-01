import axios from "axios";

const axiosInstance = axios.create({
    baseURL:'http://localhost:8080'
})
axiosInstance.interceptors.response.use(
    (response) => {
        if (response.data && response.data.success) {
            return response.data
        } else {
            throw new Error(response.data.message ||'服务失败')
        }
    },
    (error) => {
        console.log(error,)
    }
)
export default axiosInstance