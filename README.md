### 目录结构

 ```
├── qiankun_project                     
│   ├── micro_base           # 基座应用
│   ├── my-react-app         # React Demo应用
│   ├── my-vue-app           # Vue Demo应用
│   ├── my-arco-app          # Arco-design Demo应用
│   ├── your_sub_project     # 子应用项目
```
## 基础搭建
### 基座应用配置
```javascript
// micro_base/src/main.tsx
import {registerMicroApps, start} from 'qiankun';

// 1. 微应用列表
const apps = [
  {
    name: 'sub-arco',           // 微应用的名称，微应用之间必须确保唯一
    entry: '//localhost:5173',  // 微应用的访问地址
    container: '#sub-app',      // 微应用的容器节点的选择器或者 Element 实例
    activeRule: '/sub-arco'     // 微应用的激活规则
  }
]

// 2. 注册子应用
registerMicroApps(apps, {
    beforeLoad: [async app => console.log('before load', app.name)],
    beforeMount: [async app => console.log('before mount', app.name)],
    afterUnmount: [async app => console.log('after unmount', app.name)],
})

// 3. 启动qiankun
start({
  // strictStyleIsolation: true,        // 可选：Shadow DOM严格隔离
  // experimentalStyleIsolation: true   // 可选：scoped CSS隔离
})

```
### 子应用配置

#### 1. router 文件配置
```javascript
// my-arco-app/src/router.ts
// 修改基础路由
history: createWebHistory('/sub-arco')  // 对应基座配置的路由名称
```

#### 2. vite.config 配置
```javascript
// my-arco-app/config/vite.config.base.ts
import qiankun from 'vite-plugin-qiankun'

export default defineConfig({
    base: '/sub-arco',  // 自动处理资源路径
    plugins: [
        qiankun('sub-arco', {  // 微应用名称
            useDevMode: true
        })
    ]
})
```

#### 3. main.js 入口文件配置
```javascript
// my-arco-app/src/main.ts
import { renderWithQiankun, qiankunWindow } from 'vite-plugin-qiankun/dist/helper'

let appInstance: any = null

const render = (container: any) => {
  const appDom = container || "#app"
  appInstance = createApp(App)
  // ...（其他插件注册）
  appInstance.mount(appDom)
}

const initQianKun = () => {
  renderWithQiankun({
    bootstrap() {
      console.log('bootstrap')
    },
    mount(_props) {
      console.log('mount', _props)
      render(_props.container)
    },
    unmount(_props) {
      if (appInstance) {
        appInstance.unmount()
        appInstance = null
      }
    }
  })
}

// 判断是否由qiankun启动
qiankunWindow.__POWERED_BY_QIANKUN__ ? initQianKun() : render(null)
```

## 应用通信

### 基座应用配置
#### 方式一：新建js文件，创建action实例
```javascript
// micro_base/src/action.ts
import {initGlobalState} from 'qiankun';

const state = {
    subArco: {
        userName: 'qiankun-arco',
    },
};
// 初始化 state
const actions = initGlobalState(state);

// 在当前应用监听全局状态
actions.onGlobalStateChange((state, prev) => {
    // state: 变更后的状态; prev 变更前的状态
    console.log('基座应用：', state, prev);
});

export default actions
```

#### 方式二：通过props属性将参数传递给子应用
```javascript
// micro_base/src/main.tsx
const apps = [{
        name: 'sub-arco',
        entry: '//localhost:5173',
        container: '#sub-app',
        activeRule: '/sub-arco',
        props: {
            userName: '张三'
        },
    }]
```

### 子应用配置
#### 在mount中的_props中获取基座传递的参数，以及调用onGlobalStateChange开启全局监听
```javascript
// my-arco-app/src/main.ts
const initQianKun = () => {
    renderWithQiankun({
        mount(_props) {
            console.log(_props.userName) // 张三
            _props.onGlobalStateChange((state: any, prev: any) => {
                // state: 变更后的状态; prev 变更前的状态
                console.log('子应用：', state, prev);
            });
            render(_props.container)
        }
    });
}
```

## 已知问题
### 一、主应用与子应用样式隔离问题
#### 1.❌ 无法完全隔离 position: fixed 定位元素
#### 现象：子应用的fixed元素可能错误地相对于主应用定位
#### 解决方案：避免在子应用中使用fixed定位，改用absolute或其他定位方式

#### 2.❌ 样式污染风险
#### 现象：子应用的全局样式可能影响主应用
#### 解决方案：
```css
/*为所有组件添加前缀*/
.sub-arco-button { }  /* 组件样式前缀 */
.sub-arco-layout { }  /* 布局样式前缀 */
```
