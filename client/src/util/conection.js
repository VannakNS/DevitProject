import axios from "axios"
import { confix } from "./config"


export const request = (url="",method="",data={}) =>{

    return axios({
        url:confix.base_url + url,
        method:method,
        data:data,
        headers:{}
    }).then((res)=>{
        return res.data
    }).catch((error)=>{
        console.error("Error at",error)
    })

}