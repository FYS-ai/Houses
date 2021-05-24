import {request} from "./request"
export function AddUser(user_name,user_pwd,user_sex,user_tel,user_data){
  return request({
    url:"/add_user",
    method:"post",
    data:{
      user_name,
      user_pwd,
      user_sex,
      user_tel,
      user_data
    }
  })
}