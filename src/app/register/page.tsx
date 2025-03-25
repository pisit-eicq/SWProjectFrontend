'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import userRegister from '@/libs/register';
import Button from '@/components/ui/Button';

export default function SignUpPage() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const router = useRouter();

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setError('');
        setSuccess('');

        try {
            const data = await userRegister(name, email, password);

            // เก็บ Token ลง localStorage (ถ้า API ส่ง token กลับมา)
            if (data.token) {
                localStorage.setItem('token', data.token);
            }

            setSuccess('Account created successfully! Redirecting...');
            setTimeout(() => router.push('/api/auth/signin'), 2000); // รีไดเรกต์ไปหน้า Sign In หลัง 2 วิ
        } catch (err: any) {
            setError('Failed to register. Please try again.');
        }
    };

    return (
        <main className="relative h-screen w-screen flex items-center justify-center">
            <img src="/Gradient3.svg" className="absolute top-0 left-0 z-0 w-fit h-auto opacity-50 blur-md invert dark:invert-0" alt="gd3" />
            <div className="absolute top-1/2 left-1/2 transform w-[calc(100vw-32px)] min-w-auto md:min-w-xl md:w-auto -translate-x-1/2 -translate-y-1/2 z-10 text-left bg-background/50 p-8 rounded-lg shadow-lg">
                <div>
                    <h1 className="text-4xl font-semibold font-dela text-foreground uppercase">Sign Up</h1>
                    <p className="text-lg text-foreground opacity-3/4">Create an account to get started.</p>
                    {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
                    {success && <p className="text-green-500 text-sm mb-2">{success}</p>}
                </div>
                <form onSubmit={handleSubmit} className="flex flex-col gap-2 mt-4">
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
                    <Button type="submit" variant="primary" size="lg">Sign Up</Button>
                    <div className="border-t border-base-300"></div>
                    <p>
                        Already have an account?{' '}
                        <a href="/api/auth/signin" className="text-primary">Sign In</a>
                    </p>
                </form>
            </div>
        </main>
    );
}
