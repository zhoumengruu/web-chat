let inputEle = document.getElementsByClassName('chat-input')[0]

let timer

let originData

getOriginData()                                                                                                                      nData

stopTimer()

longPolling()   

scrollToBottom()



inputEle.onkeydown = function (e) {
  var key = e.which
    // 13 代表 enter 按键
  if(key == 13){

    let value = inputEle.value

    if(value){

      $.ajax({
        type:'post',
        url:'http://localhost:3000/chat/addContent',
        data:{
          content:value
        },
        success:(result)=>{
          if(result.status==='success'){

            renderChat(result.contents)  

            inputEle.value=''

            scrollToBottom()

            originData = result.contents
            
          }       
        },
      })
    }
  }
}

function getOriginData(){
  $.ajax({
    type:'get',
    url: 'http://localhost:3000/chat/getContent',
    data:{},
    success:(result)=>{
      originData = result.contents
    }
  }) 
}

/* 重新渲染 */
function renderChat(contents){

  let html=''
  contents.forEach((item)=>{

    html +='<div class=\'chat-content-container\'>'+
              '<div class=\'chat-detail clearFix\'>'+
              '<div class=\'chat-detail-left\'>'+
              `<img src='${ item.avatar }' class='chat-avatar'/>`+
              `<div class='chat-name'>${ item.nickName }</div>`+
              '</div>'+
              `<div class='chat-detail-right'>${ item.content }`+
              '</div></div>'+
              `<div class='chat-time'>${moment(item.createdAt).locale('zh_cn').format('YYYYMMMMDo  aHH:mm:ss' )}</div>`+
              '</div>'

  })
    //清空
  $('.chat-content').html('')
    //重新渲染 
  $('.chat-content').html(html)

}

function scrollToBottom(){

  let ele=document.getElementsByClassName('chat-content')[0]

  ele.scrollTop=ele.scrollHeight
  //  scrollTop  div滚动的距离
  //  console.log(ele.scrollTop)
  //  scrollHeight 整个div的高度
  //  console.log(ele.scrollHeight)

}




/* longPolling 长轮询 :不停的发送请求问有没有更新 给最新的数据*/ 

function longPolling(){

    //定时器
  timer=setInterval(() => {

    $.ajax({ 
      type:'get',
      url:'http://localhost:3000/chat/getContent',
      data:{} ,
      success:(result)=>{
          // console.log(result)
        renderChat(result.contents)
        if(originData){
          result.contents.filter((item)=>{
            let flag  = moment(originData[originData.length-1].createdAt).isBefore(moment(item.createdAt))
            if(flag){
              originData = result.contents
              alert('您有一条新消息')
            }
          })
        }
      } 
    })
        
  }, 2000)

}

function stopTimer(){

  if(timer){
    clearInterval(timer)
  }
}