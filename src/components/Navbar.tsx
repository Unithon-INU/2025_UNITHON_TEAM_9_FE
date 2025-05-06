// src/components/Navbar.tsx
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './Navbar.css';

const Navbar: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const isActive = (path: string) => {
        return location.pathname === path;
    };

    return (
        <nav className="navbar">
            <div className="navbar-logo" onClick={() => navigate('/')}>
                ChakBoot
            </div>
            <div className="navbar-links">
                <div
                    className={`navbar-link ${isActive('/') ? 'active' : ''}`}
                    onClick={() => navigate('/')}
                >
                    홈
                </div>
                <div
                    className={`navbar-link ${
                        isActive('/selectcloth') ? 'active' : ''
                    }`}
                    onClick={() => navigate('/selectcloth')}
                >
                    옷 선택
                </div>
                <div
                    className={`navbar-link ${
                        isActive('/selectmodel') ? 'active' : ''
                    }`}
                    onClick={() => navigate('/selectmodel')}
                >
                    모델 선택
                </div>
                <div
                    className={`navbar-link ${
                        isActive('/result') ? 'active' : ''
                    }`}
                    onClick={() => navigate('/result')}
                >
                    결과
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
