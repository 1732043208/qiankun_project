import React from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import './App.css';

// 示例页面组件
function Dashboard() {
  return <div className="content-inner">这是基座页面的内容</div>;
}

const menuItems = [
  { key: '/dashboard', label: '基座菜单页' },
  { key: '/sub-react', label: 'React子项目模块' },
  { key: '/sub-vue', label: 'Vue子项目模块' }
];

function App() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="admin-layout">
      <aside className="sidebar">
        <div className="sidebar-title">qiankun微前端</div>
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
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
        {/* 子应用渲染区域 */}
        <div id="sub-app"/>
      </main>
    </div>
  );
}

export default App;
