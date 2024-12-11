
import dayjs from "dayjs"

export const confix = {
    base_url: "http://localhost:8081/api/",
    image_path: "http://localhost/fullstack/devit/"
}
export const isEmptyOrNull = (value) => {
    if (value === "" || value === null || value === "null" || value === undefined || value === "undefined") {
        return true;
    }
    return false;
}
export const formatdayjs = (date) =>{
    if(!isEmptyOrNull(date)){
        return dayjs(date).format("DD-MMM-YYYY")
    }
    else{
        return null

    }
}
export const formatdayjstoServer = (date) =>{
    if(!isEmptyOrNull(date)){
        return dayjs(date).format("YYYY-MM-DD")
    }else{
        return null

    }
}