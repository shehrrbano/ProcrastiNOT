export interface AuthUser {
    id: string;
    email: string;
    createdAt: string;
}

export interface SignUpData {
    email: string;
    password: string;
    confirmPassword: string;
}

export interface SignInData {
    email: string;
    password: string;
}

export interface StoredUser {
    id: string;
    email: string;
    passwordHash: string;
    createdAt: string;
}

export type PasswordStrength = 'weak' | 'medium' | 'strong';
