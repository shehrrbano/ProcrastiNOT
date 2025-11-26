import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { Edit3, BrainCircuit } from 'lucide-react';

const AssessmentMBTI = () => {
    const navigate = useNavigate();
    const { updateUserProfile } = useApp();
    const [manualType, setManualType] = useState('');

    const handleManualSubmit = () => {
        if (manualType.trim().length === 4) {
            updateUserProfile({ mbti: manualType.toUpperCase() });
            navigate('/onboarding/adhd');
        }
    };

    const handleSkip = () => {
        navigate('/onboarding/adhd');
    };

    return (
        <div style={{
            minHeight: '100vh',
            background: '#F9FAFB',
            fontFamily: 'Inter, sans-serif',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: '3rem 1.5rem'
        }}>
            {/* Header */}
            <div style={{
                textAlign: 'center',
                marginBottom: '3rem',
                maxWidth: '600px'
            }}>
                <h1 style={{
                    fontSize: '2.25rem',
                    fontWeight: 800,
                    color: '#111827',
                    lineHeight: 1.2,
                    marginBottom: '1rem',
                    letterSpacing: '-0.02em'
                }}>
                    Unlock Your Productivity Personality
                </h1>
                <p style={{
                    fontSize: '0.95rem',
                    color: '#6B7280',
                    lineHeight: 1.6,
                    margin: '0 auto'
                }}>
                    Personalize your focus by telling us your MBTI type. We'll tailor task management, motivation triggers, and break strategies just for you.
                </p>
            </div>

            {/* Cards Container */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                gap: '1.5rem',
                maxWidth: '900px',
                width: '100%',
                marginBottom: '2rem'
            }}>
                {/* Option 1: Manual Input */}
                <div style={{
                    background: '#FFFFFF',
                    borderRadius: '1rem',
                    padding: '2rem',
                    border: '1px solid #E5E7EB',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '1.5rem'
                }}>
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                        <div style={{
                            width: '40px',
                            height: '40px',
                            borderRadius: '8px',
                            background: '#EEF2FF',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexShrink: 0
                        }}>
                            <Edit3 size={20} color="#6366F1" />
                        </div>
                        <div>
                            <div style={{
                                fontSize: '0.75rem',
                                fontWeight: 600,
                                color: '#9CA3AF',
                                marginBottom: '0.25rem',
                                textTransform: 'uppercase',
                                letterSpacing: '0.05em'
                            }}>
                                Option 1
                            </div>
                            <h3 style={{
                                fontSize: '1.125rem',
                                fontWeight: 700,
                                color: '#111827',
                                margin: 0
                            }}>
                                I already know my type
                            </h3>
                        </div>
                    </div>

                    <p style={{
                        color: '#6B7280',
                        fontSize: '0.875rem',
                        lineHeight: 1.5,
                        margin: 0
                    }}>
                        Enter your 4-letter personality type to customize your ProcrastiNOT experience.
                    </p>

                    <div style={{ marginTop: 'auto' }}>
                        <label style={{
                            display: 'block',
                            fontSize: '0.875rem',
                            fontWeight: 600,
                            color: '#374151',
                            marginBottom: '0.5rem'
                        }}>
                            Your MBTI Type
                        </label>
                        <input
                            type="text"
                            placeholder="e.g., INTJ, ESTP..."
                            value={manualType}
                            onChange={(e) => setManualType(e.target.value.toUpperCase())}
                            maxLength={4}
                            style={{
                                width: '100%',
                                padding: '0.75rem 1rem',
                                borderRadius: '0.5rem',
                                border: '1px solid #D1D5DB',
                                background: '#F9FAFB',
                                color: '#111827',
                                fontSize: '0.875rem',
                                fontFamily: 'Inter, sans-serif',
                                outline: 'none',
                                marginBottom: '1rem',
                                boxSizing: 'border-box'
                            }}
                            onFocus={(e) => {
                                e.currentTarget.style.borderColor = '#6366F1';
                                e.currentTarget.style.background = '#FFFFFF';
                            }}
                            onBlur={(e) => {
                                e.currentTarget.style.borderColor = '#D1D5DB';
                                e.currentTarget.style.background = '#F9FAFB';
                            }}
                        />
                        <button
                            onClick={handleManualSubmit}
                            disabled={manualType.length !== 4}
                            style={{
                                width: '100%',
                                padding: '0.75rem 1.5rem',
                                background: manualType.length === 4 ? '#6366F1' : '#E5E7EB',
                                color: manualType.length === 4 ? '#FFFFFF' : '#9CA3AF',
                                border: 'none',
                                borderRadius: '0.5rem',
                                fontSize: '0.875rem',
                                fontWeight: 600,
                                cursor: manualType.length === 4 ? 'pointer' : 'not-allowed',
                                transition: 'all 0.2s',
                                fontFamily: 'Inter, sans-serif'
                            }}
                        >
                            Personalize My Plan
                        </button>
                    </div>
                </div>

                {/* Option 2: External Quiz */}
                <div style={{
                    background: '#FFFFFF',
                    borderRadius: '1rem',
                    padding: '2rem',
                    border: '1px solid #E5E7EB',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '1.5rem'
                }}>
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                        <div style={{
                            width: '40px',
                            height: '40px',
                            borderRadius: '8px',
                            background: '#ECFDF5',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexShrink: 0
                        }}>
                            <BrainCircuit size={20} color="#10B981" />
                        </div>
                        <div>
                            <div style={{
                                fontSize: '0.75rem',
                                fontWeight: 600,
                                color: '#9CA3AF',
                                marginBottom: '0.25rem',
                                textTransform: 'uppercase',
                                letterSpacing: '0.05em'
                            }}>
                                Option 2
                            </div>
                            <h3 style={{
                                fontSize: '1.125rem',
                                fontWeight: 700,
                                color: '#111827',
                                margin: 0
                            }}>
                                Not sure? Discover your type
                            </h3>
                        </div>
                    </div>

                    <p style={{
                        color: '#6B7280',
                        fontSize: '0.875rem',
                        lineHeight: 1.5,
                        margin: 0
                    }}>
                        Take our short, engaging quiz to find out. It's quick, easy, and completely optional!
                    </p>

                    <div style={{ marginTop: 'auto' }}>
                        <a
                            href="https://www.16personalities.com/free-personality-test"
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{ textDecoration: 'none' }}
                        >
                            <button
                                style={{
                                    width: '100%',
                                    padding: '0.75rem 1.5rem',
                                    background: '#10B981',
                                    color: '#FFFFFF',
                                    border: 'none',
                                    borderRadius: '0.5rem',
                                    fontSize: '0.875rem',
                                    fontWeight: 600,
                                    cursor: 'pointer',
                                    transition: 'all 0.2s',
                                    fontFamily: 'Inter, sans-serif'
                                }}
                                onMouseEnter={(e) => e.currentTarget.style.background = '#059669'}
                                onMouseLeave={(e) => e.currentTarget.style.background = '#10B981'}
                            >
                                Take the 5-Minute Quiz
                            </button>
                        </a>
                    </div>
                </div>
            </div>

            {/* Skip Button */}
            <button
                onClick={handleSkip}
                style={{
                    background: 'none',
                    border: 'none',
                    color: '#6B7280',
                    fontSize: '0.875rem',
                    fontWeight: 500,
                    cursor: 'pointer',
                    textDecoration: 'none',
                    fontFamily: 'Inter, sans-serif'
                }}
                onMouseEnter={(e) => e.currentTarget.style.textDecoration = 'underline'}
                onMouseLeave={(e) => e.currentTarget.style.textDecoration = 'none'}
            >
                I'll do this later
            </button>
        </div>
    );
};

export default AssessmentMBTI;
