import {request} from './request'
// 房源请求
export function Gethouse(page)
{
  return request({
    url:'/get_house',
    method:'get',
    params:{
      page
    }
  })
}
// 城市请求
export function GetCity(page)
{
  return request({
    url:'/get_city',
    method:"get",
    params:{
      page
    }
  })
}
// 搜索查询
export function GetSearchHouse(type,typeName)
{
  return request({
    url:'/search_house',
    method:"get",
    params:{
      type,
      typeName
    }
  })
}
//搜索全部的房子
export function GethouseOver()
{
  return request({
    url:'/get_house_over',
    method:"get"
  })
}

// 添加房源
export function AddHouse(h_title,h_detail,h_deploy,h_tag,h_room,h_basets,cityname,h_money,uid)
{
  return request({
    url:'/add_house',
    method:"post",
    data:{
      h_title,
      h_detail,
      h_deploy,
      h_tag,
      h_room,
      h_basets,
      cityname,
      h_money,
      uid
    }
  })
}

//按用户id查询房源
export function GetUserIdHouse(uid)
{
  return request({
    url:'/get_userid_house',
    method:"get",
    params:{
      uid
    }
  })
}
// 删除房源
export function DelHouse(hid){
  return request({
    url:'/del_house',
    method:"get",
    params:{
      hid
    }
  })
}

//按hid请求房源
export function FindHouse(hid){
  return request({
    url:'/find_house',
    method:"get",
    params:{
      hid
    }
  })
}
//修改房源
export function UpHouse(h_title,h_detail,h_deploy,h_tag,h_room,h_basets,cityname,h_money,hid)
{
  return request({
    url:'/up_house',
    method:"post",
    data:{
      h_title,
      h_detail,
      h_deploy,
      h_tag,
      h_room,
      h_basets,
      cityname,
      h_money,
      hid
    }
  })
}