import React, { useState, useEffect } from 'react';
import studentApi from '../services/studentApi';
import { useParams, useNavigate } from 'react-router-dom';
import Header from './Header';

const EditStudent = ({ onLogout }) => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [form, setForm] = useState(null);

    useEffect(() => {
        const fetchStudent = async () => {
            try {
                const res = await studentApi.get(`/${id}`);
                setForm(res.data);
            } catch (error) {
                console.error('Lỗi lấy học sinh:', error);
                alert('Không tìm thấy học sinh');
                navigate('/student');
            }
        };
        fetchStudent();
    }, [id]);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await studentApi.put(`/update/${id}`, form);
            alert('✅ Cập nhật học sinh thành công!');
            navigate('/student');
        } catch (error) {
            console.error('❌ Lỗi cập nhật:', error);
            alert('Lỗi khi cập nhật học sinh. Vui lòng thử lại!');
        }
    };

    if (!form) return <p className="text-center mt-10">Đang tải dữ liệu...</p>;

    return (
        <div>
            <Header onLogout={onLogout} />
        <div className="form-container">
            <h2 className="form-title">Cập nhật học sinh</h2>
            <form onSubmit={handleSubmit} className="student-form">
                <input name="firstName" value={form.firstName} onChange={handleChange} placeholder="Họ" required />
                <input name="lastName" value={form.lastName} onChange={handleChange} placeholder="Tên" required />
                <input name="mathScore" type="number" value={form.mathScore} onChange={handleChange} placeholder="Toán" />
                <input name="physicsScore" type="number" value={form.physicsScore} onChange={handleChange} placeholder="Lý" />
                <input name="chemistryScore" type="number" value={form.chemistryScore} onChange={handleChange} placeholder="Hóa" />
                <input name="literatureScore" type="number" value={form.literatureScore} onChange={handleChange} placeholder="Văn" />
                <input name="englishScore" type="number" value={form.englishScore} onChange={handleChange} placeholder="Anh" />
                <input name="behaviorScore" value={form.behaviorScore} onChange={handleChange} placeholder="Hạnh kiểm" />
                <input name="className" value={form.className} onChange={handleChange} placeholder="Lớp" className="bg-gray-100" />
                <button type="submit" className="btn submit-btn">💾 Lưu thay đổi</button>
            </form>
        </div>
        </div>

    );
};

export default EditStudent;
