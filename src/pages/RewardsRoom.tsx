import { useApp } from '../context/AppContext';
import { useTheme } from '../context/ThemeContext';
import BottomNav from '../components/BottomNav';
import { Trophy, Star, Zap, Target, Lock, Flame, Bell, Settings, ArrowRight, Shield, Clock } from 'lucide-react';

const badgeIcons: Record<string, any> = {
    'early-bird': Star,
    'focus-master': Zap,
    'streak-king': Flame,
    'goal-crusher': Target,
    'zen-master': Trophy,
    'unstoppable': Shield,
};

const badgeGradients: Record<string, string> = {
    'early-bird': 'linear-gradient(135deg, #FBBF24 0%, #F59E0B 100%)',
    'focus-master': 'linear-gradient(135deg, #8B5CF6 0%, #7C3AED 100%)',
    'streak-king': 'linear-gradient(135deg, #F97316 0%, #EA580C 100%)',
    'goal-crusher': 'linear-gradient(135deg, #EF4444 0%, #DC2626 100%)',
    'zen-master': 'linear-gradient(135deg, #3B82F6 0%, #2563EB 100%)',
    'unstoppable': 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
};

const RewardsRoom = () => {
    const { badges, user, focusSessions, tasks } = useApp();
    const { theme, isDarkMode } = useTheme();

    // Real user data
    const currentStreak = user?.streak || 0;
    const highestStreak = user?.highestStreak || currentStreak;
    const focusSessionsCount = focusSessions.filter(s => s.completed).length;
    const focusGoal = 50; // Could be dynamic in future
    const tasksCompleted = tasks.filter(t => t.completed).length;
    const tasksGoal = 20; // Example goal



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
                    <button style={{
                        background: 'transparent',
                        border: 'none',
                        color: theme.textSecondary,
                        cursor: 'pointer',
                        padding: '0.5rem'
                    }}>
                        <Bell size={20} />
                    </button>
                    <button style={{
                        background: 'transparent',
                        border: 'none',
                        color: theme.textSecondary,
                        cursor: 'pointer',
                        padding: '0.5rem'
                    }}>
                        <Settings size={20} />
                    </button>
                    <div style={{
                        width: '32px',
                        height: '32px',
                        borderRadius: '50%',
                        background: 'linear-gradient(135deg, #F59E0B, #EF4444)',
                        cursor: 'pointer'
                    }}></div>
                </div>
            </div>

            <div className="w-full py-8 px-6 space-y-8" style={{ maxWidth: '1400px', margin: '0 auto' }}>
                {/* Page Title */}
                <div>
                    <h2 style={{ fontSize: '2.25rem', fontWeight: 800, color: theme.text, marginBottom: '0.75rem', letterSpacing: '-0.02em' }}>
                        Your Progress HQ
                    </h2>
                </div>

                {/* Streak Section */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                    <div style={{
                        background: theme.cardBackground,
                        borderRadius: '1.25rem',
                        padding: '2rem',
                        border: `1px solid ${theme.border}`,
                        boxShadow: isDarkMode ? 'none' : '0 4px 12px rgba(0,0,0,0.05)'
                    }}>
                        <p style={{ fontSize: '0.875rem', color: theme.textSecondary, fontWeight: 600, marginBottom: '0.5rem' }}>
                            Current Streak
                        </p>
                        <p style={{ fontSize: '2.5rem', fontWeight: 800, color: '#F59E0B' }}>
                            {currentStreak} <span style={{ fontSize: '1.5rem', color: theme.text }}>Days</span>
                        </p>
                    </div>
                    <div style={{
                        background: theme.cardBackground,
                        borderRadius: '1.25rem',
                        padding: '2rem',
                        border: `1px solid ${theme.border}`,
                        boxShadow: isDarkMode ? 'none' : '0 4px 12px rgba(0,0,0,0.05)'
                    }}>
                        <p style={{ fontSize: '0.875rem', color: theme.textSecondary, fontWeight: 600, marginBottom: '0.5rem' }}>
                            Highest Streak
                        </p>
                        <p style={{ fontSize: '2.5rem', fontWeight: 800, color: theme.primary }}>
                            {highestStreak} <span style={{ fontSize: '1.5rem', color: theme.text }}>Days</span>
                        </p>
                    </div>
                </div>

                {/* Achievements & Badges */}
                <div>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: theme.text, marginBottom: '1rem' }}>
                        Achievements & Badges
                    </h3>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '1rem' }}>
                        {badges.map((badge) => {
                            const Icon = badgeIcons[badge.id] || Lock;
                            const gradient = badgeGradients[badge.id] || 'linear-gradient(135deg, #9CA3AF 0%, #6B7280 100%)';
                            return (
                                <div
                                    key={badge.id}
                                    style={{
                                        background: theme.cardBackground,
                                        border: badge.unlocked ? `1px solid ${theme.primary}` : `1px solid ${theme.border}`,
                                        borderRadius: '1rem',
                                        padding: '1.5rem 1rem',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        textAlign: 'center',
                                        gap: '1rem',
                                        opacity: badge.unlocked ? 1 : 0.6,
                                        boxShadow: badge.unlocked && !isDarkMode ? `0 0 0 1px ${theme.primary}40` : 'none'
                                    }}
                                >
                                    <div style={{
                                        width: '64px',
                                        height: '64px',
                                        borderRadius: '0.75rem',
                                        background: badge.unlocked ? gradient : '#334155',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        color: '#FFF',
                                        boxShadow: badge.unlocked ? '0 4px 12px rgba(0,0,0,0.2)' : 'none'
                                    }}>
                                        <Icon size={28} strokeWidth={2} />
                                    </div>
                                    <span style={{ fontSize: '0.75rem', fontWeight: 600, color: theme.textSecondary }}>
                                        {badge.name}
                                    </span>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Your Goals */}
                <div>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: theme.text, marginBottom: '1rem' }}>
                        Your Goals
                    </h3>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                        <div style={{
                            background: theme.cardBackground,
                            borderRadius: '1.25rem',
                            padding: '1.5rem',
                            border: `1px solid ${theme.border}`,
                            boxShadow: isDarkMode ? 'none' : '0 4px 12px rgba(0,0,0,0.05)'
                        }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                                <span style={{ fontWeight: 600, fontSize: '0.9rem' }}>Complete {focusGoal} Focus Sessions</span>
                                <span style={{ fontWeight: 700, color: '#10B981', fontSize: '0.9rem' }}>{focusSessionsCount}/{focusGoal}</span>
                            </div>
                            <div style={{ width: '100%', height: '8px', background: isDarkMode ? '#334155' : '#E5E7EB', borderRadius: '999px', overflow: 'hidden' }}>
                                <div style={{ width: `${Math.min((focusSessionsCount / focusGoal) * 100, 100)}%`, height: '100%', background: '#10B981', borderRadius: '999px' }}></div>
                            </div>
                        </div>
                        <div style={{
                            background: theme.cardBackground,
                            borderRadius: '1.25rem',
                            padding: '1.5rem',
                            border: `1px solid ${theme.border}`,
                            boxShadow: isDarkMode ? 'none' : '0 4px 12px rgba(0,0,0,0.05)'
                        }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                                <span style={{ fontWeight: 600, fontSize: '0.9rem' }}>Complete {tasksGoal} Tasks</span>
                                <span style={{ fontWeight: 700, color: '#10B981', fontSize: '0.9rem' }}>{tasksCompleted}/{tasksGoal}</span>
                            </div>
                            <div style={{ width: '100%', height: '8px', background: isDarkMode ? '#334155' : '#E5E7EB', borderRadius: '999px', overflow: 'hidden' }}>
                                <div style={{ width: `${Math.min((tasksCompleted / tasksGoal) * 100, 100)}%`, height: '100%', background: '#10B981', borderRadius: '999px' }}></div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Active Challenges */}
                <div>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: theme.text, marginBottom: '1rem' }}>
                        Active Challenges
                    </h3>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                        <div style={{
                            background: theme.cardBackground,
                            borderRadius: '1.25rem',
                            padding: '1.5rem',
                            border: `1px solid ${theme.border}`,
                            boxShadow: isDarkMode ? 'none' : '0 4px 12px rgba(0,0,0,0.05)'
                        }}>
                            <h4 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '0.5rem' }}>7-Day No Snooze Challenge</h4>
                            <p style={{ fontSize: '0.875rem', color: theme.textSecondary, marginBottom: '1.5rem', lineHeight: 1.5 }}>
                                Wake up on your first alarm for a full week to build morning discipline.
                            </p>
                            <button style={{
                                width: '100%',
                                padding: '0.75rem',
                                background: theme.primary,
                                color: '#FFF',
                                border: 'none',
                                borderRadius: '0.75rem',
                                fontWeight: 600,
                                fontSize: '0.875rem',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '0.5rem',
                                cursor: 'pointer',
                                transition: 'all 0.2s'
                            }}>
                                Join Challenge <ArrowRight size={16} />
                            </button>
                        </div>
                        <div style={{
                            background: theme.cardBackground,
                            borderRadius: '1.25rem',
                            padding: '1.5rem',
                            border: `1px solid ${theme.border}`,
                            boxShadow: isDarkMode ? 'none' : '0 4px 12px rgba(0,0,0,0.05)'
                        }}>
                            <h4 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '0.5rem' }}>Digital Detox Weekend</h4>
                            <p style={{ fontSize: '0.875rem', color: theme.textSecondary, marginBottom: '1.5rem', lineHeight: 1.5 }}>
                                Spend a weekend with minimal screen time to recharge your focus and creativity.
                            </p>
                            <button style={{
                                width: '100%',
                                padding: '0.75rem',
                                background: isDarkMode ? '#334155' : '#E5E7EB',
                                color: isDarkMode ? '#FFF' : theme.text,
                                border: 'none',
                                borderRadius: '0.75rem',
                                fontWeight: 600,
                                fontSize: '0.875rem',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '0.5rem',
                                cursor: 'pointer',
                                transition: 'all 0.2s'
                            }}>
                                Join Challenge <ArrowRight size={16} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <BottomNav />
        </div>
    );
};

export default RewardsRoom;

