import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import './assets/css/app.css';
import BackToTop from 'vue-backtotop';

createApp(App)
	.use(router)
	.use(BackToTop)
	.mount('#app');


