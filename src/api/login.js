import http from "./http.js";

export function getLogin(){
    return http.get('/user/login')
};