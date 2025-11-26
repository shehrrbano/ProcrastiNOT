import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import type { AuthUser, SignUpData, SignInData, StoredUser, PasswordStrength } from '../types/auth';

interface AuthContextType {
    currentUser: AuthUser | null;
    signUp: (data: SignUpData) => Promise<{ success: boolean; error?: string }>;
    signIn: (data: SignInData) => Promise<{ success: boolean; error?: string }>;
    signOut: () => void;
    isAuthenticated: boolean;
    checkPasswordStrength: (password: string) => PasswordStrength;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Simple hash function for demo purposes (NOT production-ready)
async function hashPassword(password: string): Promise<string> {
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

// Password strength checker
function checkPasswordStrength(password: string): PasswordStrength {
    if (password.length < 6) return 'weak';

    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength++;
    if (/\d/.test(password)) strength++;
    if (/[^a-zA-Z0-9]/.test(password)) strength++;

    if (strength >= 3) return 'strong';
    if (strength >= 2) return 'medium';
    return 'weak';
}

// Email validation
function isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

export function AuthProvider({ children }: { children: ReactNode }) {
    const [currentUser, setCurrentUser] = useState<AuthUser | null>(null);

    // Load user from localStorage on mount
    useEffect(() => {
        const sessionUser = localStorage.getItem('currentUser');
        if (sessionUser) {
            setCurrentUser(JSON.parse(sessionUser));
        }
    }, []);

    const signUp = async (data: SignUpData): Promise<{ success: boolean; error?: string }> => {
        // Validation
        if (!isValidEmail(data.email)) {
            return { success: false, error: 'Please enter a valid email address' };
        }

        if (data.password.length < 6) {
            return { success: false, error: 'Password must be at least 6 characters' };
        }

        if (data.password !== data.confirmPassword) {
            return { success: false, error: 'Passwords do not match' };
        }

        // Check if user already exists
        const users: StoredUser[] = JSON.parse(localStorage.getItem('users') || '[]');
        if (users.some(u => u.email === data.email)) {
            return { success: false, error: 'An account with this email already exists' };
        }

        // Create new user
        const passwordHash = await hashPassword(data.password);
        const newUser: StoredUser = {
            id: crypto.randomUUID(),
            email: data.email,
            passwordHash,
            createdAt: new Date().toISOString()
        };

        // Save to localStorage
        users.push(newUser);
        localStorage.setItem('users', JSON.stringify(users));

        // Set current user
        const authUser: AuthUser = {
            id: newUser.id,
            email: newUser.email,
            createdAt: newUser.createdAt
        };
        setCurrentUser(authUser);
        localStorage.setItem('currentUser', JSON.stringify(authUser));

        return { success: true };
    };

    const signIn = async (data: SignInData): Promise<{ success: boolean; error?: string }> => {
        // Validation
        if (!isValidEmail(data.email)) {
            return { success: false, error: 'Please enter a valid email address' };
        }

        if (!data.password) {
            return { success: false, error: 'Please enter your password' };
        }

        // Find user
        const users: StoredUser[] = JSON.parse(localStorage.getItem('users') || '[]');
        const user = users.find(u => u.email === data.email);

        if (!user) {
            return { success: false, error: 'Invalid email or password' };
        }

        // Verify password
        const passwordHash = await hashPassword(data.password);
        if (passwordHash !== user.passwordHash) {
            return { success: false, error: 'Invalid email or password' };
        }

        // Set current user
        const authUser: AuthUser = {
            id: user.id,
            email: user.email,
            createdAt: user.createdAt
        };
        setCurrentUser(authUser);
        localStorage.setItem('currentUser', JSON.stringify(authUser));

        return { success: true };
    };

    const signOut = () => {
        setCurrentUser(null);
        localStorage.removeItem('currentUser');
    };

    return (
        <AuthContext.Provider
            value={{
                currentUser,
                signUp,
                signIn,
                signOut,
                isAuthenticated: !!currentUser,
                checkPasswordStrength
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}
