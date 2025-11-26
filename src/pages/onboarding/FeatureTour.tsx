import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';
import Button from '../../components/Button';
import { Brain, Trophy, BarChart2, Smile } from 'lucide-react';

const features = [
    {
        icon: Brain,
        title: "Focus Mode",
        description: "Block distractions and use scientifically proven timers to enter a flow state.",
        color: "#6C63FF"
    },
    {
        icon: Trophy,
        title: "Rewards Room",
        description: "Earn XP and badges for every task you complete. Gamify your productivity.",
        color: "#00D4A6"
    },
    {
        icon: BarChart2,
        title: "Smart Analytics",
        description: "Track your dopamine hits and productivity trends over time.",
        color: "#FFB300"
    },
    {
        icon: Smile,
        title: "Mood Check",
        description: "Log your mood to understand how your emotions affect your work.",
        color: "#FF6B6B"
    }
];

const FeatureTour = () => {
    const navigate = useNavigate();
    const { theme } = useTheme();
    const [currentStep, setCurrentStep] = useState(0);

    const handleNext = () => {
        if (currentStep < features.length - 1) {
            setCurrentStep(currentStep + 1);
        } else {
            navigate('/onboarding/mbti');
        }
    };

    const handleSkip = () => {
        navigate('/onboarding/mbti');
    };

    const CurrentIcon = features[currentStep].icon;

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
                top: '-10%',
                left: '-10%',
                width: '50%',
                height: '50%',
                background: `radial-gradient(circle, ${features[currentStep].color}20 0%, transparent 70%)`,
                filter: 'blur(60px)',
                transition: 'background 0.5s ease'
            }} />
            <div style={{
                position: 'absolute',
                bottom: '-10%',
                right: '-10%',
                width: '50%',
                height: '50%',
                background: `radial-gradient(circle, ${features[currentStep].color}20 0%, transparent 70%)`,
                filter: 'blur(60px)',
                transition: 'background 0.5s ease'
            }} />

            <div style={{
                maxWidth: '800px',
                width: '100%',
                background: theme.cardBackground,
                borderRadius: '2rem',
                padding: '4rem',
                boxShadow: '0 20px 60px rgba(0,0,0,0.08)',
                border: `1px solid ${theme.border}`,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                position: 'relative',
                zIndex: 1
            }}>
                {/* Progress Bar */}
                <div style={{
                    position: 'absolute',
                    top: '0',
                    left: '0',
                    width: '100%',
                    height: '6px',
                    background: theme.border,
                    borderTopLeftRadius: '2rem',
                    borderTopRightRadius: '2rem',
                    overflow: 'hidden'
                }}>
                    <div style={{
                        height: '100%',
                        width: `${((currentStep + 1) / features.length) * 100}%`,
                        background: features[currentStep].color,
                        transition: 'width 0.3s ease, background 0.3s ease'
                    }} />
                </div>

                {/* Icon */}
                <div style={{
                    width: '120px',
                    height: '120px',
                    borderRadius: '50%',
                    background: `${features[currentStep].color}15`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '2.5rem',
                    transition: 'background 0.3s ease'
                }}>
                    <CurrentIcon size={60} color={features[currentStep].color} />
                </div>

                {/* Content */}
                <h2 style={{
                    fontSize: '2.5rem',
                    fontWeight: 800,
                    color: theme.text,
                    marginBottom: '1rem',
                    transition: 'color 0.3s'
                }}>
                    {features[currentStep].title}
                </h2>
                <p style={{
                    fontSize: '1.2rem',
                    color: theme.textSecondary,
                    marginBottom: '3rem',
                    maxWidth: '500px',
                    lineHeight: 1.6
                }}>
                    {features[currentStep].description}
                </p>

                {/* Controls */}
                <div style={{ display: 'flex', gap: '1rem', width: '100%', maxWidth: '400px' }}>
                    <Button
                        variant="ghost"
                        onClick={handleSkip}
                        style={{ flex: 1 }}
                    >
                        Skip
                    </Button>
                    <Button
                        variant="primary"
                        onClick={handleNext}
                        style={{
                            flex: 1,
                            background: features[currentStep].color,
                            borderColor: features[currentStep].color
                        }}
                    >
                        {currentStep === features.length - 1 ? "Get Started" : "Next"}
                    </Button>
                </div>

                {/* Dots */}
                <div style={{ display: 'flex', gap: '0.5rem', marginTop: '2rem' }}>
                    {features.map((_, index) => (
                        <div
                            key={index}
                            style={{
                                width: '10px',
                                height: '10px',
                                borderRadius: '50%',
                                background: index === currentStep ? features[currentStep].color : theme.border,
                                transition: 'background 0.3s ease'
                            }}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default FeatureTour;
