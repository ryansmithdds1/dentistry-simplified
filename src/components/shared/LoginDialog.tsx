'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useToast } from '@/components/ui/toast';
import { useAuth } from '@/lib/auth';
import { useRouter } from 'next/navigation';
import {
    Mail,
    Lock,
    Eye,
    EyeOff,
    ArrowRight,
    Loader2,
    Stethoscope,
    User,
    AlertCircle
} from 'lucide-react';

interface LoginDialogProps {
    trigger: React.ReactNode;
    defaultMode?: 'login' | 'signup';
    defaultRole?: 'patient' | 'dentist';
}

export function LoginDialog({ trigger, defaultMode = 'login', defaultRole = 'patient' }: LoginDialogProps) {
    const { addToast } = useToast();
    const { login, signup } = useAuth();
    const router = useRouter();

    const [mode, setMode] = React.useState<'login' | 'signup'>(defaultMode);
    const [role, setRole] = React.useState<'patient' | 'dentist'>(defaultRole);
    const [showPassword, setShowPassword] = React.useState(false);
    const [isLoading, setIsLoading] = React.useState(false);
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [name, setName] = React.useState('');
    const [error, setError] = React.useState('');
    const [open, setOpen] = React.useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        let result: { success: boolean; error?: string };

        if (mode === 'login') {
            result = await login(email, password);
        } else {
            result = await signup(name, email, password, role);
        }

        setIsLoading(false);

        if (result.success) {
            setOpen(false);
            addToast('success', mode === 'login' ? 'Welcome back!' : 'Account created successfully!');

            // Redirect based on role (for signup we know the role, for login we check user)
            if (mode === 'signup') {
                router.push(role === 'dentist' ? '/dentist/dashboard' : '/patient/dashboard');
            } else {
                // For login, redirect to appropriate dashboard based on email
                const isDentist = email.toLowerCase().includes('dr.') || email.toLowerCase().includes('dentist');
                router.push(isDentist ? '/dentist/dashboard' : '/patient/dashboard');
            }
        } else {
            setError(result.error || 'Something went wrong');
        }
    };

    // Reset form when dialog opens/closes
    React.useEffect(() => {
        if (!open) {
            setEmail('');
            setPassword('');
            setName('');
            setError('');
        }
    }, [open]);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                {trigger}
            </DialogTrigger>
            <DialogContent className="max-w-md p-0 overflow-hidden">
                {/* Header with gradient */}
                <div className="relative h-28 bg-gradient-to-br from-brand-primary via-brand-secondary to-teal-500 flex items-center justify-center">
                    <div className="h-16 w-16 rounded-2xl bg-white/20 backdrop-blur flex items-center justify-center">
                        <Stethoscope className="h-8 w-8 text-white" />
                    </div>
                    <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-10" />
                </div>

                <div className="p-6">
                    <DialogHeader className="text-center mb-6">
                        <DialogTitle className="text-xl">
                            {mode === 'login' ? 'Welcome Back' : 'Create an Account'}
                        </DialogTitle>
                        <DialogDescription>
                            {mode === 'login'
                                ? 'Sign in to access your dental cases and messages'
                                : 'Join thousands finding better dental care'
                            }
                        </DialogDescription>
                    </DialogHeader>

                    {/* Error Message */}
                    {error && (
                        <div className="mb-4 p-3 rounded-lg bg-red-50 border border-red-200 flex items-center gap-2 text-sm text-red-700">
                            <AlertCircle className="h-4 w-4 flex-shrink-0" />
                            {error}
                        </div>
                    )}

                    {/* Role Selection for Signup */}
                    {mode === 'signup' && (
                        <div className="mb-4">
                            <label className="text-sm font-medium text-slate-700 mb-2 block">I am a...</label>
                            <div className="grid grid-cols-2 gap-2">
                                <button
                                    type="button"
                                    onClick={() => setRole('patient')}
                                    className={cn(
                                        "p-3 rounded-xl border-2 text-sm font-medium transition-all",
                                        role === 'patient'
                                            ? "border-brand-primary bg-brand-primary/5 text-brand-primary"
                                            : "border-slate-200 text-slate-600 hover:border-slate-300"
                                    )}
                                >
                                    <User className="h-5 w-5 mx-auto mb-1" />
                                    Patient
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setRole('dentist')}
                                    className={cn(
                                        "p-3 rounded-xl border-2 text-sm font-medium transition-all",
                                        role === 'dentist'
                                            ? "border-teal-500 bg-teal-50 text-teal-700"
                                            : "border-slate-200 text-slate-600 hover:border-slate-300"
                                    )}
                                >
                                    <Stethoscope className="h-5 w-5 mx-auto mb-1" />
                                    Dentist
                                </button>
                            </div>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-4">
                        {mode === 'signup' && (
                            <div>
                                <label className="text-sm font-medium text-slate-700 mb-1.5 block">Full Name</label>
                                <div className="relative">
                                    <User className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                                    <Input
                                        type="text"
                                        placeholder="John Doe"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        className="pl-9"
                                        required
                                    />
                                </div>
                            </div>
                        )}

                        <div>
                            <label className="text-sm font-medium text-slate-700 mb-1.5 block">Email</label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                                <Input
                                    type="email"
                                    placeholder="you@example.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="pl-9"
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <label className="text-sm font-medium text-slate-700 mb-1.5 block">Password</label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                                <Input
                                    type={showPassword ? 'text' : 'password'}
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="pl-9 pr-10"
                                    required
                                    minLength={6}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600"
                                >
                                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                </button>
                            </div>
                        </div>

                        {mode === 'login' && (
                            <div className="flex justify-end">
                                <button type="button" className="text-sm text-brand-primary hover:underline">
                                    Forgot password?
                                </button>
                            </div>
                        )}

                        <Button
                            type="submit"
                            className="w-full gap-2 bg-brand-primary hover:bg-brand-primary/90"
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <Loader2 className="h-4 w-4 animate-spin" />
                            ) : (
                                <>
                                    {mode === 'login' ? 'Sign In' : 'Create Account'}
                                    <ArrowRight className="h-4 w-4" />
                                </>
                            )}
                        </Button>
                    </form>

                    {/* Demo Credentials Hint */}
                    {mode === 'login' && (
                        <div className="mt-4 p-3 rounded-lg bg-slate-50 border border-slate-200">
                            <p className="text-xs text-slate-500 text-center">
                                <strong>Demo:</strong> john@example.com / demo123 (patient)<br />
                                dr.chen@example.com / demo123 (dentist)
                            </p>
                        </div>
                    )}

                    <div className="relative my-6">
                        <div className="absolute inset-0 flex items-center">
                            <span className="w-full border-t border-slate-200" />
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                            <span className="bg-white px-2 text-slate-400">Or continue with</span>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                        <Button variant="outline" className="gap-2">
                            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                            </svg>
                            Google
                        </Button>
                        <Button variant="outline" className="gap-2">
                            <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701" />
                            </svg>
                            Apple
                        </Button>
                    </div>

                    <p className="text-center text-sm text-slate-500 mt-6">
                        {mode === 'login' ? "Don't have an account? " : "Already have an account? "}
                        <button
                            type="button"
                            onClick={() => {
                                setMode(mode === 'login' ? 'signup' : 'login');
                                setError('');
                            }}
                            className="text-brand-primary font-medium hover:underline"
                        >
                            {mode === 'login' ? 'Sign up' : 'Sign in'}
                        </button>
                    </p>
                </div>
            </DialogContent>
        </Dialog>
    );
}
