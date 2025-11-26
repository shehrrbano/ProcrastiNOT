import '../index.css';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'accent' | 'ghost' | 'gradient';
    size?: 'sm' | 'md' | 'lg';
    pulse?: boolean;
    fullWidth?: boolean;
    children: React.ReactNode;
}

const Button = ({
    variant = 'primary',
    size = 'md',
    pulse = false,
    fullWidth = false,
    className = '',
    children,
    ...props
}: ButtonProps) => {
    const baseStyles = 'inline-flex items-center justify-center font-semibold transition-all duration-200 rounded-full focus:outline-none active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm hover:shadow-md';

    const variants = {
        primary: 'bg-[var(--primary)] text-white hover:bg-[var(--primary-dark)] hover:shadow-[var(--shadow-glow-primary)]',
        secondary: 'bg-[var(--secondary)] text-white hover:bg-[var(--secondary-dark)] hover:shadow-[var(--shadow-glow-secondary)]',
        accent: 'bg-[var(--accent)] text-white hover:bg-[var(--accent-dark)] hover:shadow-[var(--shadow-glow-accent)]',
        ghost: 'bg-transparent text-[var(--text-muted)] hover:bg-gray-100 hover:text-[var(--text-main)] shadow-none',
        gradient: 'bg-gradient-to-r from-[var(--primary)] via-[var(--primary-light)] to-[var(--secondary)] text-white hover:shadow-[var(--shadow-glow-primary)] bg-[length:200%_100%] hover:bg-[position:100%_0] transition-all duration-500',
    };

    const sizes = {
        sm: 'px-4 py-2 text-sm',
        md: 'px-6 py-3 text-base',
        lg: 'px-8 py-4 text-lg',
    };

    const widthClass = fullWidth ? 'w-full' : '';
    const pulseClass = pulse ? 'animate-pulse-soft' : '';

    return (
        <button
            className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${widthClass} ${pulseClass} ${className}`}
            {...props}
        >
            {children}
        </button>
    );
};

export default Button;
