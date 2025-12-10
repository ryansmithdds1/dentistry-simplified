export type UserRole = 'patient' | 'dentist';

export interface User {
    id: string;
    name: string;
    role: UserRole;
    avatar?: string;
}

export interface Message {
    id: string;
    senderId: string;
    receiverId: string;
    content: string;
    timestamp: string; // ISO string
    read: boolean;
}

export interface ChatThread {
    id: string;
    participant: User; // The "other" person in the chat
    lastMessage: Message;
    unreadCount: number;
}
