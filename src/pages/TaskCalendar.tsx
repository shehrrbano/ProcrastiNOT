import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { ChevronLeft, ChevronRight, Plus, Bell, Settings, Check } from 'lucide-react';
import BottomNav from '../components/BottomNav';

const TaskCalendar: React.FC = () => {
    const { theme } = useTheme();
    const [viewMode, setViewMode] = useState<'month' | 'week'>('month');

    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const currentMonth = 'October';
    const currentYear = 2024;
    const currentDay = 10;

    // Generate calendar days for October 2024
    const calendarDays = [
        { date: 29, isCurrentMonth: false },
        { date: 30, isCurrentMonth: false },
        { date: 1, isCurrentMonth: true },
        { date: 2, isCurrentMonth: true },
        { date: 3, isCurrentMonth: true, hasEvent: true, eventColor: '#D97706' },
        { date: 4, isCurrentMonth: true },
        { date: 5, isCurrentMonth: true },
        { date: 6, isCurrentMonth: true },
        { date: 7, isCurrentMonth: true },
        { date: 8, isCurrentMonth: true },
        { date: 9, isCurrentMonth: true },
        { date: 10, isCurrentMonth: true, isToday: true, hasEvent: true, eventColor: '#6366F1', dots: 2 },
        { date: 11, isCurrentMonth: true, hasEvent: true, eventColor: '#D97706' },
        { date: 12, isCurrentMonth: true },
        { date: 13, isCurrentMonth: true },
        { date: 14, isCurrentMonth: true },
        { date: 15, isCurrentMonth: true },
        { date: 16, isCurrentMonth: true },
        { date: 17, isCurrentMonth: true },
        { date: 18, isCurrentMonth: true },
        { date: 19, isCurrentMonth: true },
        { date: 20, isCurrentMonth: true },
        { date: 21, isCurrentMonth: true },
        { date: 22, isCurrentMonth: true },
        { date: 23, isCurrentMonth: true },
        { date: 24, isCurrentMonth: true },
        { date: 25, isCurrentMonth: true },
        { date: 26, isCurrentMonth: true },
        { date: 27, isCurrentMonth: true },
        { date: 28, isCurrentMonth: true },
        { date: 29, isCurrentMonth: true },
        { date: 30, isCurrentMonth: true },
        { date: 31, isCurrentMonth: true },
        { date: 1, isCurrentMonth: false },
        { date: 2, isCurrentMonth: false },
    ];

    const todayTasks = [
        { id: 1, title: 'Finalize Q3 report', time: 'Completed at 9:30 AM', completed: true, color: '#10B981' },
        { id: 2, title: 'Brainstorm marketing campaign', time: '11:00 AM - 12:30 PM', completed: false, color: '#6366F1' },
        { id: 3, title: 'Focus Session: Competitive Analysis', time: '2:30 PM - 4:30 PM', completed: false, color: '#10B981' },
    ];

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

            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '2rem', padding: '2rem' }}>
                {/* Left Side - Calendar */}
                <div>
                    <div style={{ marginBottom: '2rem' }}>
                        <h2 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '0.5rem' }}>Your Calendar</h2>
                        <p style={{ color: theme.textMuted, fontSize: '0.875rem' }}>Here's your schedule. Let's make today productive!</p>
                    </div>

                    {/* Calendar Card */}
                    <div style={{
                        background: theme.cardBackground,
                        borderRadius: '1.5rem',
                        padding: '2rem',
                        marginBottom: '2rem',
                        border: `1px solid ${theme.border}`,
                        boxShadow: theme.isDark ? 'none' : '0 4px 12px rgba(0,0,0,0.05)'
                    }}>
                        {/* Calendar Header */}
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                                <button style={{
                                    padding: '0.5rem',
                                    color: theme.textSecondary,
                                    background: 'transparent',
                                    border: 'none',
                                    cursor: 'pointer'
                                }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.background = theme.hoverBg;
                                        e.currentTarget.style.color = theme.text;
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.background = 'transparent';
                                        e.currentTarget.style.color = theme.textSecondary;
                                    }}
                                >
                                    <ChevronLeft size={20} />
                                </button>
                                <div style={{
                                    background: theme.hoverBg,
                                    padding: '0.5rem 1rem',
                                    borderRadius: '0.5rem',
                                    fontSize: '0.875rem',
                                    fontWeight: 600
                                }}>
                                    Today
                                </div>
                                <button style={{
                                    padding: '0.5rem',
                                    color: theme.textSecondary,
                                    background: 'transparent',
                                    border: 'none',
                                    cursor: 'pointer'
                                }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.background = theme.hoverBg;
                                        e.currentTarget.style.color = theme.text;
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.background = 'transparent';
                                        e.currentTarget.style.color = theme.textSecondary;
                                    }}
                                >
                                    <ChevronRight size={20} />
                                </button>
                            </div>
                            <div style={{ display: 'flex', gap: '0.5rem' }}>
                                <button
                                    onClick={() => setViewMode('month')}
                                    style={{
                                        background: viewMode === 'month' ? theme.primary : 'transparent',
                                        border: 'none',
                                        color: viewMode === 'month' ? '#FFFFFF' : theme.textSecondary,
                                        padding: '0.5rem 1rem',
                                        borderRadius: '0.5rem',
                                        fontSize: '0.875rem',
                                        fontWeight: 600,
                                        cursor: 'pointer',
                                        transition: 'all 0.2s'
                                    }}
                                >
                                    Month
                                </button>
                                <button
                                    onClick={() => setViewMode('week')}
                                    style={{
                                        background: viewMode === 'week' ? theme.primary : 'transparent',
                                        border: 'none',
                                        color: viewMode === 'week' ? '#FFFFFF' : theme.textSecondary,
                                        padding: '0.5rem 1rem',
                                        borderRadius: '0.5rem',
                                        fontSize: '0.875rem',
                                        fontWeight: 600,
                                        cursor: 'pointer',
                                        transition: 'all 0.2s'
                                    }}
                                >
                                    Week
                                </button>
                            </div>
                        </div>

                        {/* Month/Year */}
                        <h2 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '1.5rem', textAlign: 'center' }}>
                            {currentMonth} {currentYear}
                        </h2>

                        {/* Days of Week */}
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(7, 1fr)',
                            gap: '0.5rem',
                            marginBottom: '0.5rem'
                        }}>
                            {daysOfWeek.map(day => (
                                <div key={day} style={{
                                    textAlign: 'center',
                                    fontSize: '0.75rem',
                                    fontWeight: 600,
                                    color: theme.textMuted,
                                    padding: '0.5rem'
                                }}>
                                    {day}
                                </div>
                            ))}
                        </div>

                        {/* Calendar Grid */}
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(7, 1fr)',
                            gap: '0.5rem'
                        }}>
                            {calendarDays.map((day, index) => (
                                <div
                                    key={index}
                                    style={{
                                        aspectRatio: '1',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        borderRadius: '0.5rem',
                                        background: day.hasEvent ? theme.hoverBg : 'transparent',
                                        border: day.hasEvent ? `2px solid ${day.eventColor}` : 'none',
                                        color: day.isCurrentMonth ? theme.text : theme.textMuted,
                                        fontSize: '0.875rem',
                                        fontWeight: 600,
                                        cursor: 'pointer',
                                        position: 'relative',
                                        transition: 'all 0.2s'
                                    }}
                                    onMouseEnter={(e) => {
                                        if (day.isCurrentMonth) {
                                            e.currentTarget.style.background = theme.hoverBg;
                                        }
                                    }}
                                    onMouseLeave={(e) => {
                                        if (!day.hasEvent) {
                                            e.currentTarget.style.background = 'transparent';
                                        }
                                    }}
                                >
                                    {day.date}
                                    {day.dots && (
                                        <div style={{ display: 'flex', gap: '2px', marginTop: '4px' }}>
                                            {Array.from({ length: day.dots }).map((_, i) => (
                                                <div key={i} style={{
                                                    width: '4px',
                                                    height: '4px',
                                                    borderRadius: '50%',
                                                    background: theme.primary
                                                }}></div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right Side - Today's Tasks */}
                <div>
                    <div style={{
                        background: theme.cardBackground,
                        borderRadius: '1.5rem',
                        padding: '2rem',
                        border: `1px solid ${theme.border}`,
                        boxShadow: theme.isDark ? 'none' : '0 4px 12px rgba(0,0,0,0.05)'
                    }}>
                        <h3 style={{ fontSize: '1.125rem', fontWeight: 700, marginBottom: '0.5rem' }}>
                            Today, October {currentDay}
                        </h3>
                        <p style={{ color: theme.textMuted, fontSize: '0.875rem', marginBottom: '1.5rem' }}>
                            You have 2 tasks and 1 focus session.
                        </p>

                        {/* Task List */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1.5rem' }}>
                            {todayTasks.map(task => (
                                <div key={task.id} style={{
                                    background: theme.background,
                                    padding: '1rem',
                                    borderRadius: '0.75rem',
                                    border: `1px solid ${theme.border}`,
                                    display: 'flex',
                                    gap: '0.75rem',
                                    alignItems: 'flex-start'
                                }}>
                                    <div style={{
                                        width: '20px',
                                        height: '20px',
                                        borderRadius: '50%',
                                        background: task.completed ? task.color : 'transparent',
                                        border: `2px solid ${task.color}`,
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        flexShrink: 0,
                                        marginTop: '2px'
                                    }}>
                                        {task.completed && <Check size={12} color="#FFFFFF" strokeWidth={3} />}
                                    </div>
                                    <div style={{ flex: 1 }}>
                                        <div style={{
                                            fontWeight: 600,
                                            fontSize: '0.875rem',
                                            marginBottom: '0.25rem',
                                            color: task.completed ? theme.textMuted : theme.text,
                                            textDecoration: task.completed ? 'line-through' : 'none'
                                        }}>
                                            {task.title}
                                        </div>
                                        <div style={{ fontSize: '0.75rem', color: theme.textMuted }}>
                                            {task.time}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <p style={{ color: theme.textMuted, fontSize: '0.875rem', marginBottom: '1rem', textAlign: 'center' }}>
                            A day with no plans? Let's fix that.
                        </p>

                        {/* Add New Task Button */}
                        <button style={{
                            width: '100%',
                            background: theme.primary,
                            border: 'none',
                            borderRadius: '0.75rem',
                            padding: '0.875rem',
                            color: '#FFFFFF',
                            fontWeight: 600,
                            fontSize: '0.875rem',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '0.5rem',
                            transition: 'all 0.2s'
                        }}>
                            <Plus size={18} />
                            Add New Task
                        </button>
                    </div>
                </div>
            </div>
            <BottomNav />
        </div>
    );
};

export default TaskCalendar;
