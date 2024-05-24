import axiosClient from './axiosClient';

const fetcher = async (url: string, options = {}) => {
  const response = await axiosClient({ url, ...options });
  return response.data;
};

export default fetcher;
