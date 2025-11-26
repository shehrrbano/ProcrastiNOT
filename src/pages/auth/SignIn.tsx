import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';

const SignIn = () => {
    const navigate = useNavigate();
    const { signIn } = useAuth();
    const { theme, isDarkMode } = useTheme();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        const result = await signIn({ email, password });

        if (result.success) {
            navigate('/dashboard');
        } else {
            setError(result.error || 'An error occurred');
        }

        setIsLoading(false);
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
            transition: 'background 0.3s, color 0.3s'
        }}>
            <div style={{
                maxWidth: '1100px',
                width: '100%',
                display: 'grid',
                gridTemplateColumns: window.innerWidth > 768 ? '1fr 1fr' : '1fr',
                gap: 0,
                borderRadius: '1.5rem',
                overflow: 'hidden',
                boxShadow: '0 20px 60px rgba(0,0,0,0.1)',
                background: theme.cardBackground
            }}>
                {/* Left side - Illustration */}
                {window.innerWidth > 768 && (
                    <div style={{
                        background: isDarkMode ? '#2A2A3A' : '#E8E6FF',
                        padding: '4rem 3rem',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        transition: 'background 0.3s'
                    }}>
                        {/* Card with illustration */}
                        <div style={{
                            background: theme.cardBackground,
                            borderRadius: '1.5rem',
                            padding: '3rem 2.5rem',
                            marginBottom: '3rem',
                            boxShadow: '0 10px 30px rgba(0,0,0,0.08)'
                        }}>
                            <svg width="280" height="280" viewBox="0 0 280 280" fill="none">
                                {/* Checklist paper */}
                                <rect x="60" y="40" width="160" height="200" rx="8" fill={isDarkMode ? '#1E1E2E' : 'white'} stroke={theme.border} strokeWidth="3" />

                                {/* Checkmarks and lines */}
                                <circle cx="85" cy="70" r="8" fill={theme.secondary} />
                                <path d="M82 70L84 72L88 68" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                <rect x="105" y="66" width="90" height="6" rx="3" fill={theme.border} />

                                <circle cx="85" cy="100" r="8" fill={theme.secondary} />
                                <path d="M82 100L84 102L88 98" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                <rect x="105" y="96" width="90" height="6" rx="3" fill={theme.border} />

                                <circle cx="85" cy="130" r="8" fill={theme.secondary} />
                                <path d="M82 130L84 132L88 128" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                <rect x="105" y="126" width="90" height="6" rx="3" fill={theme.border} />

                                <circle cx="85" cy="160" r="8" fill={theme.secondary} />
                                <path d="M82 160L84 162L88 158" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                <rect x="105" y="156" width="90" height="6" rx="3" fill={theme.border} />

                                <circle cx="85" cy="190" r="8" fill={theme.secondary} />
                                <path d="M82 190L84 192L88 188" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                <rect x="105" y="186" width="90" height="6" rx="3" fill={theme.border} />

                                {/* Person */}
                                <ellipse cx="200" cy="200" rx="35" ry="8" fill={theme.textSecondary} opacity="0.3" />
                                <circle cx="200" cy="170" r="15" fill="#FFB366" />
                                <path d="M200 185C200 185 185 185 185 200C185 215 200 220 200 220C200 220 215 215 215 200C215 185 200 185 200 185Z" fill="#FF9F4D" />
                                <rect x="195" y="200" width="10" height="25" rx="2" fill={theme.text} />
                                <rect x="190" y="210" width="7" height="15" rx="2" fill={theme.text} />
                                <rect x="203" y="210" width="7" height="15" rx="2" fill={theme.text} />

                                {/* Pointing hand */}
                                <path d="M170 120L180 115L185 125L175 130Z" fill="#FFB366" />
                            </svg>
                        </div>

                        {/* Text */}
                        <h2 style={{
                            fontSize: '2rem',
                            fontWeight: 700,
                            color: theme.text,
                            marginBottom: '1rem',
                            textAlign: 'center'
                        }}>
                            Turn 'Later' into 'Now'.
                        </h2>
                        <p style={{
                            fontSize: '1rem',
                            color: theme.textSecondary,
                            textAlign: 'center',
                            lineHeight: 1.6
                        }}>
                            The fun way to beat procrastination and<br />get things done.
                        </p>
                    </div>
                )}

                {/* Right side - Form */}
                <div style={{
                    background: theme.cardBackground,
                    padding: '4rem 3rem',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    transition: 'background 0.3s'
                }}>
                    {/* Logo */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '2.5rem' }}>
                        <div style={{
                            width: '28px',
                            height: '28px',
                            background: theme.primary,
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                            <svg width="16" height="16" fill="white" viewBox="0 0 24 24">
                                <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                            </svg>
                        </div>
                        <span style={{ fontSize: '1.1rem', fontWeight: 700, color: theme.text }}>ProcrastiNOT</span>
                    </div>

                    {/* Header */}
                    <h2 style={{ fontSize: '2rem', fontWeight: 700, color: theme.text, marginBottom: '0.5rem' }}>
                        Welcome Back!
                    </h2>
                    <p style={{ fontSize: '0.95rem', color: theme.textSecondary, marginBottom: '2rem' }}>
                        Log in to continue your journey.
                    </p>

                    {/* Form */}
                    <form onSubmit={handleSubmit}>
                        {error && (
                            <div style={{
                                padding: '0.875rem',
                                background: '#FFF0F0',
                                border: '1px solid #FFE0E0',
                                borderRadius: '0.5rem',
                                color: '#FF6B6B',
                                fontSize: '0.875rem',
                                marginBottom: '1.25rem'
                            }}>
                                {error}
                            </div>
                        )}

                        {/* Email */}
                        <div style={{ marginBottom: '1.25rem' }}>
                            <label style={{
                                display: 'block',
                                fontSize: '0.875rem',
                                fontWeight: 600,
                                color: theme.text,
                                marginBottom: '0.5rem'
                            }}>
                                Email or Username
                            </label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="you@example.com"
                                required
                                style={{
                                    width: '100%',
                                    padding: '0.875rem 1rem',
                                    border: `1.5px solid ${theme.border}`,
                                    borderRadius: '0.5rem',
                                    fontSize: '0.95rem',
                                    fontFamily: 'Inter, sans-serif',
                                    outline: 'none',
                                    transition: 'border-color 0.2s',
                                    boxSizing: 'border-box',
                                    background: theme.cardBackground,
                                    color: theme.text
                                }}
                                onFocus={(e) => e.currentTarget.style.borderColor = theme.primary}
                                onBlur={(e) => e.currentTarget.style.borderColor = theme.border}
                            />
                        </div>

                        {/* Password */}
                        <div style={{ marginBottom: '1.5rem' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                                <label style={{
                                    fontSize: '0.875rem',
                                    fontWeight: 600,
                                    color: theme.text
                                }}>
                                    Password
                                </label>
                                <a
                                    style={{
                                        fontSize: '0.875rem',
                                        color: theme.secondary,
                                        cursor: 'pointer',
                                        textDecoration: 'none',
                                        fontWeight: 500
                                    }}
                                    onMouseEnter={(e) => e.currentTarget.style.textDecoration = 'underline'}
                                    onMouseLeave={(e) => e.currentTarget.style.textDecoration = 'none'}
                                >
                                    Forgot Password?
                                </a>
                            </div>
                            <div style={{ position: 'relative' }}>
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Enter your password"
                                    required
                                    style={{
                                        width: '100%',
                                        padding: '0.875rem 3rem 0.875rem 1rem',
                                        border: `1.5px solid ${theme.border}`,
                                        borderRadius: '0.5rem',
                                        fontSize: '0.95rem',
                                        fontFamily: 'Inter, sans-serif',
                                        outline: 'none',
                                        transition: 'border-color 0.2s',
                                        boxSizing: 'border-box',
                                        background: theme.cardBackground,
                                        color: theme.text
                                    }}
                                    onFocus={(e) => e.currentTarget.style.borderColor = theme.primary}
                                    onBlur={(e) => e.currentTarget.style.borderColor = theme.border}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    style={{
                                        position: 'absolute',
                                        right: '1rem',
                                        top: '50%',
                                        transform: 'translateY(-50%)',
                                        background: 'none',
                                        border: 'none',
                                        cursor: 'pointer',
                                        color: theme.textSecondary,
                                        padding: '0.25rem'
                                    }}
                                >
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        {showPassword ? (
                                            <>
                                                <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                                                <line x1="1" y1="1" x2="23" y2="23" />
                                            </>
                                        ) : (
                                            <>
                                                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                                                <circle cx="12" cy="12" r="3" />
                                            </>
                                        )}
                                    </svg>
                                </button>
                            </div>
                        </div>

                        {/* Submit button */}
                        <button
                            type="submit"
                            disabled={isLoading}
                            style={{
                                width: '100%',
                                padding: '0.875rem',
                                background: theme.primary,
                                border: 'none',
                                borderRadius: '0.5rem',
                                color: '#FFFFFF',
                                fontSize: '1rem',
                                fontWeight: 600,
                                cursor: isLoading ? 'not-allowed' : 'pointer',
                                fontFamily: 'Inter, sans-serif',
                                transition: 'all 0.2s',
                                opacity: isLoading ? 0.7 : 1,
                                boxShadow: `0 4px 12px ${theme.primary}40`
                            }}
                            onMouseEnter={(e) => {
                                if (!isLoading) {
                                    e.currentTarget.style.transform = 'translateY(-2px)';
                                    e.currentTarget.style.boxShadow = `0 8px 20px ${theme.primary}60`;
                                }
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = 'translateY(0)';
                                e.currentTarget.style.boxShadow = `0 4px 12px ${theme.primary}40`;
                            }}
                        >
                            {isLoading ? 'Logging In...' : 'Log In'}
                        </button>
                    </form>

                    {/* Footer links */}
                    <div style={{ marginTop: '1.5rem', textAlign: 'center' }}>
                        <p style={{ fontSize: '0.875rem', color: theme.textSecondary }}>
                            Don't have an account?{' '}
                            <a
                                onClick={() => navigate('/signup')}
                                style={{ color: theme.secondary, fontWeight: 600, cursor: 'pointer', textDecoration: 'none' }}
                                onMouseEnter={(e) => e.currentTarget.style.textDecoration = 'underline'}
                                onMouseLeave={(e) => e.currentTarget.style.textDecoration = 'none'}
                            >
                                Sign Up
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignIn;
