import React, { useEffect, useState } from 'react';
import studentApi from '../services/studentApi';
import { useNavigate } from 'react-router-dom';
import Header from "./Header";

const StudentManagement = () => {
    const [students, setStudents] = useState([]);
    const [selectedClass, setSelectedClass] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            if (selectedClass) {
                try {
                    const res = await studentApi.get(`/byClass/${selectedClass}`);
                    setStudents(res.data);
                } catch (err) {
                    console.error('Lỗi khi lấy học sinh:', err);
                }
            }
        };
        fetchData();
    }, [selectedClass]);

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm("Bạn có chắc chắn muốn xóa học sinh này không?");
        if (!confirmDelete) return;

        try {
            await studentApi.delete(`/delete/${id}`);
            alert('Xóa học sinh thành công!');
            // Refresh lại danh sách
            const res = await studentApi.get(`/byClass/${selectedClass}`);
            setStudents(res.data);
        } catch (error) {
            console.error('Lỗi xoá:', error);
            alert('Lỗi khi xóa học sinh');
        }
    };

    return (
        <div>
            <Header />
            <div className="student-container">
                <h2 className="student-title">Danh sách học sinh</h2>

                {message && <p className="success-message">{message}</p>}

                <div className="class-select">
                    <label htmlFor="classDropdown">Chọn lớp:</label>
                    <select
                        id="classDropdown"
                        value={selectedClass}
                        onChange={(e) => setSelectedClass(e.target.value)}
                    >
                        <option value="">-- Chọn lớp --</option>
                        <option value="10A1">10A1</option>
                        <option value="10A2">10A2</option>
                        <option value="11A1">11A1</option>
                        <option value="11A2">11A2</option>
                        <option value="12A1">12A1</option>
                        <option value="12A2">12A2</option>
                    </select>
                </div>

                {selectedClass && (
                    <div className="student-section">
                        <button
                            className="btn add-btn"
                            onClick={() => navigate(`/students/add?class=${selectedClass}`)}
                        >
                            ➕ Thêm học sinh
                        </button>

                        <div className="student-table-wrapper">
                            <h3>Danh sách học sinh lớp {selectedClass}</h3>

                            {students.length > 0 ? (
                                <table className="student-table">
                                    <thead>
                                    <tr>
                                        <th>Mã HS</th>
                                        <th>Họ</th>
                                        <th>Tên</th>
                                        <th>Toán</th>
                                        <th>Lý</th>
                                        <th>Hóa</th>
                                        <th>Văn</th>
                                        <th>Anh</th>
                                        <th>Học lực</th>
                                        <th>Hạnh kiểm</th>
                                        <th>Thao tác</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {students.map((student) => (
                                        <tr key={student.studentNumber}>
                                            <td>{student.studentNumber}</td>
                                            <td>{student.firstName}</td>
                                            <td>{student.lastName}</td>
                                            <td>{student.mathScore}</td>
                                            <td>{student.physicsScore}</td>
                                            <td>{student.chemistryScore}</td>
                                            <td>{student.literatureScore}</td>
                                            <td>{student.englishScore}</td>
                                            <td>{student.academicPerformance}</td>
                                            <td>{student.behaviorScore}</td>
                                            <td>
                                                <button
                                                    className="btn edit-btn"
                                                    onClick={() =>
                                                        navigate(`/students/edit/${student.studentNumber}`)
                                                    }
                                                >
                                                    Sửa
                                                </button>
                                                <button
                                                    className="btn delete-btn"
                                                    onClick={() => handleDelete(student.studentNumber)}
                                                >
                                                    Xoá
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </table>
                            ) : (
                                <p>Không có học sinh nào trong lớp <strong>{selectedClass}</strong>.</p>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default StudentManagement;
