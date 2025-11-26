import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import Layout from '../components/Layout';
import Button from '../components/Button';
import { Shield, ShieldAlert, Smartphone, Globe, Lock } from 'lucide-react';

const DistractionBlocker: React.FC = () => {
    const { theme } = useTheme();
    const [isActive, setIsActive] = useState(false);
    const [blockedApps, setBlockedApps] = useState({
        social: true,
        news: false,
        games: true,
    });

    const toggleBlock = (key: keyof typeof blockedApps) => {
        setBlockedApps(prev => ({ ...prev, [key]: !prev[key] }));
    };

    return (
        <div style={{
            minHeight: '100vh',
            background: theme.background,
            fontFamily: 'Inter, sans-serif',
            transition: 'background 0.3s, color 0.3s'
        }}>
            <Layout>
                <div className="w-full py-6 space-y-8">
                    <div className="text-center space-y-2 animate-slide-in">
                        <div style={{
                            display: 'inline-flex',
                            padding: '1.5rem',
                            borderRadius: '50%',
                            marginBottom: '1rem',
                            background: isActive ? `linear-gradient(135deg, ${theme.secondary} 0%, #00E5B8 100%)` : theme.cardBackground,
                            color: isActive ? '#FFF' : theme.textSecondary,
                            boxShadow: isActive ? `0 0 40px ${theme.secondary}60` : `0 4px 12px rgba(0,0,0,0.05)`,
                            transition: 'all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)',
                            border: isActive ? 'none' : `1px solid ${theme.border}`
                        }}>
                            {isActive ? <Shield size={48} fill="currentColor" /> : <ShieldAlert size={48} />}
                        </div>
                        <h2 style={{ fontSize: '1.75rem', fontWeight: 800, color: theme.text }}>Distraction Shield</h2>
                        <p style={{ color: theme.textSecondary, fontSize: '1rem', fontWeight: 500 }}>
                            {isActive ? "You are protected. Stay focused." : "Shield is down. Vulnerable to scrolling."}
                        </p>
                    </div>

                    <div style={{
                        background: theme.cardBackground,
                        borderRadius: '1.5rem',
                        padding: '1.5rem',
                        border: `1px solid ${theme.border}`,
                        boxShadow: '0 4px 12px rgba(0,0,0,0.03)'
                    }} className="animate-slide-in">
                        <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: theme.text, borderBottom: `1px solid ${theme.border}`, paddingBottom: '1rem', marginBottom: '1rem' }}>Block List</h3>

                        {[
                            { key: 'social', label: 'Social Media', sub: 'Instagram, TikTok, Twitter', icon: Smartphone, color: '#8B5CF6' },
                            { key: 'news', label: 'News & Entertainment', sub: 'Reddit, YouTube, Netflix', icon: Globe, color: '#3B82F6' },
                            { key: 'games', label: 'Games', sub: 'Mobile Games, Steam', icon: Lock, color: '#EF4444' },
                        ].map((item) => (
                            <div key={item.key} className="flex items-center justify-between py-3">
                                <div className="flex items-center space-x-4">
                                    <div style={{ padding: '0.75rem', background: `${item.color}15`, borderRadius: '0.75rem', color: item.color }}>
                                        <item.icon size={20} />
                                    </div>
                                    <div>
                                        <p style={{ fontWeight: 600, color: theme.text }}>{item.label}</p>
                                        <p style={{ fontSize: '0.8rem', color: theme.textSecondary }}>{item.sub}</p>
                                    </div>
                                </div>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input
                                        type="checkbox"
                                        className="sr-only peer"
                                        checked={blockedApps[item.key as keyof typeof blockedApps]}
                                        onChange={() => toggleBlock(item.key as keyof typeof blockedApps)}
                                    />
                                    <div style={{
                                        width: '3rem',
                                        height: '1.75rem',
                                        background: blockedApps[item.key as keyof typeof blockedApps] ? theme.primary : theme.border,
                                        borderRadius: '9999px',
                                        position: 'relative',
                                        transition: 'background 0.3s'
                                    }}>
                                        <div style={{
                                            position: 'absolute',
                                            top: '2px',
                                            left: blockedApps[item.key as keyof typeof blockedApps] ? 'calc(100% - 1.6rem)' : '2px',
                                            width: '1.5rem',
                                            height: '1.5rem',
                                            background: '#FFF',
                                            borderRadius: '50%',
                                            transition: 'left 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
                                            boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
                                        }} />
                                    </div>
                                </label>
                            </div>
                        ))}
                    </div>

                    <Button
                        fullWidth
                        size="lg"
                        pulse={!isActive}
                        variant={isActive ? "secondary" : "primary"}
                        onClick={() => setIsActive(!isActive)}
                        className="shadow-lg"
                    >
                        {isActive ? "Deactivate Shield" : "Activate Shield"}
                    </Button>
                </div>
            </Layout>
        </div>
    );
};

export default DistractionBlocker;
