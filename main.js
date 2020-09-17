import Vue from 'vue'
import store from '@/common/store'
import App from './App'
import httpRequest from '@/utils/request.js'

Vue.prototype.$http = httpRequest.request
Vue.config.productionTip = false
Vue.prototype.$store = store
App.mpType = 'app'

const app = new Vue({
	store,
	...App
})
app.$mount()
