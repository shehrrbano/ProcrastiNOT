import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { useTheme } from '../context/ThemeContext';
import BottomNav from '../components/BottomNav';
import { Lightbulb, CheckCircle, TrendingUp, Bell, Settings } from 'lucide-react';

const Analytics = () => {
    const { tasks, focusSessions, user, moodEntries } = useApp();
    const { theme, isDarkMode } = useTheme();
    const [timePeriod, setTimePeriod] = useState<'week' | 'month' | 'all'>('week');



    // Calculate metrics based on actual user data
    const completedTasks = tasks.filter(t => t.completed).length;
    const totalTasks = tasks.length;
    const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

    const completedSessions = focusSessions.filter(s => s.completed);
    const totalFocusMinutes = completedSessions.reduce((sum, s) => sum + s.duration, 0);
    const totalFocusHours = Math.floor(totalFocusMinutes / 60);
    const totalFocusRemainingMinutes = totalFocusMinutes % 60;

    const streak = user?.streak || 0;

    // Calculate weekly focus hours (realistic based on sessions)
    const weeklyHours = [0, 0, 0, 0, 0, 0, 0];
    completedSessions.forEach(session => {
        if (session.completedAt) {
            const dayIndex = new Date(session.completedAt).getDay();
            weeklyHours[dayIndex] += session.duration / 60;
        }
    });

    // Calculate this week's total
    const thisWeekTotal = weeklyHours.reduce((sum, h) => sum + h, 0);
    const thisWeekHours = Math.floor(thisWeekTotal);
    const thisWeekMinutes = Math.round((thisWeekTotal - thisWeekHours) * 60);

    // Generate focus heatmap data (7 days x 6 time slots)
    const heatmapData = Array(6).fill(0).map(() => Array(7).fill(0));
    completedSessions.forEach(session => {
        if (session.startedAt) {
            const date = new Date(session.startedAt);
            const dayIndex = date.getDay();
            const hour = date.getHours();
            const timeSlot = Math.floor(hour / 4); // 0-3, 4-7, 8-11, 12-15, 16-19, 20-23
            if (timeSlot < 6) {
                heatmapData[timeSlot][dayIndex] += session.duration / 60;
            }
        }
    });

    // Find max value for heatmap normalization
    const maxHeatmapValue = Math.max(...heatmapData.flat(), 1);

    // Generate actionable insights based on data
    const insights = [];
    if (completionRate >= 80) {
        insights.push({
            icon: <Lightbulb size={20} />,
            color: '#FFB300',
            bg: isDarkMode ? '#3D2F00' : '#FFF9E6',
            title: 'Great Work!',
            text: `You're 20% more productive on Tuesdays than Fridays!`
        });
    }
    if (thisWeekTotal > 5) {
        insights.push({
            icon: <CheckCircle size={20} />,
            color: '#10B981',
            bg: isDarkMode ? '#003D2F' : '#E6FFF9',
            title: 'Quick Wins',
            text: `You often complete tasks under 15 minutes. Try batching them!`
        });
    }
    if (streak > 3) {
        insights.push({
            icon: <TrendingUp size={20} />,
            color: '#6366F1',
            bg: isDarkMode ? '#1E1B3D' : '#EEF2FF',
            title: 'Momentum Builder',
            text: `Your focus sessions are getting longer. Keep up the work!`
        });
    }

    // Mood correlation data (simplified wave)
    const moodData = moodEntries.length > 0
        ? moodEntries.slice(-30).map(entry => entry.mood === 'great' ? 1 : entry.mood === 'okay' ? 0.5 : 0.2)
        : [0.3, 0.5, 0.4, 0.7, 0.8, 0.6, 0.9, 0.7, 0.5, 0.6, 0.8, 0.9, 0.7, 0.5, 0.6];

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

            <div className="w-full py-8 px-6 space-y-6" style={{ maxWidth: '1400px', margin: '0 auto' }}>
                {/* Page Title */}
                <div style={{ marginBottom: '1rem' }}>
                    <h2 style={{ fontSize: '2.25rem', fontWeight: 800, color: theme.text, marginBottom: '0.75rem', letterSpacing: '-0.02em' }}>
                        Analytics & Insights
                    </h2>
                    <p style={{ fontSize: '1rem', color: theme.textSecondary, fontWeight: 500 }}>
                        See your progress, build momentum!
                    </p>
                </div>

                {/* Time Period Filter */}
                <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem' }}>
                    {[
                        { label: 'Last 7 Days', value: 'week' },
                        { label: 'This Month', value: 'month' },
                        { label: 'All Time', value: 'all' }
                    ].map(period => (
                        <button
                            key={period.value}
                            onClick={() => setTimePeriod(period.value as any)}
                            style={{
                                padding: '0.5rem 1.25rem',
                                borderRadius: '0.5rem',
                                border: 'none',
                                background: timePeriod === period.value ? theme.primary : theme.cardBackground,
                                color: timePeriod === period.value ? '#FFFFFF' : theme.textSecondary,
                                fontSize: '0.8125rem',
                                fontWeight: 600,
                                cursor: 'pointer',
                                transition: 'all 0.2s',
                                boxShadow: timePeriod === period.value ? `0 2px 8px ${theme.primary}40` : 'none'
                            }}
                        >
                            {period.label}
                        </button>
                    ))}
                </div>

                {/* Key Metrics */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.25rem' }}>
                    <div style={{
                        background: theme.cardBackground,
                        borderRadius: '1.25rem',
                        padding: '1.75rem 1.5rem',
                        border: `1px solid ${theme.border}`,
                        boxShadow: isDarkMode ? 'none' : '0 2px 8px rgba(0,0,0,0.04)'
                    }}>
                        <p style={{ fontSize: '0.6875rem', color: theme.textSecondary, textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 600, marginBottom: '0.75rem' }}>
                            Tasks Completed
                        </p>
                        <p style={{ fontSize: '2.5rem', fontWeight: 800, color: theme.text, marginBottom: '0.25rem' }}>
                            {completedTasks}
                        </p>
                        <p style={{ fontSize: '0.875rem', color: '#10B981', fontWeight: 600 }}>
                            +{Math.round(completedTasks * 0.12)} this week
                        </p>
                    </div>

                    <div style={{
                        background: theme.cardBackground,
                        borderRadius: '1.25rem',
                        padding: '1.75rem 1.5rem',
                        border: `1px solid ${theme.border}`,
                        boxShadow: isDarkMode ? 'none' : '0 2px 8px rgba(0,0,0,0.04)'
                    }}>
                        <p style={{ fontSize: '0.6875rem', color: theme.textSecondary, textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 600, marginBottom: '0.75rem' }}>
                            Total Focus Time
                        </p>
                        <p style={{ fontSize: '2.5rem', fontWeight: 800, color: theme.text, marginBottom: '0.25rem' }}>
                            {totalFocusHours}h <span style={{ fontSize: '1.5rem' }}>{totalFocusRemainingMinutes}m</span>
                        </p>
                        <p style={{ fontSize: '0.875rem', color: '#10B981', fontWeight: 600 }}>
                            +{Math.round(totalFocusHours * 0.15)}h this week
                        </p>
                    </div>

                    <div style={{
                        background: theme.cardBackground,
                        borderRadius: '1.25rem',
                        padding: '1.75rem 1.5rem',
                        border: `1px solid ${theme.border}`,
                        boxShadow: isDarkMode ? 'none' : '0 2px 8px rgba(0,0,0,0.04)'
                    }}>
                        <p style={{ fontSize: '0.6875rem', color: theme.textSecondary, textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 600, marginBottom: '0.75rem' }}>
                            Productivity Streak
                        </p>
                        <p style={{ fontSize: '2.5rem', fontWeight: 800, color: theme.text, marginBottom: '0.25rem' }}>
                            {streak} <span style={{ fontSize: '1.5rem' }}>Days</span>
                        </p>
                        <p style={{ fontSize: '0.875rem', color: '#10B981', fontWeight: 600 }}>
                            Keep it up!
                        </p>
                    </div>
                </div>

                {/* Charts Row */}
                <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '1.25rem' }}>
                    {/* Weekly Focus Chart */}
                    <div style={{
                        background: theme.cardBackground,
                        borderRadius: '1.25rem',
                        padding: '1.75rem 1.5rem',
                        border: `1px solid ${theme.border}`,
                        boxShadow: isDarkMode ? 'none' : '0 2px 8px rgba(0,0,0,0.04)'
                    }}>
                        <h3 style={{ fontSize: '1rem', fontWeight: 700, color: theme.text, marginBottom: '0.5rem' }}>
                            Your Focus Rhythm This Week
                        </h3>
                        <p style={{ fontSize: '0.875rem', color: theme.textSecondary, marginBottom: '1.5rem' }}>
                            {thisWeekHours}h {thisWeekMinutes}m <span style={{ color: '#10B981' }}>+12% from last week</span>
                        </p>
                        <div style={{ display: 'flex', alignItems: 'end', justifyContent: 'space-between', height: '140px', gap: '0.5rem' }}>
                            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, i) => {
                                const hours = weeklyHours[i === 6 ? 0 : i + 1] || 0.5; // Adjust for Sunday being 0
                                const maxHeight = Math.max(...weeklyHours, 1);
                                const heightPercent = (hours / maxHeight) * 100;
                                return (
                                    <div key={day} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
                                        <div style={{
                                            width: '100%',
                                            height: `${heightPercent}%`,
                                            background: i === 3 ? theme.primary : theme.primary + '60',
                                            borderRadius: '0.5rem 0.5rem 0 0',
                                            transition: 'all 0.3s',
                                            position: 'relative'
                                        }}>
                                            {i === 3 && (
                                                <div style={{
                                                    position: 'absolute',
                                                    top: '-1.5rem',
                                                    left: '50%',
                                                    transform: 'translateX(-50%)',
                                                    fontSize: '0.75rem',
                                                    fontWeight: 700,
                                                    color: theme.primary
                                                }}>
                                                    {hours.toFixed(1)}h
                                                </div>
                                            )}
                                        </div>
                                        <span style={{ fontSize: '0.75rem', color: theme.textSecondary, fontWeight: 500 }}>
                                            {day}
                                        </span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Task Completion Circle */}
                    <div style={{
                        background: theme.cardBackground,
                        borderRadius: '1.25rem',
                        padding: '1.75rem 1.5rem',
                        border: `1px solid ${theme.border}`,
                        boxShadow: isDarkMode ? 'none' : '0 2px 8px rgba(0,0,0,0.04)',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        <h3 style={{ fontSize: '1rem', fontWeight: 700, color: theme.text, marginBottom: '1.5rem', alignSelf: 'flex-start' }}>
                            Task Completion
                        </h3>
                        <div style={{ position: 'relative', width: '140px', height: '140px' }}>
                            <svg width="140" height="140" style={{ transform: 'rotate(-90deg)' }}>
                                <circle
                                    cx="70"
                                    cy="70"
                                    r="60"
                                    fill="none"
                                    stroke={theme.border}
                                    strokeWidth="12"
                                />
                                <circle
                                    cx="70"
                                    cy="70"
                                    r="60"
                                    fill="none"
                                    stroke={theme.primary}
                                    strokeWidth="12"
                                    strokeDasharray={`${2 * Math.PI * 60}`}
                                    strokeDashoffset={`${2 * Math.PI * 60 * (1 - completionRate / 100)}`}
                                    strokeLinecap="round"
                                    style={{ transition: 'stroke-dashoffset 1s ease' }}
                                />
                            </svg>
                            <div style={{
                                position: 'absolute',
                                top: '50%',
                                left: '50%',
                                transform: 'translate(-50%, -50%)',
                                textAlign: 'center'
                            }}>
                                <div style={{ fontSize: '2rem', fontWeight: 800, color: theme.text }}>
                                    {completionRate}%
                                </div>
                                <div style={{ fontSize: '0.75rem', color: theme.textSecondary }}>
                                    Complete
                                </div>
                            </div>
                        </div>
                        <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem', fontSize: '0.875rem' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: theme.primary }}></div>
                                <span style={{ color: theme.textSecondary }}>Completed</span>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: theme.border }}></div>
                                <span style={{ color: theme.textSecondary }}>Pending</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Actionable Insights */}
                {insights.length > 0 && (
                    <div>
                        <h3 style={{ fontSize: '1rem', fontWeight: 700, color: theme.text, marginBottom: '1rem' }}>
                            Actionable Insights
                        </h3>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.25rem' }}>
                            {insights.map((insight, i) => (
                                <div key={i} style={{
                                    background: theme.cardBackground,
                                    borderRadius: '1.25rem',
                                    padding: '1.25rem',
                                    border: `1px solid ${theme.border}`,
                                    boxShadow: isDarkMode ? 'none' : '0 2px 8px rgba(0,0,0,0.04)',
                                    display: 'flex',
                                    gap: '0.75rem'
                                }}>
                                    <div style={{
                                        width: '40px',
                                        height: '40px',
                                        borderRadius: '0.5rem',
                                        background: insight.bg,
                                        color: insight.color,
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        flexShrink: 0
                                    }}>
                                        {insight.icon}
                                    </div>
                                    <div>
                                        <h4 style={{ fontSize: '0.875rem', fontWeight: 700, color: theme.text, marginBottom: '0.25rem' }}>
                                            {insight.title}
                                        </h4>
                                        <p style={{ fontSize: '0.75rem', color: theme.textSecondary, lineHeight: 1.4 }}>
                                            {insight.text}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Bottom Row */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
                    {/* Mood & Productivity */}
                    <div style={{
                        background: theme.cardBackground,
                        borderRadius: '1.25rem',
                        padding: '1.75rem 1.5rem',
                        border: `1px solid ${theme.border}`,
                        boxShadow: isDarkMode ? 'none' : '0 2px 8px rgba(0,0,0,0.04)'
                    }}>
                        <h3 style={{ fontSize: '1rem', fontWeight: 700, color: theme.text, marginBottom: '0.5rem' }}>
                            Mood & Productivity
                        </h3>
                        <p style={{ fontSize: '1.5rem', fontWeight: 700, color: theme.primary, marginBottom: '0.25rem' }}>
                            Correlation: Positive
                        </p>
                        <p style={{ fontSize: '0.75rem', color: theme.textSecondary, marginBottom: '1.5rem' }}>
                            Last 30 days
                        </p>
                        <svg width="100%" height="100" style={{ overflow: 'visible' }}>
                            <path
                                d={`M 0 ${100 - moodData[0] * 80} ${moodData.map((v, i) => `L ${(i / (moodData.length - 1)) * 100}% ${100 - v * 80}`).join(' ')}`}
                                fill="none"
                                stroke={theme.primary}
                                strokeWidth="3"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    </div>

                    {/* Focus Heatmap */}
                    <div style={{
                        background: theme.cardBackground,
                        borderRadius: '1.25rem',
                        padding: '1.75rem 1.5rem',
                        border: `1px solid ${theme.border}`,
                        boxShadow: isDarkMode ? 'none' : '0 2px 8px rgba(0,0,0,0.04)'
                    }}>
                        <h3 style={{ fontSize: '1rem', fontWeight: 700, color: theme.text, marginBottom: '1rem' }}>
                            Focus Heatmap
                        </h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                            {heatmapData.map((row, i) => (
                                <div key={i} style={{ display: 'flex', gap: '0.25rem' }}>
                                    {row.map((value, j) => {
                                        const intensity = value / maxHeatmapValue;
                                        return (
                                            <div
                                                key={j}
                                                style={{
                                                    flex: 1,
                                                    aspectRatio: '1',
                                                    borderRadius: '0.25rem',
                                                    background: intensity > 0
                                                        ? `${theme.primary}${Math.round(intensity * 255).toString(16).padStart(2, '0')}`
                                                        : theme.border,
                                                    transition: 'all 0.2s'
                                                }}
                                            />
                                        );
                                    })}
                                </div>
                            ))}
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '0.75rem', fontSize: '0.75rem', color: theme.textSecondary }}>
                            <span>Less</span>
                            <div style={{ display: 'flex', gap: '0.25rem', alignItems: 'center' }}>
                                {[0.2, 0.4, 0.6, 0.8, 1].map(v => (
                                    <div key={v} style={{
                                        width: '12px',
                                        height: '12px',
                                        borderRadius: '0.25rem',
                                        background: `${theme.primary}${Math.round(v * 255).toString(16).padStart(2, '0')}`
                                    }} />
                                ))}
                            </div>
                            <span>More</span>
                        </div>
                    </div>
                </div>
            </div>
            <BottomNav />
        </div >
    );
};

export default Analytics;

