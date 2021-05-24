import axios from 'axios';
export function request(config)
{
  const instance1 = axios.create({
    baseURL: 'http://localhost:8081/mybuilding/public/index.php',
    timeout: 5000
  });
  //拦截器发送
  instance1.interceptors.request.use(config => {
    return config;
  })
  instance1.interceptors.response.use(
    res => {
    //拦截数据成功，返回给then，这样then才会接受到
    return res.data;
    },
    err=>{
      return console.log(err);
    })
  return instance1(config)
}
