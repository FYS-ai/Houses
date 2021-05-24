import {request} from './request'
//更具用户id查询评论
export function GetCommentUid(uid)
{
  return request({
    url:"/get_comment_uid",
    method:"get",
    params:{
      uid
    }
  })
}
//根据房源id查询房源
export function GetHouseHid(hid)
{
  return request({
    url:"/get_house_hid",
    method:"get",
    params:{
      hid
    }
  })
}