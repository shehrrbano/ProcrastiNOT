import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { useTheme } from '../context/ThemeContext';
import Layout from '../components/Layout';
import Button from '../components/Button';
import { Pause, Play, X, Headphones } from 'lucide-react';
import confetti from 'canvas-confetti';

const FocusMode = () => {
    const navigate = useNavigate();
    const { startFocusSession, completeFocusSession, incrementStreak } = useApp();
    const { theme } = useTheme();
    const [isActive, setIsActive] = useState(false);
    const [timeLeft, setTimeLeft] = useState(25 * 60);
    const [showGiveUpModal, setShowGiveUpModal] = useState(false);
    const [sessionId, setSessionId] = useState<string | null>(null);

    useEffect(() => {
        let interval: number | undefined;

        if (isActive && timeLeft > 0) {
            interval = setInterval(() => {
                setTimeLeft((prev) => prev - 1);
            }, 1000);
        } else if (timeLeft === 0 && sessionId) {
            setIsActive(false);
            completeFocusSession(sessionId, 25 * 60);
            incrementStreak();
            confetti({
                particleCount: 150,
                spread: 80,
                origin: { y: 0.6 },
                colors: [theme.primary, theme.secondary, '#FFB300']
            });
        }

        return () => clearInterval(interval);
    }, [isActive, timeLeft, sessionId, completeFocusSession, incrementStreak, theme]);

    const toggleTimer = () => {
        if (!isActive && !sessionId) {
            const id = startFocusSession();
            setSessionId(id);
        }
        setIsActive(!isActive);
    };

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    const handleGiveUp = () => {
        setShowGiveUpModal(true);
    };

    const confirmGiveUp = () => {
        navigate('/dashboard');
    };

    const progress = ((25 * 60 - timeLeft) / (25 * 60)) * 100;

    return (
        <div style={{
            minHeight: '100vh',
            background: theme.background,
            color: theme.text,
            fontFamily: 'Inter, sans-serif',
            transition: 'background 0.3s, color 0.3s',
            position: 'relative',
            overflow: 'hidden'
        }}>
            <Layout fullScreen>
                {/* Animated Background */}
                <div style={{ position: 'absolute', inset: 0, opacity: 0.1, pointerEvents: 'none' }}>
                    <div style={{
                        position: 'absolute',
                        top: '25%',
                        left: '25%',
                        width: '400px',
                        height: '400px',
                        background: theme.primary,
                        borderRadius: '50%',
                        filter: 'blur(120px)',
                        animation: 'float 6s ease-in-out infinite'
                    }} />
                    <div style={{
                        position: 'absolute',
                        bottom: '25%',
                        right: '25%',
                        width: '400px',
                        height: '400px',
                        background: theme.secondary,
                        borderRadius: '50%',
                        filter: 'blur(120px)',
                        animation: 'float 6s ease-in-out infinite 1s'
                    }} />
                </div>

                <div className="z-10 w-full max-w-md p-6 flex flex-col items-center justify-between h-[85vh] mx-auto relative">

                    {/* Top Bar */}
                    <div className="w-full flex justify-between items-center">
                        <button
                            onClick={handleGiveUp}
                            style={{
                                padding: '0.75rem',
                                borderRadius: '50%',
                                background: theme.cardBackground,
                                border: `1px solid ${theme.border}`,
                                color: theme.text,
                                cursor: 'pointer',
                                transition: 'all 0.2s'
                            }}
                            onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
                            onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                        >
                            <X size={24} />
                        </button>
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            fontSize: '0.9rem',
                            fontWeight: 500,
                            background: theme.cardBackground,
                            border: `1px solid ${theme.border}`,
                            padding: '0.5rem 1rem',
                            borderRadius: '9999px',
                            color: theme.text
                        }}>
                            <Headphones size={16} />
                            <span>Binaural Beats: Off</span>
                        </div>
                    </div>

                    {/* Main Timer Area */}
                    <div className="text-center space-y-10 flex-1 flex flex-col justify-center w-full">
                        <div className="space-y-3 animate-slide-in">
                            <h2 style={{ fontSize: '0.9rem', color: theme.textSecondary, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em' }}>Current Task</h2>
                            <h1 style={{ fontSize: '2rem', fontWeight: 800, lineHeight: 1.2, color: theme.text }}>Finish the project proposal</h1>
                        </div>

                        {/* Circular Progress */}
                        <div className="relative w-80 h-80 mx-auto">
                            <svg className="w-full h-full transform -rotate-90">
                                <circle
                                    cx="160"
                                    cy="160"
                                    r="140"
                                    stroke={theme.border}
                                    strokeWidth="12"
                                    fill="none"
                                />
                                <circle
                                    cx="160"
                                    cy="160"
                                    r="140"
                                    stroke="url(#gradient)"
                                    strokeWidth="12"
                                    fill="none"
                                    strokeDasharray={`${2 * Math.PI * 140}`}
                                    strokeDashoffset={`${2 * Math.PI * 140 * (1 - progress / 100)}`}
                                    strokeLinecap="round"
                                    style={{ transition: 'stroke-dashoffset 1s linear' }}
                                />
                                <defs>
                                    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                        <stop offset="0%" stopColor={theme.primary} />
                                        <stop offset="100%" stopColor={theme.secondary} />
                                    </linearGradient>
                                </defs>
                            </svg>
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="text-center">
                                    <div style={{ fontFamily: 'monospace', fontSize: '4.5rem', fontWeight: 700, letterSpacing: '-0.05em', color: theme.text }}>
                                        {formatTime(timeLeft)}
                                    </div>
                                    <div style={{ fontSize: '1rem', color: theme.textSecondary, marginTop: '0.5rem', fontWeight: 500 }}>
                                        {isActive ? 'Focusing...' : 'Paused'}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Controls */}
                        <div className="flex justify-center">
                            <button
                                onClick={toggleTimer}
                                style={{
                                    width: '6rem',
                                    height: '6rem',
                                    borderRadius: '50%',
                                    background: `linear-gradient(135deg, ${theme.primary} 0%, ${theme.secondary} 100%)`,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    boxShadow: `0 0 40px ${theme.primary}50`,
                                    border: 'none',
                                    cursor: 'pointer',
                                    transition: 'transform 0.2s'
                                }}
                                onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                                onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                            >
                                {isActive ? <Pause size={32} fill="white" color="white" /> : <Play size={32} fill="white" color="white" className="ml-1" />}
                            </button>
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="w-full text-center">
                        <p style={{ color: theme.textSecondary, fontSize: '0.9rem', fontWeight: 500 }}>Stay focused. You got this. 💪</p>
                    </div>
                </div>

                {/* Give Up Modal */}
                {showGiveUpModal && (
                    <div style={{
                        position: 'fixed',
                        inset: 0,
                        zIndex: 50,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        background: 'rgba(0,0,0,0.5)',
                        backdropFilter: 'blur(8px)'
                    }}>
                        <div style={{
                            background: theme.cardBackground,
                            color: theme.text,
                            borderRadius: '1.5rem',
                            padding: '2rem',
                            width: '100%',
                            maxWidth: '400px',
                            textAlign: 'center',
                            boxShadow: '0 20px 60px rgba(0,0,0,0.2)',
                            border: `1px solid ${theme.border}`
                        }}>
                            <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>😰</div>
                            <div>
                                <h3 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.5rem' }}>Wait! Don't lose your streak!</h3>
                                <p style={{ color: theme.textSecondary, marginBottom: '1.5rem' }}>You're doing great. Just 5 more minutes?</p>
                            </div>
                            <div className="flex flex-col space-y-3">
                                <Button variant="gradient" size="lg" onClick={() => setShowGiveUpModal(false)}>
                                    Keep Focusing 💪
                                </Button>
                                <Button variant="ghost" onClick={confirmGiveUp} style={{ color: '#FF4B4B' }}>
                                    I give up (Lose Streak)
                                </Button>
                            </div>
                        </div>
                    </div>
                )}
            </Layout>
            <style>{`
                @keyframes float {
                    0%, 100% { transform: translateY(0px); }
                    50% { transform: translateY(-20px); }
                }
            `}</style>
        </div>
    );
};

export default FocusMode;
