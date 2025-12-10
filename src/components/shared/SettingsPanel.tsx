'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { useToast } from '@/components/ui/toast';
import { useAuth, getInitials } from '@/lib/auth';
import {
    User,
    Bell,
    Shield,
    CreditCard,
    Moon,
    Sun,
    ChevronRight,
    Camera,
    Mail,
    Phone,
    MapPin,
    Save,
    Loader2,
    LogOut
} from 'lucide-react';

interface SettingsSection {
    id: string;
    label: string;
    icon: React.ReactNode;
}

const SECTIONS: SettingsSection[] = [
    { id: 'profile', label: 'Profile', icon: <User className="h-4 w-4" /> },
    { id: 'notifications', label: 'Notifications', icon: <Bell className="h-4 w-4" /> },
    { id: 'privacy', label: 'Privacy & Security', icon: <Shield className="h-4 w-4" /> },
    { id: 'billing', label: 'Billing', icon: <CreditCard className="h-4 w-4" /> },
    { id: 'appearance', label: 'Appearance', icon: <Moon className="h-4 w-4" /> },
];

export function SettingsPanel() {
    const { addToast } = useToast();
    const { user, updateProfile, logout } = useAuth();
    const [activeSection, setActiveSection] = React.useState('profile');
    const [isSaving, setIsSaving] = React.useState(false);
    const [darkMode, setDarkMode] = React.useState(false);

    // Initialize form state from user
    const [profile, setProfile] = React.useState({
        name: user?.name || 'Guest User',
        email: user?.email || 'guest@example.com',
        phone: user?.phone || '',
        location: user?.location || ''
    });

    // Update form when user changes
    React.useEffect(() => {
        if (user) {
            setProfile({
                name: user.name,
                email: user.email,
                phone: user.phone || '',
                location: user.location || ''
            });
        }
    }, [user]);

    const [notifications, setNotifications] = React.useState({
        emailBids: true,
        emailMessages: true,
        emailReminders: true,
        pushBids: true,
        pushMessages: false
    });

    const handleSave = async () => {
        setIsSaving(true);
        await new Promise(resolve => setTimeout(resolve, 800));

        // Update user profile in auth context
        updateProfile({
            name: profile.name,
            email: profile.email,
            phone: profile.phone,
            location: profile.location
        });

        setIsSaving(false);
        addToast('success', 'Settings saved successfully!');
    };

    return (
        <div className="grid md:grid-cols-12 gap-6">
            {/* Sidebar */}
            <div className="md:col-span-3">
                <Card className="p-2">
                    <nav className="space-y-1">
                        {SECTIONS.map(section => (
                            <button
                                key={section.id}
                                onClick={() => setActiveSection(section.id)}
                                className={cn(
                                    "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all",
                                    activeSection === section.id
                                        ? "bg-brand-primary/10 text-brand-primary"
                                        : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                                )}
                            >
                                {section.icon}
                                <span className="flex-1 text-left">{section.label}</span>
                                <ChevronRight className={cn(
                                    "h-4 w-4 transition-transform",
                                    activeSection === section.id && "text-brand-primary"
                                )} />
                            </button>
                        ))}
                    </nav>
                </Card>

                {/* Logout button in sidebar */}
                {user && (
                    <Button
                        variant="outline"
                        className="w-full mt-4 gap-2 text-red-600 hover:text-red-700 hover:bg-red-50 border-red-200"
                        onClick={logout}
                    >
                        <LogOut className="h-4 w-4" />
                        Sign Out
                    </Button>
                )}
            </div>

            {/* Content */}
            <div className="md:col-span-9 space-y-6">
                {activeSection === 'profile' && (
                    <Card className="p-6">
                        <h2 className="text-lg font-bold text-slate-900 mb-6">Profile Settings</h2>

                        {/* Avatar */}
                        <div className="flex items-center gap-4 mb-6">
                            <div className="h-20 w-20 rounded-full bg-gradient-to-br from-brand-primary to-brand-secondary flex items-center justify-center text-white text-2xl font-bold shadow-lg">
                                {user ? getInitials(user.name) : 'GU'}
                            </div>
                            <div>
                                <Button variant="outline" size="sm" className="gap-2">
                                    <Camera className="h-4 w-4" /> Change Photo
                                </Button>
                                <p className="text-xs text-slate-400 mt-1">JPG, PNG. Max 2MB</p>
                            </div>
                        </div>

                        {/* Form */}
                        <div className="grid md:grid-cols-2 gap-4">
                            <div>
                                <label className="text-sm font-medium text-slate-700 mb-1.5 block">Full Name</label>
                                <div className="relative">
                                    <User className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                                    <Input
                                        value={profile.name}
                                        onChange={(e) => setProfile(p => ({ ...p, name: e.target.value }))}
                                        className="pl-9"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="text-sm font-medium text-slate-700 mb-1.5 block">Email</label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                                    <Input
                                        value={profile.email}
                                        onChange={(e) => setProfile(p => ({ ...p, email: e.target.value }))}
                                        className="pl-9"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="text-sm font-medium text-slate-700 mb-1.5 block">Phone</label>
                                <div className="relative">
                                    <Phone className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                                    <Input
                                        value={profile.phone}
                                        onChange={(e) => setProfile(p => ({ ...p, phone: e.target.value }))}
                                        className="pl-9"
                                        placeholder="(555) 123-4567"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="text-sm font-medium text-slate-700 mb-1.5 block">Location</label>
                                <div className="relative">
                                    <MapPin className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                                    <Input
                                        value={profile.location}
                                        onChange={(e) => setProfile(p => ({ ...p, location: e.target.value }))}
                                        className="pl-9"
                                        placeholder="San Francisco, CA"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Account Info */}
                        {user && (
                            <div className="mt-6 p-4 bg-slate-50 rounded-xl">
                                <p className="text-xs text-slate-500">
                                    Account type: <span className="font-semibold text-slate-700 capitalize">{user.role}</span>
                                </p>
                            </div>
                        )}
                    </Card>
                )}

                {activeSection === 'notifications' && (
                    <Card className="p-6">
                        <h2 className="text-lg font-bold text-slate-900 mb-6">Notification Preferences</h2>

                        <div className="space-y-6">
                            <div>
                                <h3 className="font-semibold text-slate-900 mb-3">Email Notifications</h3>
                                <div className="space-y-3">
                                    {[
                                        { key: 'emailBids', label: 'New bids on my cases' },
                                        { key: 'emailMessages', label: 'New messages from dentists' },
                                        { key: 'emailReminders', label: 'Appointment reminders' }
                                    ].map(item => (
                                        <label key={item.key} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg cursor-pointer hover:bg-slate-100 transition-colors">
                                            <span className="text-sm text-slate-700">{item.label}</span>
                                            <input
                                                type="checkbox"
                                                checked={notifications[item.key as keyof typeof notifications]}
                                                onChange={(e) => setNotifications(n => ({ ...n, [item.key]: e.target.checked }))}
                                                className="h-4 w-4 rounded border-slate-300 text-brand-primary focus:ring-brand-primary/20"
                                            />
                                        </label>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <h3 className="font-semibold text-slate-900 mb-3">Push Notifications</h3>
                                <div className="space-y-3">
                                    {[
                                        { key: 'pushBids', label: 'New bids (instant)' },
                                        { key: 'pushMessages', label: 'New messages (instant)' }
                                    ].map(item => (
                                        <label key={item.key} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg cursor-pointer hover:bg-slate-100 transition-colors">
                                            <span className="text-sm text-slate-700">{item.label}</span>
                                            <input
                                                type="checkbox"
                                                checked={notifications[item.key as keyof typeof notifications]}
                                                onChange={(e) => setNotifications(n => ({ ...n, [item.key]: e.target.checked }))}
                                                className="h-4 w-4 rounded border-slate-300 text-brand-primary focus:ring-brand-primary/20"
                                            />
                                        </label>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </Card>
                )}

                {activeSection === 'appearance' && (
                    <Card className="p-6">
                        <h2 className="text-lg font-bold text-slate-900 mb-6">Appearance</h2>

                        <div className="space-y-4">
                            <label className="flex items-center justify-between p-4 bg-slate-50 rounded-xl cursor-pointer hover:bg-slate-100 transition-colors">
                                <div className="flex items-center gap-3">
                                    {darkMode ? <Moon className="h-5 w-5 text-slate-600" /> : <Sun className="h-5 w-5 text-amber-500" />}
                                    <div>
                                        <p className="font-medium text-slate-900">Dark Mode</p>
                                        <p className="text-xs text-slate-500">Switch between light and dark themes</p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => setDarkMode(!darkMode)}
                                    className={cn(
                                        "relative inline-flex h-6 w-11 items-center rounded-full transition-colors",
                                        darkMode ? "bg-brand-primary" : "bg-slate-200"
                                    )}
                                >
                                    <span className={cn(
                                        "inline-block h-4 w-4 transform rounded-full bg-white transition-transform shadow-sm",
                                        darkMode ? "translate-x-6" : "translate-x-1"
                                    )} />
                                </button>
                            </label>
                        </div>
                    </Card>
                )}

                {activeSection === 'privacy' && (
                    <Card className="p-6">
                        <h2 className="text-lg font-bold text-slate-900 mb-6">Privacy & Security</h2>
                        <div className="space-y-4">
                            <Button variant="outline" className="w-full justify-start gap-2">
                                <Shield className="h-4 w-4" /> Change Password
                            </Button>
                            <Button variant="outline" className="w-full justify-start gap-2">
                                <Shield className="h-4 w-4" /> Enable Two-Factor Authentication
                            </Button>
                            <Button variant="outline" className="w-full justify-start gap-2 text-red-600 hover:text-red-700 hover:bg-red-50">
                                <Shield className="h-4 w-4" /> Delete Account
                            </Button>
                        </div>
                    </Card>
                )}

                {activeSection === 'billing' && (
                    <Card className="p-6">
                        <h2 className="text-lg font-bold text-slate-900 mb-6">Billing & Payments</h2>
                        <div className="text-center py-8">
                            <CreditCard className="h-12 w-12 text-slate-200 mx-auto mb-3" />
                            <p className="text-slate-500">No payment methods on file</p>
                            <Button className="mt-4 gap-2">
                                <CreditCard className="h-4 w-4" /> Add Payment Method
                            </Button>
                        </div>
                    </Card>
                )}

                {/* Save Button */}
                <div className="flex justify-end">
                    <Button
                        onClick={handleSave}
                        disabled={isSaving}
                        className="gap-2 bg-brand-primary hover:bg-brand-primary/90"
                    >
                        {isSaving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
                        {isSaving ? 'Saving...' : 'Save Changes'}
                    </Button>
                </div>
            </div>
        </div>
    );
}
