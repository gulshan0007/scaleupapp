import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';


const axiosInstance = axios.create({
    baseURL: ' CONFIG.ROOT_URL'
});

export const setupAxiosInterceptors = (showToast, navigation) => {
    axiosInstance.interceptors.request.use(
        async (config) => {
            const user = await AsyncStorage.getItem('userData');
            const parsedUser = JSON.parse(user)
            if (parsedUser?.token) {
                config.headers.Authorization = parsedUser?.token;
            }
            // console.log('parsedUser?.token ', parsedUser?.token);
            return config;
        },
        (error) => {
            return Promise.reject(error);
        },
    );

    axiosInstance.interceptors.response.use(
        async (config) => {
            return config;
        },
        async (error) => {
            if (error.response.status == 400 || error.response.status == 429 || error.response.status == 500) {
                showToast({ type: 'error', title: error?.response?.data?.message })
                console.log('error11', error?.response?.data?.message)
            }
            if (error.response.status == 422) {
                showToast({ type: 'error', title: 'Somethig went wrong, Please try again.' })
                console.log('error22', 'Somethig went wrong, Please try again.')
            }
            if (error.response.status == 401) {
                showToast({ type: 'error', title: error.response?.data?.message })
                console.log('error33', error.response?.data?.message)
                setTimeout(() => {
                    // logoutUser(navigation)
                }, 1000)
            }
            return Promise.reject(error);
        },
    );
}

export default axiosInstance;
