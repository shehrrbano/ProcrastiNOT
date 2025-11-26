import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import type { PasswordStrength } from '../../types/auth';
import { useTheme } from '../../context/ThemeContext';

const SignUp = () => {
    const navigate = useNavigate();
    const { signUp, checkPasswordStrength } = useAuth();
    const { theme, isDarkMode } = useTheme();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const passwordStrength: PasswordStrength = password ? checkPasswordStrength(password) : 'weak';

    const getStrengthColor = () => {
        if (passwordStrength === 'strong') return '#00D4A6';
        if (passwordStrength === 'medium') return '#FFB300';
        return '#FF6B6B';
    };

    const getStrengthWidth = () => {
        if (passwordStrength === 'strong') return '100%';
        if (passwordStrength === 'medium') return '66%';
        return '33%';
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);
        const result = await signUp({ email, password, confirmPassword });
        if (result.success) {
            navigate('/onboarding/mbti');
        } else {
            setError(result.error || 'An error occurred');
        }
        setIsLoading(false);
    };

    const handleSocialSignIn = (provider: string) => {
        alert(`${provider} sign-in coming soon! For now, please use email/password.`);
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
            position: 'relative',
            overflow: 'hidden',
            color: theme.text,
        }}>
            {/* Decorative circles using theme accents */}
            <div style={{
                position: 'absolute',
                top: '-120px',
                left: '-120px',
                width: '300px',
                height: '300px',
                borderRadius: '50%',
                background: isDarkMode ? 'rgba(139,133,255,0.1)' : 'rgba(108,99,255,0.1)',
                filter: 'blur(80px)',
            }} />
            <div style={{
                position: 'absolute',
                bottom: '-150px',
                right: '-150px',
                width: '400px',
                height: '400px',
                borderRadius: '50%',
                background: 'rgba(0,212,166,0.1)',
                filter: 'blur(100px)',
            }} />

            <div style={{ maxWidth: '480px', width: '100%', zIndex: 1 }}>
                {/* Logo and tagline */}
                <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
                        <div style={{ width: '24px', height: '24px', color: theme.primary }}>
                            <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                                <path d="M24 4C25.7818 14.2173 33.7827 22.2182 44 24C33.7827 25.7818 25.7818 33.7827 24 44C22.2182 33.7818 14.2173 25.7818 4 24C14.2173 22.2182 22.2182 14.2173 24 4Z" fill="currentColor" />
                            </svg>
                        </div>
                        <h1 style={{ fontSize: '1.5rem', fontWeight: 700, color: theme.text, margin: 0 }}>ProcrastiNOT</h1>
                    </div>
                    <p style={{ color: theme.textSecondary, fontSize: '0.95rem', margin: 0 }}>Stop procrastinating. Start doing.</p>
                </div>

                {/* Form card */}
                <div style={{
                    background: theme.cardBackground,
                    borderRadius: '1.5rem',
                    padding: '3rem 2.5rem',
                    boxShadow: '0 10px 40px rgba(0,0,0,0.08)',
                    border: `1px solid ${theme.border}`,
                }}>
                    {/* Header */}
                    <div style={{ marginBottom: '2rem' }}>
                        <h2 style={{ fontSize: '1.75rem', fontWeight: 700, color: theme.text, marginBottom: '0.5rem' }}>Create Your Account</h2>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <div style={{ height: '4px', width: '60px', background: theme.primary, borderRadius: '2px' }} />
                            <span style={{ fontSize: '0.85rem', color: theme.textSecondary }}>Step 1/2</span>
                        </div>
                    </div>

                    {/* Social buttons */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.5rem' }}>
                        <button
                            type="button"
                            onClick={() => handleSocialSignIn('Google')}
                            style={{
                                width: '100%',
                                padding: '0.875rem',
                                background: theme.cardBackground,
                                border: `1.5px solid ${theme.border}`,
                                borderRadius: '0.75rem',
                                fontSize: '0.95rem',
                                fontWeight: 500,
                                color: theme.text,
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '0.75rem',
                                transition: 'all 0.2s',
                                fontFamily: 'Inter, sans-serif',
                            }}
                            onMouseEnter={e => { e.currentTarget.style.borderColor = theme.primary; e.currentTarget.style.background = isDarkMode ? '#2A2A3A' : '#FAFAFA'; }}
                            onMouseLeave={e => { e.currentTarget.style.borderColor = theme.border; e.currentTarget.style.background = theme.cardBackground; }}
                        >
                            <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.874 2.684-6.615z" fill="#4285F4" /><path d="M9.003 18c2.43 0 4.467-.806 5.956-2.18L12.05 13.56c-.806.54-1.837.86-3.047.86-2.344 0-4.328-1.584-5.036-3.711H.96v2.332C2.44 15.983 5.485 18 9.003 18z" fill="#34A853" /><path d="M3.964 10.712c-.18-.54-.282-1.117-.282-1.71 0-.593.102-1.17.282-1.71V4.96H.957C.347 6.175 0 7.55 0 9.002c0 1.452.348 2.827.957 4.042l3.007-2.332z" fill="#FBBC05" /><path d="M9.003 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.464.891 11.426 0 9.003 0 5.485 0 2.44 2.017.96 4.958L3.967 7.29c.708-2.127 2.692-3.71 5.036-3.71z" fill="#EA4335" /></svg>
                            Sign up with Google
                        </button>
                        <button
                            type="button"
                            onClick={() => handleSocialSignIn('Apple')}
                            style={{
                                width: '100%',
                                padding: '0.875rem',
                                background: theme.cardBackground,
                                border: `1.5px solid ${theme.border}`,
                                borderRadius: '0.75rem',
                                fontSize: '0.95rem',
                                fontWeight: 500,
                                color: theme.text,
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '0.75rem',
                                transition: 'all 0.2s',
                                fontFamily: 'Inter, sans-serif',
                            }}
                            onMouseEnter={e => { e.currentTarget.style.borderColor = theme.primary; e.currentTarget.style.background = isDarkMode ? '#2A2A3A' : '#FAFAFA'; }}
                            onMouseLeave={e => { e.currentTarget.style.borderColor = theme.border; e.currentTarget.style.background = theme.cardBackground; }}
                        >
                            <svg width="18" height="18" viewBox="0 0 18 18" fill="currentColor"><path d="M14.94 13.52c-.36.77-.54 1.12-1.01 1.8-.66.96-1.59 2.15-2.74 2.16-1.02.01-1.28-.66-2.67-.65-1.39 0-1.69.66-2.71.67-1.15.01-2.01-1.1-2.67-2.06C1.58 13.23.77 10.2 1.36 7.85c.42-1.67 1.64-2.73 2.89-2.73 1.08 0 1.76.67 2.65.67.86 0 1.38-.67 2.62-.67 1.05 0 2.13.76 2.91 2.07-2.55 1.41-2.14 5.08.51 6.33zM11.53 3.96c.51-.65.91-1.58.76-2.52-.83.04-1.8.59-2.37 1.29-.5.61-.92 1.57-.76 2.48.9.03 1.83-.52 2.37-1.25z" /></svg>
                            Sign up with Apple
                        </button>
                    </div>

                    {/* Divider */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', margin: '1.5rem 0', color: theme.textSecondary, fontSize: '0.85rem' }}>
                        <div style={{ flex: 1, height: '1px', background: theme.border }} />
                        OR
                        <div style={{ flex: 1, height: '1px', background: theme.border }} />
                    </div>

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
                                marginBottom: '1.25rem',
                            }}>
                                {error}
                            </div>
                        )}

                        {/* Email */}
                        <div style={{ marginBottom: '1.25rem' }}>
                            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, color: theme.text, marginBottom: '0.5rem' }}>Email</label>
                            <input
                                type="email"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                placeholder="Enter your email address"
                                required
                                style={{
                                    width: '100%',
                                    padding: '0.875rem 1rem',
                                    border: `1.5px solid ${theme.border}`,
                                    borderRadius: '0.75rem',
                                    fontSize: '0.95rem',
                                    fontFamily: 'Inter, sans-serif',
                                    outline: 'none',
                                    transition: 'border-color 0.2s',
                                    boxSizing: 'border-box',
                                    background: theme.cardBackground,
                                    color: theme.text,
                                }}
                                onFocus={e => e.currentTarget.style.borderColor = theme.primary}
                                onBlur={e => e.currentTarget.style.borderColor = theme.border}
                            />
                        </div>

                        {/* Password */}
                        <div style={{ marginBottom: '1rem' }}>
                            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, color: theme.text, marginBottom: '0.5rem' }}>Password</label>
                            <div style={{ position: 'relative' }}>
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    value={password}
                                    onChange={e => setPassword(e.target.value)}
                                    placeholder="Create a strong password"
                                    required
                                    style={{
                                        width: '100%',
                                        padding: '0.875rem 3rem 0.875rem 1rem',
                                        border: `1.5px solid ${theme.border}`,
                                        borderRadius: '0.75rem',
                                        fontSize: '0.95rem',
                                        fontFamily: 'Inter, sans-serif',
                                        outline: 'none',
                                        transition: 'border-color 0.2s',
                                        boxSizing: 'border-box',
                                        background: theme.cardBackground,
                                        color: theme.text,
                                    }}
                                    onFocus={e => e.currentTarget.style.borderColor = theme.primary}
                                    onBlur={e => e.currentTarget.style.borderColor = theme.border}
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
                                        color: '#9a9ab0',
                                        padding: '0.25rem',
                                    }}
                                >
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" /></svg>
                                </button>
                            </div>
                            {/* Password strength */}
                            {password && (
                                <div style={{ marginTop: '0.75rem' }}>
                                    <div style={{ height: '4px', background: '#F0F0F0', borderRadius: '2px', overflow: 'hidden' }}>
                                        <div style={{ height: '100%', width: getStrengthWidth(), background: getStrengthColor(), transition: 'all 0.3s', borderRadius: '2px' }} />
                                    </div>
                                    <p style={{ fontSize: '0.8rem', color: getStrengthColor(), marginTop: '0.375rem', fontWeight: 600, textTransform: 'capitalize' }}>{passwordStrength}</p>
                                </div>
                            )}
                        </div>

                        {/* Confirm Password */}
                        <div style={{ marginBottom: '2rem' }}>
                            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, color: theme.text, marginBottom: '0.5rem' }}>Confirm Password</label>
                            <input
                                type="password"
                                value={confirmPassword}
                                onChange={e => setConfirmPassword(e.target.value)}
                                placeholder="Confirm your password"
                                required
                                style={{
                                    width: '100%',
                                    padding: '0.875rem 1rem',
                                    border: `1.5px solid ${theme.border}`,
                                    borderRadius: '0.75rem',
                                    fontSize: '0.95rem',
                                    fontFamily: 'Inter, sans-serif',
                                    outline: 'none',
                                    transition: 'border-color 0.2s',
                                    boxSizing: 'border-box',
                                    background: theme.cardBackground,
                                    color: theme.text,
                                }}
                                onFocus={e => e.currentTarget.style.borderColor = theme.primary}
                                onBlur={e => e.currentTarget.style.borderColor = theme.border}
                            />
                        </div>

                        {/* Submit button */}
                        <button
                            type="submit"
                            disabled={isLoading}
                            style={{
                                width: '100%',
                                padding: '1rem',
                                background: `linear-gradient(135deg, ${theme.primary} 0%, ${theme.primary}99 100%)`,
                                border: 'none',
                                borderRadius: '0.75rem',
                                color: '#FFFFFF',
                                fontSize: '1rem',
                                fontWeight: 600,
                                cursor: isLoading ? 'not-allowed' : 'pointer',
                                fontFamily: 'Inter, sans-serif',
                                transition: 'all 0.2s',
                                opacity: isLoading ? 0.7 : 1,
                            }}
                            onMouseEnter={e => { if (!isLoading) { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 20px rgba(108, 99, 255, 0.3)'; } }}
                            onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}
                        >
                            {isLoading ? 'Creating Account...' : 'Create Account & Start Winning'}
                        </button>
                    </form>

                    {/* Footer links */}
                    <div style={{ marginTop: '1.5rem', textAlign: 'center' }}>
                        <p style={{ fontSize: '0.875rem', color: theme.textSecondary, marginBottom: '0.75rem' }}>
                            Already have an account?{' '}
                            <a
                                onClick={() => navigate('/signin')}
                                style={{ color: theme.primary, fontWeight: 600, cursor: 'pointer', textDecoration: 'none' }}
                                onMouseEnter={e => e.currentTarget.style.textDecoration = 'underline'}
                                onMouseLeave={e => e.currentTarget.style.textDecoration = 'none'}
                            >
                                Log In
                            </a>
                        </p>
                        <p style={{ fontSize: '0.75rem', color: theme.textSecondary }}>
                            By creating an account, you agree to our{' '}
                            <a style={{ color: theme.text, textDecoration: 'underline', cursor: 'pointer' }}>Terms of Service</a>{' & '}
                            <a style={{ color: theme.text, textDecoration: 'underline', cursor: 'pointer' }}>Privacy Policy</a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignUp;
