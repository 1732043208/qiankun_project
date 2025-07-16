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
    console.log(state, prev);
});

export default actions