import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ViewPage.css';
import Button from '../components/common/Button';

function ViewPage() {
  const navigate = useNavigate();
  const [date, setDate] = useState('');
  const [className, setClassName] = useState('');
  const [attendanceData, setAttendanceData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const REACT_APP_WHOLE_VIEW_URL= process.env.REACT_APP_WHOLE_VIEW_URL;
  const REACT_APP_APPSCRIPT_API_URL=process.env.REACT_APP_APPSCRIPT_API_URL;

  const handleConfirm = async () => {
    if (!date || !className) {
      setError('날짜와 분반을 모두 선택해주세요.');
      setAttendanceData(null);
      return;
    }

    setError('');
    setLoading(true);
    setAttendanceData(null);

    try {
      // ✅ Google Apps Script 호출
      const response = await fetch(
        `${REACT_APP_APPSCRIPT_API_URL}?class=${encodeURIComponent(className)}&date=${encodeURIComponent(date)}`
      );

      if (!response.ok) throw new Error('서버 응답이 올바르지 않습니다.');

      const data = await response.json();

      // data는 예를 들어 이런 형태로 온다고 가정:
      // { attendance: ["홍길동", "이영희"], bible: ["홍길동"], memory: ["이영희"] }
      setAttendanceData(data);
    } catch (err) {
      console.error(err);
      setError('데이터를 불러오는 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  const handleWholeViewClick = () => {
    window.open(REACT_APP_WHOLE_VIEW_URL, '_blank');
  };

  return (
    <div className="view-container">
      {/* 상단 뒤로가기 */}
      <div className="top-bar">
        <Button text="← 뒤로가기" onClick={() => navigate('/')} type="outline" />
        <Button text="전체 기록 확인하기" onClick={() => handleWholeViewClick()} type="outline" />
      </div>

      {/* 날짜 및 분반 선택 */}
      <div className="filter-container">
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="date-picker"
        />

        <select
          value={className}
          onChange={(e) => setClassName(e.target.value)}
          className="class-dropdown"
        >
          <option value="">분반 선택</option>
          <option value="4남1">4남1</option>
          <option value="4남2">4남2</option>
          <option value="4여1">4여1</option>
          <option value="4여2">4여2</option>
          <option value="5남1">5남1</option>
          <option value="5남2">5남2</option>
          <option value="5남3">5남3</option>
          <option value="5여">5여</option>
          <option value="6남">6남</option>
          <option value="6여">6여</option>
        </select>

        <Button text="확인하기" onClick={handleConfirm} type="primary" />
      </div>

      {/* 로딩/오류 표시 */}
      {loading && <div className="loading-text">데이터 불러오는 중...</div>}
      {error && <div className="error-text">{error}</div>}

      {/* 결과 표시 */}
      {attendanceData && (
        <div className="result-container">
          <h3>{`${date} 의 ${className}반 출석 현황`}</h3>

          <div className="data-section">
            <h4>✅ 출석한 학생</h4>
            {attendanceData.attendance?.length ? (
              <ul>
                {attendanceData.attendance.map((name, idx) => (
                  <li key={idx}>{name}</li>
                ))}
              </ul>
            ) : (
              <p>출석한 학생이 없습니다.</p>
            )}
          </div>

          <div className="data-section">
            <h4>📖 성경책 가져온 학생</h4>
            {attendanceData.bible?.length ? (
              <ul>
                {attendanceData.bible.map((name, idx) => (
                  <li key={idx}>{name}</li>
                ))}
              </ul>
            ) : (
              <p>성경책을 가져온 학생이 없습니다.</p>
            )}
          </div>

          <div className="data-section">
            <h4>🗣️ 암송한 학생</h4>
            {attendanceData.memory?.length ? (
              <ul>
                {attendanceData.memory.map((name, idx) => (
                  <li key={idx}>{name}</li>
                ))}
              </ul>
            ) : (
              <p>암송한 학생이 없습니다.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default ViewPage;
