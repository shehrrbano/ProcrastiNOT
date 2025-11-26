import React, { useState } from 'react';
import { useUser } from '../context/UserContext';
import { useTheme } from '../context/ThemeContext';

const UserProfile: React.FC = () => {
    const { user, updateUser } = useUser();
    const { theme } = useTheme();
    const [name, setName] = useState(user?.name || '');
    const [avatarUrl, setAvatarUrl] = useState(user?.avatarUrl || '');

    const handleSave = () => {
        updateUser({ name, avatarUrl });
    };

    if (!user) return null;

    return (
        <div style={{
            background: theme.cardBackground,
            padding: '2rem',
            borderRadius: '1.5rem',
            boxShadow: '0 10px 30px rgba(0,0,0,0.08)',
            border: `1px solid ${theme.border}`,
            marginBottom: '2rem',
            maxWidth: '500px',
            marginLeft: 'auto',
            marginRight: 'auto'
        }}>
            <h2 style={{ color: theme.text, marginBottom: '1rem' }}>Your Profile</h2>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
                {avatarUrl ? (
                    <img src={avatarUrl} alt="Avatar" style={{ width: '80px', height: '80px', borderRadius: '50%', marginRight: '1rem' }} />
                ) : (
                    <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: theme.border, marginRight: '1rem' }} />
                )}
                <div>
                    <p style={{ margin: 0, color: theme.textSecondary }}>Email: {user.email}</p>
                </div>
            </div>
            <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', color: theme.text, marginBottom: '0.5rem' }}>Name</label>
                <input
                    type="text"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    style={{
                        width: '100%',
                        padding: '0.5rem',
                        border: `1px solid ${theme.border}`,
                        borderRadius: '0.5rem',
                        background: theme.cardBackground,
                        color: theme.text,
                        fontFamily: 'Inter, sans-serif'
                    }}
                />
            </div>
            <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', color: theme.text, marginBottom: '0.5rem' }}>Avatar URL</label>
                <input
                    type="url"
                    value={avatarUrl}
                    onChange={e => setAvatarUrl(e.target.value)}
                    placeholder="https://example.com/avatar.jpg"
                    style={{
                        width: '100%',
                        padding: '0.5rem',
                        border: `1px solid ${theme.border}`,
                        borderRadius: '0.5rem',
                        background: theme.cardBackground,
                        color: theme.text,
                        fontFamily: 'Inter, sans-serif'
                    }}
                />
            </div>
            <button
                onClick={handleSave}
                style={{
                    padding: '0.75rem 1.5rem',
                    background: theme.primary,
                    color: '#fff',
                    border: 'none',
                    borderRadius: '0.5rem',
                    cursor: 'pointer',
                    fontFamily: 'Inter, sans-serif',
                    fontWeight: 600
                }}
            >
                Save
            </button>
        </div>
    );
};

export default UserProfile;
