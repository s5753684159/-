

import http from './http.js';

//  获取分类
export function addArticle(params){
   return  http.post('/api/add_article',params)
}
export function getQiniuToken(){
   return  http.get('/upload/token')
}
export function uploadQiniu(formdata){
   return  http.post('https://upload-z1.qiniup.com', formdata)
}




