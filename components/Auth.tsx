import React, { useState, useEffect, useRef, useCallback } from 'react';
import { User } from '../types';
import { LogoIcon } from './Icons';
import { loginUser, signupUser, isUsernameAvailable, doesUserExist } from '../services/userService';

// FIX: Add google to window interface for Google Sign-In
declare global {
  interface Window {
    google: any;
  }
}

interface AuthProps {
    onLogin: (user: User) => void;
}

// Simple client-side JWT decoder
const decodeJwt = (token: string) => {
    try {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));

        return JSON.parse(jsonPayload);
    } catch (e) {
        console.error("Failed to decode JWT:", e);
        return null;
    }
};

const generateCaptcha = () => {
    const chars = 'ABCDEFGHIJKLMNPQRSTUVWXYZ123456789';
    let result = '';
    for (let i = 0; i < 5; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
};


export const Auth: React.FC<AuthProps> = ({ onLogin }) => {
    const [mode, setMode] = useState<'signin' | 'signup'>('signin');
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [error, setError] = useState<string | null>(null);

    // Username availability check
    const [isCheckingUsername, setIsCheckingUsername] = useState(false);
    const [usernameAvailable, setUsernameAvailable] = useState<boolean | null>(null);
    const debounceTimeout = useRef<number | null>(null);

    // Google Sign-In
    const googleButtonRef = useRef<HTMLDivElement>(null);

    // CAPTCHA
    const [captchaText, setCaptchaText] = useState('');
    const [captchaInput, setCaptchaInput] = useState('');
    const isCaptchaValid = captchaText === captchaInput;

    // Forgot Password Modal
    const [showForgotPassword, setShowForgotPassword] = useState(false);
    const [forgotPasswordStep, setForgotPasswordStep] = useState<'email' | 'code'>('email');
    const [forgotEmail, setForgotEmail] = useState('');
    const [verificationCode, setVerificationCode] = useState('');
    const [userCode, setUserCode] = useState('');
    const [forgotError, setForgotError] = useState('');

    const refreshCaptcha = useCallback(() => {
        setCaptchaText(generateCaptcha());
        setCaptchaInput('');
    }, []);
    
    useEffect(() => {
        refreshCaptcha();
    }, [refreshCaptcha, mode]);


    // Username availability check logic
    useEffect(() => {
        if (mode !== 'signup' || !username) {
            setUsernameAvailable(null);
            return;
        }

        if (debounceTimeout.current) clearTimeout(debounceTimeout.current);
        
        setIsCheckingUsername(true);
        setUsernameAvailable(null);

        debounceTimeout.current = window.setTimeout(() => {
            setUsernameAvailable(isUsernameAvailable(username));
            setIsCheckingUsername(false);
        }, 500);

    }, [username, mode]);

    const handleGoogleCallback = useCallback(async (response: any) => {
        setError(null);
        const userData = decodeJwt(response.credential);
        if (!userData) {
            setError("Could not verify Google Sign-In. Please try again.");
            return;
        }

        const { email, name, picture } = userData;

        try {
            const user = loginUser(email);
            onLogin(user);
        } catch (error) {
            // User doesn't exist, sign them up
            let newUsername = name.replace(/\s+/g, '') || 'Adventurer';
            if (!isUsernameAvailable(newUsername)) {
                newUsername = `${newUsername}${Math.floor(Math.random() * 1000)}`;
            }
            const user = signupUser(email, newUsername, picture);
            onLogin(user);
        }

    }, [onLogin]);

    // Google Sign-In initialization
    useEffect(() => {
        if (typeof window.google === 'undefined' || !googleButtonRef.current) return;
        
        try {
            window.google.accounts.id.initialize({
                client_id: process.env.GOOGLE_CLIENT_ID, // This should be set in your environment
                callback: handleGoogleCallback,
            });
            window.google.accounts.id.renderButton(
                googleButtonRef.current,
                { theme: "outline", size: "large", type: "standard", text: 'signin_with', shape: 'pill' }
            );
        } catch (err) {
            console.error("Google Sign-In initialization error:", err);
        }
    }, [handleGoogleCallback]);


    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        if (!email.trim() || !email.includes('@')) {
            setError('Please enter a valid email address.');
            return;
        }

        if (mode === 'signin' && !isCaptchaValid) {
            setError('CAPTCHA is incorrect.');
            refreshCaptcha();
            return;
        }

        try {
            if (mode === 'signup') {
                if (!username.trim()) {
                    setError('Please enter a username.');
                    return;
                }
                if(usernameAvailable === false) {
                    setError('This username is already taken.');
                    return;
                }
                const user = signupUser(email, username.trim());
                onLogin(user);
            } else {
                const user = loginUser(email);
                onLogin(user);
            }
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An unknown error occurred.');
            if (mode === 'signin') refreshCaptcha();
        }
    };
    
    
    const toggleMode = () => {
        setMode(prev => prev === 'signin' ? 'signup' : 'signin');
        setError(null);
        setEmail('');
        setUsername('');
        setUsernameAvailable(null);
    }
    
    const handleForgotPassword = () => {
        setForgotError('');
        if (!forgotEmail.includes('@')) {
            setForgotError('Please enter a valid email.');
            return;
        }
        if (doesUserExist(forgotEmail)) {
            const code = String(Math.floor(100000 + Math.random() * 900000));
            setVerificationCode(code);
            setForgotPasswordStep('code');
        } else {
            setForgotError('No account found with this email.');
        }
    }

    const handleVerifyCode = () => {
        setForgotError('');
        if (userCode === verificationCode) {
            const user = loginUser(forgotEmail);
            onLogin(user);
            setShowForgotPassword(false);
        } else {
            setForgotError('Invalid verification code.');
        }
    };


    const renderUsernameFeedback = () => {
        if (mode !== 'signup' || !username) return null;
        if (isCheckingUsername) return <p className="text-xs text-gray-400 mt-1">Checking...</p>;
        if (usernameAvailable === true) return <p className="text-xs text-green-400 mt-1">Username is available!</p>;
        if (usernameAvailable === false) return <p className="text-xs text-red-400 mt-1">Username is already taken.</p>;
        return null;
    }
    
    const ForgotPasswordModal = () => (
         <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-gray-800 border border-purple-500/50 rounded-2xl shadow-xl max-w-sm w-full p-6 text-center relative">
                <button onClick={() => setShowForgotPassword(false)} className="absolute top-2 right-2 text-gray-400 hover:text-white">&times;</button>
                <h2 className="text-xl font-bold mb-4">Account Recovery</h2>
                {forgotPasswordStep === 'email' ? (
                    <>
                        <p className="text-gray-400 mb-4">Enter your email to receive a verification code.</p>
                        <input type="email" value={forgotEmail} onChange={e => setForgotEmail(e.target.value)} placeholder="you@example.com" className="w-full bg-gray-700 p-2 rounded-lg mb-4" />
                        {forgotError && <p className="text-sm text-red-400 mb-4">{forgotError}</p>}
                        <button onClick={handleForgotPassword} className="w-full bg-purple-600 py-2 rounded-full font-bold">Send Code</button>
                    </>
                ) : (
                     <>
                        <p className="text-gray-400 mb-2">A code was "sent" to {forgotEmail}.</p>
                        <p className="text-gray-300 mb-4 bg-gray-900 p-2 rounded">For demo, your code is: <b className="text-lg tracking-widest">{verificationCode}</b></p>
                        <input type="text" value={userCode} onChange={e => setUserCode(e.target.value)} placeholder="6-digit code" className="w-full bg-gray-700 p-2 rounded-lg mb-4 text-center tracking-widest" maxLength={6} />
                        {forgotError && <p className="text-sm text-red-400 mb-4">{forgotError}</p>}
                        <button onClick={handleVerifyCode} className="w-full bg-purple-600 py-2 rounded-full font-bold">Verify & Sign In</button>
                    </>
                )}
            </div>
        </div>
    );

    return (
        <>
        {showForgotPassword && <ForgotPasswordModal />}
        <div className="w-full max-w-md bg-gray-800/50 backdrop-blur-sm p-8 rounded-2xl shadow-lg border border-gray-700 animate-fade-in">
            <div className="text-center mb-8">
                <div className="flex items-center justify-center gap-4">
                    <LogoIcon className="h-12 w-12 text-purple-400" />
                    <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-sky-500">
                        LifeQuests AI
                    </h1>
                </div>
                <p className="text-gray-400 mt-2">Your daily adventure awaits.</p>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-4">
                 {mode === 'signup' && (
                    <div>
                        <label htmlFor="username" className="block text-sm font-medium text-gray-300">Username</label>
                        <input id="username" name="username" type="text" required value={username} onChange={(e) => setUsername(e.target.value)} className="mt-1 w-full bg-gray-700 text-white placeholder-gray-500 p-3 rounded-lg border-2 border-transparent focus:border-purple-500 focus:ring-0 transition" placeholder="Your adventurer name" />
                        {renderUsernameFeedback()}
                    </div>
                )}
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-300">Email Address</label>
                    <input id="email" name="email" type="email" autoComplete="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="mt-1 w-full bg-gray-700 text-white placeholder-gray-500 p-3 rounded-lg border-2 border-transparent focus:border-purple-500 focus:ring-0 transition" placeholder="you@example.com" />
                </div>

                {mode === 'signin' && (
                    <div>
                        <label htmlFor="captcha" className="block text-sm font-medium text-gray-300">Verify You're Human</label>
                        <div className="flex items-center gap-4 mt-1">
                            <div className="bg-gray-900/50 border border-gray-600 rounded-lg p-3 select-none flex-1 text-center">
                                <span className="text-2xl font-bold tracking-widest text-purple-300" style={{ fontStyle: 'italic', textDecoration: 'line-through' }}>{captchaText}</span>
                            </div>
                            <input id="captcha" type="text" value={captchaInput} onChange={(e) => setCaptchaInput(e.target.value.toUpperCase())} className="w-32 bg-gray-700 p-3 rounded-lg text-center tracking-widest" maxLength={5} />
                        </div>
                    </div>
                )}

                {error && <p className="text-sm text-red-400 text-center">{error}</p>}
                
                <button type="submit" className="w-full flex justify-center py-3 px-4 border border-transparent rounded-full shadow-sm text-lg font-bold text-white bg-gradient-to-r from-purple-600 to-sky-600 hover:from-purple-700 hover:to-sky-700 transition-transform transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed" disabled={ (mode === 'signup' && (isCheckingUsername || usernameAvailable === false)) || (mode === 'signin' && !isCaptchaValid) }>
                    {mode === 'signin' ? 'Sign In' : 'Sign Up'}
                </button>
            </form>

            <div className="flex justify-between items-center mt-4">
                <button onClick={toggleMode} className="text-sm text-purple-300 hover:text-purple-200">
                    {mode === 'signin' ? "Need an account? Sign Up" : "Have an account? Sign In"}
                </button>
                {mode === 'signin' && (
                    <button onClick={() => setShowForgotPassword(true)} className="text-sm text-gray-400 hover:text-gray-200">
                        Forgot Password?
                    </button>
                )}
            </div>
            
            <div className="mt-6">
                <div className="relative"><div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-600" /></div><div className="relative flex justify-center text-sm"><span className="px-2 bg-gray-800 text-gray-400">Or</span></div></div>
                <div className="mt-6 flex justify-center" ref={googleButtonRef} />
            </div>
        </div>
        </>
    );
};