import {initGlobalState} from 'qiankun';

const state = {
    subArco: {
        userName: 'qiankun-arco',
    },
};
// 初始化 state
const actions: any = initGlobalState(state);

// 在当前应用监听全局状态
actions.onGlobalStateChange((newValue: any, oldValue: any) => {
    console.log('基座应用：', newValue, oldValue);
});

export default actions