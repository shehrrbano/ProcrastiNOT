import React from 'react';

interface LayoutProps {
    children: React.ReactNode;
    className?: string;
    fullScreen?: boolean;
}

const Layout: React.FC<LayoutProps> = ({ children, className = '', fullScreen = false }) => {
    if (fullScreen) {
        return (
            <div className={`min-h-screen w-full bg-[var(--bg)] flex flex-col ${className}`}>
                {children}
            </div>
        );
    }

    return (
        <div className={`min-h-screen w-full bg-[var(--bg)] flex flex-col items-center p-4 sm:p-6 ${className}`}>
            <div className="w-full max-w-md flex-1 flex flex-col">
                {children}
            </div>
        </div>
    );
};

export default Layout;
