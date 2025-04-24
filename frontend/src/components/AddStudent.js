import React, { useState } from 'react';
import studentApi from '../services/studentApi';
import { useNavigate, useLocation } from 'react-router-dom';
import Header from './Header';

const AddStudent = ({ onLogout }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const selectedClass = params.get('class') || '';

    const [form, setForm] = useState({
        firstName: '',
        lastName: '',
        mathScore: '',
        physicsScore: '',
        chemistryScore: '',
        literatureScore: '',
        englishScore: '',
        behaviorScore: '',
        className: selectedClass
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await studentApi.post('/addStudent', form);
            alert('✅ Thêm học sinh thành công!');
            navigate('/student');
        } catch (error) {
            console.error('Lỗi thêm học sinh:', error);
            alert('❌ Lỗi thêm học sinh!');
        }
    };

    return (
        <div>
            <Header onLogout={onLogout} />

        <div className="form-container">
            <h2 className="form-title">Thêm học sinh</h2>

            <form onSubmit={handleSubmit} className="student-form">
                <input name="firstName" placeholder="Họ" onChange={handleChange} required />
                <input name="lastName" placeholder="Tên" onChange={handleChange} required />
                <input name="mathScore" type="number" placeholder="Điểm Toán" onChange={handleChange} />
                <input name="physicsScore" type="number" placeholder="Điểm Lý" onChange={handleChange} />
                <input name="chemistryScore" type="number" placeholder="Điểm Hóa" onChange={handleChange} />
                <input name="literatureScore" type="number" placeholder="Điểm Văn" onChange={handleChange} />
                <input name="englishScore" type="number" placeholder="Điểm Anh" onChange={handleChange} />
                <input name="behaviorScore" placeholder="Hạnh kiểm (Tốt, Khá, ...)" onChange={handleChange} />
                <input name="className" value={form.className} readOnly className="readonly" />

                <button type="submit" className="btn submit-btn">➕ Thêm</button>
            </form>
        </div>
        </div>
    );
};

export default AddStudent;
