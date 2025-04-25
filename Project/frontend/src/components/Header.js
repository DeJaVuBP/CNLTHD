import React from 'react';
import { useNavigate } from 'react-router-dom';

const Header = ({ onLogout }) => {
    const navigate = useNavigate();

    return (
        <header className="app-header">
            <h2 className="app-title" onClick={() => navigate('/')}>
                NPK School
            </h2>
            <div className="nav-buttons">
                <button onClick={() => navigate('/students')} className="nav-button">
                    Quản lý học sinh
                </button>
                <button onClick={() => navigate('/teachers')} className="nav-button">
                    Quản lý giáo viên
                </button>
                <button onClick={onLogout} className="logout-button">
                    Đăng xuất
                </button>
            </div>
        </header>
    );
};

export default Header;
