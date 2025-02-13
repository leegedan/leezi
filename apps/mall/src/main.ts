import { createApp } from 'vue';
import App from './App.vue';
import { setupRouter } from './router';
import { setupPageStackRouter } from './router/pageStack';
import { setupStore } from './store';
import { setupVant } from './components/registerVant';
import { loadMobileConsole, consoleAppInfo } from './utils';

// global
import './styles/index.less';

async function bootstrap() {
  // 开发调试：测试环境开启调试面板
  if (location.href.indexOf('localhost') > -1) {
    await loadMobileConsole('vconsole');
  } else if (location.href.indexOf('vconsole=show') > -1 || localStorage.getItem('vconsole') === 'show') {
    await loadMobileConsole('vconsole');
  } else if (location.href.indexOf('eruda=show') > -1 || localStorage.getItem('eruda') === 'show') {
    await loadMobileConsole('eruda');
  }
  // 应用信息
  consoleAppInfo();
  // app
  const app = createApp(App);

  setupRouter(app);
  setupPageStackRouter(app);
  setupStore(app);
  setupVant(app);

  app.mount('#app');
}

bootstrap();
