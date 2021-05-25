module.exports = {
    lintOnSave :false,  //取消校验
    configureWebpack:{
        resolve:{
            alias:{
                'assets':'@/assets',
                'components':'@/components',
                'network':'@/network',
                'utils':'@/utils',
                'views':'@/views',
            }
        }
    },
    devServer: {
        proxy: {
            '/api': {     //这里最好有一个 /
                target: 'https://unitrade.alta.ru',  // 后台接口域名
                // ws: true,        //如果要代理 websockets，配置这个参数
                secure: true,  // 如果是https接口，需要配置这个参数
                changeOrigin: true,  //是否跨域
                // pathRewrite:{
                //     '^/rng':''
                // }
            },
            '/express/plog/': {     //这里最好有一个 /
                target: 'https://api.unitrade.su',  // 后台接口域名
                // ws: true,        //如果要代理 websockets，配置这个参数
                secure: true,  // 如果是https接口，需要配置这个参数
                changeOrigin: true,  //是否跨域
                // pathRewrite:{
                //     '^/rng':''
                // }
            },
            '/token/': {     //这里最好有一个 /
                target: 'https://api.unitrade.su',  // 后台接口域名
                // ws: true,        //如果要代理 websockets，配置这个参数
                secure: true,  // 如果是https接口，需要配置这个参数
                changeOrigin: true,  //是否跨域
             
            },
            '/express/events': {     //这里最好有一个 /
                target: 'https://api.unitrade.su',  // 后台接口域名
                // ws: true,        //如果要代理 websockets，配置这个参数
                secure: true,  // 如果是https接口，需要配置这个参数
                changeOrigin: true,  //是否跨域
             
            },
        }
    },
    publicPath:'./',
}