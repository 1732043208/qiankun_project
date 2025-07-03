import { createApp } from 'vue'
import { renderWithQiankun, qiankunWindow } from 'vite-plugin-qiankun/dist/helper'
import App from './App.vue'

let appInstance = null

const render = (container) => {
    const appDom = container ? container : "#app"
    appInstance = createApp(App)
    appInstance.mount(appDom)
}

const initQianKun = () => {
    renderWithQiankun({
        bootstrap() {
            console.log('bootstrap');
        },
        mount(_props) {
            console.log('mount', _props);
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

qiankunWindow.__POWERED_BY_QIANKUN__ ? initQianKun() : render(null)