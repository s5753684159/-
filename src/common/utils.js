
//  接收日期对象 或者 字符串{2022-1-1}   或者数字  {时间戳}
//  返回值是一个日期

export function formatterDate(date){
       if(typeof date ==='number'){
        date = new Date(date)
       }
       if(date instanceof Date){
         date = [date.getFullYear(),(date.getMonth()+1),date.getDate()].map(v=> (v+'').length>1?v:'0'+v).join('/')
       }
       return date
    }
