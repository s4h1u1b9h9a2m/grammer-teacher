import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import WebSpeechAPI from '../components/WebSpeechAPI'
import MediaStreamAPI from '../components/MediaStreamAPI'
import Home from '../components/Home'

export default new Router({
    mode: 'history',
    routes: [
        { path: '/', component: Home },
        { path: '/WebSpeechAPI', component: WebSpeechAPI },
        { path: '/MediaStreamAPI', component: MediaStreamAPI }
    ]
})