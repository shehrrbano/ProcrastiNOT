import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';
import Button from '../../components/Button';
import { CheckCircle2, Circle } from 'lucide-react';

const symptoms = [
    "I often lose track of time.",
    "I start many tasks but finish few.",
    "I get overwhelmed by large lists.",
    "I need pressure to get started.",
    "I forget daily routines easily."
];

const AssessmentADHD: React.FC = () => {
    const navigate = useNavigate();
    const { theme } = useTheme();
    const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);

    const toggleSymptom = (symptom: string) => {
        if (selectedSymptoms.includes(symptom)) {
            setSelectedSymptoms(selectedSymptoms.filter(s => s !== symptom));
        } else {
            setSelectedSymptoms([...selectedSymptoms, symptom]);
        }
    };

    const handleContinue = () => {
        localStorage.setItem('user_adhd_symptoms', JSON.stringify(selectedSymptoms));
        navigate('/onboarding/goals');
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
            transition: 'background 0.3s, color 0.3s',
            position: 'relative',
            overflow: 'hidden'
        }}>
            {/* Background decorations */}
            <div style={{
                position: 'absolute',
                bottom: '-20%',
                left: '-10%',
                width: '600px',
                height: '600px',
                borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(0, 212, 166, 0.1) 0%, transparent 70%)',
                filter: 'blur(80px)',
                zIndex: 0
            }} />

            <div style={{
                maxWidth: '600px',
                width: '100%',
                zIndex: 1
            }}>
                <div style={{ textAlign: 'center', marginBottom: '3rem', animation: 'fadeIn 0.5s ease-out' }}>
                    <h2 style={{ fontSize: '2.5rem', fontWeight: 800, color: theme.text, marginBottom: '1rem' }}>
                        Focus Check
                    </h2>
                    <p style={{ color: theme.textSecondary, fontSize: '1.1rem' }}>
                        Select any that apply to you (optional). We'll customize your experience based on this.
                    </p>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '3rem', animation: 'fadeIn 0.5s ease-out 0.1s backwards' }}>
                    {symptoms.map((symptom) => {
                        const isSelected = selectedSymptoms.includes(symptom);
                        return (
                            <button
                                key={symptom}
                                onClick={() => toggleSymptom(symptom)}
                                style={{
                                    background: theme.cardBackground,
                                    border: `1px solid ${isSelected ? theme.primary : theme.border}`,
                                    borderRadius: '1rem',
                                    padding: '1.5rem',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '1rem',
                                    cursor: 'pointer',
                                    transition: 'all 0.2s ease',
                                    textAlign: 'left',
                                    width: '100%'
                                }}
                                onMouseEnter={(e) => {
                                    if (!isSelected) e.currentTarget.style.borderColor = theme.primary;
                                    e.currentTarget.style.transform = 'translateY(-2px)';
                                    e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.06)';
                                }}
                                onMouseLeave={(e) => {
                                    if (!isSelected) e.currentTarget.style.borderColor = theme.border;
                                    e.currentTarget.style.transform = 'translateY(0)';
                                    e.currentTarget.style.boxShadow = 'none';
                                }}
                            >
                                {isSelected ? (
                                    <CheckCircle2 color={theme.primary} size={24} />
                                ) : (
                                    <Circle color={theme.textSecondary} size={24} />
                                )}
                                <span style={{
                                    fontSize: '1.1rem',
                                    fontWeight: 500,
                                    color: isSelected ? theme.text : theme.textSecondary
                                }}>
                                    {symptom}
                                </span>
                            </button>
                        );
                    })}
                </div>

                <div style={{ display: 'flex', gap: '1rem', animation: 'fadeIn 0.5s ease-out 0.2s backwards' }}>
                    <Button
                        variant="ghost"
                        onClick={() => navigate('/onboarding/goals')}
                        style={{ flex: 1 }}
                    >
                        Skip
                    </Button>
                    <Button
                        variant="primary"
                        onClick={handleContinue}
                        style={{ flex: 1 }}
                    >
                        Continue
                    </Button>
                </div>
            </div>
            <style>{`
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
            `}</style>
        </div>
    );
};

export default AssessmentADHD;
