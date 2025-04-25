import axios from 'axios';

const userApi = axios.create({
    baseURL: 'http://localhost:8089/users',
    withCredentials: true, // nếu bạn cần gửi cookie hoặc session sau này
});

export default userApi;
