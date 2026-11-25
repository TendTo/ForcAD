import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import axios from 'axios';
import store from '@/store';
import { apiUrl } from '@/config';
import DefaultLayout from '@/layouts/DefaultLayout.vue';
import EmptyLayout from '@/layouts/EmptyLayout.vue';

axios.defaults.baseURL = apiUrl;
axios.defaults.withCredentials = true;

const app = createApp(App);
app.config.globalProperties.$http = axios;
store.$http = axios;

app.component('DefaultLayout', DefaultLayout);
app.component('EmptyLayout', EmptyLayout);

app.use(router);
app.use(store);
app.mount('#app');
