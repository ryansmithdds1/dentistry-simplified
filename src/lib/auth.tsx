'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';

// --- User Types ---
export interface User {
    id: string;
    name: string;
    email: string;
    role: 'patient' | 'dentist';
    avatar?: string;
    phone?: string;
    location?: string;
}

// --- Mock Users for Demo ---
export const MOCK_USERS: User[] = [
    {
        id: 'u1',
        name: 'John Doe',
        email: 'john@example.com',
        role: 'patient',
        phone: '(555) 123-4567',
        location: 'San Francisco, CA'
    },
    {
        id: 'u2',
        name: 'Dr. Emily Chen',
        email: 'dr.chen@example.com',
        role: 'dentist',
        phone: '(555) 987-6543',
        location: 'San Francisco, CA'
    },
    {
        id: 'u3',
        name: 'Sarah Jenkins',
        email: 'sarah@example.com',
        role: 'patient',
        phone: '(555) 456-7890',
        location: 'Oakland, CA'
    }
];

// Demo password for all mock users
const DEMO_PASSWORD = 'demo123';

// --- Auth Context ---
interface AuthContextType {
    user: User | null;
    isLoading: boolean;
    login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
    signup: (name: string, email: string, password: string, role: 'patient' | 'dentist') => Promise<{ success: boolean; error?: string }>;
    logout: () => void;
    updateProfile: (updates: Partial<User>) => void;
}

const AuthContext = React.createContext<AuthContextType | undefined>(undefined);

// --- Storage Keys ---
const STORAGE_KEY = 'dentistry_simplified_user';

// --- AuthProvider Component ---
export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = React.useState<User | null>(null);
    const [isLoading, setIsLoading] = React.useState(true);
    const router = useRouter();

    // Load user from localStorage on mount
    React.useEffect(() => {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
            try {
                setUser(JSON.parse(stored));
            } catch {
                localStorage.removeItem(STORAGE_KEY);
            }
        }
        setIsLoading(false);
    }, []);

    // Login function
    const login = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 800));

        // Find user by email
        const foundUser = MOCK_USERS.find(u => u.email.toLowerCase() === email.toLowerCase());

        if (!foundUser) {
            return { success: false, error: 'No account found with this email' };
        }

        if (password !== DEMO_PASSWORD) {
            return { success: false, error: 'Incorrect password' };
        }

        // Success - save to state and localStorage
        setUser(foundUser);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(foundUser));

        return { success: true };
    };

    // Signup function
    const signup = async (
        name: string,
        email: string,
        password: string,
        role: 'patient' | 'dentist'
    ): Promise<{ success: boolean; error?: string }> => {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 800));

        // Check if email already exists
        const existing = MOCK_USERS.find(u => u.email.toLowerCase() === email.toLowerCase());
        if (existing) {
            return { success: false, error: 'An account with this email already exists' };
        }

        // Create new user
        const newUser: User = {
            id: `u${Date.now()}`,
            name,
            email,
            role,
        };

        // Add to mock users (won't persist across refresh, but works for demo)
        MOCK_USERS.push(newUser);

        // Save to state and localStorage
        setUser(newUser);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(newUser));

        return { success: true };
    };

    // Logout function
    const logout = () => {
        setUser(null);
        localStorage.removeItem(STORAGE_KEY);
        router.push('/');
    };

    // Update profile function
    const updateProfile = (updates: Partial<User>) => {
        if (!user) return;

        const updatedUser = { ...user, ...updates };
        setUser(updatedUser);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedUser));

        // Also update in MOCK_USERS array
        const index = MOCK_USERS.findIndex(u => u.id === user.id);
        if (index !== -1) {
            MOCK_USERS[index] = updatedUser;
        }
    };

    return (
        <AuthContext.Provider value={{ user, isLoading, login, signup, logout, updateProfile }}>
            {children}
        </AuthContext.Provider>
    );
}

// --- useAuth Hook ---
export function useAuth() {
    const context = React.useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}

// --- Helper to get initials ---
export function getInitials(name: string): string {
    return name
        .split(' ')
        .map(n => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2);
}
