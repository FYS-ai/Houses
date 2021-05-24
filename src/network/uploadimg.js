import Axios from 'axios'
import {request} from './request'
// 房子图片上传
export function HouseImgUpload(fileData){
  return request({
    url:"/house_photo",
    method: "post",
    data:fileData
  })
}

// 评论图片上传
export function CommentPhoto(fileData)
{
  return request({
    url:"/comment_photo",
    method: "post",
    data:fileData
  })
}
//添加评论
export function AddComment(hid,uid,com_detail,com_date,user_name,user_photo,orid)
{
  return request({
    url:'/add_comment',
    method:"post",
    data:{
      hid,
      uid,
      com_detail,
      com_date,
      user_name,
      user_photo,
      orid
    }
  })
}
export function FindCommentOrid(orid)
{
  return request({
    url:"/find_commentorid",
    method:"get",
    params:{
      orid
    }
  })
}
//修改订单评论状态
export function  UpOrderPL(orid,isComment){
  return request({
    url:"/up_orderpl",
    method:"get",
    params:{
      orid,
      isComment
    }
  })
}

// 上传用户头像
export function uploadUserPhoto(headerFileDate){
  return request({
    url:'/userheader_photo',
    method:"post",
    data:headerFileDate
  })
}

//同步评论头像
export function UpCommentPhoto(uid,user_photo)
{
  return request({
    url:'/up_comment_photo',
    method:"post",
    data:{
      uid,
      user_photo
    }
  })
  
}