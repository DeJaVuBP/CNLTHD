import React, { useState } from 'react';
import userApi from '../services/userApi';

const AdminLogin = ({ onLogin }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const res = await userApi.post('/auth/login', { username, password });
            if (res.status === 200) {
                onLogin();
            }
        } catch (err) {
            if (err.response) {
                if (err.response.status === 401) {
                    setError('Sai tài khoản hoặc mật khẩu');
                } else {
                    setError(`Lỗi server: ${err.response.status}`);
                }
            } else {
                setError('Không thể kết nối tới server');
            }
        }
    };

    return (
        <div className="login-background">
            <div className="login-form">
                <form onSubmit={handleLogin}>
                    <h2>Đăng nhập</h2>
                    <input
                        type="text"
                        placeholder="Tên đăng nhập"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    /><br/>
                    <input
                        type="password"
                        placeholder="Mật khẩu"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    /><br/>
                    <button type="submit">Đăng nhập</button>
                    {error && <p>{error}</p>}
                </form>
            </div>
        </div>
    );
};

export default AdminLogin;
