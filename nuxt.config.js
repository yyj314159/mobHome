const webpack = require('webpack');
export default {
  mode: 'universal',

  /*
  ** Headers of the page
  */
 head: {
  title:'族蚂网',
  meta: [
    { charset: 'utf-8' },
    { name:"viewport",content:"width=device-width,initial-scale=1.0"},
    { name: '360-site-verification', content: 'e2eb7859c3b584a1ba57a41b54f6cd19' },
    { name: 'renderer', content: 'webkit' }
  ],
  link: [{ rel: 'icon', type: 'image/x-icon', href: '/images/favicon.ico' }],
  script:[
    {src:'https://api.map.baidu.com/api?v=2.0&ak=McWiE04C9VuooeMvh9WGoRgzdnAOBrvH',type:"text/javascript"},
    {src:'/flexible.js',type:'text/javascript',charset:'utf-8'},
    {src:'/swiper.min.js',type:'text/javascript',charset:'utf-8'},
    {src:'https://res.wx.qq.com/open/js/jweixin-1.4.0.js',type:"text/javascript"}
  ]
},

  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },

  /*
  ** Global CSS
  */
  css: [
    '~/assets/css/public.styl',
    '~/assets/css/theme.styl',
    '~/assets/css/swiper.min.css',
  ],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    { src: '~/plugins/main', ssr: false },
    { src: '~/plugins/cube-ui', ssr: true },

  ],

  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/proxy'
  ],
  /*
  ** Axios module configuration
  */
  axios: {
    // See https://github.com/nuxt-community/axios-module#options
    proxy: true
  },
  proxy: {
    '/manage-api/': 'http://192.168.0.140:8083',
    '/cart/': 'http://192.168.0.184:8095',
    '/product_gateway/': 'http://192.168.0.184:7081',
    '/service/': 'http://192.168.0.186:8093',
    '/audio_web/': 'http://192.168.0.185:8091',
    '/dictionary/': 'http://192.168.0.180:8083',
    '/blog_api/': 'http://192.168.0.191:8093',
    '/news_web/': 'http://192.168.0.190:8091',
    '/shop_web/':'http://192.168.0.193:8093',
    '/user/':'http://192.168.0.180:8083',
    '/product_wap/':'http://192.168.0.184:7080',
    '/register/':'http://192.168.0.180:8083',
    '/city/':'http://192.168.0.180:8083',
    '/admin/':'http://192.168.0.180:8094',
    '/wap/member/':'http://192.168.0.193:8096',
    '/wap/forget/':'http://192.168.0.193:8096',
    '/wap/register/':'http://192.168.0.193:8096',
    '/z-member/':'http://192.168.0.193:8097',
    '/z-chat/':'http://192.168.0.230:8091',
     },

  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    postcss: [
      require('postcss-px2rem')({
        remUnit: 32
      })
    ],
    extend(config, ctx) {
      if (ctx.dev && ctx.isClient) {
        config.node = {
            console: true,
            fs: 'empty',
            net: 'empty',
            tls: 'empty'
        }
        config.module.rules.push({
            enforce: 'pre',
            test: /\.(js|vue)$/,
            loader: 'eslint-loader',
            exclude: /(node_modules)/
        })
        config.module.rules.push({
            test: /\.json$/,
            loader: 'json-loader'
        })
      }
      config.resolve.alias['cube-ui'] = 'cube-ui/lib';
    },
    plugins: [
      new webpack.ProvidePlugin({
        '$': 'jquery'
      })
    ]
  }
}
