const { render} = require("nunjucks")

/* 
 *login页面
 */
async function login(ctx, next) {

  await ctx.render('login')
}

/* 
 *login检测
 */
async function chatLogin(ctx, next) {
  const {nickName} = ctx.request.body
  ctx.cookies.set('user',JSON.stringify({nickName }))
  if (nickName) {
    // await ctx.redirect('./chat')
    ctx.response.body = {
        status: 'success'
      }
  }
}

/* 
 *chat页面
 */
async function chat(ctx, next) {
  let user=ctx.cookies.get('user')
  if(user){
    user=JSON.parse(user)
    console.log(user.nickName)
    if(user.nickName){
        await ctx.render('chat')

    }else{
        ctx.redirect('/')
    }
  }else{
    ctx.redirect('/')

  }


}




module.exports = {
  login,
  chatLogin,
  chat
}
