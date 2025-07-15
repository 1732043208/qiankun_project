import {createRoot} from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import {registerMicroApps, start} from 'qiankun';
import {BrowserRouter} from 'react-router-dom';

createRoot(document.getElementById('root')!).render(
    <BrowserRouter>
        <App/>
    </BrowserRouter>
)

// 1.要加载的子应用列表
const apps = [
    {
        name: 'sub-react', // 微应用的名称，微应用之间必须确保唯一
        entry: '//localhost:3001', // 微应用的访问地址
        container: '#sub-app', // 微应用的容器节点的选择器或者 Element 实例
        activeRule: '/sub-react', // 微应用的激活规则
    },
    {
        name: 'sub-vue',
        entry: '//localhost:3002',
        container: '#sub-app',
        activeRule: '/sub-vue',
    },
    {
        name: 'sub-arco',
        entry: '//localhost:5173',
        container: '#sub-app',
        activeRule: '/sub-arco',
    },
]
// 2.注册子应用
registerMicroApps(apps, {
    beforeLoad: [async app => console.log('before load', app.name)],
    beforeMount: [async app => console.log('before mount', app.name)],
    afterUnmount: [async app => console.log('after unmount', app.name)],
});

// 3.启动qiankun
start({
    // strictStyleIsolation: true, //开启严格的样式隔离模式 shadow dom
    // experimentalStyleIsolation: true //实验性的样式隔离，主要是通过 scoped css 来实现的
})