export interface Theme {
    background: string;
    text: string;
    textSecondary: string;
    textMuted: string;
    primary: string;
    secondary: string;
    cardBackground: string;
    border: string;
    hoverBg: string;
    isDark: boolean;
}

export const lightTheme: Theme = {
    background: '#F8FAFC', // Slate 50
    text: '#0F172A', // Slate 900
    textSecondary: '#64748B', // Slate 500
    textMuted: '#94A3B8', // Slate 400
    primary: '#6366F1', // Indigo 500
    secondary: '#10B981', // Emerald 500
    cardBackground: '#FFFFFF',
    border: '#E2E8F0', // Slate 200
    hoverBg: '#F1F5F9', // Slate 100
    isDark: false,
};

export const darkTheme: Theme = {
    background: '#0F172A', // Slate 900
    text: '#F1F5F9', // Slate 100
    textSecondary: '#94A3B8', // Slate 400
    textMuted: '#64748B', // Slate 500
    primary: '#818CF8', // Indigo 400
    secondary: '#34D399', // Emerald 400
    cardBackground: '#1E293B', // Slate 800
    border: '#334155', // Slate 700
    hoverBg: '#334155', // Slate 700
    isDark: true,
};
