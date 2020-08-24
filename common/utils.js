const _ = require('lodash')

const moment = require('moment')
/* 获取随机头像 */
function getRandomAvatar() {
    
  const avatars = [
    'https://wx2.sbimg.cn/2020/08/19/3Z5Hn.jpg',
    'https://wx2.sbimg.cn/2020/08/19/3Yf4j.png',
    'https://wx1.sbimg.cn/2020/08/19/3Z4Bk.jpg',
    'https://wx1.sbimg.cn/2020/08/19/3YFvN.jpg',
    'https://wx2.sbimg.cn/2020/08/19/3YVsD.jpg'
  ]
  let index=_.random(0,4) 

  return avatars[index]

}

function formatTime(time){
  return moment(time).locale('zh_cn').format('YYYYMMMMDo  aHH:mm:ss' )
}


module.exports={
  getRandomAvatar,
  formatTime
}