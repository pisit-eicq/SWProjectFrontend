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
        <main className="relative">
            <img src="/Gradient3.svg" className='absolute top-0 left-0 z-0 w-fit h-auto opacity-50 blur-md invert dark:invert-0' alt="gd3" />

            <div className="mx-auto max-w-6xl pt-32 px-16 flex flex-col gap-8 relative">
                <div>
                    <h1 className="text-4xl font-semibold font-dela text-white uppercase">
                        BOOKING
                    </h1>
                    <p className="text-lg text-white opacity-3/4">
                        Explore our selection of restaurants and book a table.
                    </p>
                    {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
                </div>
                <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-4">
                    <input
                        type="text"
                        placeholder="Name"
                        className="p-4 rounded bg-background/50 backdrop-blur-md border border-base-300 text-foreground"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
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
                        Already have an account? {' '}
                        <a href="/signin" className="text-primary">
                            Sign In
                        </a>
                    </p>
                </form>
            </div>
        </main>
    );
}