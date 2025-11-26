import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { useTheme } from '../context/ThemeContext';
import BottomNav from '../components/BottomNav';
import Button from '../components/Button';
import { Plus, Settings, Bell, Shield, Check, Trophy, Flame, CheckCircle } from 'lucide-react';

const Dashboard = () => {
    const navigate = useNavigate();
    const { tasks, addTask, toggleTask, user } = useApp();
    const { theme, isDarkMode } = useTheme();
    const [newTaskTitle, setNewTaskTitle] = useState('');
    const [showAddTask, setShowAddTask] = useState(false);

    const handleAddTask = () => {
        if (newTaskTitle.trim()) {
            addTask(newTaskTitle.trim());
            setNewTaskTitle('');
            setShowAddTask(false);
        }
    };

    const isToday = (dateString?: string) => {
        if (!dateString) return false;
        const date = new Date(dateString);
        const today = new Date();
        return date.getDate() === today.getDate() &&
            date.getMonth() === today.getMonth() &&
            date.getFullYear() === today.getFullYear();
    };

    const todayTasks = tasks.slice(0, 5);
    const completedToday = tasks.filter(t => t.completed && isToday(t.completedAt)).length;
    const dailyGoal = 5; // Example goal



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

            <div className="w-full py-8 px-6 space-y-8" style={{ maxWidth: '1400px', margin: '0 auto' }}>

                {/* Progress Cards */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                    {/* Completed Today Card */}
                    <div style={{
                        background: theme.cardBackground,
                        borderRadius: '1.5rem',
                        padding: '1.5rem',
                        border: `1px solid ${theme.border}`,
                        display: 'flex',
                        alignItems: 'center',
                        gap: '1rem',
                        boxShadow: isDarkMode ? 'none' : '0 4px 12px rgba(0,0,0,0.05)'
                    }}>
                        <div style={{
                            width: '48px',
                            height: '48px',
                            borderRadius: '50%',
                            background: '#EEF2FF',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: '#6366F1'
                        }}>
                            <CheckCircle size={24} />
                        </div>
                        <div>
                            <p style={{ fontSize: '0.875rem', color: theme.textSecondary, fontWeight: 500 }}>Completed Today</p>
                            <p style={{ fontSize: '1.5rem', fontWeight: 700, color: theme.text }}>
                                {completedToday} <span style={{ fontSize: '1rem', color: theme.textSecondary }}>/ {dailyGoal}</span>
                            </p>
                        </div>
                    </div>

                    {/* Current Streak Card */}
                    <div style={{
                        background: theme.cardBackground,
                        borderRadius: '1.5rem',
                        padding: '1.5rem',
                        border: `1px solid ${theme.border}`,
                        display: 'flex',
                        alignItems: 'center',
                        gap: '1rem',
                        boxShadow: isDarkMode ? 'none' : '0 4px 12px rgba(0,0,0,0.05)'
                    }}>
                        <div style={{
                            width: '48px',
                            height: '48px',
                            borderRadius: '50%',
                            background: '#FFF7ED',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: '#F97316'
                        }}>
                            <Flame size={24} fill="#F97316" />
                        </div>
                        <div>
                            <p style={{ fontSize: '0.875rem', color: theme.textSecondary, fontWeight: 500 }}>Current Streak</p>
                            <p style={{ fontSize: '1.5rem', fontWeight: 700, color: theme.text }}>
                                {user?.streak || 0} <span style={{ fontSize: '1rem', color: theme.textSecondary }}>days</span>
                            </p>
                        </div>
                    </div>
                </div>

                {/* Main Focus Card */}
                <div style={{
                    background: theme.cardBackground,
                    borderRadius: '2rem',
                    padding: '2.5rem',
                    textAlign: 'center',
                    boxShadow: isDarkMode ? 'none' : '0 20px 40px rgba(0,0,0,0.05)',
                    border: `1px solid ${theme.border}`
                }} className="animate-slide-in">
                    <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: theme.text, marginBottom: '2rem' }}>
                        Ready for Deep Focus?
                    </h2>

                    <div style={{
                        fontSize: '5rem',
                        fontWeight: 800,
                        fontFamily: 'monospace',
                        color: theme.text,
                        marginBottom: '2rem',
                        letterSpacing: '0.05em'
                    }}>
                        25 : 00
                    </div>

                    <Button
                        fullWidth
                        size="lg"
                        pulse
                        className="shadow-lg"
                        style={{ borderRadius: '1rem', padding: '1rem', fontSize: '1.1rem', maxWidth: '400px', margin: '0 auto' }}
                        onClick={() => navigate('/focus')}
                    >
                        Start Session
                    </Button>

                    {/* Distraction Blocker Status */}
                    <div style={{
                        marginTop: '2rem',
                        background: theme.background,
                        borderRadius: '1rem',
                        padding: '0.75rem',
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '0.5rem',
                        fontSize: '0.9rem',
                        color: theme.textSecondary,
                        minWidth: '250px'
                    }}>
                        <Shield size={16} color="#10B981" fill="#10B981" />
                        <span>Distraction Blocker: <span style={{ color: '#10B981', fontWeight: 600 }}>Active</span></span>
                    </div>
                </div>

                {/* Today's Micro-Goals */}
                <div style={{
                    background: theme.cardBackground,
                    borderRadius: '2rem',
                    padding: '2rem',
                    border: `1px solid ${theme.border}`,
                    boxShadow: isDarkMode ? 'none' : '0 10px 30px rgba(0,0,0,0.03)'
                }} className="animate-slide-in">
                    <div className="flex justify-between items-center mb-6">
                        <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: theme.text }}>Today's Micro-Goals</h3>
                        <button
                            onClick={() => setShowAddTask(!showAddTask)}
                            style={{
                                width: '36px',
                                height: '36px',
                                borderRadius: '50%',
                                background: `${theme.primary}15`,
                                color: theme.primary,
                                border: 'none',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                cursor: 'pointer',
                                transition: 'all 0.2s'
                            }}
                        >
                            <Plus size={20} />
                        </button>
                    </div>

                    {showAddTask && (
                        <div className="mb-6 animate-slide-in">
                            <input
                                type="text"
                                placeholder="Add a new goal..."
                                value={newTaskTitle}
                                onChange={(e) => setNewTaskTitle(e.target.value)}
                                onKeyPress={(e) => e.key === 'Enter' && handleAddTask()}
                                style={{
                                    width: '100%',
                                    padding: '1rem',
                                    borderRadius: '1rem',
                                    border: `1px solid ${theme.border}`,
                                    background: theme.background,
                                    color: theme.text,
                                    outline: 'none',
                                    fontSize: '1rem'
                                }}
                                autoFocus
                            />
                        </div>
                    )}

                    <div className="space-y-4">
                        {todayTasks.length === 0 ? (
                            <p className="text-center text-sm text-gray-400 py-8">No goals yet. Add one to get started!</p>
                        ) : (
                            todayTasks.map(task => (
                                <div
                                    key={task.id}
                                    onClick={() => toggleTask(task.id)}
                                    style={{
                                        background: theme.background,
                                        borderRadius: '1.25rem',
                                        padding: '1.25rem',
                                        display: 'flex',
                                        alignItems: 'center',
                                        cursor: 'pointer',
                                        transition: 'all 0.2s',
                                        border: `1px solid transparent`
                                    }}
                                    className="hover:bg-opacity-80 hover:border-gray-200 dark:hover:border-gray-700"
                                >
                                    <div style={{
                                        width: '28px',
                                        height: '28px',
                                        borderRadius: '8px',
                                        border: `2px solid ${task.completed ? theme.secondary : theme.border}`,
                                        background: task.completed ? theme.secondary : 'transparent',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        marginRight: '1rem',
                                        transition: 'all 0.2s',
                                        flexShrink: 0
                                    }}>
                                        {task.completed && <Check size={16} color="white" strokeWidth={3} />}
                                    </div>
                                    <span style={{
                                        flex: 1,
                                        color: task.completed ? theme.textSecondary : theme.text,
                                        textDecoration: task.completed ? 'line-through' : 'none',
                                        fontWeight: 500,
                                        fontSize: '1rem'
                                    }}>
                                        {task.title}
                                    </span>
                                    <Trophy size={18} color="#FFB300" style={{ opacity: task.completed ? 0.5 : 1 }} />
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
            <BottomNav />
        </div>
    );
};

export default Dashboard;

