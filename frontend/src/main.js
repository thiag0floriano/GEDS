import { createApp } from 'vue';
import App from './App.vue';
import router from './router';

createApp(App).use(router).mount('#app');

import { createApp } from 'vue';
import App from './App.vue';
import router from './router';

// Importa Vuetify
import { createVuetify } from 'vuetify';
import 'vuetify/styles';
import '@mdi/font/css/materialdesignicons.css';

import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';

const vuetify = createVuetify({
  components,
  directives,
});

createApp(App).use(router).use(vuetify).mount('#app');

// import { createApp } from 'vue';
// import App from './App.vue';
// import router from './router';

// // Importa Vuetify
// import { createVuetify } from 'vuetify';
// import 'vuetify/styles';
// import '@mdi/font/css/materialdesignicons.css';

// import * as components from 'vuetify/components';
// import * as directives from 'vuetify/directives';

// // Adicione manualmente os componentes que não estão sendo reconhecidos
// const vuetify = createVuetify({
//   components: {
//     ...components,
//     VListItemContent: components.VListItemContent,
//     VListItemTitle: components.VListItemTitle,
//     VListItemSubtitle: components.VListItemSubtitle,
//   },
//   directives,
// });

// createApp(App).use(router).use(vuetify).mount('#app');

