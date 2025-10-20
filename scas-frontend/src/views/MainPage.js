import React from 'react';
import { useNavigate } from 'react-router-dom';
import './MainPage.css';
import logo from '../assets/images/SCAS_LOGO.jpg';
import Button from '../components/common/Button';

function MainPage() {
  const navigate = useNavigate();
  const REACT_APP_ATTENDANCE_URL = process.env.REACT_APP_ATTENDANCE_URL;
  const handleRecordClick = () => {
    window.open(REACT_APP_ATTENDANCE_URL, '_blank');
  };

  const handleViewClick = () => {
    navigate('/view');
  };

  return (
    <div className="main-container">
      <img src={logo} alt="SCAS Logo" className="main-logo" />
      <h1 className="main-text">이번 주일의 출석을 기록해 주세요!!!</h1>
      <div className="button-group">
        <Button text="출석 기록하기" onClick={handleRecordClick} type="primary" />
        <Button text="기록 확인하기" onClick={handleViewClick} type="primary" />
      </div>
      <p className='sub-text'>수정성결교회 초등부 출석 관리 시스템 | 문의: leeejjju@gmail.com</p>
    </div>
  );
}

export default MainPage;
