interface CardProps {
    children: React.ReactNode;
    className?: string;
    glass?: boolean;
    hover?: boolean;
    glow?: 'primary' | 'secondary' | 'accent' | 'none';
    onClick?: () => void;
    style?: React.CSSProperties;
}

const Card = ({
    children,
    className = '',
    glass = false,
    hover = false,
    glow = 'none',
    onClick,
    style
}: CardProps) => {
    const baseStyles = 'bg-white rounded-[var(--radius-lg)] p-6 transition-all duration-300';
    const shadowStyles = 'shadow-[var(--shadow-sm)]';
    const glassStyles = glass ? 'glass bg-opacity-90' : '';
    const hoverStyles = hover ? 'hover:shadow-[var(--shadow-lg)] hover:-translate-y-1 cursor-pointer hover-lift' : '';

    const glowStyles = {
        primary: hover ? 'hover-glow-primary' : '',
        secondary: hover ? 'hover-glow-secondary' : '',
        accent: hover ? 'hover:shadow-[var(--shadow-glow-accent)]' : '',
        none: '',
    };

    return (
        <div
            className={`${baseStyles} ${shadowStyles} ${glassStyles} ${hoverStyles} ${glowStyles[glow]} ${className}`}
            onClick={onClick}
            style={style}
        >
            {children}
        </div>
    );
};

export default Card;
