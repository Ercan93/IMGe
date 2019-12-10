import Vue from 'vue'
import App from './App.vue'
import store from "./store"
import routes from "./routes"
import VueRouter from "vue-router"

import 'bootswatch/dist/sketchy/bootstrap.min.css';

Vue.use(VueRouter);
const router = new VueRouter({ mode: 'history', routes });

new Vue({
        el: '#app',
        store,
        routes,
        render: h => h(App)
})
