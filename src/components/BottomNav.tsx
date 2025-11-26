import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Home, Calendar, Trophy, BarChart2, Smile } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const BottomNav: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { theme } = useTheme();

    const navItems = [
        { icon: Home, label: 'Home', path: '/dashboard' },
        { icon: Calendar, label: 'Calendar', path: '/calendar' },
        { icon: Trophy, label: 'Rewards', path: '/rewards' },
        { icon: BarChart2, label: 'Analytics', path: '/analytics' },
        { icon: Smile, label: 'Mood', path: '/mood' },
    ];

    return (
        <div style={{
            position: 'fixed',
            bottom: '1.5rem',
            left: '50%',
            transform: 'translateX(-50%)',
            background: theme.cardBackground,
            borderRadius: '2rem',
            padding: '0.75rem 1.5rem',
            display: 'flex',
            alignItems: 'center',
            gap: '1.5rem',
            boxShadow: '0 10px 40px rgba(0,0,0,0.1)',
            border: `1px solid ${theme.border}`,
            zIndex: 50,
            backdropFilter: 'blur(10px)'
        }}>
            {navItems.map((item) => {
                const isActive = location.pathname === item.path;
                return (
                    <button
                        key={item.path}
                        onClick={() => navigate(item.path)}
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            gap: '0.25rem',
                            background: 'none',
                            border: 'none',
                            cursor: 'pointer',
                            color: isActive ? theme.primary : theme.textSecondary,
                            transition: 'all 0.2s'
                        }}
                    >
                        <item.icon
                            size={24}
                            strokeWidth={isActive ? 2.5 : 2}
                            style={{
                                transform: isActive ? 'translateY(-2px)' : 'none',
                                transition: 'transform 0.2s'
                            }}
                        />
                        <span style={{
                            fontSize: '0.65rem',
                            fontWeight: 600,
                            opacity: isActive ? 1 : 0,
                            height: isActive ? 'auto' : 0,
                            overflow: 'hidden',
                            transition: 'all 0.2s'
                        }}>
                            {item.label}
                        </span>
                    </button>
                );
            })}
        </div>
    );
};

export default BottomNav;
