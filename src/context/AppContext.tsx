import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import type { User, Task, Badge, MoodEntry, FocusSession } from '../types';

interface AppContextType {
    user: User | null;
    tasks: Task[];
    badges: Badge[];
    moodEntries: MoodEntry[];
    focusSessions: FocusSession[];

    // User actions
    setUser: (user: User) => void;
    updateUserProfile: (updates: Partial<User>) => void;

    // Task actions
    addTask: (title: string, category?: Task['category']) => void;
    toggleTask: (id: string) => void;
    deleteTask: (id: string) => void;

    // Gamification
    addXP: (amount: number) => void;
    unlockBadge: (badgeId: string) => void;
    incrementStreak: () => void;

    // Mood tracking
    addMoodEntry: (mood: MoodEntry['mood'], factors: string[]) => void;

    // Focus sessions
    startFocusSession: () => string;
    completeFocusSession: (id: string, duration: number) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const STORAGE_KEYS = {
    USER: 'procrastinot_user',
    TASKS: 'procrastinot_tasks',
    BADGES: 'procrastinot_badges',
    MOODS: 'procrastinot_moods',
    SESSIONS: 'procrastinot_sessions',
};

const DEFAULT_BADGES: Badge[] = [
    { id: 'early-bird', name: 'Early Bird', description: 'Complete a task before 8am', unlocked: false },
    { id: 'focus-master', name: 'Focus Master', description: '2h of deep work in a day', unlocked: false },
    { id: 'streak-king', name: 'Streak King', description: '7 day streak', unlocked: false },
    { id: 'goal-crusher', name: 'Goal Crusher', description: 'Complete all daily goals', unlocked: false },
    { id: 'zen-master', name: 'Zen Master', description: '30 focus sessions', unlocked: false },
    { id: 'unstoppable', name: 'Unstoppable', description: '30 day streak', unlocked: false },
];

export const AppProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUserState] = useState<User | null>(null);
    const [tasks, setTasks] = useState<Task[]>([]);
    const [badges, setBadges] = useState<Badge[]>(DEFAULT_BADGES);
    const [moodEntries, setMoodEntries] = useState<MoodEntry[]>([]);
    const [focusSessions, setFocusSessions] = useState<FocusSession[]>([]);

    // Load from localStorage on mount
    useEffect(() => {
        const savedUser = localStorage.getItem(STORAGE_KEYS.USER);
        const savedTasks = localStorage.getItem(STORAGE_KEYS.TASKS);
        const savedBadges = localStorage.getItem(STORAGE_KEYS.BADGES);
        const savedMoods = localStorage.getItem(STORAGE_KEYS.MOODS);
        const savedSessions = localStorage.getItem(STORAGE_KEYS.SESSIONS);

        if (savedUser) setUserState(JSON.parse(savedUser));
        if (savedTasks) setTasks(JSON.parse(savedTasks));
        if (savedBadges) setBadges(JSON.parse(savedBadges));
        if (savedMoods) setMoodEntries(JSON.parse(savedMoods));
        if (savedSessions) setFocusSessions(JSON.parse(savedSessions));
    }, []);

    // Save to localStorage whenever state changes
    useEffect(() => {
        if (user) localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
    }, [user]);

    useEffect(() => {
        localStorage.setItem(STORAGE_KEYS.TASKS, JSON.stringify(tasks));
    }, [tasks]);

    useEffect(() => {
        localStorage.setItem(STORAGE_KEYS.BADGES, JSON.stringify(badges));
    }, [badges]);

    useEffect(() => {
        localStorage.setItem(STORAGE_KEYS.MOODS, JSON.stringify(moodEntries));
    }, [moodEntries]);

    useEffect(() => {
        localStorage.setItem(STORAGE_KEYS.SESSIONS, JSON.stringify(focusSessions));
    }, [focusSessions]);

    const setUser = (newUser: User) => {
        setUserState(newUser);
    };

    const updateUserProfile = (updates: Partial<User>) => {
        if (user) {
            setUserState({ ...user, ...updates });
        }
    };

    const addTask = (title: string, category?: Task['category']) => {
        const newTask: Task = {
            id: Date.now().toString(),
            title,
            completed: false,
            createdAt: new Date().toISOString(),
            category,
        };
        setTasks([...tasks, newTask]);
    };

    const toggleTask = (id: string) => {
        setTasks(tasks.map(task => {
            if (task.id === id) {
                const completed = !task.completed;
                if (completed && user) {
                    addXP(10); // Award XP for completing task
                }
                return {
                    ...task,
                    completed,
                    completedAt: completed ? new Date().toISOString() : undefined,
                };
            }
            return task;
        }));
    };

    const deleteTask = (id: string) => {
        setTasks(tasks.filter(task => task.id !== id));
    };

    const addXP = (amount: number) => {
        if (!user) return;
        const newXP = user.xp + amount;
        const newLevel = Math.floor(newXP / 100) + 1;
        setUserState({ ...user, xp: newXP, level: newLevel });
    };

    const unlockBadge = (badgeId: string) => {
        setBadges(badges.map(badge =>
            badge.id === badgeId
                ? { ...badge, unlocked: true, unlockedAt: new Date().toISOString() }
                : badge
        ));
        if (user) {
            setUserState({ ...user, badges: [...user.badges, badgeId] });
        }
    };

    const incrementStreak = () => {
        if (!user) return;
        const newStreak = user.streak + 1;
        const newHighestStreak = Math.max(newStreak, user.highestStreak || newStreak);
        setUserState({ ...user, streak: newStreak, highestStreak: newHighestStreak });

        // Check for streak badges
        if (newStreak === 7 && !badges.find(b => b.id === 'streak-king')?.unlocked) {
            unlockBadge('streak-king');
        }
        if (newStreak === 30 && !badges.find(b => b.id === 'unstoppable')?.unlocked) {
            unlockBadge('unstoppable');
        }
    };

    const addMoodEntry = (mood: MoodEntry['mood'], factors: string[]) => {
        const entry: MoodEntry = {
            id: Date.now().toString(),
            mood,
            factors,
            date: new Date().toISOString(),
        };
        setMoodEntries([...moodEntries, entry]);
    };

    const startFocusSession = () => {
        const session: FocusSession = {
            id: Date.now().toString(),
            duration: 0,
            completed: false,
            startedAt: new Date().toISOString(),
        };
        setFocusSessions([...focusSessions, session]);
        return session.id;
    };

    const completeFocusSession = (id: string, duration: number) => {
        setFocusSessions(focusSessions.map(session =>
            session.id === id
                ? { ...session, completed: true, duration, completedAt: new Date().toISOString() }
                : session
        ));

        // Award XP and check badges
        if (user) {
            addXP(25);
            const completedSessions = focusSessions.filter(s => s.completed).length + 1;
            if (completedSessions === 30 && !badges.find(b => b.id === 'zen-master')?.unlocked) {
                unlockBadge('zen-master');
            }
        }
    };

    return (
        <AppContext.Provider
            value={{
                user,
                tasks,
                badges,
                moodEntries,
                focusSessions,
                setUser,
                updateUserProfile,
                addTask,
                toggleTask,
                deleteTask,
                addXP,
                unlockBadge,
                incrementStreak,
                addMoodEntry,
                startFocusSession,
                completeFocusSession,
            }}
        >
            {children}
        </AppContext.Provider>
    );
};

export const useApp = () => {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error('useApp must be used within AppProvider');
    }
    return context;
};
