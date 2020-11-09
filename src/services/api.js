import axios from 'axios'

const api = axios.create({
	baseURL: 'http://localhost:8000',
})

api.defaults.headers.post['Access-Control-Allow-Origin'] = "*";
api.defaults.headers.post['Access-Control-Allow-Headers'] = "*";
//api.defaults.headers.post['Access-Control-Request-Headers'] = "*";
//api.defaults.headers.post['Access-Control-Request-Method'] = "*";
api.defaults.headers.post['Access-Control-Allow-Method'] = "*";
api.defaults.headers.post['Content-Type'] = "application/json;charset=utf-8";

api.defaults.withCredentials = true;


export default api