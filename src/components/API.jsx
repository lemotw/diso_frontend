import axios from 'axios';

const baseURL = 'https://diso.ito-trip.com:8443/'
// const baseURL = "http://localhost:8000"

axios.defaults.withCredentials = true;
axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
const apiBase = axios.create({
    baseURL: baseURL,
    headers: { 
        'Access-Control-Allow-Origin' : '*',
        'Access-Control-Allow-Methods' : 'POST',
        'Access-Control-Allow-Credentials': true
    },
    'Content-Type': 'application/json',
})

export const apiLogin       = data => apiBase.post("/v1/Login", data)
export const apiLogout      = data => apiBase.post("/v1/Logout", data)
export const apiSignUp      = data => apiBase.post("/v1/Registered", data)

export const apiRoomNew     = data => apiBase.post("/v1/Room/New", data)
export const apiRoomList    = data => apiBase.post("/v1/Room/List", data)
export const apiRoomUpdate  = data => apiBase.post("/v1/Room/Update", data)
export const apiRoomDelete  = data => apiBase.post("/v1/Room/Delete", data)