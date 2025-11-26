import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { useAuth } from './AuthContext';

type UserProfile = {
    id: string;
    email: string;
    name: string;
    avatarUrl: string;
};

type UserContextType = {
    user: UserProfile | null;
    updateUser: (updates: Partial<UserProfile>) => void;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
    const { currentUser } = useAuth();
    const [user, setUser] = useState<UserProfile | null>(null);

    // Load profile from localStorage or initialise from AuthContext
    useEffect(() => {
        if (currentUser) {
            const stored = localStorage.getItem('userProfile');
            if (stored) {
                setUser(JSON.parse(stored));
            } else {
                const initial: UserProfile = {
                    id: currentUser.id,
                    email: currentUser.email,
                    name: '',
                    avatarUrl: ''
                };
                setUser(initial);
                localStorage.setItem('userProfile', JSON.stringify(initial));
            }
        } else {
            setUser(null);
        }
    }, [currentUser]);

    const updateUser = (updates: Partial<UserProfile>) => {
        setUser(prev => {
            if (!prev) return null;
            const updated = { ...prev, ...updates };
            localStorage.setItem('userProfile', JSON.stringify(updated));
            return updated;
        });
    };

    return (
        <UserContext.Provider value={{ user, updateUser }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
};
