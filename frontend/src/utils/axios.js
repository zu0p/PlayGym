import axios from "axios";
import {setInterceptors} from "./interceptor";

const DOMAIN = 'http://k5d205.p.ssafy.io:8080/api'
// axios.defaults.withCredentials = true; // for cookie data

export const request = (method, url, data) => {
  return axios({
    method,
    url: DOMAIN + url,
    data,
  })
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