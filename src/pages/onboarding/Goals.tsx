import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { useTheme } from '../../context/ThemeContext';
import { GraduationCap, Briefcase, Sun } from 'lucide-react';
import type { User } from '../../types';

const goals = [
    {
        id: 'school',
        label: 'School & Study',
        icon: GraduationCap,
        desc: 'Ace exams, finish assignments.',
        color: '#6C63FF'
    },
    {
        id: 'work',
        label: 'Work & Career',
        icon: Briefcase,
        desc: 'Hit deadlines, manage projects.',
        color: '#00D4A6'
    },
    {
        id: 'routine',
        label: 'Daily Routine',
        icon: Sun,
        desc: 'Build habits, stay organized.',
        color: '#FFB300'
    }
];

const Goals = () => {
    const navigate = useNavigate();
    const { setUser } = useApp();
    const { theme } = useTheme();

    const handleSelect = (goalId: string) => {
        // Get onboarding data from localStorage
        const mbtiData = localStorage.getItem('user_mbti');
        const adhdData = localStorage.getItem('user_adhd_symptoms');

        const newUser: User = {
            id: Date.now().toString(),
            name: 'User',
            mbti: mbtiData ? JSON.parse(mbtiData) : undefined,
            adhdSymptoms: adhdData ? JSON.parse(adhdData) : [],
            goal: goalId as 'school' | 'work' | 'routine',
            streak: 0,
            xp: 0,
            level: 1,
            badges: [],
            createdAt: new Date().toISOString(),
        };

        setUser(newUser);
        navigate('/dashboard');
    };

    return (
        <div style={{
            minHeight: '100vh',
            background: theme.background,
            fontFamily: 'Inter, sans-serif',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '2rem',
            transition: 'background 0.3s, color 0.3s',
            position: 'relative',
            overflow: 'hidden'
        }}>
            {/* Background decorations */}
            <div style={{
                position: 'absolute',
                top: '-10%',
                left: '50%',
                transform: 'translateX(-50%)',
                width: '600px',
                height: '600px',
                borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(255, 179, 0, 0.1) 0%, transparent 70%)',
                filter: 'blur(80px)',
                zIndex: 0
            }} />

            <div style={{
                maxWidth: '900px',
                width: '100%',
                zIndex: 1
            }}>
                <div style={{ textAlign: 'center', marginBottom: '4rem', animation: 'fadeIn 0.5s ease-out' }}>
                    <h2 style={{ fontSize: '2.5rem', fontWeight: 800, color: theme.text, marginBottom: '1rem' }}>
                        What's your main focus?
                    </h2>
                    <p style={{ color: theme.textSecondary, fontSize: '1.1rem' }}>
                        We'll tailor your dashboard to this goal.
                    </p>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem', animation: 'fadeIn 0.5s ease-out 0.1s backwards' }}>
                    {goals.map((goal) => (
                        <button
                            key={goal.id}
                            onClick={() => handleSelect(goal.id)}
                            style={{
                                background: theme.cardBackground,
                                border: `1px solid ${theme.border}`,
                                borderRadius: '1.5rem',
                                padding: '2.5rem',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                textAlign: 'center',
                                cursor: 'pointer',
                                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                                position: 'relative',
                                overflow: 'hidden'
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform = 'translateY(-8px)';
                                e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.1)';
                                e.currentTarget.style.borderColor = goal.color;
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = 'translateY(0)';
                                e.currentTarget.style.boxShadow = 'none';
                                e.currentTarget.style.borderColor = theme.border;
                            }}
                        >
                            <div style={{
                                width: '80px',
                                height: '80px',
                                borderRadius: '50%',
                                background: `${goal.color}15`,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                marginBottom: '1.5rem',
                                color: goal.color,
                                transition: 'transform 0.3s ease'
                            }}>
                                <goal.icon size={40} />
                            </div>
                            <h3 style={{ fontSize: '1.5rem', fontWeight: 700, color: theme.text, marginBottom: '0.75rem' }}>
                                {goal.label}
                            </h3>
                            <p style={{ color: theme.textSecondary, fontSize: '1rem', lineHeight: 1.5 }}>
                                {goal.desc}
                            </p>
                        </button>
                    ))}
                </div>
            </div>
            <style>{`
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
            `}</style>
        </div>
    );
};

export default Goals;
