import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { registerMicroApps, start } from 'qiankun';
import { BrowserRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

// 1.要加载的子应用列表
const apps = [
  {
    name: 'sub-react', // app name registered
    entry: '//localhost:3001',
    container: '#sub-app', // 容器id`
    activeRule: '/sub-react',
  },
  {
    name: 'sub-vue',
    entry: '//localhost:3002',
    container: '#sub-app',
    activeRule: '/sub-vue',
  },
]
// 2.注册子应用
registerMicroApps(apps,{
  beforeLoad:[async app => console.log('before load',app.name)],
  beforeMount: [async app => console.log('before mount',app.name)],
  afterUnmount: [async app => console.log('after unmount',app.name)],
});

// 3.启动qiankun
start()