import { createApp, provide, h } from 'vue';
import { createPinia } from 'pinia';
import { ApolloClients } from '@vue/apollo-composable';
import App from './App.vue';
import router from './router';
import apolloClient from './api/apolloClient';

const app = createApp({
  setup() {
    provide(ApolloClients, {
      default: apolloClient,
    });
  },
  render: () => h(App),
});

app.use(createPinia())
app.use(router);
app.mount('#app');