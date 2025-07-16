import {createApp} from 'vue';
import ArcoVue from '@arco-design/web-vue';
import {renderWithQiankun, qiankunWindow} from 'vite-plugin-qiankun/dist/helper'
import ArcoVueIcon from '@arco-design/web-vue/es/icon';
import globalComponents from '@/components';
import router from './router';
import store from './store';
import i18n from './locale';
import directive from './directive';
import './mock';
import App from './App.vue';

// Styles are imported via arco-plugin. See config/plugin/arcoStyleImport.ts in the directory for details
// 样式通过 arco-plugin 插件导入。详见目录文件 config/plugin/arcoStyleImport.ts
// https://arco.design/docs/designlab/use-theme-package
import '@/assets/style/global.less';
import '@/api/interceptor';

let appInstance: any = null

const render = (container: any) => {
    const appDom = container || "#app"
    appInstance = createApp(App)
    appInstance.use(ArcoVue, {})
        .use(ArcoVueIcon)
        .use(router)
        .use(store)
        .use(i18n)
        .use(globalComponents)
        .use(directive)
        .mount(appDom)
}

const initQianKun = () => {
    renderWithQiankun({
        bootstrap() {
            console.log('bootstrap');
        },
        mount(_props) {
            console.log('mount', _props);
            _props.onGlobalStateChange((state: any, prev: any) => {
                // state: 变更后的状态; prev 变更前的状态
                console.log('子应用：', state, prev);
            });
            render(_props.container)
        },
        unmount(_props) {
            console.log('unmount', _props);
            if (appInstance) {
                appInstance.unmount()
                appInstance = null
            }
        },
        update(props) {
            console.log('update', props);
        }
    });
}
// eslint-disable-next-line no-unused-expressions
qiankunWindow.__POWERED_BY_QIANKUN__ ? initQianKun() : render(null)
