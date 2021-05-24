import {request} from './request'
//添加到收藏
export function AddCollect(h_images,h_title,cityname,h_deploy,uid,hid){
  return request({
    url:'/add_collect',
    method:"POST",
    data:{
      h_images,
      h_title,
      cityname,
      h_deploy,
      uid,
      hid
    }
  })
}

// 查询个人收藏
export function  GetUserCollect(uid){
  return request({
    url:'/user_collect',
    method:"get",
    params:{
      uid
    }
  })
}

// 取消收藏
export function DelCollect(colid)
{
  return request({
    url:'/del_collect',
    method:"get",
    params:{
      colid
    }
  })
}