import axios from 'axios';

const studentApi = axios.create({
    baseURL: 'http://localhost:8083/api/student',
    // withCredentials: true,
});

export default studentApi;
