import Vue from 'vue'
import App from './App'

// 接收api.js下的myRequst方法
import { myRequest } from 'pages/common/my-request/api.js'
import { getLocations } from 'pages/common/location/api.js'

import version from 'pages/common/update-version/version.js'


// 配置公共方法
import common from './pages/common/common.js'
Vue.prototype.$noMultipleClicks = common.noMultipleClicks;


/* import uniPop from '../../components/uni-popup/uni-popup.vue'
Vue.component('uni-pop',uniPop) */

// 挂载到全局，让所有的页面都能调用myRequest方法
Vue.prototype.$myRequest = myRequest

Vue.prototype.$getLocations = getLocations

Vue.prototype.$versionInfo = version.versionInfo;


Vue.config.productionTip = false
App.mpType = 'app'
Vue.prototype.$baseUrl="http://wx.mzjsh.com:8080/mohome"  //开发接口
//Vue.prototype.$baseUrl="http://wx.mzjsh.com:8080/mohome"  //开发接口
//Vue.prototype.$baseUrl="http://wx.mzjsh.com:8080/jishi"  //开发接口
//Vue.prototype.$baseUrl="http://192.168.1.8:8092"  //开发接口
//Vue.prototype.$baseUrl="http://192.168.12.205:8092"   //开发接口 
//Vue.prototype.$baseUrl="https://m.demo.com/api"  //正式接口
/* Vue.prototype.$androidMapKey="9c4ac6befac0d9f329bdde7f3dbe5f35" //高德地图的key
Vue.prototype.$iosMapKey="9c4ac6befac0d9f329bdde7f3dbe5f35"   //开发接口 */
Vue.prototype.$androidMapKey="bbc50621f716f8069f90c9cd17cb959b" //高德地图的key
Vue.prototype.$iosMapKey="60d58c1c87479dbe30c2649e7bc0c477"   //开发接口
Vue.prototype.$webKey = "9c4ac6befac0d9f329bdde7f3dbe5f35"
Vue.prototype.$imgUrl="http://wx.mzjsh.com:8888/Upload"

const app = new Vue({
    ...App
})
app.$mount()
