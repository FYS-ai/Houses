import {request} from './request'
//查询详情页
export function GetDetail(hid)
{
  return request({
    url:"/find_house",
    method:"get",
    params:{
      hid
    }
  })
}
//查询房东信息
// export function GetLandlord(ldid)
// {
//   return request({
//     url:"/find_landlord",
//     method:"get",
//     params:{
//       ldid
//     }
//   })
// }

//查询评论
export function GerComment(hid,page)
{
  return request({
    url:'hid_comment',
    method:"get",
    params:{
      hid,
      page
    }
  })
}
// 在线预订
export function AddOrder(h_title,user_name,h_money,h_images,into_time,exit_time,
  uid,IDcard,myName,or_tel,time_day,hid,isdel,num_people){
  return request({
    url:"/add_order",
    method:"post",
    data:{
      h_title,
      user_name,
      h_money,
      h_images,
      into_time,
      exit_time,
      uid,
      IDcard,
      myName,
      or_tel,
      time_day,
      hid,
      isdel,
      num_people
    }
  })
}