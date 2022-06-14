import axios from 'axios';
import { toast } from 'react-toastify';

axios.interceptors.request.use(
  function (config) {
    return config;
  },
  function (error) {
    return Promise.reject(error);
  },
);

// Add a response interceptor
axios.interceptors.response.use(
  function (response) {
    const result = response.data;
    return result;
  },
  function (error) {
    const { response, message } = error;
    const { data, status } = response;

    if (status === 429) {
      toast.info(
        '사냥시도가 너무 빠릅니다. 자동사냥을 위한 브라우저는 1개만 사용하시는 것을 권장합니다.',
      );
      return Promise.reject(error);
    }
    if (data?.message) {
      toast.info(data.message);
      return Promise.reject(error);
    }

    toast.error(message);
    return Promise.reject(error);
  },
);

export default axios;
