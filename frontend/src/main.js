import { createApp } from 'vue';
import App from './App.vue';
import router from './router';

// Importa Vuetify
import { createVuetify } from 'vuetify';
import 'vuetify/styles';
import '@mdi/font/css/materialdesignicons.css';

import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';

// Importa vue-the-mask
import { VueTheMask } from 'vue-the-mask';

const vuetify = createVuetify({
  components,
  directives,
});

const app = createApp(App);

app.use(router);
app.use(vuetify);
app.use(VueTheMask);

app.mount('#app');
