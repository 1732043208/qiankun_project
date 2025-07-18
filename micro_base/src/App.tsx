import {useNavigate, useLocation, Routes, Route} from 'react-router-dom';
import './App.css'
import actions from "./action.ts";

const menuItems = [
    {key: '/dashboard', label: '基座菜单页'},
    {key: '/sub-react', label: 'React子项目模块'},
    {key: '/sub-vue', label: 'Vue子项目模块'},
    {key: '/sub-arco', label: 'Arco-design子项目模块'}
];

function App() {
    const navigate = useNavigate();
    const location = useLocation();
    const titleClick = () => {
        actions.setGlobalState({
            subArco: {
                userName: 'qiankun-arco1'
            }
        })
    }
    return (
        <>
            <div className="admin-layout">
                <aside className="sidebar">
                    <div className="sidebar-title" onClick={() => titleClick()}>qiankun微前端</div>
                    <ul className="menu">
                        {menuItems.map(item => (
                            <li
                                key={item.key}
                                className={location.pathname === item.key ? 'menu-item active' : 'menu-item'}
                                onClick={() => navigate(item.key)}
                            >
                                {item.label}
                            </li>
                        ))}
                    </ul>
                </aside>
                <main className="content">
                    {/* 主应用渲染区域 */}
                    <Routes>
                        <Route path="/dashboard" element={<Dashboard/>}/>
                    </Routes>
                    {/* 子应用渲染区域 */}
                    <div id="sub-app"/>
                </main>
            </div>
        </>
    );
}

function Dashboard() {
    return <div className="content-inner">这是基座页面的内容</div>;
}

export default App