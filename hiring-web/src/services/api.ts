import a from 'axios';

export const axios = a.create({ withCredentials: true });

export const sessionApi = (data: { event: any; session: any }) =>
  axios.post(`${process.env.REACT_APP_BACKEND_URL}/auth`, data);

export const getUser = () =>
  axios.post(`${process.env.REACT_APP_BACKEND_URL}/auth/me`);
