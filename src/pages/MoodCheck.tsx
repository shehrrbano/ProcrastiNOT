import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { useTheme } from '../context/ThemeContext';
import BottomNav from '../components/BottomNav';
import { Smile, Meh, Frown, Rocket, Bell, Settings, CloudRain, BedDouble, Zap, Utensils, Users, Briefcase, Lightbulb } from 'lucide-react';

const MoodCheck = () => {
    const navigate = useNavigate();
    const { addMoodEntry, moodEntries } = useApp();
    const { theme, isDarkMode } = useTheme();
    const [selectedMood, setSelectedMood] = useState<'great' | 'good' | 'okay' | 'bad' | 'terrible' | null>(null);
    const [selectedFactors, setSelectedFactors] = useState<string[]>([]);



    const moods = [
        { id: 'terrible', icon: Frown, label: 'Terrible', color: '#EF4444' },
        { id: 'bad', icon: CloudRain, label: 'Bad', color: '#F97316' },
        { id: 'okay', icon: Meh, label: 'Okay', color: '#EAB308' },
        { id: 'good', icon: Smile, label: 'Good', color: '#10B981' },
        { id: 'great', icon: Rocket, label: 'Great', color: '#8B5CF6' },
    ];

    const factors = [
        { id: 'sleep', icon: BedDouble, label: 'Sleep' },
        { id: 'stress', icon: Zap, label: 'Stress' },
        { id: 'nutrition', icon: Utensils, label: 'Nutrition' },
        { id: 'social', icon: Users, label: 'Social' },
        { id: 'work', icon: Briefcase, label: 'Work' },
    ];

    const toggleFactor = (factorId: string) => {
        setSelectedFactors(prev =>
            prev.includes(factorId)
                ? prev.filter(f => f !== factorId)
                : [...prev, factorId]
        );
    };

    const handleSave = () => {
        if (selectedMood) {
            // Map extended moods to basic types for storage if needed, or update type definition
            // For now, mapping to closest basic type
            const mappedMood = selectedMood === 'terrible' ? 'bad' : selectedMood === 'good' ? 'great' : selectedMood as any;
            addMoodEntry(mappedMood, selectedFactors);
            navigate('/dashboard');
        }
    };

    // Chart Data Calculation
    const chartData = moodEntries.slice(-7).map(entry => {
        let value = 0.5;
        if (entry.mood === 'great') value = 1;
        if (entry.mood === 'bad') value = 0;
        return value;
    });

    // Fill with dummy data if not enough entries
    while (chartData.length < 7) {
        chartData.unshift(0.5);
    }

    return (
        <div style={{
            minHeight: '100vh',
            background: theme.background,
            fontFamily: 'Inter, sans-serif',
            color: theme.text,
            paddingBottom: '80px',
            transition: 'background 0.3s, color 0.3s'
        }}>
            {/* Header */}
            <div style={{
                padding: '1.5rem 2rem',
                borderBottom: `1px solid ${theme.border}`,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <div style={{ color: theme.primary, fontSize: '1.5rem' }}>✦</div>
                    <span style={{ fontWeight: 700, fontSize: '1.125rem' }}>ProcrastiNOT</span>
                </div>
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                    <button style={{ background: 'transparent', border: 'none', color: theme.textSecondary, cursor: 'pointer', padding: '0.5rem' }}>
                        <Bell size={20} />
                    </button>
                    <button style={{ background: 'transparent', border: 'none', color: theme.textSecondary, cursor: 'pointer', padding: '0.5rem' }}>
                        <Settings size={20} />
                    </button>
                    <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'linear-gradient(135deg, #F59E0B, #EF4444)', cursor: 'pointer' }}></div>
                </div>
            </div>

            <div className="w-full py-8 px-6 space-y-8" style={{ maxWidth: '800px', margin: '0 auto' }}>
                {/* Title Section */}
                <div className="text-center space-y-2">
                    <h2 style={{ fontSize: '2rem', fontWeight: 800, color: theme.text }}>
                        How are you feeling today?
                    </h2>
                    <p style={{ color: theme.textSecondary, fontSize: '1rem' }}>
                        Tracking your mood helps find patterns & boost productivity.
                    </p>
                </div>

                {/* Main Card */}
                <div style={{
                    background: theme.cardBackground,
                    borderRadius: '1.5rem',
                    padding: '2.5rem',
                    border: `1px solid ${theme.border}`,
                    boxShadow: isDarkMode ? 'none' : '0 4px 20px rgba(0,0,0,0.05)',
                    textAlign: 'center'
                }}>
                    {/* Mood Selector */}
                    <div style={{ display: 'flex', justifyContent: 'center', gap: '1.5rem', marginBottom: '2.5rem' }}>
                        {moods.map((mood) => (
                            <button
                                key={mood.id}
                                onClick={() => setSelectedMood(mood.id as any)}
                                style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    gap: '0.5rem',
                                    background: 'transparent',
                                    border: 'none',
                                    cursor: 'pointer',
                                    transform: selectedMood === mood.id ? 'scale(1.1)' : 'scale(1)',
                                    transition: 'all 0.2s cubic-bezier(0.34, 1.56, 0.64, 1)',
                                    opacity: selectedMood && selectedMood !== mood.id ? 0.5 : 1
                                }}
                            >
                                <div style={{
                                    width: '64px',
                                    height: '64px',
                                    borderRadius: '50%',
                                    background: selectedMood === mood.id ? `${mood.color}20` : isDarkMode ? '#334155' : '#F3F4F6',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    border: selectedMood === mood.id ? `2px solid ${mood.color}` : '2px solid transparent',
                                    transition: 'all 0.2s'
                                }}>
                                    <mood.icon size={32} color={selectedMood === mood.id ? mood.color : theme.textSecondary} strokeWidth={2} />
                                </div>
                                {selectedMood === mood.id && (
                                    <span style={{ fontSize: '0.875rem', fontWeight: 600, color: mood.color, animation: 'fadeIn 0.2s' }}>
                                        {mood.label}
                                    </span>
                                )}
                            </button>
                        ))}
                    </div>

                    {/* Factors Section */}
                    <div style={{ marginBottom: '2.5rem' }}>
                        <p style={{ fontSize: '0.875rem', fontWeight: 600, color: theme.textSecondary, marginBottom: '1rem' }}>
                            What's influencing your mood?
                        </p>
                        <div style={{ display: 'flex', justifyContent: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
                            {factors.map((factor) => (
                                <button
                                    key={factor.id}
                                    onClick={() => toggleFactor(factor.id)}
                                    style={{
                                        padding: '0.5rem 1rem',
                                        borderRadius: '9999px',
                                        border: `1px solid ${selectedFactors.includes(factor.id) ? theme.primary : theme.border}`,
                                        background: selectedFactors.includes(factor.id) ? `${theme.primary}15` : 'transparent',
                                        color: selectedFactors.includes(factor.id) ? theme.primary : theme.textSecondary,
                                        fontSize: '0.875rem',
                                        fontWeight: 500,
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '0.5rem',
                                        cursor: 'pointer',
                                        transition: 'all 0.2s'
                                    }}
                                >
                                    <factor.icon size={16} />
                                    {factor.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Insight Box */}
                    {selectedMood && (
                        <div style={{
                            background: isDarkMode ? '#1E1B3D' : '#EEF2FF',
                            borderRadius: '1rem',
                            padding: '1rem',
                            display: 'flex',
                            alignItems: 'start',
                            gap: '0.75rem',
                            textAlign: 'left',
                            marginBottom: '2rem'
                        }}>
                            <Lightbulb size={20} color="#6366F1" style={{ marginTop: '0.125rem', flexShrink: 0 }} />
                            <p style={{ fontSize: '0.875rem', color: isDarkMode ? '#C7D2FE' : '#4338CA', lineHeight: 1.5 }}>
                                Feeling {selectedMood} today? Great! We noticed your mood often improves after social activities. Keep it up!
                            </p>
                        </div>
                    )}

                    {/* Log Button */}
                    <button
                        onClick={handleSave}
                        disabled={!selectedMood}
                        style={{
                            background: theme.primary,
                            color: '#FFF',
                            border: 'none',
                            borderRadius: '9999px',
                            padding: '0.875rem 3rem',
                            fontSize: '1rem',
                            fontWeight: 600,
                            cursor: selectedMood ? 'pointer' : 'not-allowed',
                            opacity: selectedMood ? 1 : 0.5,
                            transition: 'all 0.2s',
                            boxShadow: selectedMood ? `0 4px 12px ${theme.primary}40` : 'none'
                        }}
                    >
                        Log My Mood
                    </button>
                </div>

                {/* Week in a Glance Chart */}
                <div style={{
                    background: theme.cardBackground,
                    borderRadius: '1.5rem',
                    padding: '2rem',
                    border: `1px solid ${theme.border}`,
                    boxShadow: isDarkMode ? 'none' : '0 4px 20px rgba(0,0,0,0.05)'
                }}>
                    <h3 style={{ fontSize: '1rem', fontWeight: 700, textAlign: 'center', marginBottom: '2rem', color: theme.text }}>
                        Your Week in a Glance
                    </h3>
                    <div style={{ height: '120px', position: 'relative', display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', padding: '0 1rem' }}>
                        {/* SVG Line */}
                        <svg style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', overflow: 'visible' }}>
                            <path
                                d={`M 0 ${120 - chartData[0] * 100} ${chartData.map((v, i) => `L ${(i / 6) * 100}% ${120 - v * 100}`).join(' ')}`}
                                fill="none"
                                stroke={theme.secondary}
                                strokeWidth="3"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                            {/* Area under curve */}
                            <path
                                d={`M 0 ${120 - chartData[0] * 100} ${chartData.map((v, i) => `L ${(i / 6) * 100}% ${120 - v * 100}`).join(' ')} L 100% 120 L 0 120 Z`}
                                fill={`url(#gradient-${theme.secondary})`}
                                stroke="none"
                                opacity="0.2"
                            />
                            <defs>
                                <linearGradient id={`gradient-${theme.secondary}`} x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="0%" stopColor={theme.secondary} />
                                    <stop offset="100%" stopColor={theme.secondary} stopOpacity="0" />
                                </linearGradient>
                            </defs>
                        </svg>

                        {/* Data Points */}
                        {chartData.map((v, i) => (
                            <div key={i} style={{
                                position: 'absolute',
                                left: `${(i / 6) * 100}%`,
                                bottom: `${v * 100}px`,
                                width: '12px',
                                height: '12px',
                                borderRadius: '50%',
                                background: theme.cardBackground,
                                border: `3px solid ${theme.secondary}`,
                                transform: 'translate(-50%, 50%)',
                                zIndex: 10
                            }} />
                        ))}
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1rem', padding: '0 1rem' }}>
                        {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => (
                            <span key={day} style={{ fontSize: '0.75rem', color: theme.textSecondary }}>{day}</span>
                        ))}
                    </div>
                </div>
            </div>
            <BottomNav />
            <style>{`
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(5px); }
                    to { opacity: 1; transform: translateY(0); }
                }
            `}</style>
        </div>
    );
};

export default MoodCheck;

