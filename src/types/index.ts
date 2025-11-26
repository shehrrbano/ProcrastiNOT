export interface User {
    id: string;
    name: string;
    mbti?: string;
    adhdSymptoms: string[];
    goal: 'school' | 'work' | 'routine' | null;
    streak: number;
    highestStreak: number;
    xp: number;
    level: number;
    badges: string[];
    createdAt: string;
}

export interface Task {
    id: string;
    title: string;
    completed: boolean;
    createdAt: string;
    completedAt?: string;
    category?: 'focus' | 'meeting' | 'break' | 'work';
}

export interface Badge {
    id: string;
    name: string;
    description: string;
    unlocked: boolean;
    unlockedAt?: string;
}

export interface MoodEntry {
    id: string;
    mood: 'great' | 'okay' | 'bad';
    factors: string[];
    date: string;
}

export interface FocusSession {
    id: string;
    duration: number;
    completed: boolean;
    startedAt: string;
    completedAt?: string;
}
