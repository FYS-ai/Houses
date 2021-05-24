import {request} from "./request"

export function UserLogin(user_name,user_pwd)
{
  return request({
    url:"/login_user",
    method:"post",
    // headers: {
    //   "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
    //   "X-Requested-With": "XMLHttpRequest",
    // },
    data:{
      user_name,
      user_pwd
    }
  })
}

//修改密码
export function UpUser(user_tel,user_pwd){
  return request({
    url:"/user_wdlwjmm",
    method:"post",
    data:{
      user_tel,
      user_pwd
    }
  })
}
// 更换手机号
export function UpUserTel(uid,user_tel)
{
  return request({
    url:"/up_usertel",
    method:"post",
    data:{
      uid,
      user_tel
    }
  })
}

//按uid查询用户
export function GetFindUser(uid)
{
  return request({
    url:"/find_user",
    method:"get",
    params:{
      uid
    }
  })
}