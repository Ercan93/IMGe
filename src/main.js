import Vue from 'vue'
import App from './App.vue'
import store from "./store"
import VueRouter from "vue-router"
import routes from "./routes"
import VueEaseljs from "vue-easeljs"
import 'bootswatch/dist/sketchy/bootstrap.min.css';


Vue.use(VueEaseljs);
Vue.use(VueRouter);

const router = new VueRouter({ mode: 'history', routes });

new Vue({
        el: '#app',
        store,
        router,
        render: h => h(App)
})
