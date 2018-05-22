module.exports = function(app) {
    app.role.use('user',async ctx => {
        let {name = '',password = ''} = ctx.request.body;
        let hash = app.crypto(password);
        let cookie = ctx.cookies.get("login",{
            signed: false,
            encrypt: true
        })
        let result=0
        if(cookie){
            let jsonCookie = JSON.parse(cookie);
            let time = await app.redis.get(jsonCookie.name);
            if(jsonCookie.time != time){
              result = 0;
            }else{
              result = 1;
            } 
        }else{
            result = 0;
        }
        return !!result;
    });
    app.role.use('isAdmin', function(ctx) {
        const username = ctx.cookies.get('admin', {
            encrypt: true,
        });
        return !!username;
    });
    app.role.failureHandler = function(ctx,action) {
        ctx.body = { code: 0, msg: 2000 };
    };
  };