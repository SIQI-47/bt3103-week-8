import Vue from 'vue'
import App from './App.vue'
import Routes from './routes.js'
//step1 -- import and use VueRouter
import VueRouter from 'vue-router'

Vue.config.productionTip = false
//step2
Vue.use(VueRouter)

//step3 -- register routes
const myRouter = new VueRouter({
  routes: Routes,
  mode: "history"
});
new Vue({
  render: h => h(App),
  router: myRouter //put router in VueRouter
}).$mount('#app')