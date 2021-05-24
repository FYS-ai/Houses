import {request} from "./request"
// 按用户查询订单
export function GetOrder(uid)
{
  return request({
    url:'/user_order',
    method:"get",
    params:{
      uid
    }
  })
}

// 按id查询
export function FindOrder(orid,user_name)
{
  return request({
    url:'/find_order',
    method:"get",
    params:{
      orid,
      user_name
    }
  })
}

//修改订单状态
export function UpOrderZT(orid,isdel){
  return request({
    url:"/up_orderzt",
    method:"get",
    params:{
      orid,
      isdel
    }
  })
}
 // 删除订单
 export function DelOrder(orid){
  return request({
    url:"/del_order",
    method:"get",
    params:{
      orid
    }
  })
}

// 查询订单是否评价
export function GetIsComment(user_name,isComment,isdel){
  return request({
    url:"/get_iscomment",
    method:"get",
    params:{
      user_name,
      isComment,
      isdel
    }
  })
}

//待确认入住和取消订单
export function GetIsdel(user_name,isdel){
  return request({
    url:"/get_isdel",
    method:"get",
    params:{
      user_name,
      isdel
    }
  })
}