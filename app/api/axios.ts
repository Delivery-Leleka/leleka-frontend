// звернення до бекенду
import axios from 'axios';

const axiosBackend = axios.create({
  baseURL: 'https://leleka-backend-be3m.onrender.com',
  headers: {
    'Content-Type': 'application/json',
  },
  method: 'POST',
});

export default axiosBackend;
