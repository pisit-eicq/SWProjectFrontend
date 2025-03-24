'use client';
import Image from 'next/image';
import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Button from '@/components/ui/Button';

// src/app/signin/page.tsx
export default function SignInPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setError(''); // Clear previous errors

        const result = await signIn('credentials', { // 'credentials' provider
            email,
            password,
            redirect: false, // Stay on the page after sign-in
        });

        if (result?.error) {
            setError('Invalid credentials. Please check your email and password.');
        } else if (result?.ok) {
            router.push('/booking'); // Redirect to booking page on successful login
        }
    };

    return (
        <main className="relative h-screen w-screen flex items-center justify-center">
        <img src="/Gradient3.svg" className='absolute top-0 left-0 z-0 w-fit h-auto opacity-50 blur-md invert dark:invert-0' alt="gd3" />
        <div className="absolute top-1/2 left-1/2 w-[calc(100vw-32px)] min-w-auto md:min-w-xl md:w-auto transform -translate-x-1/2 -translate-y-1/2 z-10 text-left bg-background/50 p-8 rounded-lg shadow-lg">
            <div>
                <h1 className="text-4xl font-semibold font-dela text-foreground uppercase">
                Sign In
                </h1>
                <p className="text-lg text-foreground opacity-3/4">
                    Explore our venues. Click on a venue to view more details.
                </p>
                {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
            </div>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-4">
                    <input
                        type="email"
                        placeholder="Email"
                        className="p-4 rounded bg-background/50 backdrop-blur-md border border-base-300 text-foreground"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        className="p-4 rounded bg-background/50 backdrop-blur-md border border-base-300 text-foreground"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <Button type="submit" variant="primary" size="lg">
                        Sign In
                    </Button>
                    <div className="border-t border-base-300"></div>
                    <p>
                        Don't have an account?{' '}
                        <a href="/register" className="text-primary">
                            Sign up
                        </a>
                    </p>
                </form>
        </div>
    </main>
    );
}