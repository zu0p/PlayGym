import axios from "axios";
import {setInterceptors} from "./interceptor";

const DOMAIN = 'http://'

export const request = (method, url, data) => {
  return axios({
    method,
    url: DOMAIN + url,
    data,
  })
    .then((res) => res.data)
    .catch((err) => console.log(err));
};

const createInstance=()=>{
  const instance = axios.create()
  return setInterceptors(instance)
}
const instanceWithAuth = createInstance()

export const requestWithAuth = (method, url, data) => {
  return instanceWithAuth({
    method,
    url: DOMAIN + url,
    data,
  })
    .then((res) => res.data)
    .catch((err) => console.log(err));
};